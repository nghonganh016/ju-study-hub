import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

const markdown = fs.readFileSync('docs/session-9-mongodb-quiz.md', 'utf8');
const reviewed = JSON.parse(fs.readFileSync('docs/session-9-mongodb-quiz.json', 'utf8'));
const exports = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('data/database/session-9.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, { exports });
const questions = JSON.parse(JSON.stringify(exports.session9.questions));

function field(block, pattern, id, name) {
    const values = [...block.matchAll(pattern)];
    assert.equal(values.length, 1, `${id}: expected one ${name}`);
    assert.ok(values[0][1].trim(), `${id}: empty ${name}`);
    return values[0][1];
}

test('Database Session 9 matches all 62 Markdown and JSON questions and lecture pages', () => {
    const headings = [...markdown.matchAll(/^### Q(\d+)\. (.+)$/gm)];
    assert.equal(headings.length, 62);
    assert.equal(reviewed.totalQuestions, 62);
    assert.equal(reviewed.questions.length, 62);
    assert.equal(questions.length, 62);
    assert.equal(new Set(questions.map(question => question.id)).size, 62);
    assert.equal(exports.session9.title, `Session 9: ${reviewed.title}`);
    assert.equal(reviewed.source, 'DB9_MongoDB.pdf');

    for (const [index, heading] of headings.entries()) {
        const number = index + 1;
        const id = `db-s9-q${String(number).padStart(3, '0')}`;
        const item = reviewed.questions[index];
        const question = questions[index];
        assert.equal(Number(heading[1]), number, 'missing or reordered Markdown question');
        assert.equal(item.id, id, 'missing or reordered JSON question');
        assert.equal(heading[2], item.question, `${id}: prompt mismatch`);
        const topic = [...markdown.slice(0, heading.index).matchAll(/^## (.+)$/gm)].at(-1)?.[1];
        assert.equal(item.topic, topic, `${id}: topic mismatch`);
        const block = markdown.slice(heading.index + heading[0].length,
            headings[index + 1]?.index ?? markdown.indexOf('\n---', heading.index));
        const options = [...block.matchAll(/^([A-D])\. (.+)$/gm)];
        assert.equal(options.map(([, optionId]) => optionId).join(''), 'ABCD', `${id}: four ordered options required`);
        assert.deepEqual(item.options.map(option => option.id), ['A', 'B', 'C', 'D']);
        assert.deepEqual(options.map(([, optionId, text]) => ({ id: optionId, text })), item.options);
        assert.equal(field(block, /^\*\*Answer: ([A-D])\*\*$/gm, id, 'answer'), item.answer);
        assert.equal(field(block, /^\*\*Explanation:\*\* (.+)$/gm, id, 'explanation'), item.explanation);
        const pages = item.source.pdfPages;
        assert.ok(Array.isArray(pages) && pages.length === 1 && Number.isInteger(pages[0])
            && pages[0] >= 1 && pages[0] <= 43, `${id}: invalid PDF page`);
        assert.equal(field(block, /^\*\*Source:\*\* (.+)$/gm, id, 'source'),
            `DB9_MongoDB.pdf, PDF page(s) ${pages.join(', ')}.`);
        assert.equal(item.source.file, 'DB9_MongoDB.pdf');
        const remaining = block.split(/\r?\n/).map(line => line.trim()).filter(line => line
            && !/^[A-D]\. |^\*\*Answer: [A-D]\*\*$|^\*\*(Explanation|Source):\*\* |^## /.test(line));
        assert.deepEqual(remaining, [], `${id}: unparsed Markdown content`);
        const display = text => text.replaceAll('$', '\\$');
        assert.deepEqual(question, {
            id,
            prompt: display(item.question),
            options: item.options.map(option => ({ id: option.id.toLowerCase(), text: display(option.text) })),
            correctOptionId: item.answer.toLowerCase(),
            explanation: display(item.explanation),
            source: `/references/database-session-9-slides.pdf#page=${pages[0]}`,
            topic: item.topic,
            sources: question.sources,
        });
        assert.deepEqual(question.sources.map(({ kind, file, pdfPage }) => ({ kind, file, pdfPage })),
            [{ kind: 'lecture', file: 'DB9_MongoDB.pdf', pdfPage: pages[0] }]);
        assert.ok(question.sources[0].slideNumber > 0 && question.sources[0].slideTitle.trim());
    }

    assert.equal(questions.reduce((count, question) => count + question.options.length, 0), 248);
    assert.equal(fs.readFileSync('public/references/database-session-9-slides.pdf').subarray(0, 5).toString(), '%PDF-');
});
