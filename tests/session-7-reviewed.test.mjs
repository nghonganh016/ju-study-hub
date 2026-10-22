import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

const markdown = fs.readFileSync('docs/session-7-rbac-sqli-quiz.md', 'utf8');
const reviewed = JSON.parse(fs.readFileSync('docs/session-7-rbac-sqli-quiz.json', 'utf8'));
const exports = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('data/database/session-7.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, { exports });
const questions = JSON.parse(JSON.stringify(exports.session7.questions));

function field(block, name, id) {
    const values = [...block.matchAll(new RegExp(`^\\*\\*${name}:\\*\\* (.+)$`, 'gm'))];
    assert.equal(values.length, 1, `${id}: expected one ${name}`);
    assert.ok(values[0][1].trim(), `${id}: empty ${name}`);
    return values[0][1];
}

test('Database Session 7 matches all 49 Markdown and JSON questions and DB7 pages', () => {
    const headings = [...markdown.matchAll(/^### Q(\d+)\. (.+)$/gm)];
    assert.equal(headings.length, 49);
    assert.equal(reviewed.length, 49);
    assert.equal(questions.length, 49);
    assert.equal(new Set(questions.map(question => question.id)).size, 49);

    for (const [index, heading] of headings.entries()) {
        const number = index + 1;
        const id = `Q${number}`;
        const item = reviewed[index];
        const question = questions[index];
        assert.equal(Number(heading[1]), number, 'missing or reordered Markdown question');
        assert.equal(item.n, number, 'missing or reordered JSON question');
        assert.equal(heading[2], item.q, `${id}: prompt mismatch between sources`);
        const block = markdown.slice(heading.index + heading[0].length,
            headings[index + 1]?.index ?? markdown.length);
        const options = [...block.matchAll(/^([A-D])\. (.+)$/gm)];
        assert.equal(options.map(([, optionId]) => optionId).join(''), 'ABCD', `${id}: four ordered options required`);
        assert.deepEqual(options.map(([, , text]) => text), item.options, `${id}: options mismatch between sources`);
        assert.equal(field(block, 'Correct answer', id), item.answer);
        assert.equal(field(block, 'Explanation', id), item.explanation);
        assert.equal(field(block, 'Slide reference', id), `\`DB7.pdf\`, PDF page ${item.page}.`);
        const remaining = block.split(/\r?\n/).map(line => line.trim())
            .filter(line => line && !/^[A-D]\. |^\*\*(Correct answer|Explanation|Slide reference):\*\* |^## Part B:/.test(line));
        assert.deepEqual(remaining, [], `${id}: unparsed Markdown content`);
        assert.ok(Number.isInteger(item.page) && item.page >= 1 && item.page <= 33);
        assert.deepEqual(question, {
            id: `db-s7-q${String(number).padStart(3, '0')}`,
            prompt: item.q.replaceAll('$1', '\\$1').replaceAll('$2', '\\$2'),
            options: item.options.map((text, optionIndex) => ({ id: 'abcd'[optionIndex], text })),
            correctOptionId: item.answer.toLowerCase(),
            explanation: item.explanation,
            source: `/references/database-session-7-slides.pdf#page=${item.page}`,
            topic: item.topic,
            sources: question.sources,
        });
        assert.deepEqual(question.sources.map(({ kind, file, pdfPage }) => ({ kind, file, pdfPage })),
            [{ kind: 'lecture', file: 'DB7.pdf', pdfPage: item.page }]);
        assert.ok(question.sources[0].slideNumber > 0 && question.sources[0].slideTitle.trim());
    }

    assert.equal(questions.reduce((count, question) => count + question.options.length, 0), 196);
    assert.equal(fs.readFileSync('public/references/database-session-7-slides.pdf').subarray(0, 5).toString(), '%PDF-');
});
