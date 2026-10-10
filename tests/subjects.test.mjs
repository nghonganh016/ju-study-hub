import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { test } from 'node:test';
import { createRequire } from 'node:module';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const require = createRequire(import.meta.url);
const cache = new Map();
const notFoundError = new Error('404');
const Runner = () => null;

// Run real data and page functions; replace only framework/UI boundaries.
function load(file) {
    file = path.resolve(file);
    if (cache.has(file)) return cache.get(file);
    const exports = {};
    cache.set(file, exports);
    const localRequire = id => {
        if (id === 'next/navigation') return { notFound() { throw notFoundError; } };
        if (id === 'next/link') return { default: props => React.createElement('a', props) };
        if (id.endsWith('.css')) return { default: {} };
        if (id === '@/components/QuizRunner') return { default: Runner };
        if (id === '@/components/journal/JournalAsset') return { default: () => null };
        if (id.startsWith('@/') || id.startsWith('.')) {
            const base = id.startsWith('@/') ? path.resolve(id.slice(2)) : path.resolve(path.dirname(file), id);
            const target = [base + '.ts', base + '.tsx', path.join(base, 'index.ts')].find(fs.existsSync);
            assert.ok(target, `Cannot resolve ${id}`);
            return load(target);
        }
        return require(id);
    };
    const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
    }).outputText;
    vm.runInNewContext(code, { exports, require: localRequire }, { filename: file });
    return exports;
}

const { subjects, isValidSubject } = load('data/subjects.ts');
const subjectPage = load('app/subjects/[subjectId]/page.tsx').default;
const chapterPage = load('app/subjects/[subjectId]/[chapterId]/page.tsx').default;
const quizPage = load('app/quiz/[subjectId]/[chapterId]/page.tsx').default;
const page = (component, subjectId, chapterId) => component({ params: Promise.resolve({ subjectId, chapterId }) });
function findRunner(element) {
    if (!React.isValidElement(element)) return undefined;
    if (element.type === Runner) return element;
    return React.Children.toArray(element.props.children).map(findRunner).find(Boolean);
}

test('registry validates only own keys and reuses original chapter collections', () => {
    for (const subjectId of ['blockchain', 'database']) {
        assert.equal(isValidSubject(subjectId), true);
        assert.equal(subjects[subjectId].chapters, load(`data/${subjectId}/index.ts`).chapters);
        assert.ok(subjects[subjectId].description);
    }
    for (const id of ['', 'missing', 'constructor', 'toString', '__proto__', 'Blockchain']) {
        assert.equal(isValidSubject(id), false);
    }
    assert.equal(subjects.database.chapters[0].id, 'chapter-2');
});

test('homepage links to every subject and chapter cards open quizzes directly', async () => {
    const home = renderToStaticMarkup(load('app/page.tsx').default());
    for (const [subjectId, subject] of Object.entries(subjects)) {
        assert.ok(home.includes(`href="/subjects/${subjectId}"`));
        const html = renderToStaticMarkup(await page(subjectPage, subjectId));
        assert.ok(html.includes(subject.title));
        for (const chapter of subject.chapters) {
            assert.ok(html.includes(`href="/quiz/${subjectId}/${chapter.id}"`));
            assert.ok(!html.includes(`href="/subjects/${subjectId}/${chapter.id}"`));
            assert.ok(html.includes(`${chapter.questions.length} câu hỏi`));
        }
    }
});

test('every chapter routes to its own quiz and passes unchanged questions and IDs', async () => {
    for (const [subjectId, subject] of Object.entries(subjects)) {
        for (const chapter of subject.chapters) {
            const html = renderToStaticMarkup(await page(chapterPage, subjectId, chapter.id));
            assert.ok(html.includes(`href="/quiz/${subjectId}/${chapter.id}"`));
            assert.ok(html.includes(`href="/subjects/${subjectId}"`));
            const tree = await page(quizPage, subjectId, chapter.id);
            const runner = findRunner(tree);
            assert.ok(runner);
            assert.equal(runner.props.subjectId, subjectId);
            assert.equal(runner.props.chapterId, chapter.id);
            assert.equal(runner.props.questions, chapter.questions);
            assert.ok(runner.key.endsWith(`${subjectId}=2${chapter.id}`));
        }
    }
});

test('invalid subjects and chapters call notFound, including chapters from another subject', async () => {
    for (const id of ['missing', 'constructor', '__proto__']) {
        for (const component of [subjectPage, chapterPage, quizPage]) {
            await assert.rejects(page(component, id, 'chapter-1'), error => error === notFoundError);
        }
    }
    for (const [subjectId, chapterId] of [['database', 'chapter-1'], ['blockchain', 'chapter-2'], ['database', 'missing']]) {
        for (const component of [chapterPage, quizPage]) {
            await assert.rejects(page(component, subjectId, chapterId), error => error === notFoundError);
        }
    }
});

test('empty chapters show a safe message and the selected subject back link', async () => {
    const chapter = { id: 'empty-test', title: 'Empty', description: '', revision: 1, questions: [] };
    subjects.database.chapters.push(chapter);
    try {
        const tree = await page(quizPage, 'database', chapter.id);
        assert.equal(findRunner(tree), undefined);
        const html = renderToStaticMarkup(tree);
        assert.ok(html.includes('Chapter này chưa có câu hỏi.'));
        assert.ok(html.includes('href="/subjects/database"'));
    } finally {
        subjects.database.chapters.pop();
    }
});
