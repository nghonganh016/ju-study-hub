import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import { createRequire } from 'node:module';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const require = createRequire(import.meta.url);
const exports = {};
const code = ts.transpileModule(fs.readFileSync('components/BookmarkButton.tsx', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
vm.runInNewContext(code, { exports, require(id) {
    if (id.endsWith('.css')) return { default: { bookmarkButton: 'bookmarkButton' } };
    return require(id);
} });
const BookmarkButton = exports.default;
const render = props => renderToStaticMarkup(React.createElement(BookmarkButton, { onToggle() {}, ...props }));

test('bookmark button exposes native button, action label and outline/filled pressed states', () => {
    const empty = render({ bookmarked: false, pending: false, ready: true });
    assert.match(empty, /<button type="button"/);
    assert.match(empty, /aria-label="Lưu câu hỏi"/);
    assert.match(empty, /aria-pressed="false"/);
    assert.match(empty, /fill="none"/);

    const saved = render({ bookmarked: true, pending: false, ready: true });
    assert.match(saved, /aria-label="Bỏ lưu câu hỏi"/);
    assert.match(saved, /aria-pressed="true"/);
    assert.match(saved, /fill="currentColor"/);
    assert.match(saved, />Đã lưu</);
});

test('loading and failed writes do not claim a durable save', () => {
    const loading = render({ bookmarked: false, pending: false, ready: false });
    assert.match(loading, /disabled=""/);
    assert.match(loading, /Đang tải bookmark/);

    const pendingAdd = render({ bookmarked: true, pending: true, ready: true });
    assert.match(pendingAdd, /Lưu tạm/);
    assert.match(pendingAdd, /Thay đổi chưa lưu được vào trình duyệt/);
    const pendingRemove = render({ bookmarked: false, pending: true, ready: true });
    assert.match(pendingRemove, /Bỏ tạm/);
});
