import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

const exports = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/bookmark-catalog.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, { exports });
const api = exports;
const plain = value => JSON.parse(JSON.stringify(value));

const sections = [
    { id: 'blockchain', title: 'Blockchain', chapters: [
        { id: 'chapter-1', title: 'Wallet' }, { id: 'session-5', title: 'Session 5' }] },
    { id: 'database', title: 'Database', chapters: [{ id: 'chapter-2', title: 'SQL' }] },
];
const catalog = [
    { subjectId: 'blockchain', chapterId: 'chapter-1', questionId: 'q1', subjectTitle: 'Blockchain', chapterTitle: 'Wallet', prompt: 'What is a wallet?' },
    { subjectId: 'blockchain', chapterId: 'session-5', questionId: 'q2', subjectTitle: 'Blockchain', chapterTitle: 'Session 5', prompt: '  What   is   a node?  ' },
    { subjectId: 'database', chapterId: 'chapter-2', questionId: 'q1', subjectTitle: 'Database', chapterTitle: 'SQL', prompt: 'What is a table?' },
];
const refs = catalog.map(({ subjectId, chapterId, questionId }) => ({ subjectId, chapterId, questionId }));

test('resolves bookmarks across subjects by ID and prepares exact question URLs', () => {
    const entries = api.resolveBookmarkEntries(refs, catalog, sections);
    assert.deepEqual(plain(entries.map(item => [item.subjectTitle, item.chapterTitle, item.summary])), [
        ['Blockchain', 'Wallet', 'What is a wallet?'],
        ['Blockchain', 'Session 5', 'What is a node?'],
        ['Database', 'SQL', 'What is a table?'],
    ]);
    assert.deepEqual(plain(entries.map(item => item.href)), [
        '/quiz/blockchain/chapter-1?questionId=q1',
        '/quiz/blockchain/session-5?questionId=q2',
        '/quiz/database/chapter-2?questionId=q1',
    ]);
    assert.equal(api.bookmarkedQuestionHref({ subjectId: 'a b', chapterId: 'c/d', questionId: 'q&1' }),
        '/quiz/a%20b/c%2Fd?questionId=q%261');
});

test('subject and chapter filters update the visible list without changing refs', () => {
    const entries = api.resolveBookmarkEntries(refs, catalog, sections);
    assert.equal(api.filterBookmarkEntries(entries, 'all', 'all').length, 3);
    assert.deepEqual(plain(api.filterBookmarkEntries(entries, 'blockchain', 'all').map(item => item.questionId)), ['q1', 'q2']);
    assert.deepEqual(plain(api.filterBookmarkEntries(entries, 'blockchain', 'session-5').map(item => item.questionId)), ['q2']);
    assert.deepEqual(plain(api.filterBookmarkEntries(entries, 'database', 'chapter-2').map(item => item.questionId)), ['q1']);
    assert.deepEqual(plain(api.filterBookmarkEntries(entries, 'database', 'session-5')), []);
    assert.equal(refs.length, 3);
});

test('removed question IDs remain visible as non-navigable entries', () => {
    const stale = { subjectId: 'blockchain', chapterId: 'session-5', questionId: 'deleted' };
    const missingSubject = { subjectId: 'old-subject', chapterId: 'old-chapter', questionId: 'q3' };
    const entries = api.resolveBookmarkEntries([...refs, stale, missingSubject], catalog, sections);
    assert.equal(entries.length, 5);
    assert.deepEqual(plain(entries.slice(-2).map(item => [item.subjectTitle, item.chapterTitle, item.missing, item.href])), [
        ['Blockchain', 'Session 5', true, null],
        ['old-subject', 'old-chapter', true, null],
    ]);
    assert.equal(api.filterBookmarkEntries(entries, 'blockchain', 'session-5').length, 2);
});
