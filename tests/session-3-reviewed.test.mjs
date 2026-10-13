import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

const markdown = fs.readFileSync('docs/database-session-3-mcq.md', 'utf8');
const exports = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('data/database/session-3.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, { exports });
const questions = JSON.parse(JSON.stringify(exports.session3.questions));

function field(block, name, id) {
    const values = [...block.matchAll(new RegExp(`^\\*\\*${name}:\\*\\* (.+)$`, 'gm'))];
    assert.equal(values.length, 1, `${id}: expected one ${name}`);
    assert.ok(values[0][1].trim(), `${id}: empty ${name}`);
    return values[0][1];
}

function slideNumbers(reference, id) {
    const match = /^AdvancedDatabase3\.pdf, lecture slide\(s\) ([0-9,\u2013-]+)\.$/.exec(reference);
    assert.ok(match, `${id}: invalid source reference`);
    return match[1].split(',').flatMap(part => {
        const range = /^(\d+)(?:[\u2013-](\d+))?$/.exec(part);
        assert.ok(range, `${id}: invalid slide range`);
        const first = Number(range[1]);
        const last = range[2] ? Number(range[2]) : first;
        assert.ok(first >= 4 && last <= 39 && first <= last, `${id}: slide outside lecture`);
        return Array.from({ length: last - first + 1 }, (_, index) => first + index);
    });
}

function pdfPage(slide) {
    // PDF pages 4, 18 and 40 are unnumbered section dividers.
    return slide <= 16 ? slide + 1 : slide <= 37 ? slide + 2 : slide + 3;
}

function parseReviewed() {
    const headings = [...markdown.matchAll(/^### (Q\d{3})\. (.+)$/gm)];
    assert.equal(headings.length, 58, 'source question count');
    const seen = new Set();
    return headings.map((heading, index) => {
        const id = heading[1];
        assert.equal(id, `Q${String(index + 1).padStart(3, '0')}`, 'missing or reordered question heading');
        assert.ok(!seen.has(id), `${id}: duplicate ID`);
        seen.add(id);
        assert.ok(heading[2].trim(), `${id}: empty prompt`);
        const block = markdown.slice(heading.index + heading[0].length,
            headings[index + 1]?.index ?? markdown.length);
        const options = [...block.matchAll(/^([A-D])\. (.+)$/gm)]
            .map(([, optionId, text]) => ({ id: optionId.toLowerCase(), text }));
        assert.equal(options.map(option => option.id).join(''), 'abcd', `${id}: four ordered options required`);
        assert.ok(options.every(option => option.text.trim()), `${id}: empty option`);
        const correctOptionId = field(block, 'Correct answer', id).toLowerCase();
        assert.ok(options.some(option => option.id === correctOptionId), `${id}: invalid correct answer`);
        const explanation = field(block, 'Explanation', id);
        const slides = slideNumbers(field(block, 'Source', id), id);
        const nonemptyLines = block.split(/\r?\n/).filter(line => line.trim());
        assert.equal(nonemptyLines.length, 7, `${id}: unexpected or unparsed content`);
        return { question: {
            id: `db-s3-${id.toLowerCase()}`,
            prompt: heading[2], options, correctOptionId, explanation,
            source: `/references/database-session-3-slides.pdf#page=${pdfPage(slides[0])}`,
        }, slides };
    });
}

test('Database Session 3 matches all reviewed Markdown fields and slide links', () => {
    const parsed = parseReviewed();
    assert.deepEqual(questions.map(question => Object.fromEntries(Object.entries(question)
        .filter(([key]) => key !== 'sources'))), parsed.map(item => item.question));
    for (const [index, { slides }] of parsed.entries()) {
        assert.deepEqual(questions[index].sources.map(({ kind, file, pdfPage, slideNumber }) =>
            ({ kind, file, pdfPage, slideNumber })), slides.map(slideNumber => ({
            kind: 'lecture', file: 'AdvancedDatabase3.pdf', pdfPage: pdfPage(slideNumber), slideNumber,
        })));
        assert.ok(questions[index].sources.every(source => typeof source.slideTitle === 'string' && source.slideTitle.trim()));
    }
    assert.equal(new Set(questions.map(question => question.id)).size, 58);
    assert.equal(questions.reduce((count, question) => count + question.options.length, 0), 232);
    assert.ok(questions.every(question => question.options.filter(option => option.id === question.correctOptionId).length === 1));
    assert.equal(fs.readFileSync('public/references/database-session-3-slides.pdf').subarray(0, 5).toString(), '%PDF-');
});
