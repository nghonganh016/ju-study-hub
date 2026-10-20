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

function setup(data = new Map()) {
    const writes = [];
    const window = {
        localStorage: {
            getItem(key) { return data.get(key) ?? null; },
            setItem(key, value) { writes.push(['set', key]); data.set(key, value); },
            removeItem(key) { writes.push(['remove', key]); data.delete(key); },
        },
        dispatchEvent() {},
        confirm() { return true; },
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
    const slots = [];
    const effects = [];
    const microtasks = [];
    let cursor = 0;
    const react = {
        useState(initial) {
            const index = cursor++;
            if (!(index in slots)) slots[index] = initial;
            return [slots[index], value => { slots[index] = typeof value === 'function' ? value(slots[index]) : value; }];
        },
        useEffect(callback) {
            const index = cursor++;
            if (!(index in slots)) { slots[index] = true; effects.push(callback); }
        },
        useMemo(callback) { cursor++; return callback(); },
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
            if (id === '@/lib/storage') return storage;
            throw Error(`Unexpected import: ${id}`);
        },
    });
    function render() { cursor = 0; return component.default({ catalog, sections }); }
    function mount() {
        render();
        while (effects.length) effects.shift()();
        while (microtasks.length) microtasks.shift()();
        return render();
    }
    return { data, writes, mistakes, mount, render };
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
    assert.deepEqual(JSON.parse(app.data.get(app.mistakes.ROUND_KEY)).items, [live]);

    app.mistakes.recordAttempt(live, true, true);
    assert.deepEqual(plain(app.mistakes.readMistakes()), [orphan]);
    const reloaded = setup(app.data);
    reloaded.mount();
    assert.deepEqual(plain(reloaded.mistakes.readMistakes()), [orphan]);
});
