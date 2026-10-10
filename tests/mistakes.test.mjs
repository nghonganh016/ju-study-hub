import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

function setup({ blocked = false, full = false } = {}) {
    const data = new Map();
    const exports = {};
    const window = {
        localStorage: {
            getItem(key) { if (blocked) throw Error('blocked'); return data.get(key) ?? null; },
            setItem(key, value) { if (blocked || full) throw Error('full'); data.set(key, value); },
        },
        dispatchEvent() {},
    };
    const code = ts.transpileModule(fs.readFileSync('lib/mistakes.ts', 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    vm.runInNewContext(code, { exports, window, Event: class {} });
    return { api: exports, data };
}
const ref = { subjectId: 'blockchain', chapterId: 'session-1', questionId: 'q1' };
const plain = value => JSON.parse(JSON.stringify(value));

test('normal mistakes deduplicate, survive reload, and normal correct answers do not clear them', () => {
    const { api, data } = setup();
    api.recordAttempt(ref, false, false);
    api.recordAttempt(ref, false, false);
    api.recordAttempt(ref, true, false);
    assert.deepEqual(plain(api.readMistakes()), [ref]);
    const reloaded = setup();
    reloaded.data.set(api.MISTAKES_KEY, data.get(api.MISTAKES_KEY));
    assert.deepEqual(plain(reloaded.api.readMistakes()), [ref]);
});

test('review clears only correct attempts and keeps unresolved entries immediately', () => {
    const { api } = setup();
    const other = { ...ref, questionId: 'q2' };
    api.recordAttempt(ref, false, false);
    api.recordAttempt(other, false, false);
    api.recordAttempt(ref, false, true);
    assert.equal(api.readMistakes().length, 2);
    api.recordAttempt(ref, true, true);
    assert.deepEqual(plain(api.readMistakes()), [other]);
    api.recordAttempt(ref, false, true);
    assert.deepEqual(plain(api.readMistakes()), [other]);
});

test('subject and chapter context prevents colliding question IDs, including delimiters', () => {
    const { api } = setup();
    const refs = [ref, { ...ref, subjectId: 'database' }, { ...ref, chapterId: 'session-2' },
        { subjectId: 'a:b', chapterId: 'c', questionId: 'd' },
        { subjectId: 'a', chapterId: 'b:c', questionId: 'd' }];
    refs.forEach(item => api.recordAttempt(item, false, false));
    assert.equal(api.readMistakes().length, refs.length);
});

test('invalid, partial and unknown-version data is safe; valid fragments are recovered', () => {
    const { api } = setup();
    for (const raw of [null, '{', 'null', '[]', '{"version":2,"items":[]}', '{"version":1,"items":{}}']) {
        assert.equal(api.parseMistakes(raw).length, 0);
    }
    const raw = JSON.stringify({ version: 1, items: [null, {}, { ...ref, questionId: 2 }, ref, ref] });
    assert.deepEqual(plain(api.parseMistakes(raw)), [ref]);
});

test('catalog resolution drops removed IDs and snapshot order survives collection removal', () => {
    const { api } = setup();
    const other = { ...ref, questionId: 'q2' };
    const catalog = [ref, other].map(item => ({ ...item, question: { id: item.questionId } }));
    api.recordAttempt(ref, false, false);
    api.recordAttempt(other, false, false);
    const round = api.resolveMistakes([...api.readMistakes(), { ...ref, questionId: 'removed' }], catalog);
    api.recordAttempt(ref, true, true);
    assert.deepEqual(plain(round.map(item => item.questionId)), ['q1', 'q2']);
    assert.deepEqual(plain(api.resolveMistakes(api.readMistakes(), catalog).map(item => item.questionId)), ['q2']);
});

test('blocked or full storage keeps mistakes usable in memory', () => {
    for (const options of [{ blocked: true }, { full: true }]) {
        const { api } = setup(options);
        api.recordAttempt(ref, false, false);
        assert.equal(api.readMistakes().length, 1);
        api.recordAttempt(ref, true, true);
        assert.equal(api.readMistakes().length, 0);
    }
});

test('mistake operations leave old normal progress untouched and store references only', () => {
    const { api, data } = setup();
    const key = 'ju-study-hub:quiz-progress:blockchain:session-1';
    const raw = JSON.stringify({ version: 1, currentQuestionId: 'q1', answers: { q1: { optionId: 'b', isSubmitted: true } } });
    data.set(key, raw);
    api.recordAttempt(ref, false, false);
    api.recordAttempt(ref, true, true);
    assert.equal(data.get(key), raw);
    api.recordAttempt(ref, false, false);
    assert.deepEqual(Object.keys(JSON.parse(data.get(api.MISTAKES_KEY)).items[0]).sort(), ['chapterId', 'questionId', 'subjectId']);
});
