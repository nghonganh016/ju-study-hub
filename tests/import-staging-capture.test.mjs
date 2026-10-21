import assert from 'node:assert/strict';
import { webcrypto } from 'node:crypto';
import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

const compiled = ts.transpileModule(fs.readFileSync('lib/import-staging-capture.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const capture = {};
vm.runInNewContext(compiled, { exports: capture, Uint8Array, ArrayBuffer, Set, JSON, Error, RangeError });

function source(initial = {}) {
    const data = new Map(Object.entries(initial));
    const writes = [];
    let blockedKey = null;
    let blockedList = false;
    return {
        data, writes,
        get length() { if (blockedList) throw new DOMException('blocked', 'SecurityError'); return data.size; },
        key(index) { if (blockedList) throw new DOMException('blocked', 'SecurityError'); return [...data.keys()][index] ?? null; },
        getItem(key) { if (key === blockedKey) throw new DOMException('blocked', 'SecurityError'); return data.get(key) ?? null; },
        setItem(key, raw) { writes.push(['set', key]); data.set(key, raw); },
        removeItem(key) { writes.push(['remove', key]); data.delete(key); },
        blockKey(key) { blockedKey = key; },
        blockList() { blockedList = true; },
    };
}

function repository() {
    const snapshots = new Map();
    const descriptors = new Map();
    let failure = null;
    return {
        snapshots, descriptors,
        fail(name) { failure = name; },
        async findByFingerprint(fingerprint) { return [...descriptors.values()].find((item) => item.sourceFingerprint === fingerprint) ?? null; },
        async getDescriptor(id) { return descriptors.get(id) ?? null; },
        async getSnapshot(id) { return snapshots.get(id) ?? null; },
        async getSnapshotByFingerprint(fingerprint) {
            return [...snapshots.values()].find((item) => item.sourceFingerprint === fingerprint) ?? null;
        },
        async addPair(snapshot, descriptor) {
            if (failure) throw new DOMException('storage error', failure);
            if ([...descriptors.values()].some((item) => item.sourceFingerprint === descriptor.sourceFingerprint)) {
                throw new DOMException('duplicate', 'ConstraintError');
            }
            snapshots.set(snapshot.captureId, structuredClone(snapshot));
            descriptors.set(descriptor.stagingId, structuredClone(descriptor));
        },
    };
}

let serial = 0;
function options(rawSource = source(), staging = repository(), overrides = {}) {
    return {
        source: rawSource, repository: staging, origin: 'https://study.example',
        subtle: webcrypto.subtle, randomUUID: () => `id-${++serial}`,
        now: () => '2026-10-20T00:00:00.000Z', ...overrides,
    };
}

test('inventory preserves seven missing keys, all quiz keys, exact raw and excludes other apps', () => {
    const rawSource = source({
        'ju-study-hub:quiz-progress:retired:old': '{bad json',
        'ju-study-hub:bookmarks:v1': '',
        'ju-study-hub:mistakes:v1': '{"items":[{"questionId":"orphan"}]}',
        'other-app:token': 'secret',
    });
    const inventory = capture.readRawSource(rawSource);
    assert.equal(inventory.inventoryStatus, 'complete');
    assert.equal(inventory.entries.length, 8);
    assert.equal(inventory.entries.find((entry) => entry.key.endsWith('bookmarks:v1')).raw, '');
    assert.equal(inventory.entries.find((entry) => entry.key.endsWith('exam-attempt:v1')).state, 'missing');
    assert.equal(inventory.entries.find((entry) => entry.key.includes('retired')).raw, '{bad json');
    assert.equal(inventory.entries.find((entry) => entry.key.endsWith('mistakes:v1')).raw,
        '{"items":[{"questionId":"orphan"}]}');
    assert.equal(inventory.entries.some((entry) => entry.key.includes('other-app')), false);
    assert.deepEqual(rawSource.writes, []);
});

test('read errors and unknown app keys never become missing or complete', async () => {
    const rawSource = source({ 'ju-study-hub:unregistered:v1': 'raw' });
    let result = await capture.captureRaw(options(rawSource));
    assert.equal(result.status, 'source-incomplete');
    assert.equal(result.snapshot.inventoryStatus, 'unsupported-key');
    assert.equal(result.snapshot.sourceFingerprint, null);
    assert.equal(result.snapshot.unrecognizedAppKeys[0], 'ju-study-hub:unregistered:v1');
    rawSource.data.delete('ju-study-hub:unregistered:v1');
    rawSource.blockKey('ju-study-hub:review-state:v2');
    result = await capture.captureRaw(options(rawSource));
    assert.equal(result.snapshot.entries.find((entry) => entry.key.endsWith('review-state:v2')).state, 'read-error');
    assert.equal(result.snapshot.sourceFingerprint, null);
    rawSource.blockList();
    result = await capture.captureRaw(options(rawSource));
    assert.equal(result.snapshot.inventoryStatus, 'enumeration-error');
    assert.equal(result.snapshot.inventoryErrorName, 'SecurityError');
});

test('fingerprint is stable across timestamps and sensitive to raw, key set and UTF-16 code units', async () => {
    const rawSource = source({ 'ju-study-hub:review-state:v2': '{bad json', 'ju-study-hub:exam-attempt:v1': 'x\ud800' });
    const entries = capture.readRawSource(rawSource).entries;
    const first = await capture.fingerprintRaw('https://study.example', entries, webcrypto.subtle);
    const second = await capture.fingerprintRaw('https://study.example', capture.readRawSource(rawSource).entries, webcrypto.subtle);
    assert.equal(first, second);
    assert.match(first, /^sha256:[a-f0-9]{64}$/);
    rawSource.data.set('ju-study-hub:exam-attempt:v1', 'x\ud801');
    assert.notEqual(first, await capture.fingerprintRaw('https://study.example', capture.readRawSource(rawSource).entries, webcrypto.subtle));
    rawSource.data.set('ju-study-hub:quiz-progress:old:chapter', 'null');
    assert.notEqual(first, await capture.fingerprintRaw('https://study.example', capture.readRawSource(rawSource).entries, webcrypto.subtle));
});

test('capture persists pair, reads checksum back, reuses unchanged and creates a new pair on change', async () => {
    const rawSource = source({ 'ju-study-hub:review-state:v2': '{broken' });
    const staging = repository();
    const input = options(rawSource, staging);
    const first = await capture.captureRaw(input);
    assert.equal(first.status, 'captured');
    assert.equal(staging.snapshots.size, 1);
    assert.equal(staging.descriptors.size, 1);
    const again = await capture.captureRaw(input);
    assert.equal(again.status, 'reused');
    assert.equal(again.snapshot.captureId, first.snapshot.captureId);
    rawSource.data.set('ju-study-hub:review-state:v2', '{changed');
    const changed = await capture.captureRaw(input);
    assert.equal(changed.status, 'captured');
    assert.equal(staging.snapshots.size, 2);
    assert.equal(staging.descriptors.size, 2);
    assert.equal(staging.snapshots.get(first.snapshot.captureId).entries.find((e) => e.key.endsWith('review-state:v2')).raw, '{broken');
    assert.deepEqual(rawSource.writes, []);
});

test('corrupt snapshot and inconsistent descriptor block reuse without fallback', async () => {
    const rawSource = source();
    const staging = repository();
    const input = options(rawSource, staging);
    const first = await capture.captureRaw(input);
    const stored = staging.snapshots.get(first.snapshot.captureId);
    stored.entries.find((e) => e.key.endsWith('bookmarks:v1')).state = 'present';
    stored.entries.find((e) => e.key.endsWith('bookmarks:v1')).raw = 'tampered';
    assert.equal((await capture.captureRaw(input)).status, 'corrupt-snapshot');
    assert.equal(staging.snapshots.size, 1);
    staging.snapshots.set(first.snapshot.captureId, first.snapshot);
    staging.descriptors.get(first.descriptor.stagingId).revision = 0;
    assert.equal((await capture.captureRaw(input)).status, 'invalid-descriptor');
});

test('orphan snapshot blocks capture and retry without overwriting raw', async () => {
    const rawSource = source();
    const staging = repository();
    const input = options(rawSource, staging);
    const first = await capture.captureRaw(input);
    staging.descriptors.delete(first.descriptor.stagingId);
    for (let retry = 0; retry < 2; retry += 1) {
        const result = await capture.captureRaw(input);
        assert.equal(result.status, 'invalid-descriptor');
        assert.equal(result.errorName, 'MissingDescriptor');
    }
    assert.equal(staging.snapshots.size, 1);
    assert.equal(staging.snapshots.get(first.snapshot.captureId).captureId, first.snapshot.captureId);
    assert.deepEqual(rawSource.writes, []);
});

test('constraint race with an orphan snapshot reports missing descriptor', async () => {
    const rawSource = source();
    const staging = repository();
    const addPair = staging.addPair;
    staging.addPair = async (snapshot) => {
        staging.snapshots.set(snapshot.captureId, structuredClone(snapshot));
        throw new DOMException('duplicate', 'ConstraintError');
    };
    const result = await capture.captureRaw(options(rawSource, staging));
    assert.equal(result.status, 'invalid-descriptor');
    assert.equal(result.errorName, 'MissingDescriptor');
    assert.equal(staging.snapshots.size, 1);
    staging.addPair = addPair;
});

test('resume targets one descriptor and checks current source without replacing its raw', async () => {
    const rawSource = source({ 'ju-study-hub:review-state:v2': '{invalid' });
    const staging = repository();
    const first = await capture.captureRaw(options(rawSource, staging));
    assert.equal((await capture.resumeRaw(first.descriptor.stagingId, rawSource, staging,
        'https://study.example', webcrypto.subtle)).status, 'ready');
    rawSource.data.set('ju-study-hub:review-state:v2', '{changed');
    assert.equal((await capture.resumeRaw(first.descriptor.stagingId, rawSource, staging,
        'https://study.example', webcrypto.subtle)).status, 'source-changed');
    staging.snapshots.delete(first.snapshot.captureId);
    assert.equal((await capture.resumeRaw(first.descriptor.stagingId, rawSource, staging,
        'https://study.example', webcrypto.subtle)).status, 'corrupt-snapshot');
    assert.equal((await capture.resumeRaw('unknown', rawSource, staging,
        'https://study.example', webcrypto.subtle)).status, 'missing-descriptor');
});

test('two concurrent captures keep one immutable pair via unique fingerprint', async () => {
    const rawSource = source();
    const staging = repository();
    const [a, b] = await Promise.all([
        capture.captureRaw(options(rawSource, staging)),
        capture.captureRaw(options(rawSource, staging)),
    ]);
    assert.deepEqual(new Set([a.status, b.status]), new Set(['captured', 'reused']));
    assert.equal(staging.snapshots.size, 1);
    assert.equal(staging.descriptors.size, 1);
});

test('source changes between reads or after commit are reported without altering source', async () => {
    const rawSource = source();
    let reads = 0;
    const changing = { ...rawSource, get length() { reads += 1; if (reads === 2) rawSource.data.set('ju-study-hub:bookmarks:v1', 'new'); return rawSource.length; } };
    const staging = repository();
    const result = await capture.captureRaw(options(changing, staging));
    assert.equal(result.status, 'source-changed');
    assert.equal(result.snapshot.sourceFingerprint, null);
    assert.equal(staging.snapshots.size, 0);

    const afterCommit = repository();
    const originalAdd = afterCommit.addPair.bind(afterCommit);
    afterCommit.addPair = async (...args) => { await originalAdd(...args); rawSource.data.set('ju-study-hub:bookmarks:v1', 'later'); };
    const later = await capture.captureRaw(options(rawSource, afterCommit));
    assert.equal(later.status, 'source-changed');
    assert.equal(afterCommit.snapshots.size, 1);
});

test('blocked storage, quota and abort produce structured results', async () => {
    const rawSource = source();
    for (const [name, status] of [
        ['QuotaExceededError', 'quota-exceeded'],
        ['AbortError', 'transaction-aborted'],
        ['SecurityError', 'storage-unavailable'],
    ]) {
        const staging = repository();
        staging.fail(name);
        const result = await capture.captureRaw(options(rawSource, staging));
        assert.equal(result.status, status);
        assert.equal(staging.snapshots.size, 0);
    }
});
