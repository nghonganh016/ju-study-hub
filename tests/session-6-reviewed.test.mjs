import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

const markdown = fs.readFileSync('docs/database-session-6-mcq.md', 'utf8');
const exports = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('data/database/session-6.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, { exports });
const questions = JSON.parse(JSON.stringify(exports.session6.questions));

function field(block, name, id) {
    const values = [...block.matchAll(new RegExp(`^\\*\\*${name}:\\*\\* (.+)$`, 'gm'))];
    assert.equal(values.length, 1, `${id}: expected one ${name}`);
    assert.ok(values[0][1].trim(), `${id}: empty ${name}`);
    return values[0][1];
}

function parseReviewed() {
    const headings = [...markdown.matchAll(/^### Q(\d{3})\. (.+)$/gm)];
    assert.equal(headings.length, 50, 'source question count');
    return headings.map((heading, index) => {
        const id = `Q${heading[1]}`;
        assert.equal(Number(heading[1]), index + 1, 'missing or reordered question heading');
        const block = markdown.slice(heading.index + heading[0].length,
            headings[index + 1]?.index ?? markdown.length);
        const options = [...block.matchAll(/^([A-D])\. (.+)$/gm)]
            .map(([, optionId, text]) => ({ id: optionId.toLowerCase(), text }));
        assert.equal(options.map(option => option.id).join(''), 'abcd', `${id}: four ordered options required`);
        assert.ok(options.every(option => option.text.trim()), `${id}: empty option`);
        const correctOptionId = field(block, 'Correct answer', id).toLowerCase();
        assert.ok(options.some(option => option.id === correctOptionId), `${id}: invalid answer`);
        const explanation = field(block, 'Explanation', id);
        const reference = /^Concurrency Control, PDF page ([\d, -]+)(?:; Quiz 4, Q\d+)?$/.exec(field(block, 'Source', id));
        assert.ok(reference, `${id}: invalid source reference`);
        const pages = reference[1].split(',').flatMap(part => {
            const [start, end = start] = part.trim().split('-').map(Number);
            assert.ok(start >= 1 && end <= 38 && start <= end, `${id}: source page outside PDF`);
            return Array.from({ length: end - start + 1 }, (_, offset) => start + offset);
        });
        const nonemptyLines = block.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
        assert.equal(nonemptyLines.length, 7, `${id}: unparsed block content`);
        return {
            id: `db-s6-${id.toLowerCase()}`,
            prompt: heading[2],
            options,
            correctOptionId,
            explanation,
            source: `/references/database-concurrency-control-slides.pdf#page=${pages[0]}`,
            pages,
        };
    });
}

test('Database Session 6 matches every reviewed question, option, answer, explanation and page reference', () => {
    const parsed = parseReviewed();
    assert.equal(questions.length, parsed.length);
    assert.equal(new Set(questions.map(question => question.id)).size, 50);
    for (const [index, expected] of parsed.entries()) {
        const actual = questions[index];
        assert.deepEqual(Object.fromEntries(Object.entries(actual).filter(([key]) => key !== 'sources')),
            Object.fromEntries(Object.entries(expected).filter(([key]) => key !== 'pages')));
        assert.deepEqual(actual.sources.map(({ kind, file, pdfPage }) => ({ kind, file, pdfPage })),
            expected.pages.map(pdfPage => ({ kind: 'lecture', file: 'ConcurrencyControl.pdf', pdfPage })));
        assert.ok(actual.sources.every(source => Number.isInteger(source.slideNumber) && source.slideNumber > 0 && source.slideTitle.trim()));
    }
    assert.equal(questions.reduce((count, question) => count + question.options.length, 0), 200);
    assert.equal(questions.reduce((count, question) => count + question.sources.length, 0), 65);
    assert.equal(fs.readFileSync('public/references/database-concurrency-control-slides.pdf').subarray(0, 5).toString(), '%PDF-');
});
