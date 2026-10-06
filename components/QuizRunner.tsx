"use client";

import { useState } from "react";
import styles from "@/components/QuizNotebook.module.css";

import QuizQuestion from "@/components/QuizQuestion";
import QuizNavigation, { QUESTIONS_PER_PAGE, type QuestionStatus } from "@/components/QuizNavigation";
import QuizResult from "@/components/QuizResult";
import JournalAsset from "@/components/journal/JournalAsset";
import type { Question } from "@/types/quiz";

type Answer = { optionId: string; isSubmitted: boolean };

export default function QuizRunner({ questions }: { questions: Question[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    // Draft selections and graded answers survive navigation between questions.
    const [answers, setAnswers] = useState<Record<string, Answer>>({});
    const [showProgress, setShowProgress] = useState(false);
    const [navigatorPage, setNavigatorPage] = useState(0);
    const question = questions[currentIndex];
    const statuses: QuestionStatus[] = questions.map((item) => {
        const answer = answers[item.id];
        if (!answer) return "unanswered";
        if (!answer.isSubmitted) return "draft";
        return answer.optionId === item.correctOptionId ? "correct" : "incorrect";
    });
    const submittedCount = statuses.filter((status) => status === "correct" || status === "incorrect").length;
    const correctCount = statuses.filter((status) => status === "correct").length;
    const canFinish = questions.length > 0 && submittedCount === questions.length;

    // Every question change also reveals its group. Browsing groups alone keeps the question.
    function handleNavigate(index: number) {
        if (index < 0 || index >= questions.length) return;
        setCurrentIndex(index);
        setNavigatorPage(Math.floor(index / QUESTIONS_PER_PAGE));
    }

    function handleSelect(optionId: string) {
        if (!question || !question.options.some((option) => option.id === optionId)) return;
        setAnswers((previous) => {
            if (previous[question.id]?.isSubmitted) return previous;
            return { ...previous, [question.id]: { optionId, isSubmitted: false } };
        });
    }

    function handleSubmit() {
        if (!question) return;
        setAnswers((previous) => {
            const answer = previous[question.id];
            if (!answer || answer.isSubmitted) return previous;
            return { ...previous, [question.id]: { ...answer, isSubmitted: true } };
        });
    }

    function handleRestart() {
        handleNavigate(0);
        setAnswers({});
        setShowProgress(false);
    }

    if (!question) return <p className="mt-8">Chapter này chưa có câu hỏi.</p>;
    if (showProgress) {
        return <QuizResult correctCount={correctCount} submittedCount={submittedCount}
            totalQuestions={questions.length} onRestart={handleRestart}
            onContinue={() => { handleNavigate(currentIndex); setShowProgress(false); }} />;
    }

    return (
        <div className={styles.spread}>
            <div className="min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm" aria-live="polite">
                    <p className={styles.questionCount}>
                        Câu {currentIndex + 1} / {questions.length}
                    </p>
                    <p className={styles.muted}>Đúng: {correctCount} / {questions.length}</p>
                </div>
                <QuizQuestion
                    key={question.id}
                    question={question}
                    selectedOptionId={answers[question.id]?.optionId ?? null}
                    isSubmitted={answers[question.id]?.isSubmitted ?? false}
                    onSelect={handleSelect}
                    onSubmit={handleSubmit}
                />
                <div className={styles.questionControls}>
                    <button type="button" className={styles.pageButton} disabled={currentIndex === 0}
                        onClick={() => handleNavigate(currentIndex - 1)}>‹ Câu trước</button>
                    <button type="button" className={styles.pageButton} disabled={currentIndex === questions.length - 1}
                        onClick={() => handleNavigate(currentIndex + 1)}>Câu tiếp theo ›</button>
                </div>
            </div>
            <aside className={styles.sidebar}>
                <JournalAsset kind="bookmark" className={styles.bookmark} />
                <QuizNavigation statuses={statuses} currentIndex={currentIndex} onNavigate={handleNavigate}
                    page={navigatorPage} onPageChange={setNavigatorPage} />
                <p className={`mt-3 text-sm ${styles.muted}`} aria-live="polite">
                    Đã chấm {submittedCount} / {questions.length} câu
                </p>
                <progress className={styles.progress} value={submittedCount} max={questions.length} aria-label="Tiến độ chấm câu hỏi" />
                <button
                    type="button"
                    onClick={() => setShowProgress(true)}
                    className={`mt-3 w-full ${styles.action}`}
                >
                    {canFinish ? "Xem kết quả" : "Xem tiến độ"}
                </button>
            </aside>
        </div>
    );
}
