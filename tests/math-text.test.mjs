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

// Exercise the actual component and KaTeX renderer without adding a test framework.
function load(file) {
    const source = fs.readFileSync(file, 'utf8');
    const code = ts.transpileModule(source, { compilerOptions: {
        module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX,
    } }).outputText;
    const exports = {};
    vm.runInNewContext(code, { exports, require }, { filename: file });
    return exports;
}
const MathText = load('components/MathText.tsx').default;
const render = text => renderToStaticMarkup(React.createElement(MathText, { text }));
const examples = [
    String.raw`Bình phương: $x^2$.`,
    String.raw`Phân số: $\frac{a}{b}$.`,
    String.raw`Tổng: $\sum_{i=1}^{n} x_i$.`,
    String.raw`Xác suất: $P(A|B)$.`,
    String.raw`Công thức:
$$
\begin{aligned}
H(X) &= -\sum_i p_i \log_2 p_i \\
P(A|B) &= \frac{P(B|A)P(A)}{P(B)}
\end{aligned}
$$`,
];

test('five math examples render with accessible MathML and block mode', () => {
    for (const example of examples) {
        const html = render(example);
        assert.match(html, /class="katex"/);
        assert.match(html, /<math/);
        assert.doesNotMatch(html, /math-fallback/);
    }
    assert.match(render(examples[4]), /katex-display/);
    assert.match(render(examples[4]), /tabindex="0"/);
});
test('plain text, currency and unmatched delimiters remain text', () => {
    for (const text of ['Giá $5 và $10.', '$10', '$x', '$$x', '$ x $', '$x\ny$', '$$', 'O(\\log n)']) {
        assert.equal(render(text), renderToStaticMarkup(React.createElement(React.Fragment, null, text)));
    }
    assert.equal(render(String.raw`Giá \$5 và \$10.`), 'Giá $5 và $10.');
    assert.match(render('$5$'), /class="katex"/);
});
test('malformed LaTeX falls back and subsequent math still renders', () => {
    const html = render(String.raw`Sai $\frac{a}{$; đúng $x^2$.`);
    assert.match(html, /math-fallback/);
    assert.match(html, /class="katex"/);
    assert.match(render(String.raw`$$\unknowncommand{x}$$`), /math-fallback/);
    assert.equal(render('<script>alert(1)</script>'), '&lt;script&gt;alert(1)&lt;/script&gt;');
});
test('all existing quiz text remains compatible without changing data', () => {
    for (const file of fs.readdirSync('data/blockchain').filter(f => f.endsWith('.ts') && f !== 'index.ts')) {
        const exports = load(path.join('data/blockchain', file));
        for (const chapter of Object.values(exports)) {
            for (const question of chapter.questions) {
                for (const text of [question.prompt, question.explanation, ...question.options.map(o => o.text)]) {
                    const html = render(text);
                    assert.ok(typeof html === 'string');
                    if (!text.includes('$')) assert.equal(html, renderToStaticMarkup(React.createElement(React.Fragment, null, text)));
                }
            }
        }
    }
});
