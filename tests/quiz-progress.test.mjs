import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

const compile = file => ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const progress = {};
vm.runInNewContext(compile('lib/quiz-progress.ts'), { exports: progress });
const questions = ['q1', 'q2', 'q3'].map(id => ({ id, options: [{ id: 'a' }, { id: 'b' }] }));
const plain = value => JSON.parse(JSON.stringify(value));
const saved = answers => JSON.stringify({ version: 1, currentQuestionId: 'q3', answers });

test('level summary counts only valid submitted answers and keeps drafts distinct', () => {
    const summary = raw => plain(progress.summarizeProgress(raw, questions));
    assert.deepEqual(summary(null), { submitted: 0, hasAnswers: false, total: 3 });
    assert.deepEqual(summary(saved({ q1: { optionId: 'a', isSubmitted: false } })),
        { submitted: 0, hasAnswers: true, total: 3 });
    assert.deepEqual(summary(saved({ q1: { optionId: 'a', isSubmitted: true },
        q2: { optionId: 'b', isSubmitted: true }, q3: { optionId: 'a', isSubmitted: false } })),
        { submitted: 2, hasAnswers: true, total: 3 });
    assert.equal(summary(saved(Object.fromEntries(questions.map(q => [q.id, { optionId: 'a', isSubmitted: true }])))).submitted, 3);
    assert.deepEqual(plain(progress.summarizeProgress(saved({}), [])),
        { submitted: 0, hasAnswers: false, total: 0 });
});

test('level summary uses restoration rules for malformed data and removed IDs', () => {
    const raw = saved({ q1: { optionId: 'a', isSubmitted: true },
        q2: { optionId: 'removed', isSubmitted: true },
        removed: { optionId: 'a', isSubmitted: true },
        q3: { optionId: 'b', isSubmitted: 'true' } });
    assert.deepEqual(plain(progress.summarizeProgress(raw, questions)),
        { submitted: 1, hasAnswers: true, total: 3 });
    assert.equal(progress.summarizeProgress('{', questions).submitted, 0);
    assert.equal(progress.summarizeProgress(JSON.stringify({ version: 2, answers: {} }), questions).submitted, 0);
});

test('normal quiz keys isolate subjects and chapters from review progress', () => {
    assert.equal(progress.quizProgressKey('blockchain', 'session-1'),
        'ju-study-hub:quiz-progress:blockchain:session-1');
    assert.notEqual(progress.quizProgressKey('blockchain', 'session-1'), progress.quizProgressKey('database', 'session-1'));
    assert.notEqual(progress.quizProgressKey('blockchain', 'session-1'), progress.quizProgressKey('blockchain', 'session-2'));
    assert.notEqual(progress.quizProgressKey('blockchain', 'session-1'), 'ju-study-hub:mistakes-review-progress');
});

test('level reader uses only its own key and reports unavailable storage', () => {
    const key = progress.quizProgressKey('blockchain', 'chapter-1');
    const raw = saved({ q1: { optionId: 'a', isSubmitted: true } });
    const read = progress.readLevelProgress({ getItem(requested) {
        assert.equal(requested, key);
        return raw;
    } }, key, questions);
    assert.equal(read.submitted, 1);
    assert.equal(progress.readLevelProgress({ getItem() { throw new Error('blocked'); } }, key, questions), 'unavailable');
});

test('partial corruption retains valid submitted answers, drafts and current position', () => {
    const raw = saved({ q1: { optionId: 'b', isSubmitted: true },
        q2: { optionId: 'removed', isSubmitted: true }, q3: { optionId: 'a', isSubmitted: false } });
    assert.deepEqual(plain(progress.restoreProgress(raw, questions)), { currentIndex: 2, answers: {
        q1: { optionId: 'b', isSubmitted: true }, q3: { optionId: 'a', isSubmitted: false },
    }});
    assert.equal(progress.isProgressComplete(raw, questions), false);
});

test('submitted markers with invalid or missing options cannot complete a round', () => {
    for (const invalid of [{ isSubmitted: true }, { optionId: 'removed', isSubmitted: true },
        { optionId: 1, isSubmitted: true }, { optionId: 'a', isSubmitted: 'true' }, null, []]) {
        const raw = saved({ q1: { optionId: 'b', isSubmitted: true }, q2: invalid, q3: { optionId: 'a', isSubmitted: true } });
        assert.equal(progress.isProgressComplete(raw, questions), false);
        assert.equal(Object.keys(progress.restoreProgress(raw, questions).answers).length, 2);
    }
});

test('valid version-1 progress stays compatible and only fully graded rounds complete', () => {
    const raw = saved(Object.fromEntries(questions.map(q => [q.id, { optionId: 'a', isSubmitted: true }])));
    assert.equal(progress.isProgressComplete(raw, questions), true);
    assert.deepEqual(plain(progress.restoreProgress(raw, questions)), JSON.parse(JSON.stringify({
        currentIndex: 2, answers: JSON.parse(raw).answers,
    })));
    assert.equal(progress.isProgressComplete(raw, []), false);
});

test('malformed containers and obsolete question IDs are safe', () => {
    for (const raw of ['{', 'null', '[]', '{"version":2}', '{"version":1,"answers":[]}']) {
        assert.equal(Object.keys(progress.restoreProgress(raw, questions).answers).length, 0);
        assert.equal(progress.isProgressComplete(raw, questions), false);
    }
    const raw = JSON.stringify({ version: 1, currentQuestionId: 'deleted', answers: {
        deleted: { optionId: 'a', isSubmitted: true }, q2: { optionId: 'b', isSubmitted: false },
    }});
    assert.deepEqual(plain(progress.restoreProgress(raw, questions)), { currentIndex: 0, answers: {
        q2: { optionId: 'b', isSubmitted: false },
    }});
});

test('deep link selects by ID after restoring answers and falls back to saved position', () => {
    const raw = saved({ q1: { optionId: 'b', isSubmitted: true }, q2: { optionId: 'a', isSubmitted: false } });
    const restored = progress.restoreProgress(raw, questions);
    assert.equal(progress.questionIndexFromLink(questions, 'q2', restored.currentIndex), 1);
    assert.equal(progress.questionIndexFromLink(questions, 'missing', restored.currentIndex), 2);
    assert.equal(progress.questionIndexFromLink(questions, null, restored.currentIndex), 2);
    assert.deepEqual(plain(restored.answers), {
        q1: { optionId: 'b', isSubmitted: true }, q2: { optionId: 'a', isSubmitted: false },
    });
});

test('review loader preserves the snapshot and good answers when another submitted option is invalid', () => {
    const mistakes = {};
    vm.runInNewContext(compile('lib/mistakes.ts'), { exports: mistakes });
    const rounds = {};
    vm.runInNewContext(compile('lib/review-round.ts'), { exports: rounds, require: () => mistakes });
    const refs = ['q1', 'q2'].map(questionId => ({ subjectId: 's', chapterId: 'c', questionId }));
    const catalog = refs.map(ref => ({ ...ref, question: { id: ref.questionId, options: [{ id: 'a' }, { id: 'b' }] } }));
    const snapshot = rounds.createReviewRound(refs, catalog, rounds.ALL_SCOPE);
    const raw = JSON.stringify({ version: 1, currentQuestionId: mistakes.mistakeId(refs[1]), answers: {
        [mistakes.mistakeId(refs[0])]: { optionId: 'b', isSubmitted: true },
        [mistakes.mistakeId(refs[1])]: { optionId: 'removed', isSubmitted: true },
    }});
    assert.deepEqual(plain(snapshot.map(item => item.questionId)), ['q1', 'q2']);
    const resolvedQuestions = snapshot.map(item => ({ ...item.question, id: mistakes.mistakeId(item) }));
    const restored = progress.restoreProgress(raw, resolvedQuestions);
    assert.equal(restored.currentIndex, 1);
    assert.equal(Object.keys(restored.answers).length, 1);
});
