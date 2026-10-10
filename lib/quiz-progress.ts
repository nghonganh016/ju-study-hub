import type { Question } from "../types/quiz";

export type Answer = { optionId: string; isSubmitted: boolean };

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function restoreProgress(raw: string | null, questions: Question[]) {
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

export function isProgressComplete(raw: string | null, questions: Question[]) {
    const { answers } = restoreProgress(raw, questions);
    return questions.length > 0 && questions.every(question => answers[question.id]?.isSubmitted === true);
}
