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
    'database/session-1': [58, 3, 'bac08f7803ee87b92eb9a4305e0ad5dc9f7d56c2509ecacf6eeebfac2fd4d845'],
    'database/session-2': [57, 2, '9f5465bd5190fc5883fa32696dbdd9bb009cca669875d2db68b1cfd4f2db1090'],
    'database/session-3': [58, 1, 'b40aa51c29ba47c58bae3d66952614951cd3b552559e4368570c2de33218e1a1'],
    'database/session-4': [56, 1, '770d9e3f1b799995010a288e1622dc2c60a96851b8c8bc5536e433d04c9b7fa3'],
    'database/session-5': [56, 1, '52aec9562bd05cbbfce8536e37dbf91e81673cdb6c617020e6c45d2074786601'],
    'database/session-6': [50, 1, 'e9140610000b13c44a3eb1f13772816eaf9738c70bc80c2aeb25178f8740434b'],
    'database/session-7': [49, 1, '5c225e013fcd695c2d499cf204bf966b08b67dc99b073d7a656bc72c8c2f6b0b'],
    'database/session-8': [63, 1, 'a930cfb21d1131739efccbf75d6ba0ec83e461664cce44c1fd2536d1e8578bc8'],
    'database/sample-midterm-test': [40, 1, '07c8cdcfb25dcbc6a3a9ca550d4d7c08d54f71ce517506a97a6a0bcf4dfdabd9'],
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
                assert.ok(Array.isArray(question.options) && question.options.length === 4, `${location}: expected four options`);
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
    assert.equal(seenIds.size, 1140);
});

test('sample midterm has all 40 MCQs, validated answers and available lecture sources', () => {
    const chapter = subjects.database.chapters.find(item => item.id === 'sample-midterm-test');
    assert.ok(chapter);
    assert.deepEqual(Array.from(chapter.questions, item => item.id),
        Array.from({ length: 40 }, (_, index) => `db-midterm-q${String(index + 1).padStart(2, '0')}`));
    const answerKey = ['c', 'd', 'b', 'c', 'a', 'a', 'c', 'c', 'a', 'b',
        'b', 'c', 'a', 'd', 'b', 'b', 'd', 'b', 'b', 'a',
        'c', 'd', 'd', 'd', 'a', 'b', 'd', 'd', 'c', 'b',
        'd', 'd', 'd', 'a', 'a', 'b', 'c', 'd', 'c', 'b'];
    assert.deepEqual(Array.from(chapter.questions, item => item.correctOptionId), answerKey);
    for (const question of chapter.questions) {
        assert.deepEqual(Array.from(question.options, option => option.id), ['a', 'b', 'c', 'd']);
        assert.equal(question.sources.length, 1);
        const source = question.sources[0];
        assert.equal(source.kind, 'lecture');
        assert.ok(Number.isInteger(source.pdfPage) && source.pdfPage > 0);
        assert.ok(Number.isInteger(source.slideNumber) && source.slideNumber > 0);
        const asset = question.source.split('#')[0];
        assert.ok(fs.existsSync(path.join('public', asset)), asset);
        assert.equal(question.source.endsWith(`#page=${source.pdfPage}`), true);
    }
});

test('sample midterm progress and references stay scoped to the new chapter', () => {
    const chapter = subjects.database.chapters.find(item => item.id === 'sample-midterm-test');
    const progress = load('lib/quiz-progress.ts');
    const bookmarks = load('lib/bookmarks.ts');
    const bookmarkCatalog = load('lib/bookmark-catalog.ts');
    const mistakes = load('lib/mistakes.ts');
    const rounds = load('lib/review-round.ts');
    const current = { subjectId: 'database', chapterId: chapter.id, questionId: chapter.questions[0].id };
    const foreign = { subjectId: 'database', chapterId: 'session-3', questionId: chapter.questions[0].id };
    const retired = { ...current, questionId: 'db-midterm-retired' };
    assert.notEqual(progress.quizProgressKey('database', chapter.id), progress.quizProgressKey('database', 'session-3'));
    const raw = JSON.stringify({ version: 1, currentQuestionId: retired.questionId, answers: {
        [current.questionId]: { optionId: 'a', isSubmitted: true },
        [retired.questionId]: { optionId: 'b', isSubmitted: true },
    } });
    assert.deepEqual(JSON.parse(JSON.stringify(progress.restoreProgress(raw, chapter.questions))),
        { currentIndex: 0, answers: { [current.questionId]: { optionId: 'a', isSubmitted: true } } });
    assert.equal(progress.summarizeProgress(raw, chapter.questions).submitted, 1);
    const refs = [current, foreign, retired];
    const catalog = chapter.questions.map(question => ({ ...current, questionId: question.id,
        subjectTitle: 'Database', chapterTitle: chapter.title, prompt: question.prompt, question }));
    const sections = [{ id: 'database', title: 'Database', chapters: [{ id: chapter.id, title: chapter.title }] }];
    const entries = bookmarkCatalog.resolveBookmarkEntries(bookmarks.parseBookmarks(JSON.stringify({ version: 1, items: refs })), catalog, sections);
    assert.deepEqual(JSON.parse(JSON.stringify(entries.map(entry => entry.missing))), [false, true, true]);
    assert.ok(entries[0].href?.includes(current.questionId));
    assert.deepEqual(JSON.parse(JSON.stringify(mistakes.parseMistakes(JSON.stringify({ version: 1, items: refs })))), refs);
    assert.deepEqual(JSON.parse(JSON.stringify(rounds.createReviewRound(refs, catalog, rounds.ALL_SCOPE).map(item => item.questionId))), [current.questionId]);
});

test('new Database Session 4 isolates progress, bookmarks and Review by current IDs', () => {
    const chapter = subjects.database.chapters.find(item => item.id === 'session-4');
    assert.ok(chapter);
    const progress = load('lib/quiz-progress.ts');
    const bookmarks = load('lib/bookmarks.ts');
    const bookmarkCatalog = load('lib/bookmark-catalog.ts');
    const mistakes = load('lib/mistakes.ts');
    const rounds = load('lib/review-round.ts');
    const ref = questionId => ({ subjectId: 'database', chapterId: chapter.id, questionId });
    const current = ref('db-s4-q001');
    const retired = ref('db-s4-retired');
    const foreign = { ...current, chapterId: 'sample-midterm-test' };
    const raw = JSON.stringify({ version: 1, currentQuestionId: retired.questionId, answers: {
        [current.questionId]: { optionId: 'b', isSubmitted: true },
        [retired.questionId]: { optionId: 'a', isSubmitted: true },
    } });
    assert.notEqual(progress.quizProgressKey('database', chapter.id), progress.quizProgressKey('database', 'session-3'));
    assert.deepEqual(JSON.parse(JSON.stringify(progress.restoreProgress(raw, chapter.questions))), {
        currentIndex: 0, answers: { [current.questionId]: { optionId: 'b', isSubmitted: true } },
    });
    const refs = [current, retired, foreign];
    const catalog = chapter.questions.map(question => ({ ...ref(question.id),
        subjectTitle: 'Database', chapterTitle: chapter.title, prompt: question.prompt, question }));
    const sections = [{ id: 'database', title: 'Database', chapters: [{ id: chapter.id, title: chapter.title }] }];
    const entries = bookmarkCatalog.resolveBookmarkEntries(bookmarks.parseBookmarks(JSON.stringify({ version: 1, items: refs })), catalog, sections);
    assert.deepEqual(JSON.parse(JSON.stringify(entries.map(entry => entry.missing))), [false, true, true]);
    assert.ok(entries[0].href?.includes(current.questionId));
    assert.deepEqual(JSON.parse(JSON.stringify(mistakes.parseMistakes(JSON.stringify({ version: 1, items: refs })))), refs);
    assert.deepEqual(JSON.parse(JSON.stringify(rounds.createReviewRound(refs, catalog, rounds.ALL_SCOPE).map(item => item.questionId))), [current.questionId]);
});

test('Database Session 5 progress and references use only current chapter question IDs', () => {
    const chapter = subjects.database.chapters.find(item => item.id === 'session-5');
    assert.ok(chapter);
    const progress = load('lib/quiz-progress.ts');
    const bookmarks = load('lib/bookmarks.ts');
    const bookmarkCatalog = load('lib/bookmark-catalog.ts');
    const mistakes = load('lib/mistakes.ts');
    const rounds = load('lib/review-round.ts');
    const ref = questionId => ({ subjectId: 'database', chapterId: chapter.id, questionId });
    const current = ref(chapter.questions[0].id);
    const retired = ref('db-s5-retired');
    const foreign = { ...current, chapterId: 'session-4' };
    assert.notEqual(progress.quizProgressKey('database', chapter.id), progress.quizProgressKey('database', 'session-4'));
    const raw = JSON.stringify({ version: 1, currentQuestionId: retired.questionId, answers: {
        [current.questionId]: { optionId: 'c', isSubmitted: true },
        [retired.questionId]: { optionId: 'a', isSubmitted: true },
    } });
    assert.deepEqual(JSON.parse(JSON.stringify(progress.restoreProgress(raw, chapter.questions))), {
        currentIndex: 0, answers: { [current.questionId]: { optionId: 'c', isSubmitted: true } },
    });
    assert.equal(progress.summarizeProgress(raw, chapter.questions).submitted, 1);
    const refs = [current, retired, foreign];
    const catalog = chapter.questions.map(question => ({ ...ref(question.id),
        subjectTitle: 'Database', chapterTitle: chapter.title, prompt: question.prompt, question }));
    const sections = [{ id: 'database', title: 'Database', chapters: [{ id: chapter.id, title: chapter.title }] }];
    const entries = bookmarkCatalog.resolveBookmarkEntries(bookmarks.parseBookmarks(JSON.stringify({ version: 1, items: refs })), catalog, sections);
    assert.deepEqual(JSON.parse(JSON.stringify(entries.map(entry => entry.missing))), [false, true, true]);
    assert.ok(entries[0].href?.includes(current.questionId));
    assert.deepEqual(JSON.parse(JSON.stringify(mistakes.parseMistakes(JSON.stringify({ version: 1, items: refs })))), refs);
    assert.deepEqual(JSON.parse(JSON.stringify(rounds.createReviewRound(refs, catalog, rounds.ALL_SCOPE).map(item => item.questionId))), [current.questionId]);
});

test('Database Session 6 isolates progress, bookmarks and Review from old or foreign IDs', () => {
    const chapter = subjects.database.chapters.find(item => item.id === 'session-6');
    assert.ok(chapter);
    const progress = load('lib/quiz-progress.ts');
    const bookmarks = load('lib/bookmarks.ts');
    const bookmarkCatalog = load('lib/bookmark-catalog.ts');
    const mistakes = load('lib/mistakes.ts');
    const rounds = load('lib/review-round.ts');
    const current = { subjectId: 'database', chapterId: chapter.id, questionId: chapter.questions[0].id };
    const retired = { ...current, questionId: 'db-s6-retired' };
    const foreign = { ...current, chapterId: 'session-5' };
    assert.notEqual(progress.quizProgressKey('database', chapter.id), progress.quizProgressKey('database', 'session-5'));
    const raw = JSON.stringify({ version: 1, currentQuestionId: retired.questionId, answers: {
        [current.questionId]: { optionId: 'b', isSubmitted: true },
        [retired.questionId]: { optionId: 'a', isSubmitted: true },
    } });
    assert.deepEqual(JSON.parse(JSON.stringify(progress.restoreProgress(raw, chapter.questions))), {
        currentIndex: 0, answers: { [current.questionId]: { optionId: 'b', isSubmitted: true } },
    });
    assert.equal(progress.summarizeProgress(raw, chapter.questions).submitted, 1);
    const refs = [current, retired, foreign];
    const catalog = chapter.questions.map(question => ({ ...current, questionId: question.id,
        subjectTitle: 'Database', chapterTitle: chapter.title, prompt: question.prompt, question }));
    const sections = [{ id: 'database', title: 'Database', chapters: [{ id: chapter.id, title: chapter.title }] }];
    const entries = bookmarkCatalog.resolveBookmarkEntries(bookmarks.parseBookmarks(JSON.stringify({ version: 1, items: refs })), catalog, sections);
    assert.deepEqual(JSON.parse(JSON.stringify(entries.map(entry => entry.missing))), [false, true, true]);
    assert.ok(entries[0].href?.includes(current.questionId));
    assert.deepEqual(JSON.parse(JSON.stringify(mistakes.parseMistakes(JSON.stringify({ version: 1, items: refs })))), refs);
    assert.deepEqual(JSON.parse(JSON.stringify(rounds.createReviewRound(refs, catalog, rounds.ALL_SCOPE).map(item => item.questionId))), [current.questionId]);
});

test('Database Session 7 keeps progress and study-mode references scoped to current IDs', () => {
    const chapter = subjects.database.chapters.find(item => item.id === 'session-7');
    assert.ok(chapter);
    const progress = load('lib/quiz-progress.ts');
    const bookmarks = load('lib/bookmarks.ts');
    const bookmarkCatalog = load('lib/bookmark-catalog.ts');
    const mistakes = load('lib/mistakes.ts');
    const rounds = load('lib/review-round.ts');
    const practice = load('lib/bookmark-practice.ts');
    const exam = load('lib/exam.ts');
    const current = { subjectId: 'database', chapterId: chapter.id, questionId: chapter.questions[0].id };
    const retired = { ...current, questionId: 'db-s7-retired' };
    const foreign = { ...current, chapterId: 'session-6' };
    assert.notEqual(progress.quizProgressKey('database', chapter.id), progress.quizProgressKey('database', 'session-6'));
    const raw = JSON.stringify({ version: 1, currentQuestionId: retired.questionId, answers: {
        [current.questionId]: { optionId: 'c', isSubmitted: true },
        [retired.questionId]: { optionId: 'a', isSubmitted: true },
    } });
    assert.deepEqual(JSON.parse(JSON.stringify(progress.restoreProgress(raw, chapter.questions))), {
        currentIndex: 0, answers: { [current.questionId]: { optionId: 'c', isSubmitted: true } },
    });
    const refs = [current, retired, foreign];
    const catalog = chapter.questions.map(question => ({ ...current, questionId: question.id,
        subjectTitle: 'Database', chapterTitle: chapter.title, contentRevision: chapter.revision,
        prompt: question.prompt, question }));
    const sections = [{ id: 'database', title: 'Database', chapters: [{ id: chapter.id, title: chapter.title }] }];
    const entries = bookmarkCatalog.resolveBookmarkEntries(bookmarks.parseBookmarks(JSON.stringify({ version: 1, items: refs })), catalog, sections);
    assert.deepEqual(JSON.parse(JSON.stringify(entries.map(entry => entry.missing))), [false, true, true]);
    assert.deepEqual(JSON.parse(JSON.stringify(mistakes.parseMistakes(JSON.stringify({ version: 1, items: refs })))), refs);
    assert.deepEqual(JSON.parse(JSON.stringify(rounds.createReviewRound(refs, catalog, rounds.ALL_SCOPE).map(item => item.questionId))), [current.questionId]);
    assert.deepEqual(JSON.parse(JSON.stringify(practice.selectPracticeItems(refs, catalog, { subjectId: 'database', chapterId: chapter.id })
        .map(item => item.questionId))), [current.questionId]);
    assert.equal(exam.examPool(catalog, { subjectId: 'database', chapterId: chapter.id, count: 'all', minutes: null }).length, 49);
});

test('Database Session 8 keeps progress and study-mode references scoped to current IDs', () => {
    const chapter = subjects.database.chapters.find(item => item.id === 'session-8');
    assert.ok(chapter);
    const progress = load('lib/quiz-progress.ts');
    const bookmarks = load('lib/bookmarks.ts');
    const bookmarkCatalog = load('lib/bookmark-catalog.ts');
    const mistakes = load('lib/mistakes.ts');
    const rounds = load('lib/review-round.ts');
    const practice = load('lib/bookmark-practice.ts');
    const exam = load('lib/exam.ts');
    const current = { subjectId: 'database', chapterId: chapter.id, questionId: chapter.questions[0].id };
    const retired = { ...current, questionId: 'db-s8-retired' };
    const foreign = { ...current, chapterId: 'session-7' };
    assert.notEqual(progress.quizProgressKey('database', chapter.id), progress.quizProgressKey('database', 'session-7'));
    const raw = JSON.stringify({ version: 1, currentQuestionId: retired.questionId, answers: {
        [current.questionId]: { optionId: 'b', isSubmitted: true },
        [retired.questionId]: { optionId: 'a', isSubmitted: true },
    } });
    assert.deepEqual(JSON.parse(JSON.stringify(progress.restoreProgress(raw, chapter.questions))), {
        currentIndex: 0, answers: { [current.questionId]: { optionId: 'b', isSubmitted: true } },
    });
    assert.equal(progress.summarizeProgress(raw, chapter.questions).submitted, 1);
    const refs = [current, retired, foreign];
    const catalog = chapter.questions.map(question => ({ ...current, questionId: question.id,
        subjectTitle: 'Database', chapterTitle: chapter.title, contentRevision: chapter.revision,
        prompt: question.prompt, question }));
    const sections = [{ id: 'database', title: 'Database', chapters: [{ id: chapter.id, title: chapter.title }] }];
    const entries = bookmarkCatalog.resolveBookmarkEntries(bookmarks.parseBookmarks(JSON.stringify({ version: 1, items: refs })), catalog, sections);
    assert.deepEqual(JSON.parse(JSON.stringify(entries.map(entry => entry.missing))), [false, true, true]);
    assert.deepEqual(JSON.parse(JSON.stringify(mistakes.parseMistakes(JSON.stringify({ version: 1, items: refs })))), refs);
    assert.deepEqual(JSON.parse(JSON.stringify(rounds.createReviewRound(refs, catalog, rounds.ALL_SCOPE).map(item => item.questionId))), [current.questionId]);
    assert.deepEqual(JSON.parse(JSON.stringify(practice.selectPracticeItems(refs, catalog, { subjectId: 'database', chapterId: chapter.id })
        .map(item => item.questionId))), [current.questionId]);
    assert.equal(exam.examPool(catalog, { subjectId: 'database', chapterId: chapter.id, count: 'all', minutes: null }).length, 63);
});

test('Database Session 1 preserves supplied questions and links to actual lecture pages', () => {
    const session1 = subjects.database.chapters.find(chapter => chapter.id === 'session-1');
    assert.ok(session1);
    const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
    const preserved = session1.questions.map(({ id, prompt, options, correctOptionId, explanation, topic, difficulty, sources }) =>
        ({ id, prompt, options, correctOptionId, explanation, topic, difficulty, sources }));
    assert.equal(digest(preserved), '57a3c22ed2233fa20afadd8f7dd3b0e41716cd6e0ce2ae259816b6e345ee8636');
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
    assert.equal(digest(session2.questions), '3a498f1562399cc5d61d206e8e9576c3e40f2cbbf5db0beffee521ceec607cd9');
    assert.equal(session2.questions.length, 57);
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
        { subjectId: 'database', chapterId: 'session-2', questionId: 'db-s2-original-02' },
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
        ['db-s2-original-02']);
    assert.equal(progress.quizProgressKey('database', 'chapter-2'), 'ju-study-hub:quiz-progress:database:chapter-2');
    assert.equal(progress.quizProgressKey('database', 'session-2'), 'ju-study-hub:quiz-progress:database:session-2');
    const storedProgress = JSON.stringify({ version: 1, currentQuestionId: 'db-s2-original-02', answers: {
        'db-s2-original-02': { optionId: 'b', isSubmitted: true },
    } });
    assert.deepEqual(plain(progress.restoreProgress(storedProgress, session2.questions)), {
        currentIndex: 0, answers: { 'db-s2-original-02': { optionId: 'b', isSubmitted: true } },
    });
    const chapter2Progress = JSON.stringify({ version: 1, currentQuestionId: 'db-ch2-1-q01', answers: {
        'db-ch2-1-q01': { optionId: 'b', isSubmitted: true },
    } });
    assert.equal(progress.summarizeProgress(chapter2Progress, session2.questions).submitted, 0);
});

test('reviewed Session 2 retains safe answers and leaves retired references unresolved', () => {
    const session2 = subjects.database.chapters.find(chapter => chapter.id === 'session-2');
    const progress = load('lib/quiz-progress.ts');
    const bookmarks = load('lib/bookmarks.ts');
    const bookmarkCatalog = load('lib/bookmark-catalog.ts');
    const mistakes = load('lib/mistakes.ts');
    const rounds = load('lib/review-round.ts');
    const ref = questionId => ({ subjectId: 'database', chapterId: 'session-2', questionId });
    const stable = ref('db-s2-original-02');
    const changed = ref('db-s2-original-04');
    const removed = ref('db-s2-original-01');
    const refs = [stable, changed, removed];
    const saved = JSON.stringify({ version: 1, currentQuestionId: changed.questionId, answers: {
        [stable.questionId]: { optionId: 'b', isSubmitted: true },
        [changed.questionId]: { optionId: 'd', isSubmitted: true },
        [removed.questionId]: { optionId: 'c', isSubmitted: true },
    } });
    assert.deepEqual(JSON.parse(JSON.stringify(progress.restoreProgress(saved, session2.questions))), {
        currentIndex: 0, answers: { [stable.questionId]: { optionId: 'b', isSubmitted: true } },
    });
    assert.equal(progress.summarizeProgress(saved, session2.questions).submitted, 1);
    assert.equal(progress.isProgressComplete(saved, session2.questions), false);

    const catalog = session2.questions.map(question => ({ ...ref(question.id),
        subjectTitle: 'Database', chapterTitle: session2.title, prompt: question.prompt, question }));
    const sections = [{ id: 'database', title: 'Database', chapters: [{ id: 'session-2', title: session2.title }] }];
    const entries = bookmarkCatalog.resolveBookmarkEntries(bookmarks.parseBookmarks(JSON.stringify({ version: 1, items: refs })), catalog, sections);
    assert.deepEqual(JSON.parse(JSON.stringify(entries.map(entry => entry.missing))), [false, true, true]);
    assert.ok(entries[0].href?.includes(stable.questionId));
    assert.equal(entries[1].href, null);
    assert.equal(entries[2].href, null);
    assert.deepEqual(JSON.parse(JSON.stringify(mistakes.parseMistakes(JSON.stringify({ version: 1, items: refs })))), refs);
    assert.deepEqual(JSON.parse(JSON.stringify(rounds.createReviewRound(refs, catalog, rounds.ALL_SCOPE).map(item => item.questionId))), [stable.questionId]);
});

test('new Database Session 3 uses isolated progress and resolves only its current IDs', () => {
    const session3 = subjects.database.chapters.find(chapter => chapter.id === 'session-3');
    assert.ok(session3);
    const progress = load('lib/quiz-progress.ts');
    const bookmarks = load('lib/bookmarks.ts');
    const bookmarkCatalog = load('lib/bookmark-catalog.ts');
    const mistakes = load('lib/mistakes.ts');
    const rounds = load('lib/review-round.ts');
    const ref = questionId => ({ subjectId: 'database', chapterId: 'session-3', questionId });
    const current = ref('db-s3-q001');
    const sourceLabel = ref('Q001');
    const retired = ref('db-s3-retired');
    const refs = [current, sourceLabel, retired];
    const raw = JSON.stringify({ version: 1, currentQuestionId: sourceLabel.questionId, answers: {
        [current.questionId]: { optionId: 'a', isSubmitted: true },
        [sourceLabel.questionId]: { optionId: 'b', isSubmitted: true },
        [retired.questionId]: { optionId: 'c', isSubmitted: true },
    } });
    assert.equal(progress.quizProgressKey('database', 'session-3'), 'ju-study-hub:quiz-progress:database:session-3');
    assert.notEqual(progress.quizProgressKey('database', 'session-3'), progress.quizProgressKey('database', 'session-2'));
    assert.deepEqual(JSON.parse(JSON.stringify(progress.restoreProgress(raw, session3.questions))), {
        currentIndex: 0, answers: { [current.questionId]: { optionId: 'a', isSubmitted: true } },
    });
    assert.equal(progress.summarizeProgress(raw, session3.questions).submitted, 1);
    assert.equal(progress.isProgressComplete(raw, session3.questions), false);

    const catalog = session3.questions.map(question => ({ ...ref(question.id),
        subjectTitle: 'Database', chapterTitle: session3.title, prompt: question.prompt, question }));
    const sections = [{ id: 'database', title: 'Database', chapters: [{ id: 'session-3', title: session3.title }] }];
    const entries = bookmarkCatalog.resolveBookmarkEntries(bookmarks.parseBookmarks(JSON.stringify({ version: 1, items: refs })), catalog, sections);
    assert.deepEqual(JSON.parse(JSON.stringify(entries.map(entry => entry.missing))), [false, true, true]);
    assert.ok(entries[0].href?.includes(current.questionId));
    assert.equal(entries[1].href, null);
    assert.deepEqual(JSON.parse(JSON.stringify(mistakes.parseMistakes(JSON.stringify({ version: 1, items: refs })))), refs);
    assert.deepEqual(JSON.parse(JSON.stringify(rounds.createReviewRound(refs, catalog, rounds.ALL_SCOPE).map(item => item.questionId))), [current.questionId]);
});
