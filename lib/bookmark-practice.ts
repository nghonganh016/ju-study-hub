import { parseBookmarks, type BookmarkRef } from "./bookmarks";
import { mistakeId } from "./mistakes";
import { restoreProgress, type Answer } from "./quiz-progress";
import { localStudyStorage, type StudyStorage } from "./storage";

export const BOOKMARK_PRACTICE_KEY = "ju-study-hub:bookmark-practice:v1";
export type PracticeScope = { subjectId: string | null; chapterId: string | null };
export type PracticeRecord = {
    version: 1; roundId: string; scope: PracticeScope; items: BookmarkRef[];
    currentQuestionId: string | null; answers: Record<string, Answer>;
};
type CatalogItem = BookmarkRef & { question: { options: readonly { id: string }[] } };
let memory: PracticeRecord | null = null;
let pending = false;

export function selectPracticeItems<T extends BookmarkRef>(refs: readonly BookmarkRef[], catalog: readonly T[], scope: PracticeScope): T[] {
    const lookup = new Map(catalog.map(item => [mistakeId(item), item]));
    const seen = new Set<string>();
    return refs.flatMap(ref => {
        const id = mistakeId(ref);
        if (seen.has(id) || (scope.subjectId && ref.subjectId !== scope.subjectId)
            || (scope.chapterId && ref.chapterId !== scope.chapterId)) return [];
        seen.add(id);
        const item = lookup.get(id);
        return item ? [item] : [];
    });
}

export function parsePractice(raw: string | null): PracticeRecord | null {
    try {
        const value: unknown = JSON.parse(raw ?? "null");
        if (!value || typeof value !== "object") return null;
        const data = value as Record<string, unknown>;
        if (data.version !== 1 || typeof data.roundId !== "string" || !data.roundId
            || !Array.isArray(data.items) || !data.scope || typeof data.scope !== "object") return null;
        const scope = data.scope as Record<string, unknown>;
        if (![scope.subjectId, scope.chapterId].every(id => id === null || typeof id === "string")
            || (scope.chapterId !== null && scope.subjectId === null)) return null;
        const items = parseBookmarks(JSON.stringify({ version: 1, items: data.items }));
        if (!items.length) return null;
        const questions = items.map(ref => ({ id: mistakeId(ref), options: [] as { id: string }[] }));
        // Answers are validated against current question options by resolvePractice.
        const answers = data.answers && typeof data.answers === "object" && !Array.isArray(data.answers)
            ? data.answers as Record<string, Answer> : {};
        const currentQuestionId = typeof data.currentQuestionId === "string"
            && questions.some(item => item.id === data.currentQuestionId) ? data.currentQuestionId : questions[0].id;
        return { version: 1, roundId: data.roundId, scope: scope as PracticeScope,
            items, currentQuestionId, answers };
    } catch { return null; }
}

export function resolvePractice(record: PracticeRecord, catalog: readonly CatalogItem[]): PracticeRecord {
    const items = selectPracticeItems(record.items, catalog, { subjectId: null, chapterId: null });
    const questions = items.map(item => ({ id: mistakeId(item), options: item.question.options }));
    const restored = restoreProgress(JSON.stringify({ version: 1, currentQuestionId: record.currentQuestionId,
        answers: record.answers }), questions);
    return { ...record, items: items.map(({ subjectId, chapterId, questionId }) => ({ subjectId, chapterId, questionId })),
        currentQuestionId: questions[restored.currentIndex]?.id ?? null, answers: restored.answers };
}

export function readPractice(storage: StudyStorage = localStudyStorage): PracticeRecord | null {
    if (pending) return memory;
    try { memory = parsePractice(storage.getItem(BOOKMARK_PRACTICE_KEY)); }
    catch { /* Keep the current in-memory round. */ }
    return memory;
}

export function savePractice(record: PracticeRecord, storage: StudyStorage = localStudyStorage): boolean {
    memory = record;
    pending = true;
    try {
        storage.setItem(BOOKMARK_PRACTICE_KEY, JSON.stringify(record));
        pending = false;
        return true;
    } catch { return false; }
}

export function startPractice(items: readonly BookmarkRef[], scope: PracticeScope, storage: StudyStorage = localStudyStorage) {
    const record: PracticeRecord = { version: 1, roundId: crypto.randomUUID(), scope,
        items: items.map(({ subjectId, chapterId, questionId }) => ({ subjectId, chapterId, questionId })),
        currentQuestionId: items.length ? mistakeId(items[0]) : null, answers: {} };
    return { record, saved: savePractice(record, storage) };
}

export function updatePractice(roundId: string, currentQuestionId: string | null, answers: Record<string, Answer>,
    storage: StudyStorage = localStudyStorage): boolean | null {
    const current = readPractice(storage);
    if (!current || current.roundId !== roundId) return null;
    return savePractice({ ...current, currentQuestionId, answers }, storage);
}

export function isPracticeComplete(record: PracticeRecord, catalog: readonly CatalogItem[]) {
    const resolved = resolvePractice(record, catalog);
    return resolved.items.length > 0 && resolved.items.every(item => resolved.answers[mistakeId(item)]?.isSubmitted);
}
