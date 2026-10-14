import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import { createRequire } from 'node:module';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const require = createRequire(import.meta.url);
const catalogExports = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/bookmark-catalog.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, { exports: catalogExports });

const bookmark = { subjectId: 'blockchain', chapterId: 'chapter-1', questionId: 'q1' };
const catalog = [{ ...bookmark, subjectTitle: 'Blockchain', chapterTitle: 'Wallet', prompt: 'What is a wallet?' }];
const sections = [
    { id: 'blockchain', title: 'Blockchain', chapters: [{ id: 'chapter-1', title: 'Wallet' }] },
    { id: 'database', title: 'Database', chapters: [{ id: 'chapter-2', title: 'SQL' }] },
];
let stateValues = [];
let nextState = 0;
let changedRefs;
let removedRef;
const fakeReact = {
    useRouter() { return { push() {} }; },
    useState(initial) {
        const index = nextState++;
        return [stateValues[index] ?? initial, value => {
            if (index === 0) changedRefs = value;
        }];
    },
    useEffect() {},
};
const componentExports = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('components/BookmarkedQuestions.tsx', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText, { exports: componentExports, require(id) {
    if (id === 'react') return fakeReact;
    if (id === 'next/link') return { default: props => React.createElement('a', props) };
    if (id === 'next/navigation') return { useRouter: fakeReact.useRouter };
    if (id.endsWith('.css')) return { default: {} };
    if (id === '@/lib/bookmark-catalog') return catalogExports;
    if (id === '@/lib/bookmark-practice') return {
        selectPracticeItems(refs, items, scope) { return refs.filter(ref =>
            items.some(item => JSON.stringify([item.subjectId, item.chapterId, item.questionId])
                === JSON.stringify([ref.subjectId, ref.chapterId, ref.questionId]))
            && (!scope.subjectId || ref.subjectId === scope.subjectId)
            && (!scope.chapterId || ref.chapterId === scope.chapterId)); },
    };
    if (id === '@/lib/mistakes') return { mistakeId: ref => JSON.stringify([ref.subjectId, ref.chapterId, ref.questionId]) };
    if (id === '@/lib/bookmarks') return {
        BOOKMARKS_KEY: 'ju-study-hub:bookmarks:v1',
        removeBookmark(ref) { removedRef = ref; return []; },
        bookmarkStorageStatus() { return 'available'; },
    };
    return require(id);
} });
const BookmarkedQuestions = componentExports.default;

function render(refs, status = 'available', subjectId = 'all', chapterId = 'all') {
    stateValues = [refs, status, subjectId, chapterId];
    nextState = 0;
    return renderToStaticMarkup(React.createElement(BookmarkedQuestions, { catalog, sections }));
}

test('empty collection, unavailable storage and empty filter have distinct messages', () => {
    assert.match(render([]), /Chưa có câu nào được lưu/);
    const blocked = render([], 'unavailable');
    assert.match(blocked, /Chưa đọc được câu đã lưu/);
    assert.match(blocked, /Không truy cập được bộ nhớ trình duyệt/);
    const filtered = render([bookmark], 'available', 'database');
    assert.match(filtered, /Không có câu trong bộ lọc này/);
    assert.match(filtered, /1 câu đã lưu/);
});

test('valid cards link to exact questions, stale cards cannot navigate, remove stays independent', () => {
    const stale = { ...bookmark, questionId: 'deleted' };
    const html = render([bookmark, stale]);
    assert.match(html, /What is a wallet\?/);
    assert.match(html, /Không còn trong bộ câu hỏi/);
    assert.match(html, /2 câu đã lưu/);
    assert.match(html, /href="\/quiz\/blockchain\/chapter-1\?questionId=q1"/);
    assert.match(html, /Mở câu hỏi/);
    assert.equal((html.match(/href="\/quiz\//g) ?? []).length, 1);

    stateValues = [[bookmark], 'available', 'all', 'all'];
    nextState = 0;
    changedRefs = undefined;
    removedRef = undefined;
    const tree = BookmarkedQuestions({ catalog, sections });
    const findElement = (node, predicate) => {
        if (!React.isValidElement(node)) return undefined;
        if (predicate(node)) return node;
        return React.Children.toArray(node.props.children).map(child => findElement(child, predicate)).find(Boolean);
    };
    const remove = findElement(tree, node => node.type === 'button' && node.props['aria-label'] === 'Bỏ lưu câu hỏi q1');
    const link = findElement(tree, node => node.props?.href === '/quiz/blockchain/chapter-1?questionId=q1');
    assert.ok(link);
    assert.equal(link.props['aria-label'], 'Mở câu hỏi q1');
    assert.equal(typeof remove.props.onClick, 'function');
    remove.props.onClick();
    assert.deepEqual(JSON.parse(JSON.stringify(removedRef)), bookmark);
    assert.deepEqual(changedRefs, []);
});
