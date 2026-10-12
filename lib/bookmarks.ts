import { localStudyStorage } from "./storage";

export type BookmarkRef = { subjectId: string; chapterId: string; questionId: string };

export const BOOKMARKS_KEY = "ju-study-hub:bookmarks:v1";

// A tuple keeps IDs with punctuation unambiguous and does not depend on question order.
function bookmarkId(ref: BookmarkRef) {
    return JSON.stringify([ref.subjectId, ref.chapterId, ref.questionId]);
}

function cleanRef(value: unknown): BookmarkRef | null {
    if (typeof value !== "object" || value === null) return null;
    const ref = value as Record<string, unknown>;
    if (typeof ref.subjectId !== "string" || !ref.subjectId
        || typeof ref.chapterId !== "string" || !ref.chapterId
        || typeof ref.questionId !== "string" || !ref.questionId) return null;
    return { subjectId: ref.subjectId, chapterId: ref.chapterId, questionId: ref.questionId };
}

export function parseBookmarks(raw: string | null): BookmarkRef[] {
    try {
        const saved: unknown = JSON.parse(raw ?? "null");
        if (typeof saved !== "object" || saved === null) return [];
        const data = saved as Record<string, unknown>;
        if (data.version !== 1 || !Array.isArray(data.items)) return [];
        const unique = new Map<string, BookmarkRef>();
        for (const item of data.items) {
            const ref = cleanRef(item);
            if (ref) unique.set(bookmarkId(ref), ref);
        }
        return [...unique.values()];
    } catch { return []; }
}

// Keep changes made while storage is unavailable. A later write applies them
// to the latest stored list, so a failed read cannot erase unseen bookmarks.
let lastReadable: BookmarkRef[] = [];
const pending = new Map<string, { ref: BookmarkRef; present: boolean }>();

function applyPending(items: BookmarkRef[]) {
    const merged = new Map(items.map(ref => [bookmarkId(ref), ref]));
    for (const [id, change] of pending) {
        if (change.present) merged.set(id, change.ref);
        else merged.delete(id);
    }
    return [...merged.values()].map(ref => ({ ...ref }));
}

export function readBookmarks(): BookmarkRef[] {
    if (typeof window === "undefined") return [];
    try { lastReadable = parseBookmarks(localStudyStorage.getItem(BOOKMARKS_KEY)); }
    catch { /* Use the last readable list and pending changes. */ }
    return applyPending(lastReadable);
}

export function flushBookmarks() {
    if (typeof window === "undefined" || pending.size === 0) return;
    try {
        const stored = parseBookmarks(localStudyStorage.getItem(BOOKMARKS_KEY));
        const merged = applyPending(stored);
        if (JSON.stringify(merged) !== JSON.stringify(stored)) {
            localStudyStorage.setItem(BOOKMARKS_KEY, JSON.stringify({ version: 1, items: merged }));
        }
        lastReadable = merged;
        pending.clear();
    } catch { /* Try again on the next bookmark action or explicit flush. */ }
}

export function addBookmark(value: BookmarkRef): BookmarkRef[] {
    if (typeof window === "undefined") return [];
    const ref = cleanRef(value);
    if (!ref) return readBookmarks();
    readBookmarks();
    pending.set(bookmarkId(ref), { ref, present: true });
    flushBookmarks();
    return readBookmarks();
}

export function removeBookmark(value: BookmarkRef): BookmarkRef[] {
    if (typeof window === "undefined") return [];
    const ref = cleanRef(value);
    if (!ref) return readBookmarks();
    readBookmarks();
    pending.set(bookmarkId(ref), { ref, present: false });
    flushBookmarks();
    return readBookmarks();
}

export function isBookmarked(value: BookmarkRef): boolean {
    const ref = cleanRef(value);
    return ref !== null && readBookmarks().some(item => bookmarkId(item) === bookmarkId(ref));
}

export function isBookmarkPending(value: BookmarkRef): boolean {
    const ref = cleanRef(value);
    return ref !== null && pending.has(bookmarkId(ref));
}

export function bookmarkStorageStatus(): "available" | "pending" | "unavailable" {
    if (typeof window === "undefined") return "unavailable";
    try {
        localStudyStorage.getItem(BOOKMARKS_KEY);
        return pending.size > 0 ? "pending" : "available";
    } catch { return "unavailable"; }
}
