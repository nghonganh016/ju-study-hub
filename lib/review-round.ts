import { parseMistakes, resolveMistakes, type MistakeRef } from "./mistakes";

export type ReviewScope = { subjectId: string | null; chapterId: string | null };
export const ALL_SCOPE: ReviewScope = { subjectId: null, chapterId: null };

export function validScope(scope: unknown, sections: readonly { id: string; chapters: readonly { id: string }[] }[]): ReviewScope {
    if (!scope || typeof scope !== "object") return ALL_SCOPE;
    const saved = scope as Record<string, unknown>;
    const subject = sections.find(item => item.id === saved.subjectId);
    if (!subject) return ALL_SCOPE;
    const chapter = subject.chapters.find(item => item.id === saved.chapterId);
    return { subjectId: subject.id, chapterId: chapter?.id ?? null };
}

export function parseReviewRound(raw: string | null, sections: readonly { id: string; chapters: readonly { id: string }[] }[]) {
    let saved: unknown;
    try { saved = JSON.parse(raw ?? "null"); } catch { return { refs: [], scope: ALL_SCOPE }; }
    const record = saved && typeof saved === "object" ? saved as Record<string, unknown> : null;
    return {
        refs: parseMistakes(raw),
        scope: record?.version === 1 ? validScope(record.scope, sections) : ALL_SCOPE,
    };
}

export function filterReviewItems<T extends MistakeRef>(items: readonly T[], scope: ReviewScope): T[] {
    return items.filter(item => (!scope.subjectId || item.subjectId === scope.subjectId)
        && (!scope.chapterId || item.chapterId === scope.chapterId));
}

export function createReviewRound<T extends MistakeRef>(refs: MistakeRef[], catalog: readonly T[], scope: ReviewScope) {
    return filterReviewItems(resolveMistakes(refs, catalog), scope);
}

export function serializeReviewRound(items: readonly MistakeRef[], scope: ReviewScope) {
    return JSON.stringify({ version: 1, scope, items: items.map(({ subjectId, chapterId, questionId }) => ({ subjectId, chapterId, questionId })) });
}

export function reviewScopeLabel(scope: ReviewScope, sections: readonly { id: string; title: string; chapters: readonly { id: string; title: string }[] }[]) {
    const subject = sections.find(item => item.id === scope.subjectId);
    if (!subject) return "Tất cả môn học";
    const chapter = subject.chapters.find(item => item.id === scope.chapterId);
    return `${subject.title} · ${chapter?.title ?? "Tất cả chapter"}`;
}

