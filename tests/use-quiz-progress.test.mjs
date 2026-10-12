import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

const compile = file => ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const progress = {};
vm.runInNewContext(compile('lib/quiz-progress.ts'), { exports: progress });
const reviewKey = 'ju-study-hub:review-progress:v1';
const questions = [
    { id: 'q1', correctOptionId: 'a', options: [{ id: 'a' }, { id: 'b' }] },
    { id: 'q2', correctOptionId: 'b', options: [{ id: 'a' }, { id: 'b' }] },
];
const saved = (currentQuestionId, answers) => JSON.stringify({ version: 1, currentQuestionId, answers });
const plain = value => JSON.parse(JSON.stringify(value));

function mount(initial = {}, seed = {}) {
    const data = new Map(Object.entries(seed));
    const writes = [];
    let blocked = false;
    let full = false;
    const storage = {
        getItem(key) { if (blocked) throw Error('blocked'); return data.get(key) ?? null; },
        setItem(key, value) { if (blocked) throw Error('blocked'); if (full) throw Error('quota'); writes.push(['set', key]); data.set(key, value); },
        removeItem(key) { if (blocked) throw Error('blocked'); writes.push(['remove', key]); data.delete(key); },
    };
    const slots = [];
    const effects = [];
    const microtasks = [];
    let cursor = 0;
    let dirty = false;
    let props = { subjectId: 'blockchain', chapterId: 'chapter-1', questions,
        isReview: false, pageSize: 25, requestedQuestionId: null, ...initial };
    let result;
    const react = {
        useState(initialValue) {
            const index = cursor++;
            if (!slots[index]) slots[index] = { value: initialValue };
            return [slots[index].value, value => {
                const next = typeof value === 'function' ? value(slots[index].value) : value;
                if (!Object.is(next, slots[index].value)) { slots[index].value = next; dirty = true; }
            }];
        },
        useRef(initialValue) {
            const index = cursor++;
            if (!slots[index]) slots[index] = { current: initialValue };
            return slots[index];
        },
        useEffectEvent(callback) {
            const index = cursor++;
            if (!slots[index]) {
                const slot = { callback };
                slot.call = (...args) => slot.callback(...args);
                slots[index] = slot;
            }
            slots[index].callback = callback;
            return slots[index].call;
        },
        useEffect(callback, dependencies) {
            const index = cursor++;
            const previous = slots[index];
            if (previous && previous.dependencies
                && previous.dependencies.every((value, i) => Object.is(value, dependencies[i]))) return;
            const slot = previous ?? {};
            slot.cleanup?.();
            slot.dependencies = dependencies;
            slots[index] = slot;
            effects.push(() => { slot.cleanup = callback(); });
        },
    };
    const exports = {};
    vm.runInNewContext(compile('hooks/useQuizProgress.ts'), {
        exports, require(id) {
            if (id === 'react') return react;
            if (id === '@/lib/quiz-progress') return progress;
            if (id === '@/lib/mistakes') return { REVIEW_PROGRESS_KEY: reviewKey };
            if (id === '@/lib/storage') return { localStudyStorage: storage };
            throw Error(`Unexpected import: ${id}`);
        },
        window: { localStorage: storage },
        queueMicrotask(callback) { microtasks.push(callback); },
    });

    function render(next = props) {
        props = next;
        cursor = 0;
        result = exports.default(props);
        // React runs all effects before the queued restoration microtask.
        while (effects.length) effects.shift()();
        return result;
    }

    function settle() {
        for (let pass = 0; pass < 20; pass++) {
            while (microtasks.length) microtasks.shift()();
            if (!dirty) return result;
            dirty = false;
            render();
        }
        throw Error('Hook did not settle');
    }

    render();
    return {
        get current() { return result; }, data, writes, settle,
        update(next) { render({ ...props, ...next }); return settle(); },
        act(action) { const value = action(result); settle(); return value; },
        block(value = true) { blocked = value; },
        quota(value = true) { full = value; },
        replayEffects() {
            for (const slot of slots) {
                if (slot?.dependencies) { slot.cleanup?.(); slot.dependencies = undefined; }
            }
            render();
            return settle();
        },
    };
}

test('restores version-1 draft and submitted answers after mount without an initial overwrite', () => {
    const key = progress.quizProgressKey('blockchain', 'chapter-1');
    const raw = saved('q2', { q1: { optionId: 'a', isSubmitted: true }, q2: { optionId: 'a', isSubmitted: false } });
    const hook = mount({}, { [key]: raw });
    assert.equal(hook.current.ready, false);
    assert.deepEqual(hook.writes, []);
    hook.replayEffects();
    assert.equal(hook.current.ready, true);
    assert.equal(hook.current.currentIndex, 1);
    assert.deepEqual(plain(hook.current.currentAnswer), { optionId: 'a', isSubmitted: false });
    assert.deepEqual(plain(hook.current.statuses), ['correct', 'draft']);
    assert.equal(hook.current.submittedCount, 1);
    assert.equal(hook.data.get(key), raw);
});

test('invalid storage is safe; selection, single submission and chapter reset keep version-1 shape', () => {
    const key = progress.quizProgressKey('blockchain', 'chapter-1');
    const otherKey = progress.quizProgressKey('database', 'session-1');
    const hook = mount({}, { [key]: '{', [otherKey]: 'untouched' });
    hook.settle();
    assert.equal(hook.current.currentIndex, 0);
    hook.act(current => current.selectAnswer('missing'));
    assert.equal(hook.current.currentAnswer, undefined);
    hook.act(current => current.selectAnswer('b'));
    assert.deepEqual(plain(hook.current.currentAnswer), { optionId: 'b', isSubmitted: false });
    assert.equal(hook.act(current => current.submitAnswer()), 'b');
    assert.equal(hook.act(current => current.submitAnswer()), null);
    hook.act(current => current.selectAnswer('a'));
    assert.deepEqual(plain(hook.current.currentAnswer), { optionId: 'b', isSubmitted: true });
    assert.deepEqual(JSON.parse(hook.data.get(key)), {
        version: 1, currentQuestionId: 'q1', answers: { q1: { optionId: 'b', isSubmitted: true } },
    });
    hook.act(current => current.resetProgress());
    assert.equal(hook.current.currentAnswer, undefined);
    assert.equal(hook.data.has(key), false);
    assert.equal(hook.data.get(otherKey), 'untouched');
});

test('review uses only its own key, restores memory fallback and remounts a new round cleanly', () => {
    const normalKey = progress.quizProgressKey('blockchain', 'chapter-1');
    const changes = [];
    const old = saved('q2', { q1: { optionId: 'a', isSubmitted: true } });
    const seed = { [normalKey]: 'normal untouched' };
    const hook = mount({ isReview: true, initialReviewProgress: old,
        onReviewProgressChange: raw => changes.push(raw) }, seed);
    hook.settle();
    assert.equal(hook.current.currentIndex, 1);
    assert.equal(hook.current.submittedCount, 1);
    assert.equal(hook.data.get(normalKey), 'normal untouched');
    assert.equal(hook.data.get(reviewKey), old);
    assert.ok(changes.length > 0);

    // ReviewMistakes changes its React key for a new round, creating a new hook instance.
    const next = mount({ isReview: true, initialReviewProgress: null }, { [normalKey]: 'normal untouched' });
    next.settle();
    assert.equal(next.current.currentIndex, 0);
    assert.equal(next.current.submittedCount, 0);
});

test('blocked storage remains usable in memory and deep links yield to manual navigation', () => {
    const linked = [];
    const hook = mount({ requestedQuestionId: 'q2', onDeepLinkNavigate: () => linked.push('changed') });
    hook.block();
    hook.settle();
    assert.equal(hook.current.ready, true);
    assert.equal(hook.current.currentIndex, 1);
    hook.act(current => current.selectAnswer('b'));
    assert.equal(hook.act(current => current.submitAnswer()), 'b');
    assert.equal(hook.current.correctCount, 1);
    hook.act(current => current.navigate(0));
    assert.equal(hook.current.currentIndex, 0);
    assert.equal(linked.length, 0);
    hook.update({ requestedQuestionId: 'q1' });
    assert.equal(hook.current.currentIndex, 0);
    hook.update({ requestedQuestionId: 'q2' });
    assert.equal(hook.current.currentIndex, 1);
    assert.equal(linked.length, 1);
    hook.act(current => current.resetProgress());
    assert.equal(hook.current.currentIndex, 0);
    assert.equal(hook.current.submittedCount, 0);
});

test('quota failure retains in-memory answers without corrupting the last saved progress', () => {
    const key = progress.quizProgressKey('database', 'session-1');
    const raw = saved('q1', { q1: { optionId: 'a', isSubmitted: false } });
    const hook = mount({ subjectId: 'database', chapterId: 'session-1' }, { [key]: raw });
    hook.settle();
    hook.quota();
    hook.act(current => current.selectAnswer('b'));
    assert.deepEqual(plain(hook.current.currentAnswer), { optionId: 'b', isSubmitted: false });
    assert.equal(hook.data.get(key), raw);
});
