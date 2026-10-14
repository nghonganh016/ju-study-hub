import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

const markdown = fs.readFileSync('docs/database-session-5-mcq.md', 'utf8');
const exports = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('data/database/session-5.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, { exports });
const questions = JSON.parse(JSON.stringify(exports.session5.questions));

function field(block, name, id) {
    const values = [...block.matchAll(new RegExp(`^\\*\\*${name}:\\*\\* (.+)$`, 'gm'))];
    assert.equal(values.length, 1, `${id}: expected one ${name}`);
    assert.ok(values[0][1].trim(), `${id}: empty ${name}`);
    return values[0][1];
}

function renderText(text) {
    assert.equal((text.match(/`/g) ?? []).length % 2, 0, 'unmatched inline code delimiter');
    return text.replaceAll('`', '').replaceAll('$100', '\\$100');
}

function parseReviewed() {
    const headings = [...markdown.matchAll(/^### Q(\d{3})\. (.+)$/gm)];
    assert.equal(headings.length, 56, 'source question count');
    return headings.map((heading, index) => {
        const id = `Q${heading[1]}`;
        assert.equal(Number(heading[1]), index + 1, 'missing or reordered question heading');
        const block = markdown.slice(heading.index + heading[0].length,
            headings[index + 1]?.index ?? markdown.length);
        const options = [...block.matchAll(/^([A-D])\. (.+?)\s*$/gm)]
            .map(([, optionId, text]) => ({ id: optionId.toLowerCase(), text: renderText(text) }));
        assert.equal(options.map(option => option.id).join(''), 'abcd', `${id}: four ordered options required`);
        assert.ok(options.every(option => option.text.trim()), `${id}: empty option`);
        const correctOptionId = field(block, 'Correct answer', id).toLowerCase();
        assert.ok(options.some(option => option.id === correctOptionId), `${id}: invalid answer`);
        const explanation = renderText(field(block, 'Explanation', id));
        const reference = /^`DB5\(2\)\.pdf`, PDF p\. ([\d, -]+)(?:; Quiz 4 Q\d+)?\.$/.exec(field(block, 'Source', id));
        assert.ok(reference, `${id}: invalid source reference`);
        const pages = reference[1].split(',').flatMap(part => {
            const [start, end = start] = part.trim().split('-').map(Number);
            assert.ok(start >= 1 && end <= 36 && start <= end, `${id}: source page outside PDF`);
            return Array.from({ length: end - start + 1 }, (_, offset) => start + offset);
        });
        const nonemptyLines = block.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
        assert.equal(nonemptyLines.length, 7, `${id}: unparsed block content`);
        return {
            id: `db-s5-${id.toLowerCase()}`,
            prompt: renderText(heading[2]),
            options,
            correctOptionId,
            explanation,
            source: `/references/database-transactions-slides.pdf#page=${pages[0]}`,
            pages,
        };
    });
}

test('Database Session 5 matches every reviewed question, option, answer, explanation and page reference', () => {
    const parsed = parseReviewed();
    assert.equal(questions.length, parsed.length);
    assert.equal(new Set(questions.map(question => question.id)).size, 56);
    for (const [index, expected] of parsed.entries()) {
        const actual = questions[index];
        assert.deepEqual(Object.fromEntries(Object.entries(actual).filter(([key]) => key !== 'sources')),
            Object.fromEntries(Object.entries(expected).filter(([key]) => key !== 'pages')));
        assert.deepEqual(actual.sources.map(({ kind, file, pdfPage }) => ({ kind, file, pdfPage })),
            expected.pages.map(pdfPage => ({ kind: 'lecture', file: 'DB5.pdf', pdfPage })));
        assert.ok(actual.sources.every(source => Number.isInteger(source.slideNumber) && source.slideNumber > 0 && source.slideTitle.trim()));
    }
    assert.equal(questions.reduce((count, question) => count + question.options.length, 0), 224);
    assert.equal(fs.readFileSync('public/references/database-transactions-slides.pdf').subarray(0, 5).toString(), '%PDF-');
});
