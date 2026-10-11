import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

function load(path, module = {}) {
    const exports = {};
    const code = ts.transpileModule(fs.readFileSync(path, 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    vm.runInNewContext(code, { exports, require: () => module });
    return exports;
}
const mistakes = load('lib/mistakes.ts');
const rounds = load('lib/review-round.ts', mistakes);
const progress = load('lib/quiz-progress.ts');
const plain = value => JSON.parse(JSON.stringify(value));
const sections = [
    { id: 'database', title: 'Database', chapters: [{ id: 'one', title: 'Session 1' }, { id: 'two', title: 'Session 2' }] },
    { id: 'blockchain', title: 'Blockchain', chapters: [{ id: 'one', title: 'Session 1' }] },
];
const refs = [
    { subjectId: 'database', chapterId: 'one', questionId: 'q1' },
    { subjectId: 'database', chapterId: 'two', questionId: 'q2' },
    { subjectId: 'blockchain', chapterId: 'one', questionId: 'q3' },
];
const catalog = refs.map(ref => ({ ...ref, question: { id: ref.questionId, correctOptionId: 'a', options: [{ id: 'a' }, { id: 'b' }] } }));

test('all, subject and chapter scopes keep snapshot order and drop missing IDs', () => {
    const saved = [refs[2], { ...refs[0], questionId: 'gone' }, refs[0], refs[1]];
    assert.deepEqual(plain(rounds.createReviewRound(saved, catalog, rounds.ALL_SCOPE).map(item => item.questionId)), ['q3', 'q1', 'q2']);
    assert.deepEqual(plain(rounds.createReviewRound(saved, catalog, { subjectId: 'database', chapterId: null }).map(item => item.questionId)), ['q1', 'q2']);
    assert.deepEqual(plain(rounds.createReviewRound(saved, catalog, { subjectId: 'database', chapterId: 'two' }).map(item => item.questionId)), ['q2']);
    assert.equal(rounds.createReviewRound(saved, catalog, { subjectId: 'blockchain', chapterId: 'two' }).length, 0);
});

test('old rounds mean all subjects; saved IDs are validated against the registry', () => {
    const old = JSON.stringify({ version: 1, items: refs });
    assert.deepEqual(plain(rounds.parseReviewRound(old, sections).scope), plain(rounds.ALL_SCOPE));
    assert.deepEqual(plain(rounds.parseReviewRound(old, sections).refs), refs);
    const current = rounds.serializeReviewRound([refs[1]], { subjectId: 'database', chapterId: 'two' });
    assert.equal(rounds.reviewScopeLabel(rounds.parseReviewRound(current, sections).scope, sections), 'Database · Session 2');
    const badChapter = JSON.stringify({ version: 1, items: refs, scope: { subjectId: 'database', chapterId: 'removed' } });
    assert.deepEqual(plain(rounds.parseReviewRound(badChapter, sections).scope), { subjectId: 'database', chapterId: null });
    const badSubject = JSON.stringify({ version: 1, items: refs, scope: { subjectId: 'removed', chapterId: 'one' } });
    assert.deepEqual(plain(rounds.parseReviewRound(badSubject, sections).scope), plain(rounds.ALL_SCOPE));
    assert.equal(rounds.parseReviewRound('{', sections).refs.length, 0);
});

test('correct review preserves current snapshot; next round stays in scope', () => {
    const scope = { subjectId: 'database', chapterId: null };
    const snapshot = rounds.createReviewRound(refs, catalog, scope);
    assert.deepEqual(plain(snapshot.map(item => item.questionId)), ['q1', 'q2']);
    assert.deepEqual(plain(rounds.createReviewRound([refs[1], refs[2]], catalog, scope).map(item => item.questionId)), ['q2']);
    assert.equal(rounds.createReviewRound([refs[2]], catalog, scope).length, 0);
});

test('old progress restores position, draft and graded answers against the snapshot', () => {
    const snapshot = rounds.createReviewRound(refs, catalog, { subjectId: 'database', chapterId: null });
    const questions = snapshot.map(item => ({ ...item.question, id: mistakes.mistakeId(item) }));
    const raw = JSON.stringify({ version: 1, currentQuestionId: questions[1].id, answers: {
        [questions[0].id]: { optionId: 'a', isSubmitted: true },
        [questions[1].id]: { optionId: 'b', isSubmitted: false },
        gone: { optionId: 'a', isSubmitted: true },
    } });
    const restored = progress.restoreProgress(raw, questions);
    assert.equal(restored.currentIndex, 1);
    assert.equal(restored.answers[questions[0].id].isSubmitted, true);
    assert.equal(restored.answers[questions[1].id].isSubmitted, false);
    assert.equal(Object.keys(restored.answers).length, 2);
});
