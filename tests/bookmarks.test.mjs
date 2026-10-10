import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

const source = ts.transpileModule(fs.readFileSync('lib/bookmarks.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const plain = value => JSON.parse(JSON.stringify(value));
const ref = { subjectId: 'blockchain', chapterId: 'session-5', questionId: 'bc-s5-q01' };

function setup({ server = false, readBlocked = false, writeBlocked = false } = {}) {
    const data = new Map();
    let writes = 0;
    const exports = {};
    const window = server ? undefined : {
        localStorage: {
            getItem(key) { if (readBlocked) throw Error('blocked'); return data.get(key) ?? null; },
            setItem(key, value) { if (writeBlocked) throw Error('full'); writes++; data.set(key, value); },
        },
    };
    vm.runInNewContext(source, { exports, window });
    return { api: exports, data, get writes() { return writes; },
        availability(options) {
            readBlocked = options.readBlocked ?? readBlocked;
            writeBlocked = options.writeBlocked ?? writeBlocked;
        } };
}

test('add, check, remove and reload bookmarks without duplicate records', () => {
    const fixture = setup();
    const { api, data } = fixture;
    assert.deepEqual(plain(api.readBookmarks()), []);
    assert.equal(api.isBookmarked(ref), false);
    assert.equal(api.bookmarkStorageStatus(), 'available');
    api.addBookmark(ref);
    api.addBookmark(ref);
    assert.equal(api.isBookmarked(ref), true);
    assert.deepEqual(plain(api.readBookmarks()), [ref]);
    assert.equal(fixture.writes, 1);
    assert.deepEqual(Object.keys(JSON.parse(data.get(api.BOOKMARKS_KEY)).items[0]).sort(),
        ['chapterId', 'questionId', 'subjectId']);

    const reloaded = setup();
    reloaded.data.set(api.BOOKMARKS_KEY, data.get(api.BOOKMARKS_KEY));
    assert.equal(reloaded.api.isBookmarked(ref), true);
    assert.deepEqual(plain(reloaded.api.removeBookmark(ref)), []);
    reloaded.api.removeBookmark(ref);
    assert.equal(reloaded.writes, 1);
});

test('same question ID in other subjects or chapters is a distinct bookmark', () => {
    const { api } = setup();
    const refs = [ref, { ...ref, subjectId: 'database' }, { ...ref, chapterId: 'session-6' },
        { subjectId: 'a:b', chapterId: 'c', questionId: 'd' },
        { subjectId: 'a', chapterId: 'b:c', questionId: 'd' }];
    refs.forEach(item => api.addBookmark(item));
    assert.deepEqual(plain(api.readBookmarks()), refs);
    api.removeBookmark(refs[1]);
    assert.equal(api.isBookmarked(refs[0]), true);
    assert.equal(api.isBookmarked(refs[1]), false);
});

test('malformed, partial and unknown-version storage is safe and never saves extra fields', () => {
    const { api, data } = setup();
    for (const raw of [null, '{', 'null', '[]', '{"version":2,"items":[]}', '{"version":1,"items":{}}']) {
        assert.deepEqual(plain(api.parseBookmarks(raw)), []);
        data.set(api.BOOKMARKS_KEY, raw);
        assert.deepEqual(plain(api.readBookmarks()), []);
    }
    const raw = JSON.stringify({ version: 1, items: [null, {}, { ...ref, questionId: 2 },
        { ...ref, prompt: 'Do not store', answer: 'b' }, ref] });
    data.set(api.BOOKMARKS_KEY, raw);
    assert.deepEqual(plain(api.readBookmarks()), [ref]);
    api.addBookmark({ ...ref, prompt: 'Do not store' });
    assert.deepEqual(plain(api.readBookmarks()), [ref]);
});

test('missing dataset questions remain stored until explicitly removed', () => {
    const { api } = setup();
    const removedFromDataset = { ...ref, questionId: 'old-id' };
    api.addBookmark(removedFromDataset);
    assert.deepEqual(plain(api.readBookmarks()), [removedFromDataset]);
    assert.equal(api.isBookmarked(removedFromDataset), true);
});

test('bookmark actions never touch quiz progress or mistakes storage', () => {
    const { api, data } = setup();
    const progressKey = 'ju-study-hub:quiz-progress:blockchain:session-5';
    const mistakesKey = 'ju-study-hub:mistakes:v1';
    const progress = '{"version":1,"answers":{"bc-s5-q01":{"optionId":"b","isSubmitted":true}}}';
    const mistakes = '{"version":1,"items":[]}';
    data.set(progressKey, progress);
    data.set(mistakesKey, mistakes);
    api.addBookmark(ref);
    api.removeBookmark(ref);
    assert.equal(data.get(progressKey), progress);
    assert.equal(data.get(mistakesKey), mistakes);
    assert.deepEqual([...data.keys()].sort(), [progressKey, mistakesKey, api.BOOKMARKS_KEY].sort());
});

test('blocked storage stays usable in memory and retries without erasing unseen items', () => {
    const fixture = setup({ readBlocked: true, writeBlocked: true });
    const { api, data } = fixture;
    const unseen = { ...ref, questionId: 'unseen' };
    data.set(api.BOOKMARKS_KEY, JSON.stringify({ version: 1, items: [unseen] }));
    api.addBookmark(ref);
    assert.deepEqual(plain(api.readBookmarks()), [ref]);
    assert.equal(api.isBookmarkPending(ref), true);
    assert.equal(api.bookmarkStorageStatus(), 'unavailable');
    fixture.availability({ readBlocked: false, writeBlocked: false });
    api.flushBookmarks();
    assert.deepEqual(plain(api.readBookmarks()), [unseen, ref]);
    assert.equal(api.isBookmarkPending(ref), false);
    assert.equal(api.bookmarkStorageStatus(), 'available');

    fixture.availability({ writeBlocked: true });
    api.removeBookmark(unseen);
    assert.equal(api.isBookmarked(unseen), false);
    assert.equal(api.isBookmarkPending(unseen), true);
    assert.equal(api.bookmarkStorageStatus(), 'pending');
    fixture.availability({ writeBlocked: false });
    api.flushBookmarks();
    assert.deepEqual(plain(api.readBookmarks()), [ref]);
    assert.equal(api.isBookmarkPending(unseen), false);
});

test('server rendering never reads or mutates browser storage', () => {
    const { api } = setup({ server: true });
    assert.deepEqual(plain(api.readBookmarks()), []);
    assert.deepEqual(plain(api.addBookmark(ref)), []);
    assert.deepEqual(plain(api.removeBookmark(ref)), []);
    assert.equal(api.isBookmarked(ref), false);
    assert.equal(api.bookmarkStorageStatus(), 'unavailable');
    api.flushBookmarks();
});
