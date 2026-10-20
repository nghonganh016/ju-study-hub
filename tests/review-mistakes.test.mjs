import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

const compile = (file, jsx = false) => ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022,
        ...(jsx ? { jsx: ts.JsxEmit.ReactJSX } : {}) },
}).outputText;
const plain = value => JSON.parse(JSON.stringify(value));
const live = { subjectId: 'database', chapterId: 'one', questionId: 'q1' };
const orphan = { subjectId: 'database', chapterId: 'removed', questionId: 'q-old' };
const catalog = [{ ...live, subjectTitle: 'Database', chapterTitle: 'Session 1',
    question: { id: live.questionId, prompt: 'Question 1', options: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }],
        correctOptionId: 'a', explanation: 'Explanation' } }];
const sections = [{ id: 'database', title: 'Database', chapters: [{ id: 'one', title: 'Session 1' }] }];
const liveId = JSON.stringify([live.subjectId, live.chapterId, live.questionId]);
const legacyRound = () => JSON.stringify({ version: 1, scope: { subjectId: null, chapterId: null }, items: [live] });
const legacyProgress = (answers = {}, currentQuestionId = null) =>
    JSON.stringify({ version: 1, currentQuestionId, answers });

function setup(data = new Map()) {
    const writes = [];
    const faults = { read: new Set(), set: new Set(), remove: new Set() };
    let confirmation = true;
    let confirms = 0;
    const window = {
        localStorage: {
            getItem(key) { if (faults.read.has(key)) throw Error('blocked read'); return data.get(key) ?? null; },
            setItem(key, value) { if (faults.set.has(key)) throw Error('blocked write'); writes.push(['set', key]); data.set(key, value); },
            removeItem(key) { if (faults.remove.has(key)) throw Error('blocked remove'); writes.push(['remove', key]); data.delete(key); },
        },
        dispatchEvent() {},
        confirm() { confirms++; return confirmation; },
    };
    function load(file, dependencies) {
        const exports = {};
        vm.runInNewContext(compile(file), { exports, window, Event: class {},
            require: name => dependencies[name] });
        return exports;
    }
    const storage = load('lib/storage.ts', {});
    const mistakes = load('lib/mistakes.ts', { './storage': storage });
    const rounds = load('lib/review-round.ts', { './mistakes': mistakes });
    const progress = load('lib/quiz-progress.ts', {});
    const reviewState = load('lib/review-state.ts', { './mistakes': mistakes, './review-round': rounds });
    const slots = [];
    const effects = [];
    const microtasks = [];
    let cursor = 0;
    let dirty = false;
    const same = (a, b) => a?.length === b?.length && a.every((value, i) => Object.is(value, b[i]));
    const react = {
        useState(initial) {
            const index = cursor++;
            if (!(index in slots)) slots[index] = { value: initial };
            return [slots[index].value, value => {
                const next = typeof value === 'function' ? value(slots[index].value) : value;
                if (!Object.is(next, slots[index].value)) { slots[index].value = next; dirty = true; }
            }];
        },
        useRef(initial) {
            const index = cursor++;
            if (!(index in slots)) slots[index] = { current: initial };
            return slots[index];
        },
        useEffect(callback, dependencies) {
            const index = cursor++;
            if (slots[index] && same(slots[index].dependencies, dependencies)) return;
            slots[index]?.cleanup?.();
            const slot = { dependencies };
            slots[index] = slot;
            effects.push(() => { slot.cleanup = callback(); });
        },
        useMemo(callback, dependencies) {
            const index = cursor++;
            if (slots[index] && same(slots[index].dependencies, dependencies)) return slots[index].value;
            const value = callback();
            slots[index] = { dependencies, value };
            return value;
        },
    };
    const jsx = (type, props) => ({ type, props });
    const component = {};
    vm.runInNewContext(compile('components/ReviewMistakes.tsx', true), {
        exports: component, window, queueMicrotask: callback => microtasks.push(callback),
        require(id) {
            if (id === 'react') return react;
            if (id === 'react/jsx-runtime') return { jsx, jsxs: jsx };
            if (id === 'next/link') return { default: 'Link' };
            if (id === '@/components/QuizRunner') return { default: 'QuizRunner' };
            if (id.endsWith('.css')) return { default: {} };
            if (id === '@/lib/quiz-progress') return progress;
            if (id === '@/lib/mistakes') return mistakes;
            if (id === '@/lib/review-round') return rounds;
            if (id === '@/lib/review-state') return reviewState;
            if (id === '@/lib/storage') return storage;
            throw Error(`Unexpected import: ${id}`);
        },
    });
    function render() {
        for (let pass = 0; pass < 20; pass++) {
            dirty = false;
            cursor = 0;
            const node = component.default({ catalog, sections });
            while (effects.length) effects.shift()();
            while (microtasks.length) microtasks.shift()();
            if (!dirty && effects.length === 0 && microtasks.length === 0) return node;
        }
        throw Error('Component did not settle');
    }
    return { data, writes, faults, mistakes, reviewState, mount: render, render,
        setConfirmation(value) { confirmation = value; }, get confirms() { return confirms; } };
}

function find(node, predicate) {
    if (!node || typeof node !== 'object') return null;
    if (predicate(node)) return node;
    const children = node.props?.children;
    return (Array.isArray(children) ? children : [children]).map(child => find(child, predicate)).find(Boolean) ?? null;
}
function text(node) {
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(text).join('');
    return node?.props ? text(node.props.children) : '';
}
function button(node, label) {
    const found = find(node, item => item.type === 'button' && text(item) === label);
    assert.ok(found, `Missing button: ${label}`);
    return found;
}

test('opening Review filters orphan only for display and preserves the raw store across reload', () => {
    const first = setup();
    const raw = JSON.stringify({ version: 1, items: [orphan, live] });
    first.data.set(first.mistakes.MISTAKES_KEY, raw);
    const selection = first.mount();
    assert.match(text(selection), /1 câu sai trong phạm vi đã chọn/);
    assert.equal(first.data.get(first.mistakes.MISTAKES_KEY), raw);
    assert.equal(first.writes.filter(([, key]) => key === first.mistakes.MISTAKES_KEY).length, 0);

    const reloaded = setup(first.data);
    const again = reloaded.mount();
    assert.match(text(again), /1 câu sai trong phạm vi đã chọn/);
    assert.deepEqual(plain(reloaded.mistakes.readMistakes()), [orphan, live]);
    assert.equal(reloaded.data.get(reloaded.mistakes.MISTAKES_KEY), raw);
});

test('a valid Review round still opens and a correct answer removes only its reference', () => {
    const app = setup();
    app.data.set(app.mistakes.MISTAKES_KEY, JSON.stringify({ version: 1, items: [orphan, live] }));
    const selection = app.mount();
    const begin = find(selection, node => node.type === 'button' && text(node) === 'Bắt đầu ôn');
    assert.ok(begin);
    begin.props.onClick();
    const round = app.render();
    assert.equal(round.type, 'QuizRunner');
    assert.deepEqual(plain(round.props.reviewItems.map(({ subjectId, chapterId, questionId }) =>
        ({ subjectId, chapterId, questionId }))), [live]);
    assert.deepEqual(JSON.parse(app.data.get(app.reviewState.REVIEW_STATE_KEY)).items, [live]);
    assert.equal(app.data.has(app.mistakes.ROUND_KEY), false);
    assert.equal(app.data.has(app.mistakes.REVIEW_PROGRESS_KEY), false);

    app.mistakes.recordAttempt(live, true, true);
    assert.deepEqual(plain(app.mistakes.readMistakes()), [orphan]);
    const reloaded = setup(app.data);
    reloaded.mount();
    assert.deepEqual(plain(reloaded.mistakes.readMistakes()), [orphan]);
});

test('empty valid legacy round migrates with one v2 write and leaves both v1 keys unchanged', () => {
    const app = setup();
    const roundRaw = legacyRound();
    const progressRaw = legacyProgress({}, liveId);
    app.data.set(app.mistakes.ROUND_KEY, roundRaw);
    app.data.set(app.mistakes.REVIEW_PROGRESS_KEY, progressRaw);
    app.data.set(app.mistakes.MISTAKES_KEY, JSON.stringify({ version: 1, items: [live] }));
    const round = app.mount();
    assert.equal(round.type, 'QuizRunner');
    const v2 = JSON.parse(app.data.get(app.reviewState.REVIEW_STATE_KEY));
    assert.equal(v2.version, 2);
    assert.ok(v2.roundId);
    assert.deepEqual(v2.items, [live]);
    assert.deepEqual(v2.progress, JSON.parse(progressRaw));
    assert.equal(app.data.get(app.mistakes.ROUND_KEY), roundRaw);
    assert.equal(app.data.get(app.mistakes.REVIEW_PROGRESS_KEY), progressRaw);
    assert.deepEqual(app.writes, [['set', app.reviewState.REVIEW_STATE_KEY]]);
});

test('legacy answers require an explicit continue or fresh choice; reload prefers v2', () => {
    const app = setup();
    const roundRaw = legacyRound();
    const progressRaw = legacyProgress({ [liveId]: { optionId: 'b', isSubmitted: false } }, liveId);
    app.data.set(app.mistakes.ROUND_KEY, roundRaw);
    app.data.set(app.mistakes.REVIEW_PROGRESS_KEY, progressRaw);
    const choice = app.mount();
    assert.match(text(choice), /không có round ID/);
    assert.equal(app.data.has(app.reviewState.REVIEW_STATE_KEY), false);
    button(choice, 'Tiếp tục lượt cũ').props.onClick();
    const resumed = app.render();
    assert.equal(resumed.type, 'QuizRunner');
    assert.deepEqual(JSON.parse(resumed.props.initialReviewProgress), JSON.parse(progressRaw));
    assert.equal(app.data.get(app.mistakes.ROUND_KEY), roundRaw);
    assert.equal(app.data.get(app.mistakes.REVIEW_PROGRESS_KEY), progressRaw);
    const reloaded = setup(app.data);
    const again = reloaded.mount();
    assert.equal(again.type, 'QuizRunner');
    assert.deepEqual(JSON.parse(again.props.initialReviewProgress), JSON.parse(progressRaw));
    assert.deepEqual(reloaded.writes, []);

    const fresh = setup(new Map([[app.mistakes.ROUND_KEY, roundRaw],
        [app.mistakes.REVIEW_PROGRESS_KEY, progressRaw],
        [app.mistakes.MISTAKES_KEY, JSON.stringify({ version: 1, items: [live] })]]));
    button(fresh.mount(), 'Bắt đầu lượt mới').props.onClick();
    const newRound = fresh.render();
    assert.equal(newRound.type, 'QuizRunner');
    assert.deepEqual(JSON.parse(newRound.props.initialReviewProgress).answers, {});
    assert.equal(JSON.parse(fresh.data.get(fresh.reviewState.REVIEW_STATE_KEY)).progress.currentQuestionId, null);
    assert.equal(fresh.data.get(fresh.mistakes.REVIEW_PROGRESS_KEY), progressRaw);
});

test('malformed or mismatched legacy data is reported and preserved until a fresh choice', () => {
    const app = setup();
    const roundRaw = legacyRound();
    const badProgress = legacyProgress({ other: { optionId: 'a', isSubmitted: true } }, liveId);
    app.data.set(app.mistakes.ROUND_KEY, roundRaw);
    app.data.set(app.mistakes.REVIEW_PROGRESS_KEY, badProgress);
    const issue = app.mount();
    assert.match(text(issue), /không thuộc lượt ôn/);
    assert.equal(app.data.has(app.reviewState.REVIEW_STATE_KEY), false);
    button(issue, 'Bắt đầu lượt mới từ kho câu sai').props.onClick();
    app.render();
    assert.equal(app.data.get(app.mistakes.ROUND_KEY), roundRaw);
    assert.equal(app.data.get(app.mistakes.REVIEW_PROGRESS_KEY), badProgress);
    assert.ok(app.data.has(app.reviewState.REVIEW_STATE_KEY));

    const missing = setup(new Map([[app.mistakes.REVIEW_PROGRESS_KEY, badProgress]]));
    assert.match(text(missing.mount()), /không có lượt Review v1/);
    assert.equal(missing.data.has(missing.reviewState.REVIEW_STATE_KEY), false);
});

test('invalid or unreadable v2 blocks restore and never falls back to valid v1', () => {
    const app = setup();
    const key = app.reviewState.REVIEW_STATE_KEY;
    app.data.set(key, '{');
    app.data.set(app.mistakes.ROUND_KEY, legacyRound());
    const blocked = app.mount();
    assert.match(text(blocked), /Review v2 không hợp lệ/);
    assert.match(text(blocked), /Không tự chuyển về v1/);
    assert.equal(app.writes.length, 0);
    assert.equal(app.data.get(key), '{');

    const unreadable = setup(app.data);
    unreadable.faults.read.add(key);
    assert.match(text(unreadable.mount()), /Không đọc được Review v2/);
    assert.equal(unreadable.writes.length, 0);

    const mismatched = setup(new Map([[key, JSON.stringify({ version: 2, roundId: 'r1',
        scope: { subjectId: null, chapterId: null }, items: [live],
        progress: { version: 1, currentQuestionId: liveId,
            answers: { other: { optionId: 'a', isSubmitted: true } } } })],
    [app.mistakes.ROUND_KEY, legacyRound()]]));
    assert.match(text(mismatched.mount()), /Review v2 không hợp lệ/);
    assert.equal(mismatched.writes.length, 0);
});

test('failed migration and failed round creation keep the previous view and raw data', () => {
    const app = setup();
    const key = app.reviewState.REVIEW_STATE_KEY;
    const raw = legacyRound();
    app.data.set(app.mistakes.ROUND_KEY, raw);
    app.faults.set.add(key);
    assert.match(text(app.mount()), /Chưa chuyển được lượt Review v1/);
    assert.equal(app.data.get(app.mistakes.ROUND_KEY), raw);
    assert.equal(app.data.has(key), false);
    app.faults.set.delete(key);
    button(app.render(), 'Thử đọc lại').props.onClick();
    assert.equal(app.render().type, 'QuizRunner');

    const fresh = setup();
    fresh.data.set(fresh.mistakes.MISTAKES_KEY, JSON.stringify({ version: 1, items: [live] }));
    fresh.faults.set.add(key);
    fresh.faults.remove.add(fresh.mistakes.REVIEW_PROGRESS_KEY);
    button(fresh.mount(), 'Bắt đầu ôn').props.onClick();
    assert.match(text(fresh.render()), /chưa được lưu/);
    assert.equal(fresh.data.has(key), false);
    assert.equal(fresh.writes.some(([action]) => action === 'remove'), false);
});

test('failed progress save stays in memory, warns, and reload returns the last durable answer', () => {
    const app = setup();
    const key = app.reviewState.REVIEW_STATE_KEY;
    app.data.set(app.mistakes.MISTAKES_KEY, JSON.stringify({ version: 1, items: [live] }));
    button(app.mount(), 'Bắt đầu ôn').props.onClick();
    const round = app.render();
    const durable = app.data.get(key);
    const changed = legacyProgress({ [liveId]: { optionId: 'b', isSubmitted: false } }, liveId);
    app.faults.set.add(key);
    round.props.onReviewProgressChange(changed);
    const inMemory = app.render();
    assert.deepEqual(JSON.parse(inMemory.props.initialReviewProgress), JSON.parse(changed));
    assert.match(inMemory.props.reviewSaveWarning, /chưa được lưu/);
    assert.equal(app.data.get(key), durable);
    const reloaded = setup(app.data);
    assert.deepEqual(JSON.parse(reloaded.mount().props.initialReviewProgress).answers, {});
    app.faults.set.delete(key);
    inMemory.props.onRetryReviewSave();
    assert.deepEqual(JSON.parse(app.data.get(key)).progress, JSON.parse(changed));
    assert.equal(app.render().props.reviewSaveWarning, null);
    assert.equal(app.data.has(app.mistakes.REVIEW_PROGRESS_KEY), false);
});

test('reset or replacement waits for a durable v2 write and ignores old callbacks', () => {
    const app = setup();
    const key = app.reviewState.REVIEW_STATE_KEY;
    app.data.set(app.mistakes.MISTAKES_KEY, JSON.stringify({ version: 1, items: [live] }));
    button(app.mount(), 'Bắt đầu ôn').props.onClick();
    const oldRound = app.render();
    const oldId = JSON.parse(app.data.get(key)).roundId;
    oldRound.props.onReviewProgressChange(legacyProgress({ [liveId]: { optionId: 'b', isSubmitted: false } }, liveId));
    app.render();
    const before = app.data.get(key);
    app.faults.set.add(key);
    oldRound.props.onNewReviewRound();
    const failedReset = app.render();
    assert.equal(failedReset.type, 'QuizRunner');
    assert.equal(failedReset.props.onRetryReviewSave, undefined);
    assert.match(failedReset.props.reviewSaveWarning, /chưa được lưu/);
    assert.equal(app.data.get(key), before);
    app.faults.set.delete(key);
    oldRound.props.onNewReviewRound();
    const next = app.render();
    const newId = JSON.parse(app.data.get(key)).roundId;
    assert.notEqual(newId, oldId);
    assert.deepEqual(JSON.parse(next.props.initialReviewProgress).answers, {});
    const after = app.data.get(key);
    oldRound.props.onReviewProgressChange(legacyProgress({ [liveId]: { optionId: 'a', isSubmitted: true } }, liveId));
    assert.equal(app.data.get(key), after);

    next.props.onChangeReviewScope(false);
    const selection = app.render();
    app.setConfirmation(false);
    button(selection, 'Bắt đầu ôn').props.onClick();
    assert.equal(app.confirms, 1);
    assert.equal(JSON.parse(app.data.get(key)).roundId, newId);
    app.setConfirmation(true);
    button(app.render(), 'Bắt đầu ôn').props.onClick();
    assert.notEqual(JSON.parse(app.data.get(key)).roundId, newId);
});

test('v2 keeps orphan snapshot refs and unresolvable answers when a live answer changes', () => {
    const app = setup();
    const key = app.reviewState.REVIEW_STATE_KEY;
    const orphanId = JSON.stringify([orphan.subjectId, orphan.chapterId, orphan.questionId]);
    const original = { version: 2, roundId: 'saved-round', scope: { subjectId: null, chapterId: null },
        items: [orphan, live], progress: { version: 1, currentQuestionId: liveId,
            answers: { [orphanId]: { optionId: 'a', isSubmitted: true },
                [liveId]: { optionId: 'removed', isSubmitted: true } } } };
    app.data.set(key, JSON.stringify(original));
    const round = app.mount();
    assert.equal(round.type, 'QuizRunner');
    assert.match(round.props.reviewSaveWarning, /không còn trong ngân hàng/);
    assert.match(round.props.reviewSaveWarning, /đáp án đã lưu không còn khớp/);
    assert.equal(app.writes.length, 0);
    round.props.onReviewProgressChange(legacyProgress({ [liveId]: { optionId: 'a', isSubmitted: false } }, liveId));
    const saved = JSON.parse(app.data.get(key));
    assert.deepEqual(saved.items, [orphan, live]);
    assert.deepEqual(saved.progress.answers[orphanId], original.progress.answers[orphanId]);
    assert.deepEqual(saved.progress.answers[liveId], { optionId: 'a', isSubmitted: false });
});

test('a tab with a stale round ID cannot overwrite a newer round', () => {
    const app = setup();
    const key = app.reviewState.REVIEW_STATE_KEY;
    app.data.set(app.mistakes.MISTAKES_KEY, JSON.stringify({ version: 1, items: [live] }));
    button(app.mount(), 'Bắt đầu ôn').props.onClick();
    const old = app.render();
    const newer = { ...JSON.parse(app.data.get(key)), roundId: 'other-tab-round' };
    app.data.set(key, JSON.stringify(newer));
    old.props.onReviewProgressChange(legacyProgress({ [liveId]: { optionId: 'a', isSubmitted: false } }, liveId));
    assert.equal(JSON.parse(app.data.get(key)).roundId, 'other-tab-round');
    assert.match(app.render().props.reviewSaveWarning, /chưa được lưu/);
});
