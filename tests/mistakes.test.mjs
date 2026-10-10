import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

function setup({ blocked = false, full = false } = {}) {
    const data = new Map();
    let writes = 0;
    const exports = {};
    const window = {
        localStorage: {
            getItem(key) { if (blocked) throw Error('blocked'); return data.get(key) ?? null; },
            setItem(key, value) { if (blocked || full) throw Error('full'); writes++; data.set(key, value); },
        },
        dispatchEvent() {},
    };
    const code = ts.transpileModule(fs.readFileSync('lib/mistakes.ts', 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    vm.runInNewContext(code, { exports, window, Event: class {} });
    return { api: exports, data, get writes() { return writes; },
        availability(options) { blocked = options.blocked ?? blocked; full = options.full ?? full; } };
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

test('transient write failure recovers pending additions and removals without erasing other stored items', () => {
    const fixture = setup();
    const { api, data } = fixture;
    const local = { ...ref, questionId: 'local' };
    const external = { ...ref, questionId: 'external' };
    api.recordAttempt(ref, false, false);
    fixture.availability({ full: true });
    api.recordAttempt(ref, true, true);
    api.recordAttempt(local, false, false);
    // A different page writes while this one still has unsaved changes.
    data.set(api.MISTAKES_KEY, JSON.stringify({ version: 1, items: [ref, external] }));
    assert.deepEqual(plain(api.readMistakes()), [external, local]);
    fixture.availability({ full: false });
    api.flushMistakes();
    assert.deepEqual(JSON.parse(data.get(api.MISTAKES_KEY)).items, [external, local]);
    assert.equal(fixture.writes, 2);
    // Once pending changes are saved, future external deletions must be visible.
    data.set(api.MISTAKES_KEY, JSON.stringify({ version: 1, items: [external] }));
    assert.deepEqual(plain(api.readMistakes()), [external]);
    api.flushMistakes();
    assert.equal(fixture.writes, 2);
});

test('initial read failure preserves unseen stored mistakes when local changes are saved after recovery', () => {
    const fixture = setup({ blocked: true });
    const { api, data } = fixture;
    const unseen = { ...ref, questionId: 'unseen' };
    data.set(api.MISTAKES_KEY, JSON.stringify({ version: 1, items: [unseen] }));
    api.recordAttempt(ref, false, false);
    assert.deepEqual(plain(api.readMistakes()), [ref]);
    fixture.availability({ blocked: false });
    api.flushMistakes();
    assert.deepEqual(JSON.parse(data.get(api.MISTAKES_KEY)).items, [unseen, ref]);
});

test('review deletion survives a failed read without restoring the corrected question on recovery', () => {
    const fixture = setup({ blocked: true });
    const { api, data } = fixture;
    const unseen = { ...ref, questionId: 'unseen' };
    data.set(api.MISTAKES_KEY, JSON.stringify({ version: 1, items: [ref, unseen] }));
    api.recordAttempt(ref, true, true);
    fixture.availability({ blocked: false });
    api.flushMistakes();
    assert.deepEqual(JSON.parse(data.get(api.MISTAKES_KEY)).items, [unseen]);
});

test('reads stay read-only and unchanged collections do not cause writes', () => {
    const fixture = setup();
    const { api } = fixture;
    api.recordAttempt(ref, false, false);
    api.recordAttempt(ref, false, false);
    api.recordAttempt(ref, true, false);
    api.saveMistakes(api.readMistakes());
    assert.equal(fixture.writes, 1);
    fixture.availability({ full: true });
    api.recordAttempt({ ...ref, questionId: 'pending' }, false, false);
    fixture.availability({ full: false });
    for (let i = 0; i < 3; i++) assert.equal(api.readMistakes().length, 2);
    assert.equal(fixture.writes, 1);
    api.flushMistakes();
    api.flushMistakes();
    assert.equal(fixture.writes, 2);
});

test('MistakeLink counts the same existing questions as review, dropping deleted and renamed IDs', () => {
    const { api } = setup();
    const removed = { ...ref, questionId: 'deleted' };
    const renamed = { ...ref, questionId: 'old-name' };
    for (const item of [ref, removed, renamed]) api.recordAttempt(item, false, false);
    const catalog = [{ ...ref, question: { id: ref.questionId } },
        { ...renamed, questionId: 'new-name', question: { id: 'new-name' } }];
    const exports = {};
    const jsx = (type, props) => ({ type, props });
    const code = ts.transpileModule(fs.readFileSync('components/MistakeLink.tsx', 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
    }).outputText;
    vm.runInNewContext(code, { exports, require(id) {
        if (id === 'react') return { useSyncExternalStore: (_subscribe, snapshot) => snapshot() };
        if (id === 'react/jsx-runtime') return { jsx, jsxs: jsx };
        if (id === '@/lib/mistakes') return api;
        return { default: 'a' };
    }});
    const refs = catalog.map(({ subjectId, chapterId, questionId }) => ({ subjectId, chapterId, questionId }));
    const link = exports.default({ catalog: refs });
    assert.equal(link.props.children.join(''), 'Ôn câu sai (1)');
    assert.equal(api.resolveMistakes(api.readMistakes(), catalog).length, 1);
});

test('counter subscription retries pending writes and reads external changes, then removes its listeners', () => {
    const fixture = setup({ full: true });
    const { api, data } = fixture;
    api.recordAttempt(ref, false, false);
    fixture.availability({ full: false });
    const listeners = new Map();
    let unsubscribe, notifiedCount;
    const exports = {};
    const jsx = (type, props) => ({ type, props });
    vm.runInNewContext(ts.transpileModule(fs.readFileSync('components/MistakeLink.tsx', 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
    }).outputText, { exports, window: {
        addEventListener: (name, callback) => listeners.set(name, callback),
        removeEventListener: (name, callback) => { if (listeners.get(name) === callback) listeners.delete(name); },
    }, require(id) {
        if (id === 'react') return { useSyncExternalStore(subscribe, snapshot) {
            unsubscribe = subscribe(() => { notifiedCount = snapshot(); });
            return snapshot();
        }};
        if (id === 'react/jsx-runtime') return { jsx, jsxs: jsx };
        if (id === '@/lib/mistakes') return api;
        return { default: 'a' };
    }});
    assert.equal(exports.default({ catalog: [ref] }).props.children.join(''), 'Ôn câu sai (1)');
    assert.equal(fixture.writes, 1);
    data.set(api.MISTAKES_KEY, JSON.stringify({ version: 1, items: [] }));
    listeners.get('storage')();
    assert.equal(notifiedCount, 0);
    fixture.availability({ full: true });
    api.recordAttempt(ref, false, false);
    fixture.availability({ full: false });
    listeners.get('focus')();
    assert.equal(notifiedCount, 1);
    assert.equal(fixture.writes, 2);
    listeners.get('focus')();
    assert.equal(fixture.writes, 2);
    unsubscribe();
    assert.equal(listeners.size, 0);
});
