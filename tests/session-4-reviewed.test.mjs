import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

const markdown = fs.readFileSync('docs/database-session-4-mcq.md', 'utf8');
const exports = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('data/database/session-4.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, { exports });
const questions = JSON.parse(JSON.stringify(exports.session4.questions));

function field(block, name, id) {
    const values = [...block.matchAll(new RegExp(`^\\*\\*${name}:\\*\\* (.+)$`, 'gm'))];
    assert.equal(values.length, 1, `${id}: expected one ${name}`);
    assert.ok(values[0][1].trim(), `${id}: empty ${name}`);
    return values[0][1];
}

function renderText(markdownText) {
    assert.equal((markdownText.match(/`/g) ?? []).length % 2, 0, 'unmatched inline code delimiter');
    return markdownText.replaceAll('`', '');
}

function parseReviewed() {
    const headings = [...markdown.matchAll(/^\*\*Q(\d{3})\. (.+?)\*\*$/gm)];
    assert.equal(headings.length, 56, 'source question count');
    const seen = new Set();
    return headings.map((heading, index) => {
        const id = `Q${heading[1]}`;
        assert.equal(id, `Q${String(index + 1).padStart(3, '0')}`, 'missing or reordered question heading');
        assert.ok(!seen.has(id), `${id}: duplicate ID`);
        seen.add(id);
        const block = markdown.slice(heading.index + heading[0].length,
            headings[index + 1]?.index ?? markdown.length);
        const options = [...block.matchAll(/^([A-D])\. (.+)$/gm)]
            .map(([, optionId, text]) => ({ id: optionId.toLowerCase(), text: renderText(text) }));
        assert.equal(options.map(option => option.id).join(''), 'abcd', `${id}: four ordered options required`);
        assert.ok(options.every(option => option.text.trim()), `${id}: empty option`);
        const correctOptionId = field(block, 'Correct answer', id).toLowerCase();
        assert.ok(options.some(option => option.id === correctOptionId), `${id}: invalid answer`);
        const explanation = renderText(field(block, 'Explanation', id));
        const reference = /^AdvanceDatabases4\.pdf, PDF p\. (\d+)\.$/.exec(field(block, 'Source', id));
        assert.ok(reference, `${id}: invalid source reference`);
        const pdfPage = Number(reference[1]);
        assert.ok(pdfPage >= 1 && pdfPage <= 25, `${id}: source page outside PDF`);
        const topic = [...markdown.slice(0, heading.index).matchAll(/^## (LO\d+: .+)$/gm)].at(-1)?.[1];
        assert.ok(topic, `${id}: missing learning-objective group`);
        const nonemptyLines = block.split(/\r?\n/).map(line => line.trim())
            .filter(line => line && !line.startsWith('## LO'));
        assert.equal(nonemptyLines.length, 7, `${id}: unparsed block content`);
        return {
            id: `db-s4-${id.toLowerCase()}`,
            prompt: renderText(heading[2]),
            options,
            correctOptionId,
            explanation,
            source: `/references/database-window-functions-slides.pdf#page=${pdfPage}`,
            topic,
            pdfPage,
        };
    });
}

test('Database Session 4 matches all 56 reviewed Markdown questions and lecture references', () => {
    const parsed = parseReviewed();
    assert.deepEqual(questions.map(question => Object.fromEntries(Object.entries(question)
        .filter(([key]) => key !== 'sources'))), parsed.map(question => Object.fromEntries(Object.entries(question)
        .filter(([key]) => key !== 'pdfPage'))));
    for (const [index, { pdfPage }] of parsed.entries()) {
        const slideNumber = pdfPage <= 7 ? pdfPage - 1 : pdfPage <= 12 ? pdfPage - 2 : pdfPage - 3;
        assert.deepEqual(questions[index].sources.map(({ kind, file, pdfPage: page, slideNumber: slide }) =>
            ({ kind, file, pdfPage: page, slideNumber: slide })), [{
            kind: 'lecture', file: 'AdvanceDatabases4.pdf', pdfPage, slideNumber,
        }]);
        assert.ok(questions[index].sources[0].slideTitle.trim());
    }
    assert.equal(new Set(questions.map(question => question.id)).size, 56);
    assert.equal(questions.reduce((count, question) => count + question.options.length, 0), 224);
    assert.ok(questions.every(question => question.options.filter(option => option.id === question.correctOptionId).length === 1));
    assert.equal(fs.readFileSync('public/references/database-window-functions-slides.pdf').subarray(0, 5).toString(), '%PDF-');
});
