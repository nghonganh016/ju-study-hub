import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

const cache = new Map();

function load(file) {
    file = path.resolve(file);
    if (cache.has(file)) return cache.get(file);
    const exports = {};
    cache.set(file, exports);
    const localRequire = id => {
        if (id.startsWith('@/') || id.startsWith('.')) {
            const base = id.startsWith('@/') ? path.resolve(id.slice(2)) : path.resolve(path.dirname(file), id);
            const target = [base + '.ts', path.join(base, 'index.ts')].find(fs.existsSync);
            assert.ok(target, `Cannot resolve ${id}`);
            return load(target);
        }
        throw new Error(`Unexpected dependency: ${id}`);
    };
    const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    vm.runInNewContext(code, { exports, require: localRequire }, { filename: file });
    return exports;
}

const { subjects } = load('data/subjects.ts');
const expected = {
    'blockchain/chapter-1': [25, 2, 'b60c492e42603956c03350a5d96b17de3383d6454cf1f8d1284c673a61feb1b6'],
    'blockchain/session-3': [151, 2, '104c53b81957b936c4bfc36ef3b3b0afac52df34c7560dc61f277cae356bdf8b'],
    'blockchain/session-4': [181, 1, '50577e4a6ff89899c6ea417efa58b2ebba5c63287e914d0547f8a20fb72e98ff'],
    'blockchain/session-5': [65, 2, 'd5bf93eed8372a570b84570fd328252177e5c98b7a4ceccd60db961975f4e561'],
    'blockchain/session-6': [83, 0, 'b9a2d868792f4656c24342127fd19cb9110e9bfe7f2953c5cf726d6a2d5c004e'],
    'blockchain/session-7': [68, 0, '0e5938da49c28d449d72c89a3f555c25573721dd9789b5fba983fe90de3efeee'],
    'blockchain/session-8': [80, 0, '3f50ea53ab91916024f5d1d6af8057899f128fb070f7c0fd7eb39139301a9e9e'],
    'database/session-1': [58, 2, 'bac08f7803ee87b92eb9a4305e0ad5dc9f7d56c2509ecacf6eeebfac2fd4d845'],
    'database/session-2': [88, 1, 'e57afd7010a2ce5ea504637fef3f5d0fa925b1599ec13d2cbd300b984d71ab56'],
};

test('quiz chapter counts, revisions and question order match the baseline', () => {
    const chapters = Object.entries(subjects).flatMap(([subjectId, subject]) =>
        subject.chapters.map(chapter => [subjectId, chapter]));
    assert.deepEqual(chapters.map(([subjectId, chapter]) => `${subjectId}/${chapter.id}`).sort(), Object.keys(expected).sort());
    for (const [subjectId, chapter] of chapters) {
        const key = `${subjectId}/${chapter.id}`;
        const [count, revision, idHash] = expected[key];
        assert.equal(chapter.questions.length, count, key);
        assert.equal(chapter.revision, revision, key);
        const actualHash = createHash('sha256').update(JSON.stringify(chapter.questions.map(question => question.id))).digest('hex');
        assert.equal(actualHash, idHash, `${key}: question IDs or order changed`);
    }
});

test('every rendered question has the supported schema and valid answer IDs', () => {
    const seenIds = new Set();
    for (const [subjectId, subject] of Object.entries(subjects)) {
        for (const chapter of subject.chapters) {
            for (const question of chapter.questions) {
                const location = `${subjectId}/${chapter.id}/${question.id}`;
                const keys = ['id', 'prompt', 'options', 'correctOptionId', 'explanation'];
                if (Object.hasOwn(question, 'source')) keys.push('source');
                if (Object.hasOwn(question, 'topic')) keys.push('topic');
                if (Object.hasOwn(question, 'difficulty')) keys.push('difficulty');
                if (Object.hasOwn(question, 'sources')) keys.push('sources');
                assert.deepEqual(Object.keys(question), keys, location);
                for (const field of ['id', 'prompt', 'correctOptionId', 'explanation']) {
                    assert.ok(typeof question[field] === 'string' && question[field].trim(), `${location}: empty ${field}`);
                }
                assert.ok(!seenIds.has(question.id), `${location}: duplicate question ID`);
                seenIds.add(question.id);
                assert.ok(Array.isArray(question.options) && question.options.length > 0, `${location}: empty options`);
                const optionIds = new Set();
                for (const option of question.options) {
                    assert.deepEqual(Object.keys(option), ['id', 'text'], location);
                    assert.ok(typeof option.id === 'string' && option.id.trim(), `${location}: empty option ID`);
                    assert.ok(typeof option.text === 'string' && option.text.trim(), `${location}: empty option text`);
                    assert.ok(!optionIds.has(option.id), `${location}: duplicate option ID`);
                    optionIds.add(option.id);
                }
                assert.ok(optionIds.has(question.correctOptionId), `${location}: invalid correctOptionId`);
                if (Object.hasOwn(question, 'source')) {
                    assert.ok(typeof question.source === 'string' && question.source.trim(), `${location}: empty source`);
                }
                if (Object.hasOwn(question, 'topic')) {
                    assert.ok(typeof question.topic === 'string' && question.topic.trim(), `${location}: empty topic`);
                }
                if (Object.hasOwn(question, 'difficulty')) {
                    assert.ok(['easy', 'medium', 'hard'].includes(question.difficulty), `${location}: invalid difficulty`);
                }
                if (Object.hasOwn(question, 'sources')) {
                    assert.ok(Array.isArray(question.sources) && question.sources.length > 0, `${location}: empty sources`);
                }
            }
        }
    }
    assert.equal(seenIds.size, 799);
});

test('Database Session 1 preserves supplied questions and links to actual lecture pages', () => {
    const session1 = subjects.database.chapters.find(chapter => chapter.id === 'session-1');
    assert.ok(session1);
    const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
    const preserved = session1.questions.map(({ id, prompt, options, correctOptionId, explanation, topic, difficulty, sources }) =>
        ({ id, prompt, options, correctOptionId, explanation, topic, difficulty, sources }));
    assert.equal(digest(preserved), 'fd3d34ec299a7b87da18f00dd5cecfe0b6e423d8021df3ff63912f91c2831401');
    assert.equal(session1.questions.flatMap(question => question.sources).length, 91);
    const pdf = path.resolve('public/references/database-session-1-slides.pdf');
    assert.equal(fs.readFileSync(pdf).subarray(0, 5).toString(), '%PDF-');
    for (const question of session1.questions) {
        const lecture = question.sources.find(source => source.kind === 'lecture');
        assert.ok(lecture, question.id);
        assert.equal(lecture.file, 'AdvanceDB_1.pdf');
        assert.ok(Number.isInteger(lecture.pdfPage) && lecture.pdfPage >= 1 && lecture.pdfPage <= 30, question.id);
        assert.equal(question.source, `/references/database-session-1-slides.pdf#page=${lecture.pdfPage}`);
        for (const source of question.sources.filter(source => source.kind === 'documentation')) {
            assert.equal(new URL(source.url).protocol, 'https:');
        }
    }
    assert.equal(Object.hasOwn(load('data/database/session-1.ts'), 'questions'), false);
});

test('Database Session 2 uses direct Question objects and preserves its content', () => {
    const session2 = subjects.database.chapters.find(chapter => chapter.id === 'session-2');
    const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
    assert.equal(digest(session2.questions), 'e896a8e19cea345eef5ea3ab3be2f9dda2e1ee11b9336fa0db012505218f72cf');
    assert.equal(session2.questions.length, 88);
    assert.ok(session2.questions.every(question => typeof question.topic === 'string' && question.topic.trim()));
    assert.equal(Object.hasOwn(load('data/database/session-2.ts'), 'questions'), false);
});

test('removed test chapter stays unresolved while current Database references work', () => {
    const session2 = subjects.database.chapters.find(chapter => chapter.id === 'session-2');
    const progress = load('lib/quiz-progress.ts');
    const bookmarks = load('lib/bookmarks.ts');
    const bookmarkCatalog = load('lib/bookmark-catalog.ts');
    const mistakes = load('lib/mistakes.ts');
    const rounds = load('lib/review-round.ts');
    const plain = value => JSON.parse(JSON.stringify(value));
    const refs = [
        { subjectId: 'database', chapterId: 'chapter-2', questionId: 'db-ch2-1-q01' },
        { subjectId: 'database', chapterId: 'session-2', questionId: 'db-s2-original-01' },
    ];
    const sections = [{ id: 'database', title: 'Database', chapters: [
        { id: 'session-2', title: session2.title },
    ] }];
    const catalog = [
        { ...refs[1], subjectTitle: 'Database', chapterTitle: session2.title, prompt: session2.questions[0].prompt },
    ];
    const savedRefs = JSON.stringify({ version: 1, items: refs });
    const parsedBookmarks = plain(bookmarks.parseBookmarks(savedRefs));
    assert.deepEqual(parsedBookmarks, refs);
    const entries = bookmarkCatalog.resolveBookmarkEntries(parsedBookmarks, catalog, sections);
    assert.equal(entries[0].missing, true);
    assert.equal(entries[0].href, null);
    assert.equal(entries[1].missing, false);
    assert.ok(entries[1].href?.includes(entries[1].questionId));
    assert.deepEqual(plain(mistakes.parseMistakes(savedRefs)), refs);
    const round = rounds.parseReviewRound(JSON.stringify({
        version: 1, scope: { subjectId: 'database', chapterId: 'session-2' }, items: refs,
    }), sections);
    assert.deepEqual(plain(round.scope), { subjectId: 'database', chapterId: 'session-2' });
    assert.deepEqual(plain(rounds.createReviewRound(round.refs, catalog, round.scope)).map(item => item.questionId),
        ['db-s2-original-01']);
    assert.equal(progress.quizProgressKey('database', 'chapter-2'), 'ju-study-hub:quiz-progress:database:chapter-2');
    assert.equal(progress.quizProgressKey('database', 'session-2'), 'ju-study-hub:quiz-progress:database:session-2');
    const storedProgress = JSON.stringify({ version: 1, currentQuestionId: 'db-s2-original-01', answers: {
        'db-s2-original-01': { optionId: 'c', isSubmitted: true },
    } });
    assert.deepEqual(plain(progress.restoreProgress(storedProgress, session2.questions)), {
        currentIndex: 0, answers: { 'db-s2-original-01': { optionId: 'c', isSubmitted: true } },
    });
    const chapter2Progress = JSON.stringify({ version: 1, currentQuestionId: 'db-ch2-1-q01', answers: {
        'db-ch2-1-q01': { optionId: 'b', isSubmitted: true },
    } });
    assert.equal(progress.summarizeProgress(chapter2Progress, session2.questions).submitted, 0);
});
