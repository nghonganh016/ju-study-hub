import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

const code = ts.transpileModule(fs.readFileSync('components/StorageBootstrapGate.tsx', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
}).outputText;

function deferred() {
    let resolve;
    const promise = new Promise((done) => { resolve = done; });
    return { promise, resolve };
}

function setup() {
    const slots = [];
    const effects = [];
    const calls = [];
    let index = 0;
    let nextCapture = deferred();
    const react = {
        useState(initial) {
            const slot = index++;
            if (!(slot in slots)) slots[slot] = { value: initial };
            return [slots[slot].value, (value) => {
                slots[slot].value = typeof value === 'function' ? value(slots[slot].value) : value;
            }];
        },
        useEffect(effect, deps) {
            const slot = index++;
            if (slots[slot] && JSON.stringify(slots[slot].deps) === JSON.stringify(deps)) return;
            slots[slot]?.cleanup?.();
            slots[slot] = { deps };
            effects.push(() => { slots[slot].cleanup = effect(); });
        },
    };
    const jsx = (type, props) => ({ type, props });
    const exports = {};
    vm.runInNewContext(code, {
        exports,
        require(id) {
            if (id === 'react') return react;
            if (id === 'react/jsx-runtime') return { jsx, jsxs: jsx, Fragment: 'fragment' };
            if (id === '@/lib/import-staging-idb') return { captureBrowserRaw() { calls.push('capture-start'); return nextCapture.promise; } };
            throw Error(`Unexpected import ${id}`);
        },
    });
    return {
        calls,
        render() {
            index = 0;
            const node = exports.default({ children: { type: 'consumer', props: {} } });
            while (effects.length) effects.shift()();
            return node;
        },
        resolve(result) { nextCapture.resolve(result); },
        prepareNext() { nextCapture = deferred(); },
        cleanup() { for (const slot of slots) slot?.cleanup?.(); },
    };
}

const flush = async () => { await Promise.resolve(); await Promise.resolve(); };

test('root layout places every page behind the gate', () => {
    const layout = fs.readFileSync('app/layout.tsx', 'utf8');
    assert.match(layout, /<StorageBootstrapGate>\{children\}<\/StorageBootstrapGate>/);
});

test('consumer can mount only after capture commit and read-back resolve', async () => {
    const fixture = setup();
    assert.equal(fixture.render().props.role, 'status');
    assert.deepEqual(fixture.calls, ['capture-start']);
    fixture.calls.push('commit', 'read-back');
    fixture.resolve({ status: 'captured', snapshot: {}, descriptor: {} });
    await flush();
    assert.equal(fixture.render().props.children.type, 'consumer');
    fixture.calls.push('consumer-write');
    assert.deepEqual(fixture.calls, ['capture-start', 'commit', 'read-back', 'consumer-write']);
    assert.equal(fixture.calls.filter((event) => event === 'capture-start').length, 1);
});

test('all capture failures keep children unmounted and retry awaits a new success', async () => {
    for (const result of [
        { status: 'source-changed', snapshot: {} },
        { status: 'source-incomplete', snapshot: { inventoryStatus: 'unsupported-key' } },
        { status: 'corrupt-snapshot', errorName: 'ChecksumMismatch' },
        { status: 'invalid-descriptor', errorName: 'InvalidDescriptor' },
        { status: 'storage-unavailable', errorName: 'SecurityError' },
        { status: 'quota-exceeded', errorName: 'QuotaExceededError' },
        { status: 'transaction-aborted', errorName: 'AbortError' },
    ]) {
        const fixture = setup();
        fixture.render();
        fixture.resolve(result);
        await flush();
        const errorView = fixture.render();
        assert.equal(errorView.props.role, 'alert', result.status);
        const button = errorView.props.children.at(-1);
        assert.equal(button.type, 'button');
        fixture.prepareNext();
        button.props.onClick();
        assert.equal(fixture.render().props.role, 'status');
        assert.equal(fixture.calls.length, 2);
        fixture.resolve({ status: 'reused', snapshot: {}, descriptor: {} });
        await flush();
        assert.equal(fixture.render().props.children.type, 'consumer');
    }
});

test('late result from cancelled Strict Mode effect cannot open gate', async () => {
    const fixture = setup();
    fixture.render();
    fixture.cleanup();
    fixture.resolve({ status: 'captured', snapshot: {}, descriptor: {} });
    await flush();
    assert.equal(fixture.render().props.role, 'status');
});
