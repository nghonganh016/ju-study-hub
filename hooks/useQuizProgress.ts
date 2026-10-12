"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import type { QuestionStatus } from "@/components/QuizNavigation";
import { questionIndexFromLink, quizProgressKey, restoreProgress, type Answer } from "@/lib/quiz-progress";
import { REVIEW_PROGRESS_KEY } from "@/lib/mistakes";
import type { Question } from "@/types/quiz";

type Options = {
    subjectId: string;
    chapterId: string;
    questions: readonly Question[];
    isReview: boolean;
    pageSize: number;
    requestedQuestionId: string | null;
    initialReviewProgress?: string | null;
    onReviewProgressChange?: (raw: string) => void;
    onDeepLinkNavigate?: () => void;
};

export default function useQuizProgress({ subjectId, chapterId, questions, isReview, pageSize,
    requestedQuestionId, initialReviewProgress, onReviewProgressChange, onDeepLinkNavigate }: Options) {
    const storageKey = isReview ? REVIEW_PROGRESS_KEY : quizProgressKey(subjectId, chapterId);
    const [restoredKey, setRestoredKey] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, Answer>>({});
    const [navigatorPage, setNavigatorPage] = useState(0);
    const appliedQuestionId = useRef(requestedQuestionId);
    const submitting = useRef(new Set<string>());
    const latestRequestedQuestionId = useEffectEvent(() => requestedQuestionId);
    const latestInitialReviewProgress = useEffectEvent(() => initialReviewProgress);
    const reportReviewProgress = useEffectEvent((raw: string) => onReviewProgressChange?.(raw));
    const reportDeepLinkNavigation = useEffectEvent(() => onDeepLinkNavigate?.());

    useEffect(() => {
        let cancelled = false;
        // Defer restoration until after mount; cancel the first Strict Mode setup.
        queueMicrotask(() => {
            if (cancelled) return;
            let raw: string | null = null;
            try {
                raw = window.localStorage.getItem(storageKey);
            } catch {
                // Storage may be blocked; the quiz still works in memory.
            }
            const restored = restoreProgress(raw ?? (isReview ? latestInitialReviewProgress() : null) ?? null, questions);
            const targetIndex = questionIndexFromLink(questions, latestRequestedQuestionId(), restored.currentIndex);
            submitting.current = new Set(Object.entries(restored.answers)
                .filter(([, answer]) => answer.isSubmitted).map(([id]) => id));
            setCurrentIndex(targetIndex);
            setAnswers(restored.answers);
            setNavigatorPage(Math.floor(targetIndex / pageSize));
            setRestoredKey(storageKey);
        });
        return () => { cancelled = true; };
    }, [storageKey, questions, isReview, pageSize]);

    useEffect(() => {
        if (restoredKey !== storageKey || appliedQuestionId.current === requestedQuestionId) return;
        let cancelled = false;
        queueMicrotask(() => {
            if (cancelled) return;
            appliedQuestionId.current = requestedQuestionId;
            const index = questionIndexFromLink(questions, requestedQuestionId, currentIndex);
            if (index !== currentIndex) {
                setCurrentIndex(index);
                setNavigatorPage(Math.floor(index / pageSize));
                reportDeepLinkNavigation();
            }
        });
        return () => { cancelled = true; };
    }, [requestedQuestionId, restoredKey, storageKey, questions, currentIndex, pageSize]);

    useEffect(() => {
        // Initial effects (including Strict Mode replays) cannot overwrite saved data.
        if (restoredKey !== storageKey) return;
        const serialized = JSON.stringify({
            version: 1,
            currentQuestionId: questions[currentIndex]?.id ?? null,
            answers,
        });
        try {
            if (currentIndex === 0 && Object.keys(answers).length === 0) {
                window.localStorage.removeItem(storageKey);
            } else {
                window.localStorage.setItem(storageKey, serialized);
            }
        } catch {
            // Storage unavailable or full: keep the current in-memory progress.
        }
        if (isReview) reportReviewProgress(serialized);
    }, [answers, currentIndex, questions, restoredKey, storageKey, isReview]);

    const statuses: QuestionStatus[] = questions.map((item) => {
        const answer = answers[item.id];
        if (!answer) return "unanswered";
        if (!answer.isSubmitted) return "draft";
        return answer.optionId === item.correctOptionId ? "correct" : "incorrect";
    });
    const submittedCount = statuses.filter((status) => status === "correct" || status === "incorrect").length;
    const correctCount = statuses.filter((status) => status === "correct").length;
    const canFinish = questions.length > 0 && submittedCount === questions.length;
    const question = questions[currentIndex];

    function navigate(index: number) {
        if (index < 0 || index >= questions.length) return;
        // Manual navigation owns the URL after the opening deep link.
        appliedQuestionId.current = requestedQuestionId;
        setCurrentIndex(index);
        setNavigatorPage(Math.floor(index / pageSize));
    }

    function selectAnswer(optionId: string) {
        if (!question || !question.options.some((option) => option.id === optionId)) return;
        setAnswers((previous) => {
            if (previous[question.id]?.isSubmitted) return previous;
            return { ...previous, [question.id]: { optionId, isSubmitted: false } };
        });
    }

    function submitAnswer(): string | null {
        if (!question || restoredKey !== storageKey) return null;
        const selected = answers[question.id];
        if (!selected || selected.isSubmitted || submitting.current.has(question.id)) return null;
        submitting.current.add(question.id);
        setAnswers((previous) => {
            const answer = previous[question.id];
            if (!answer || answer.isSubmitted) return previous;
            return { ...previous, [question.id]: { ...answer, isSubmitted: true } };
        });
        return selected.optionId;
    }

    function resetProgress() {
        try {
            window.localStorage.removeItem(storageKey);
        } catch {
            // Reset the quiz even when browser storage is unavailable.
        }
        appliedQuestionId.current = requestedQuestionId;
        submitting.current.clear();
        setCurrentIndex(0);
        setNavigatorPage(0);
        setAnswers({});
    }

    return {
        currentIndex,
        currentAnswer: question ? answers[question.id] : undefined,
        ready: restoredKey === storageKey,
        navigatorPage,
        setNavigatorPage,
        statuses,
        submittedCount,
        correctCount,
        canFinish,
        navigate,
        selectAnswer,
        submitAnswer,
        resetProgress,
    };
}
