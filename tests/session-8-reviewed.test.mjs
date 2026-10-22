import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

const markdown = fs.readFileSync('docs/session-8-distributed-databases-cap-quiz.md', 'utf8');
const reviewed = JSON.parse(fs.readFileSync('docs/session-8-distributed-databases-cap-quiz.json', 'utf8'));
const exports = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('data/database/session-8.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, { exports });
const questions = JSON.parse(JSON.stringify(exports.session8.questions));

function field(block, name, id) {
    const values = [...block.matchAll(new RegExp(`^\\*\\*${name}:\\*\\* (.+)$`, 'gm'))];
    assert.equal(values.length, 1, `${id}: expected one ${name}`);
    assert.ok(values[0][1].trim(), `${id}: empty ${name}`);
    return values[0][1];
}

test('Database Session 8 matches all 63 Markdown and JSON questions and DB8 pages', () => {
    const headings = [...markdown.matchAll(/^### Question (\d+)$/gm)];
    assert.equal(headings.length, 63);
    assert.equal(reviewed.questions.length, 63);
    assert.equal(questions.length, 63);
    assert.equal(new Set(questions.map(question => question.id)).size, 63);
    assert.equal(reviewed.session, exports.session8.title);
    assert.equal(reviewed.source, 'DB8 (1).pdf');

    for (const [index, heading] of headings.entries()) {
        const number = index + 1;
        const id = `s8-q${String(number).padStart(3, '0')}`;
        const item = reviewed.questions[index];
        const question = questions[index];
        assert.equal(Number(heading[1]), number, 'missing or reordered Markdown question');
        assert.equal(item.id, id, 'missing or reordered JSON question');
        const precedingHeadings = [...markdown.slice(0, heading.index).matchAll(/^## (.+)$/gm)];
        const topic = precedingHeadings.at(-1)?.[1];
        assert.equal(item.topic, topic, `${id}: topic mismatch`);
        const block = markdown.slice(heading.index + heading[0].length,
            headings[index + 1]?.index ?? markdown.length);
        const lines = block.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
        assert.equal(lines[0], item.question, `${id}: prompt mismatch`);
        const options = [...block.matchAll(/^([A-D])\. (.+)$/gm)];
        assert.equal(options.map(([, optionId]) => optionId).join(''), 'ABCD', `${id}: four ordered options required`);
        assert.deepEqual(Object.keys(item.options), ['A', 'B', 'C', 'D']);
        assert.deepEqual(options.map(([, , text]) => text), Object.values(item.options), `${id}: options mismatch`);
        assert.equal(field(block, 'Correct answer', id), `${item.answer}. ${item.options[item.answer]}`);
        assert.equal(field(block, 'Explanation', id), item.explanation);
        assert.equal(field(block, 'Source', id), `\`DB8 (1).pdf\`, PDF page ${item.page}.`);
        assert.deepEqual(lines.slice(1).filter(line => !/^[A-D]\. |^\*\*(Correct answer|Explanation|Source):\*\* |^## /.test(line)),
            [], `${id}: unparsed Markdown content`);
        assert.ok(Number.isInteger(item.page) && item.page >= 1 && item.page <= 34);
        assert.equal(item.source, 'DB8 (1).pdf');
        assert.deepEqual(question, {
            id: `db-${id}`,
            prompt: item.question,
            options: 'ABCD'.split('').map(optionId => ({ id: optionId.toLowerCase(), text: item.options[optionId] })),
            correctOptionId: item.answer.toLowerCase(),
            explanation: item.explanation,
            source: `/references/database-session-8-slides.pdf#page=${item.page}`,
            topic: item.topic,
            sources: question.sources,
        });
        assert.deepEqual(question.sources.map(({ kind, file, pdfPage }) => ({ kind, file, pdfPage })),
            [{ kind: 'lecture', file: 'DB8 (1).pdf', pdfPage: item.page }]);
        assert.ok(question.sources[0].slideNumber > 0 && question.sources[0].slideTitle.trim());
    }

    assert.equal(questions.reduce((count, question) => count + question.options.length, 0), 252);
    assert.equal(fs.readFileSync('public/references/database-session-8-slides.pdf').subarray(0, 5).toString(), '%PDF-');
});
