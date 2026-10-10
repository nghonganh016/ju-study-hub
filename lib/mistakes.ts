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

// Replay local additions/removals against the latest stored collection after
// recovery, so an unavailable read cannot erase unrelated saved mistakes.
let fallback: MistakeRef[] = [];
const pending = new Map<string, { ref: MistakeRef; present: boolean }>();

function applyPending(items: MistakeRef[]) {
    const merged = new Map(items.map(ref => [mistakeId(ref), ref]));
    for (const [id, change] of pending) {
        if (change.present) merged.set(id, change.ref);
        else merged.delete(id);
    }
    return [...merged.values()];
}

export function readMistakes(): MistakeRef[] {
    try { fallback = parseMistakes(window.localStorage.getItem(MISTAKES_KEY)); } catch { /* Use last readable data. */ }
    // React store snapshots must not write or dispatch events.
    return applyPending(fallback);
}

export function flushMistakes() {
    if (pending.size === 0) return;
    try {
        const stored = parseMistakes(window.localStorage.getItem(MISTAKES_KEY));
        const merged = applyPending(stored);
        if (JSON.stringify(merged) !== JSON.stringify(stored)) {
            window.localStorage.setItem(MISTAKES_KEY, JSON.stringify({ version: 1, items: merged }));
        }
        fallback = merged;
        pending.clear();
    } catch { /* Retry on the next action, focus or storage event. */ }
}

export function saveMistakes(items: MistakeRef[]) {
    const current = readMistakes();
    const target = parseMistakes(JSON.stringify({ version: 1, items }));
    const targetIds = new Set(target.map(mistakeId));
    const currentIds = new Set(current.map(mistakeId));
    for (const ref of current) {
        if (!targetIds.has(mistakeId(ref))) pending.set(mistakeId(ref), { ref, present: false });
    }
    for (const ref of target) {
        if (!currentIds.has(mistakeId(ref))) pending.set(mistakeId(ref), { ref, present: true });
    }
    flushMistakes();
    window.dispatchEvent(new Event(MISTAKES_EVENT));
}

export function recordAttempt(ref: MistakeRef, correct: boolean, review: boolean) {
    const items = readMistakes();
    const id = mistakeId(ref);
    const cleanRef = { subjectId: ref.subjectId, chapterId: ref.chapterId, questionId: ref.questionId };
    if (review && correct) pending.set(id, { ref: cleanRef, present: false });
    else if (!review && !correct && !items.some(item => mistakeId(item) === id)) pending.set(id, { ref: cleanRef, present: true });
    flushMistakes();
    window.dispatchEvent(new Event(MISTAKES_EVENT));
}

export function resolveMistakes<T extends MistakeRef>(refs: MistakeRef[], catalog: readonly T[]) {
    const lookup = new Map(catalog.map(item => [mistakeId(item), item]));
    return refs.flatMap(ref => {
        const item = lookup.get(mistakeId(ref));
        return item ? [item] : [];
    });
}
