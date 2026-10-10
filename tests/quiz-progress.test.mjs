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

test('review loader preserves the snapshot and good answers when another submitted option is invalid', () => {
    const data = new Map();
    const storage = { getItem: key => data.get(key) ?? null,
        setItem: (key, value) => data.set(key, value), removeItem: key => data.delete(key) };
    const mistakes = {};
    vm.runInNewContext(compile('lib/mistakes.ts'), { exports: mistakes,
        window: { localStorage: storage, dispatchEvent() {} }, Event: class {} });
    const refs = ['q1', 'q2'].map(questionId => ({ subjectId: 's', chapterId: 'c', questionId }));
    const catalog = refs.map(ref => ({ ...ref, question: { id: ref.questionId, options: [{ id: 'a' }, { id: 'b' }] } }));
    const raw = JSON.stringify({ version: 1, currentQuestionId: mistakes.mistakeId(refs[1]), answers: {
        [mistakes.mistakeId(refs[0])]: { optionId: 'b', isSubmitted: true },
        [mistakes.mistakeId(refs[1])]: { optionId: 'removed', isSubmitted: true },
    }});
    data.set(mistakes.MISTAKES_KEY, JSON.stringify({ version: 1, items: [refs[1]] }));
    data.set(mistakes.ROUND_KEY, JSON.stringify({ version: 1, items: refs }));
    data.set(mistakes.REVIEW_PROGRESS_KEY, raw);
    const states = [], effects = [], queue = [];
    let cursor = 0;
    const exports = {};
    vm.runInNewContext(compile('components/ReviewMistakes.tsx'), { exports,
        window: { localStorage: storage }, queueMicrotask: fn => queue.push(fn), require(id) {
            if (id === 'react') return {
                useState(initial) { const index = cursor++; states[index] = initial; return [initial, value => { states[index] = value; }]; },
                useEffect(effect) { effects.push(effect); },
            };
            if (id === 'react/jsx-runtime') return { jsx: (_type, props) => props, jsxs: (_type, props) => props };
            if (id === '@/lib/mistakes') return mistakes;
            if (id === '@/lib/quiz-progress') return progress;
            return { default: () => null };
        },
    });
    exports.default({ catalog });
    effects.forEach(effect => effect());
    queue.forEach(task => task());
    assert.deepEqual(plain(states[0].map(item => item.questionId)), ['q1', 'q2']);
    assert.equal(data.get(mistakes.REVIEW_PROGRESS_KEY), raw);
    const resolvedQuestions = states[0].map(item => ({ ...item.question, id: mistakes.mistakeId(item) }));
    const restored = progress.restoreProgress(raw, resolvedQuestions);
    assert.equal(restored.currentIndex, 1);
    assert.equal(Object.keys(restored.answers).length, 1);
});
