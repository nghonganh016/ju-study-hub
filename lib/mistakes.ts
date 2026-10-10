import type { Question } from "../types/quiz";

export type MistakeRef = { subjectId: string; chapterId: string; questionId: string };
export type ReviewItem = MistakeRef & { subjectTitle: string; chapterTitle: string; question: Question };
export const MISTAKES_KEY = "ju-study-hub:mistakes:v1";
export const ROUND_KEY = "ju-study-hub:review-round:v1";
export const REVIEW_PROGRESS_KEY = "ju-study-hub:review-progress:v1";
export const MISTAKES_EVENT = "ju-study-hub:mistakes-changed";

// Tuple encoding avoids collisions even when an ID contains punctuation.
export function mistakeId(ref: MistakeRef) {
    return JSON.stringify([ref.subjectId, ref.chapterId, ref.questionId]);
}

export function parseMistakes(raw: string | null): MistakeRef[] {
    try {
        const saved = JSON.parse(raw ?? "null");
        if (saved?.version !== 1 || !Array.isArray(saved.items)) return [];
        const unique = new Map<string, MistakeRef>();
        for (const item of saved.items) {
            if (!item || ![item.subjectId, item.chapterId, item.questionId].every(value => typeof value === "string" && value.length > 0)) continue;
            const ref = { subjectId: item.subjectId, chapterId: item.chapterId, questionId: item.questionId };
            unique.set(mistakeId(ref), ref);
        }
        return [...unique.values()];
    } catch { return []; }
}

// Storage can be blocked or full. Keep a usable collection for this page lifetime.
let fallback: MistakeRef[] = [];
let memoryOnly = false;
export function readMistakes(): MistakeRef[] {
    if (!memoryOnly) {
        try { fallback = parseMistakes(window.localStorage.getItem(MISTAKES_KEY)); } catch { memoryOnly = true; }
    }
    return fallback;
}

export function saveMistakes(items: MistakeRef[]) {
    fallback = items;
    try { window.localStorage.setItem(MISTAKES_KEY, JSON.stringify({ version: 1, items })); } catch { memoryOnly = true; }
    window.dispatchEvent(new Event(MISTAKES_EVENT));
}

export function recordAttempt(ref: MistakeRef, correct: boolean, review: boolean) {
    const items = readMistakes();
    const id = mistakeId(ref);
    if (review && correct) saveMistakes(items.filter(item => mistakeId(item) !== id));
    else if (!review && !correct && !items.some(item => mistakeId(item) === id)) saveMistakes([...items, ref]);
}

export function resolveMistakes(refs: MistakeRef[], catalog: ReviewItem[]) {
    const lookup = new Map(catalog.map(item => [mistakeId(item), item]));
    return refs.flatMap(ref => {
        const item = lookup.get(mistakeId(ref));
        return item ? [item] : [];
    });
}
