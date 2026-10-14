import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

function load(path, dependencies = {}) {
    const exports = {};
    const code = ts.transpileModule(fs.readFileSync(path, 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    vm.runInNewContext(code, { exports, require: name => dependencies[name], crypto });
    return exports;
}
const bookmarks = load('lib/bookmarks.ts');
const mistakes = load('lib/mistakes.ts');
const progress = load('lib/quiz-progress.ts');
const api = load('lib/bookmark-practice.ts', {
    './bookmarks': bookmarks, './mistakes': mistakes, './quiz-progress': progress,
    './storage': {},
});
const plain = value => JSON.parse(JSON.stringify(value));
const refs = [
    { subjectId: 'database', chapterId: 'one', questionId: 'q' },
    { subjectId: 'database', chapterId: 'two', questionId: 'q' },
    { subjectId: 'blockchain', chapterId: 'one', questionId: 'q' },
];
const catalog = refs.map(ref => ({ ...ref, question: { options: [{ id: 'a' }, { id: 'b' }] } }));
const storage = () => {
    const data = new Map();
    let blocked = false;
    return { data, setBlocked(value) { blocked = value; },
        getItem(key) { if (blocked) throw Error('blocked'); return data.get(key) ?? null; },
        setItem(key, value) { if (blocked) throw Error('blocked'); data.set(key, value); },
        removeItem(key) { data.delete(key); } };
};

test('selection respects scope, removes missing and duplicates, and keeps tuple identities', () => {
    const selected = api.selectPracticeItems([refs[0], refs[0], { ...refs[0], questionId: 'gone' }, refs[1], refs[2]],
        catalog, { subjectId: 'database', chapterId: null });
    assert.deepEqual(plain(selected), catalog.slice(0, 2));
    assert.notEqual(mistakes.mistakeId(selected[0]), mistakes.mistakeId(selected[1]));
});

test('one record restores scope, position, draft and submitted answers without changing snapshot', () => {
    const store = storage();
    const { record } = api.startPractice(refs.slice(0, 2), { subjectId: 'database', chapterId: null }, store);
    const id0 = mistakes.mistakeId(refs[0]);
    const id1 = mistakes.mistakeId(refs[1]);
    assert.equal(api.updatePractice(record.roundId, id1, {
        [id0]: { optionId: 'a', isSubmitted: true }, [id1]: { optionId: 'b', isSubmitted: false },
    }, store), true);
    const saved = api.parsePractice(store.data.get(api.BOOKMARK_PRACTICE_KEY));
    assert.equal(saved.roundId, record.roundId);
    assert.deepEqual(plain(saved.scope), { subjectId: 'database', chapterId: null });
    assert.equal(saved.currentQuestionId, id1);
    assert.equal(saved.answers[id0].isSubmitted, true);
    assert.equal(saved.answers[id1].isSubmitted, false);
    assert.deepEqual(plain(saved.items), refs.slice(0, 2));
    const resolved = api.resolvePractice(saved, catalog.slice(1));
    assert.deepEqual(plain(resolved.items), [refs[1]]);
    assert.deepEqual(plain(resolved.answers), { [id1]: { optionId: 'b', isSubmitted: false } });
    assert.equal(api.isPracticeComplete(saved, catalog), false);
});

test('new round clears answers and rejects callbacks from old round; failed writes retain memory', () => {
    const store = storage();
    const old = api.startPractice(refs.slice(0, 2), { subjectId: null, chapterId: null }, store).record;
    const next = api.startPractice([refs[2]], { subjectId: 'blockchain', chapterId: 'one' }, store).record;
    assert.notEqual(next.roundId, old.roundId);
    assert.deepEqual(plain(next.answers), {});
    assert.equal(api.updatePractice(old.roundId, mistakes.mistakeId(refs[0]), {}, store), null);
    assert.equal(api.readPractice(store).roundId, next.roundId);
    store.setBlocked(true);
    assert.equal(api.updatePractice(next.roundId, mistakes.mistakeId(refs[2]), {
        [mistakes.mistakeId(refs[2])]: { optionId: 'b', isSubmitted: true },
    }, store), false);
    assert.equal(api.isPracticeComplete(api.readPractice(store), catalog), true);
    assert.equal(api.parsePractice('{'), null);
    assert.equal(api.parsePractice('{"version":2}'), null);
});
