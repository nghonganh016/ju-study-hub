import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

const reviewed = fs.readFileSync('docs/session-2-mcq-reviewed.md', 'utf8');
const exports = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('data/database/session-2.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, { exports });
const questions = JSON.parse(JSON.stringify(exports.session2.questions));

// An old answer may be saved for any option, so a changed prompt or option set gets a new identity.
const reidentified = new Set([
    'db-s2-original-04', 'db-s2-original-07', 'db-s2-original-09', 'db-s2-008',
    'db-s2-014', 'db-s2-024', 'db-s2-029', 'db-s2-034', 'db-s2-036',
    'db-s2-037', 'db-s2-038', 'db-s2-046', 'db-s2-047', 'db-s2-051',
    'db-s2-053', 'db-s2-058',
]);
const removed = new Set([
    'db-s2-original-01', 'db-s2-original-03', 'db-s2-original-05', 'db-s2-original-06',
    'db-s2-original-13', 'db-s2-original-14', 'db-s2-original-15', 'db-s2-original-17',
    'db-s2-original-20', 'db-s2-original-21', 'db-s2-001', 'db-s2-003', 'db-s2-004',
    'db-s2-005', 'db-s2-007', 'db-s2-009', 'db-s2-010', 'db-s2-012', 'db-s2-013',
    'db-s2-015', 'db-s2-019', 'db-s2-022', 'db-s2-023', 'db-s2-025', 'db-s2-028',
    'db-s2-032', 'db-s2-035', 'db-s2-039', 'db-s2-042', 'db-s2-045', 'db-s2-048',
    'db-s2-054', 'db-s2-056', 'db-s2-059', 'db-s2-062',
]);

function field(block, name) {
    const matches = [...block.matchAll(new RegExp(`^\\*\\*${name}:\\*\\* (.*)$`, 'gm'))];
    assert.equal(matches.length, 1, `expected one ${name}`);
    assert.ok(matches[0][1].trim(), `${name} is empty`);
    return matches[0][1];
}

function parseReviewed() {
    const declared = /\*\*Questions:\*\* (\d+)\./.exec(reviewed);
    assert.ok(declared, 'missing declared count');
    const headings = [...reviewed.matchAll(/^## Q(\d+) · `([^`]+)`\s*$/gm)];
    assert.equal(headings.length, Number(declared[1]), 'question count differs from Markdown heading count');
    const ids = new Set();
    return headings.map((heading, index) => {
        assert.equal(Number(heading[1]), index + 1, 'missing or reordered question heading');
        assert.ok(!ids.has(heading[2]), `duplicate source ID: ${heading[2]}`);
        ids.add(heading[2]);
        const block = reviewed.slice(heading.index + heading[0].length, headings[index + 1]?.index ?? reviewed.length);
        const options = [...block.matchAll(/^([A-D])\. (.*)$/gm)]
            .map(([, id, text]) => ({ id: id.toLowerCase(), text }));
        assert.equal(options.map(option => option.id).join(''), 'abcd', `${heading[2]}: four ordered options required`);
        assert.ok(options.every(option => option.text.trim()), `${heading[2]}: empty option`);
        const correctOptionId = field(block, 'Correct answer').toLowerCase();
        assert.ok(options.some(option => option.id === correctOptionId), `${heading[2]}: invalid answer`);
        const reference = /^PDF p\. (\d+) \(\*(.*)\*\)\.$/.exec(field(block, 'Slide reference'));
        assert.ok(reference && Number(reference[1]) > 0 && reference[2].trim(), `${heading[2]}: invalid reference`);
        return {
            id: reidentified.has(heading[2]) ? `${heading[2]}-reviewed` : heading[2],
            prompt: field(block, 'Question'),
            options,
            correctOptionId,
            explanation: field(block, 'Explanation'),
            source: `/references/database-session-2-slides.pdf#page=${reference[1]}`,
            topic: reference[2],
        };
    });
}

test('all 57 reviewed questions and references match the Markdown exactly', () => {
    assert.deepEqual(questions, parseReviewed());
    assert.equal(new Set(questions.map(question => question.id)).size, questions.length);
    assert.ok(questions.every(question => question.options.length === 4
        && question.options.filter(option => option.id === question.correctOptionId).length === 1));
    assert.equal(fs.readFileSync('public/references/database-session-2-slides.pdf').subarray(0, 5).toString(), '%PDF-');
});

test('changed and removed Session 2 IDs cannot resolve to different questions', () => {
    const current = new Set(questions.map(question => question.id));
    assert.equal(reidentified.size, 16);
    assert.equal(removed.size, 35);
    for (const id of [...reidentified, ...removed]) assert.ok(!current.has(id), `${id}: retired ID reused`);
    for (const id of reidentified) assert.ok(current.has(`${id}-reviewed`), `${id}: new identity missing`);
});
