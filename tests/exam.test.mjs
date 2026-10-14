import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

const plain = value => JSON.parse(JSON.stringify(value));
function api() {
    const exports = {};
    const code = ts.transpileModule(fs.readFileSync('lib/exam.ts', 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    vm.runInNewContext(code, { exports, require: name => name === './mistakes'
        ? { mistakeId: ref => JSON.stringify([ref.subjectId, ref.chapterId, ref.questionId]) } : {}, crypto });
    return exports;
}
function store() {
    const values = new Map(); let blocked = false;
    return { values, block(value) { blocked = value; },
        getItem(key) { if (blocked) throw Error('blocked'); return values.get(key) ?? null; },
        setItem(key, value) { if (blocked) throw Error('full'); values.set(key, value); },
        removeItem(key) { values.delete(key); } };
}
const key = ref => JSON.stringify([ref.subjectId, ref.chapterId, ref.questionId]);
function item(subjectId, chapterId, questionId, correct = 'a') {
    return { subjectId, chapterId, questionId, subjectTitle: subjectId, chapterTitle: chapterId,
        contentRevision: 2, question: { id: questionId, prompt: `Question ${questionId}`,
            options: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }], correctOptionId: correct,
            explanation: 'Explanation', source: '/reference.pdf#page=2' } };
}
const config = { subjectId: 'database', chapterId: null, count: 20, minutes: 30 };

test('random selection respects subject, chapter, count, and tuple identity', () => {
    const exam = api();
    const catalog = Array.from({ length: 32 }, (_, index) => item('database', index % 2 ? 'two' : 'one', `q${index}`));
    catalog.push(item('database', 'two', 'q0'), item('blockchain', 'one', 'q0'));
    const one = exam.createExam({ ...config, chapterId: 'one', count: 10 }, catalog, 1000, () => 0, 'a');
    assert.equal(one.items.length, 10);
    assert.ok(one.items.every(value => value.subjectId === 'database' && value.chapterId === 'one'));
    assert.equal(new Set(one.items.map(key)).size, 10);
    const all = exam.createExam({ ...config, count: 'all' }, catalog, 1000, () => .5, 'b');
    assert.equal(all.items.length, 33);
    assert.equal(new Set(all.items.map(key)).size, 33);
    assert.notDeepEqual(plain(all.items.map(key)), plain(catalog.filter(value => value.subjectId === 'database').map(key)));
});

test('snapshot, order, position and changed answer restore without regrading against edited catalog', () => {
    const exam = api(), storage = store();
    const catalog = [item('database', 'one', 'q'), item('database', 'two', 'q')];
    const original = exam.createExam({ ...config, count: 'all' }, catalog, 10, () => .9, 'snap');
    exam.saveExam(original, storage);
    const chosen = original.items[0];
    exam.updateExam('snap', value => exam.changeExamAnswer(value, 0, 'b', 20), storage);
    exam.updateExam('snap', value => exam.changeExamAnswer(value, 0, 'a', 30), storage);
    exam.updateExam('snap', value => exam.moveExam(value, 1), storage);
    catalog[0].question.correctOptionId = 'b';
    catalog[0].question.prompt = 'Changed later';
    const reloaded = exam.parseExam(storage.values.get(exam.EXAM_KEY));
    assert.deepEqual(plain(reloaded.items.map(key)), plain(original.items.map(key)));
    assert.equal(reloaded.currentIndex, 1);
    assert.equal(reloaded.answers[key(chosen)], 'a');
    assert.notEqual(reloaded.items.find(value => value.chapterId === 'one').question.prompt, 'Changed later');
    const submitted = exam.submitExam(reloaded, 40);
    assert.equal(submitted.result.correct, 1);
    assert.equal(submitted.result.incorrect, 0);
    assert.equal(submitted.result.unanswered, 1);
    assert.equal(submitted.result.percentage, 50);
    assert.deepEqual(plain(exam.incorrectExamRefs(reloaded, catalog)), []);
    assert.equal(exam.submitExam(submitted, 50), submitted);
    assert.equal(exam.changeExamAnswer(submitted, 0, 'b', 60), submitted);
});

test('mistake refs appear only after submission, skip blanks and removed questions', () => {
    const exam = api();
    const catalog = [item('database', 'one', 'a'), item('database', 'one', 'b'), item('database', 'one', 'c')];
    let record = exam.createExam({ ...config, count: 'all' }, catalog, 0, () => .99, 'mistakes');
    const wrong = record.items[0];
    record = exam.changeExamAnswer(record, 0, 'b', 1);
    assert.deepEqual(plain(exam.incorrectExamRefs(record, catalog)), []);
    const submitted = exam.submitExam(record, 2);
    assert.deepEqual(plain(exam.incorrectExamRefs(submitted, catalog)), [plain({
        subjectId: wrong.subjectId, chapterId: wrong.chapterId, questionId: wrong.questionId,
    })]);
    assert.deepEqual(plain(exam.incorrectExamRefs(submitted, catalog.slice(1))), []);
});

test('deadline survives reload, auto submission and answer guard use injected clock', () => {
    const exam = api(), storage = store();
    const record = exam.createExam({ ...config, count: 10, minutes: 15 }, [item('database', 'one', 'q')], 1000, () => 0, 'time');
    exam.saveExam(record, storage);
    const restored = exam.parseExam(storage.values.get(exam.EXAM_KEY));
    assert.equal(restored.deadlineAt, 901000);
    const expired = exam.changeExamAnswer(restored, 0, 'a', 901000);
    assert.equal(expired.status, 'submitted');
    assert.equal(expired.reason, 'timeout');
    assert.equal(expired.result.unanswered, 1);
    assert.equal(expired.result.elapsedMs, 900000);
    assert.deepEqual(plain(expired.answers), {});
    assert.equal(exam.submitExam(expired, 999999), expired);
});

test('old callback cannot overwrite replacement; canceled replacement keeps the previous record', () => {
    const exam = api(), storage = store();
    const first = exam.createExam(config, [item('database', 'one', 'q')], 0, () => 0, 'first');
    exam.saveExam(first, storage);
    // A declined UI confirmation does not call saveExam.
    assert.equal(exam.readExam(storage).record.attemptId, 'first');
    const next = exam.createExam(config, [item('database', 'one', 'q')], 1, () => 0, 'next');
    exam.saveExam(next, storage);
    assert.equal(exam.updateExam('first', value => exam.changeExamAnswer(value, 0, 'b', 2), storage), null);
    assert.equal(exam.readExam(storage).record.attemptId, 'next');
});

test('blocked storage keeps attempt in memory and corrupt data reports an error', () => {
    const exam = api(), storage = store();
    storage.values.set(exam.EXAM_KEY, '{broken');
    assert.match(exam.readExam(storage).error, /không hợp lệ/);
    const record = exam.createExam(config, [item('database', 'one', 'q')], 0, () => 0, 'memory');
    storage.block(true);
    assert.equal(exam.saveExam(record, storage), false);
    assert.equal(exam.updateExam('memory', value => exam.changeExamAnswer(value, 0, 'b', 1), storage).saved, false);
    assert.equal(exam.readExam(storage).record.answers[key(record.items[0])], 'b');
    assert.equal(exam.parseExam('{"version":1,"items":[]}'), null);
    const bad = plain(record);
    bad.items[0].question.correctOptionId = 'missing';
    assert.equal(exam.parseExam(JSON.stringify(bad)), null);
});
