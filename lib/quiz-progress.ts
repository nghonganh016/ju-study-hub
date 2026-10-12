import type { StudyStorage } from "./storage";

type ProgressQuestion = { id: string; options: readonly { id: string }[] };

export function quizProgressKey(subjectId: string, chapterId: string) {
    return `ju-study-hub:quiz-progress:${subjectId}:${chapterId}`;
}

export type Answer = { optionId: string; isSubmitted: boolean };

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function restoreProgress(raw: string | null, questions: readonly ProgressQuestion[]) {
    const answers: Record<string, Answer> = {};
    let currentIndex = 0;
    try {
        const saved: unknown = JSON.parse(raw ?? "null");
        if (!isRecord(saved) || saved.version !== 1) return { currentIndex, answers };
        currentIndex = Math.max(0, questions.findIndex((item) => item.id === saved.currentQuestionId));
        if (isRecord(saved.answers)) {
            for (const question of questions) {
                if (!Object.hasOwn(saved.answers, question.id)) continue;
                const answer = saved.answers[question.id];
                if (isRecord(answer) && typeof answer.optionId === "string"
                    && typeof answer.isSubmitted === "boolean"
                    && question.options.some((option) => option.id === answer.optionId)) {
                    answers[question.id] = { optionId: answer.optionId, isSubmitted: answer.isSubmitted };
                }
            }
        }
    } catch {
        // Recover valid fragments without letting malformed storage stop a quiz.
    }
    return { currentIndex, answers };
}

export function questionIndexFromLink(questions: readonly ProgressQuestion[], questionId: string | null | undefined, fallbackIndex: number) {
    const index = questionId ? questions.findIndex(question => question.id === questionId) : -1;
    return index >= 0 ? index : fallbackIndex;
}

export function isProgressComplete(raw: string | null, questions: readonly ProgressQuestion[]) {
    const { answers } = restoreProgress(raw, questions);
    return questions.length > 0 && questions.every(question => answers[question.id]?.isSubmitted === true);
}

export function summarizeProgress(raw: string | null, questions: readonly ProgressQuestion[]) {
    const { answers } = restoreProgress(raw, questions);
    return {
        submitted: Object.values(answers).filter(answer => answer.isSubmitted).length,
        hasAnswers: Object.keys(answers).length > 0,
        total: questions.length,
    };
}

export function readLevelProgress(storage: Pick<StudyStorage, "getItem">, key: string,
    questions: readonly ProgressQuestion[]) {
    try {
        return summarizeProgress(storage.getItem(key), questions);
    } catch {
        return "unavailable" as const;
    }
}
