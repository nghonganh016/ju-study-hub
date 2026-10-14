import type { Question } from "../types/quiz";
import { mistakeId } from "./mistakes";
import { localStudyStorage, type StudyStorage } from "./storage";

export const EXAM_KEY = "ju-study-hub:exam-attempt:v1";
export type ExamRef = { subjectId: string; chapterId: string; questionId: string };
export type ExamCatalogItem = ExamRef & {
    subjectTitle: string; chapterTitle: string; contentRevision: number; question: Question;
};
export type ExamConfig = {
    subjectId: string; chapterId: string | null; count: 10 | 20 | 30 | "all";
    minutes: 15 | 30 | 60 | null;
};
export type ExamItem = ExamRef & {
    subjectTitle: string; chapterTitle: string; contentRevision: number; question: Question;
};
export type ExamResult = { correct: number; incorrect: number; unanswered: number; percentage: number; elapsedMs: number };
export type ExamRecord = {
    version: 1; attemptId: string; config: ExamConfig; items: ExamItem[];
    currentIndex: number; answers: Record<string, string>;
    startedAt: number; deadlineAt: number | null;
    status: "working" | "submitted"; submittedAt: number | null;
    reason: "manual" | "timeout" | null; result: ExamResult | null;
    mistakesApplied: boolean;
};

const string = (value: unknown): value is string => typeof value === "string" && value.length > 0;
const finite = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);
const refKey = (ref: ExamRef) => mistakeId(ref);

export function examPool(catalog: readonly ExamCatalogItem[], config: ExamConfig): ExamCatalogItem[] {
    const seen = new Set<string>();
    return catalog.filter(item => {
        if (item.subjectId !== config.subjectId || (config.chapterId && item.chapterId !== config.chapterId)) return false;
        const key = refKey(item);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

export function createExam(config: ExamConfig, catalog: readonly ExamCatalogItem[], now: number,
    random: () => number = Math.random, attemptId: string = crypto.randomUUID()): ExamRecord {
    const pool = examPool(catalog, config);
    if (!pool.length) throw new Error("Không có câu hỏi trong phạm vi này.");
    const target = config.count === "all" ? pool.length : Math.min(config.count, pool.length);
    // Fisher-Yates shuffles whole questions. Options keep their original order.
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const items = pool.slice(0, target).map(item => ({
        subjectId: item.subjectId, chapterId: item.chapterId, questionId: item.questionId,
        subjectTitle: item.subjectTitle, chapterTitle: item.chapterTitle,
        contentRevision: item.contentRevision,
        question: JSON.parse(JSON.stringify(item.question)) as Question,
    }));
    return { version: 1, attemptId, config: { ...config }, items, currentIndex: 0, answers: {},
        startedAt: now, deadlineAt: config.minutes === null ? null : now + config.minutes * 60_000,
        status: "working", submittedAt: null, reason: null, result: null, mistakesApplied: false };
}

export function gradeExam(record: ExamRecord, submittedAt: number): ExamResult {
    let correct = 0, incorrect = 0, unanswered = 0;
    for (const item of record.items) {
        const answer = record.answers[refKey(item)];
        if (!answer) unanswered++;
        else if (answer === item.question.correctOptionId) correct++;
        else incorrect++;
    }
    return { correct, incorrect, unanswered,
        percentage: Math.round(correct / record.items.length * 100),
        elapsedMs: Math.max(0, submittedAt - record.startedAt) };
}

export function incorrectExamRefs(record: ExamRecord, liveRefs: readonly ExamRef[]): ExamRef[] {
    if (record.status !== "submitted") return [];
    const live = new Set(liveRefs.map(refKey));
    return record.items.filter(item => {
        const key = refKey(item);
        return live.has(key) && Boolean(record.answers[key])
            && record.answers[key] !== item.question.correctOptionId;
    }).map(({ subjectId, chapterId, questionId }) => ({ subjectId, chapterId, questionId }));
}

export function submitExam(record: ExamRecord, now: number, requested: "manual" | "timeout" = "manual"): ExamRecord {
    if (record.status === "submitted") return record;
    const timeout = requested === "timeout" || (record.deadlineAt !== null && now >= record.deadlineAt);
    const submittedAt = timeout && record.deadlineAt !== null ? record.deadlineAt : now;
    return { ...record, status: "submitted", submittedAt,
        reason: timeout ? "timeout" : "manual", result: gradeExam(record, submittedAt) };
}

export function changeExamAnswer(record: ExamRecord, index: number, optionId: string, now: number): ExamRecord {
    if (record.status !== "working" || (record.deadlineAt !== null && now >= record.deadlineAt)) return submitExam(record, now, "timeout");
    const item = record.items[index];
    if (!item?.question.options.some(option => option.id === optionId)) return record;
    return { ...record, answers: { ...record.answers, [refKey(item)]: optionId } };
}

export function moveExam(record: ExamRecord, index: number): ExamRecord {
    return index >= 0 && index < record.items.length ? { ...record, currentIndex: index } : record;
}

export function parseExam(raw: string | null): ExamRecord | null {
    try {
        const value: unknown = JSON.parse(raw ?? "null");
        if (!value || typeof value !== "object") return null;
        const data = value as Record<string, unknown>;
        const config = data.config as Record<string, unknown> | undefined;
        if (data.version !== 1 || !string(data.attemptId) || !config || !string(config.subjectId)
            || !(config.chapterId === null || string(config.chapterId))
            || ![10, 20, 30, "all"].includes(config.count as string | number)
            || ![null, 15, 30, 60].includes(config.minutes as number | null)
            || !Array.isArray(data.items) || data.items.length === 0
            || !Number.isInteger(data.currentIndex) || (data.currentIndex as number) < 0
            || (data.currentIndex as number) >= data.items.length || !finite(data.startedAt)
            || !(data.deadlineAt === null || finite(data.deadlineAt))
            || !data.answers || typeof data.answers !== "object" || Array.isArray(data.answers)
            || !["working", "submitted"].includes(data.status as string)
            || typeof data.mistakesApplied !== "boolean") return null;
        const seen = new Set<string>();
        for (const value of data.items) {
            if (!value || typeof value !== "object") return null;
            const item = value as ExamItem;
            if (![item.subjectId, item.chapterId, item.questionId, item.subjectTitle, item.chapterTitle].every(string)
                || !finite(item.contentRevision) || !item.question || item.question.id !== item.questionId
                || !string(item.question.prompt) || !Array.isArray(item.question.options)
                || item.question.options.length === 0 || !string(item.question.correctOptionId)
                || typeof item.question.explanation !== "string"
                || !item.question.options.every(option => option && string(option.id) && typeof option.text === "string")
                || !item.question.options.some(option => option.id === item.question.correctOptionId)
                || (item.question.source !== undefined && typeof item.question.source !== "string")
                || (item.question.sources !== undefined && (!Array.isArray(item.question.sources)
                    || !item.question.sources.every(source => source && typeof source === "object"
                        && (source.kind === "lecture"
                            ? string(source.file) && finite(source.pdfPage) && finite(source.slideNumber) && string(source.slideTitle)
                            : source.kind === "documentation"
                                && string(source.title) && string(source.url) && string(source.section)))))
                || seen.has(refKey(item))) return null;
            seen.add(refKey(item));
        }
        const answers = data.answers as Record<string, unknown>;
        if (Object.entries(answers).some(([key, option]) => {
            const item = (data.items as ExamItem[]).find(value => refKey(value) === key);
            return !item || !string(option) || !item.question.options.some(choice => choice.id === option);
        })) return null;
        if (data.status === "working") {
            if (data.submittedAt !== null || data.reason !== null || data.result !== null) return null;
        } else {
            if (!finite(data.submittedAt) || !["manual", "timeout"].includes(data.reason as string)
                || !data.result || typeof data.result !== "object") return null;
            const result = data.result as ExamResult;
            if (![result.correct, result.incorrect, result.unanswered, result.percentage, result.elapsedMs].every(finite)
                || result.correct + result.incorrect + result.unanswered !== data.items.length) return null;
        }
        return data as ExamRecord;
    } catch { return null; }
}

let memory: ExamRecord | null = null;
let pending = false;

export function readExam(storage: StudyStorage = localStudyStorage): { record: ExamRecord | null; error: string | null; saved: boolean } {
    if (pending) return { record: memory, error: null, saved: false };
    try {
        const raw = storage.getItem(EXAM_KEY);
        if (raw === null) { memory = null; return { record: null, error: null, saved: true }; }
        const record = parseExam(raw);
        if (!record) return { record: null, error: "Không thể khôi phục lượt thi đã lưu vì dữ liệu không hợp lệ.", saved: true };
        memory = record;
        return { record, error: null, saved: true };
    } catch {
        return { record: memory, error: memory ? null : "Không thể đọc lượt thi đã lưu. Bộ nhớ trình duyệt đang bị chặn.", saved: false };
    }
}

export function saveExam(record: ExamRecord, storage: StudyStorage = localStudyStorage): boolean {
    memory = record;
    pending = true;
    try { storage.setItem(EXAM_KEY, JSON.stringify(record)); pending = false; return true; }
    catch { return false; }
}

export function updateExam(attemptId: string, change: (record: ExamRecord) => ExamRecord,
    storage: StudyStorage = localStudyStorage): { record: ExamRecord; saved: boolean } | null {
    const current = readExam(storage).record;
    if (!current || current.attemptId !== attemptId) return null;
    const next = change(current);
    if (next === current) return { record: current, saved: !pending };
    return { record: next, saved: saveExam(next, storage) };
}
