import { mistakeId, type MistakeRef, type ReviewItem } from "./mistakes";
import type { Answer } from "./quiz-progress";
import { ALL_SCOPE, type ReviewScope } from "./review-round";

export const REVIEW_STATE_KEY = "ju-study-hub:review-state:v2";

export type ReviewProgress = {
    version: 1;
    currentQuestionId: string | null;
    answers: Record<string, Answer>;
};

export type ReviewState = {
    version: 2;
    roundId: string;
    scope: ReviewScope;
    items: MistakeRef[];
    progress: ReviewProgress;
};

type Section = { id: string; chapters: readonly { id: string }[] };
export type LegacyReview =
    | { kind: "none" }
    | { kind: "ready" | "choice"; state: ReviewState }
    | { kind: "invalid"; reason: string };

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseScope(value: unknown, sections: readonly Section[], allowMissing: boolean): ReviewScope {
    if (allowMissing && value === undefined) return ALL_SCOPE;
    if (!isRecord(value)) throw Error("Phạm vi lượt ôn không hợp lệ.");
    const { subjectId, chapterId } = value;
    if (subjectId === null && chapterId === null) return ALL_SCOPE;
    if (typeof subjectId !== "string" || !subjectId || (chapterId !== null && typeof chapterId !== "string")) {
        throw Error("Phạm vi lượt ôn không hợp lệ.");
    }
    const section = sections.find(item => item.id === subjectId);
    if (!section || (chapterId !== null && !section.chapters.some(item => item.id === chapterId))) {
        throw Error("Môn hoặc chapter của lượt ôn không còn hợp lệ.");
    }
    return { subjectId, chapterId };
}

function parseRefs(value: unknown): MistakeRef[] {
    if (!Array.isArray(value)) throw Error("Danh sách câu trong lượt ôn không hợp lệ.");
    const refs: MistakeRef[] = [];
    const seen = new Set<string>();
    for (const item of value) {
        if (!isRecord(item) || ![item.subjectId, item.chapterId, item.questionId]
            .every(id => typeof id === "string" && id.length > 0)) {
            throw Error("Danh sách câu trong lượt ôn không hợp lệ.");
        }
        const ref = { subjectId: item.subjectId as string, chapterId: item.chapterId as string,
            questionId: item.questionId as string };
        const id = mistakeId(ref);
        if (seen.has(id)) throw Error("Lượt ôn có câu bị trùng.");
        seen.add(id);
        refs.push(ref);
    }
    return refs;
}

function checkRefsInScope(items: readonly MistakeRef[], scope: ReviewScope) {
    if (items.some(item => (scope.subjectId !== null && item.subjectId !== scope.subjectId)
        || (scope.chapterId !== null && item.chapterId !== scope.chapterId))) {
        throw Error("Danh sách câu không khớp phạm vi lượt ôn.");
    }
}

export function parseReviewProgress(value: unknown, items: readonly MistakeRef[]): ReviewProgress {
    if (!isRecord(value) || value.version !== 1 || !isRecord(value.answers)) {
        throw Error("Tiến độ lượt ôn không hợp lệ.");
    }
    const ids = new Set(items.map(mistakeId));
    const cursor = value.currentQuestionId;
    if (cursor !== null && (typeof cursor !== "string" || !ids.has(cursor))) {
        throw Error("Vị trí câu trong tiến độ không thuộc lượt ôn.");
    }
    const answers: Record<string, Answer> = {};
    for (const [id, answer] of Object.entries(value.answers)) {
        if (!ids.has(id) || !isRecord(answer) || typeof answer.optionId !== "string" || !answer.optionId
            || typeof answer.isSubmitted !== "boolean") {
            throw Error("Đáp án trong tiến độ không thuộc lượt ôn hoặc sai định dạng.");
        }
        answers[id] = { optionId: answer.optionId, isSubmitted: answer.isSubmitted };
    }
    return { version: 1, currentQuestionId: cursor, answers };
}

export function emptyReviewProgress(): ReviewProgress {
    return { version: 1, currentQuestionId: null, answers: {} };
}

export function createReviewState(items: readonly MistakeRef[], scope: ReviewScope,
    progress: ReviewProgress = emptyReviewProgress()): ReviewState {
    const roundId = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    return { version: 2, roundId, scope,
        items: items.map(({ subjectId, chapterId, questionId }) => ({ subjectId, chapterId, questionId })),
        progress };
}

export function parseReviewState(raw: string, sections: readonly Section[]): ReviewState {
    let value: unknown;
    try { value = JSON.parse(raw); } catch { throw Error("Record Review v2 không phải JSON hợp lệ."); }
    if (!isRecord(value) || value.version !== 2 || typeof value.roundId !== "string" || !value.roundId) {
        throw Error("Record Review v2 không đúng phiên bản hoặc thiếu roundId.");
    }
    const scope = parseScope(value.scope, sections, false);
    const items = parseRefs(value.items);
    checkRefsInScope(items, scope);
    const progress = parseReviewProgress(value.progress, items);
    return { version: 2, roundId: value.roundId, scope, items, progress };
}

export function inspectLegacyReview(roundRaw: string | null, progressRaw: string | null,
    sections: readonly Section[], catalog: readonly ReviewItem[]): LegacyReview {
    if (roundRaw === null && progressRaw === null) return { kind: "none" };
    if (roundRaw === null) return { kind: "invalid", reason: "Có tiến độ v1 nhưng không có lượt Review v1." };
    let value: unknown;
    try { value = JSON.parse(roundRaw); }
    catch { return { kind: "invalid", reason: "Lượt Review v1 không phải JSON hợp lệ." }; }
    try {
        if (!isRecord(value) || value.version !== 1) throw Error("Lượt Review v1 sai định dạng hoặc phiên bản.");
        const scope = parseScope(value.scope, sections, true);
        const items = parseRefs(value.items);
        checkRefsInScope(items, scope);
        if (!items.length) throw Error("Lượt Review v1 không có câu hỏi.");
        const available = new Map(catalog.map(item => [mistakeId(item), item]));
        if (items.some(item => !available.has(mistakeId(item)))) {
            throw Error("Lượt Review v1 có câu không còn trong ngân hàng. Dữ liệu gốc vẫn được giữ.");
        }
        let progress = emptyReviewProgress();
        if (progressRaw !== null) {
            let savedProgress: unknown;
            try { savedProgress = JSON.parse(progressRaw); }
            catch { throw Error("Tiến độ Review v1 không phải JSON hợp lệ."); }
            progress = parseReviewProgress(savedProgress, items);
        }
        for (const [id, answer] of Object.entries(progress.answers)) {
            if (!available.get(id)?.question.options.some(option => option.id === answer.optionId)) {
                throw Error("Tiến độ v1 có đáp án không còn hợp lệ với câu hỏi.");
            }
        }
        const state = createReviewState(items, scope, progress);
        const untouched = Object.keys(progress.answers).length === 0
            && (progress.currentQuestionId === null || progress.currentQuestionId === mistakeId(items[0]));
        return { kind: untouched ? "ready" : "choice", state };
    } catch (error) {
        return { kind: "invalid", reason: error instanceof Error ? error.message : "Dữ liệu Review v1 không hợp lệ." };
    }
}
