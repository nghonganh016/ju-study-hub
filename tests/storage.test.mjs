import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

const source = ts.transpileModule(fs.readFileSync('lib/storage.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function setup() {
    const data = new Map();
    let blocked = false;
    let full = false;
    const exports = {};
    const window = { localStorage: {
        getItem(key) { if (blocked) throw Error('blocked'); return data.get(key) ?? null; },
        setItem(key, value) { if (blocked) throw Error('blocked'); if (full) throw Error('quota'); data.set(key, value); },
        removeItem(key) { if (blocked) throw Error('blocked'); data.delete(key); },
    } };
    vm.runInNewContext(source, { exports, window });
    return { store: exports.localStudyStorage, data,
        block(value) { blocked = value; }, full(value) { full = value; } };
}

test('adapter reads missing keys and preserves exact strings through write and removal', () => {
    const { store } = setup();
    assert.equal(store.getItem('missing'), null);
    store.setItem('key', '{invalid JSON');
    assert.equal(store.getItem('key'), '{invalid JSON');
    store.removeItem('key');
    assert.equal(store.getItem('key'), null);
});

test('adapter propagates blocked and quota failures so callers can retain pending data', () => {
    const fixture = setup();
    fixture.store.setItem('key', 'old');
    fixture.block(true);
    assert.throws(() => fixture.store.getItem('key'), /blocked/);
    assert.throws(() => fixture.store.setItem('key', 'new'), /blocked/);
    assert.throws(() => fixture.store.removeItem('key'), /blocked/);
    fixture.block(false);
    fixture.full(true);
    assert.throws(() => fixture.store.setItem('key', 'new'), /quota/);
    assert.equal(fixture.store.getItem('key'), 'old');
});

test('importing adapter during server rendering does not access window', () => {
    const exports = {};
    vm.runInNewContext(source, { exports });
    assert.equal(typeof exports.localStudyStorage.getItem, 'function');
});
