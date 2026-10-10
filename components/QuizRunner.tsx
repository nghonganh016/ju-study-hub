"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import styles from "@/components/QuizConsole.module.css";
import Link from "next/link";
import GameArrow from "@/components/GameArrow";
import QuizCompanion from "@/components/QuizCompanion";
import type { CatMood } from "@/components/StudyCat";

import QuizQuestion from "@/components/QuizQuestion";
import QuizNavigation, { QUESTIONS_PER_PAGE, type QuestionStatus } from "@/components/QuizNavigation";
import QuizResult from "@/components/QuizResult";
import type { Question } from "@/types/quiz";

type Answer = { optionId: string; isSubmitted: boolean };

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function restoreProgress(raw: string | null, questions: Question[]) {
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
        // Malformed or outdated storage must not prevent studying.
    }
    return { currentIndex, answers };
}

export default function QuizRunner({ subjectId, subjectTitle, chapterId, chapterTitle, questions }: { subjectId: string; subjectTitle: string; chapterId: string; chapterTitle: string; questions: Question[] }) {
    const storageKey = `ju-study-hub:quiz-progress:${subjectId}:${chapterId}`;
    const [restoredKey, setRestoredKey] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    // Draft selections and graded answers survive navigation between questions.
    const [answers, setAnswers] = useState<Record<string, Answer>>({});
    const [showProgress, setShowProgress] = useState(false);
    const [navigatorPage, setNavigatorPage] = useState(0);
    const [motion, setMotion] = useState(true);
    const [navigationOpen, setNavigationOpen] = useState(false);
    const [reward, setReward] = useState<{ questionId: string; status: "correct" | "incorrect" } | null>(null);
    const screenRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!reward) return;
        const timer = window.setTimeout(() => setReward(null), 1100);
        return () => window.clearTimeout(timer);
    }, [reward]);

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
            const restored = restoreProgress(raw, questions);
            setCurrentIndex(restored.currentIndex);
            setAnswers(restored.answers);
            setNavigatorPage(Math.floor(restored.currentIndex / QUESTIONS_PER_PAGE));
            setRestoredKey(storageKey);
        });
        return () => { cancelled = true; };
    }, [storageKey, questions]);

    useEffect(() => {
        // Initial effects (including Strict Mode replays) cannot overwrite saved data.
        if (restoredKey !== storageKey) return;
        try {
            if (currentIndex === 0 && Object.keys(answers).length === 0) {
                window.localStorage.removeItem(storageKey);
            } else {
                window.localStorage.setItem(storageKey, JSON.stringify({
                    version: 1,
                    currentQuestionId: questions[currentIndex]?.id ?? null,
                    answers,
                }));
            }
        } catch {
            // Storage unavailable or full: keep the current in-memory progress.
        }
    }, [answers, currentIndex, questions, restoredKey, storageKey]);

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
        setReward(null);
        // Move keyboard interaction to the question instead of leaving Enter on
        // the navigation button that opened it. Keep the viewport in place.
        screenRef.current?.focus({ preventScroll: true });
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
        const selected = answers[question.id];
        if (!selected || selected.isSubmitted) return;
        // Feedback belongs only to this click, never to restored or revisited answers.
        setReward({ questionId: question.id, status: selected.optionId === question.correctOptionId ? "correct" : "incorrect" });
        setAnswers((previous) => {
            const answer = previous[question.id];
            if (!answer || answer.isSubmitted) return previous;
            return { ...previous, [question.id]: { ...answer, isSubmitted: true } };
        });
    }

    function handleRestart() {
        try {
            window.localStorage.removeItem(storageKey);
        } catch {
            // Reset the quiz even when browser storage is unavailable.
        }
        handleNavigate(0);
        setAnswers({});
        setShowProgress(false);
    }

    const handleQuizKeyDown = useEffectEvent((event: KeyboardEvent) => {
        if (restoredKey !== storageKey || showProgress || !question
            || event.defaultPrevented || event.repeat || event.isComposing
            || event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) return;

        const target = event.target;
        if (target instanceof HTMLElement) {
            // Preserve typing and native input behavior, including radio arrow keys.
            if (target.closest("input, textarea, select") || target.isContentEditable) return;
            // Enter belongs to the focused control, never both it and the quiz.
            if (event.key === "Enter"
                && target.closest("button, a[href], summary, [role='button'], [role='link']")) return;
        }

        const answer = answers[question.id];
        if (["1", "2", "3", "4"].includes(event.key)) {
            const optionId = ["a", "b", "c", "d"][Number(event.key) - 1];
            if (answer?.isSubmitted || !question.options.some((option) => option.id === optionId)) return;
            event.preventDefault();
            handleSelect(optionId);
        } else if (event.key === "ArrowLeft" && currentIndex > 0) {
            event.preventDefault();
            handleNavigate(currentIndex - 1);
        } else if (event.key === "ArrowRight" && currentIndex < questions.length - 1) {
            event.preventDefault();
            handleNavigate(currentIndex + 1);
        } else if (event.key === "Enter" && answer) {
            if (!answer.isSubmitted) {
                event.preventDefault();
                handleSubmit();
            } else if (currentIndex < questions.length - 1) {
                event.preventDefault();
                handleNavigate(currentIndex + 1);
            }
        }
    });

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => handleQuizKeyDown(event);
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    if (!question) return <p className="mt-8">Chapter này chưa có câu hỏi.</p>;
    const activeReward = reward?.questionId === question.id ? reward.status : undefined;
    const selected = answers[question.id];
    const mood: CatMood = showProgress && canFinish ? "completed"
        : activeReward && canFinish ? "celebrating"
        : activeReward === "incorrect" ? "wrong" : activeReward === "correct" ? "correct"
        : showProgress || selected?.isSubmitted ? "idle" : selected ? "thinking" : "waiting";

    return (
        <main className={styles.scene} data-motion={motion ? "on" : "off"}>
            <div className={styles.ambient} aria-hidden="true"><i /><i /><i /><span>✦</span><span>✧</span></div>
            <section className={styles.console} aria-label="Quiz">
                <nav className={styles.consoleTabs} aria-label="Điều hướng quiz">
                    <Link href="/" className={`${styles.consoleTab} ${styles.homeTab}`}>
                        <span aria-hidden="true">⌂</span>
                        Trang chủ
                    </Link>

                    <Link
                        href={`/subjects/${subjectId}`}
                        className={`${styles.consoleTab} ${styles.chapterTab}`}
                    >
                        <span aria-hidden="true">‹</span>
                        Chapters
                    </Link>

                    <button
                        type="button"
                        className={`${styles.consoleTab} ${styles.fxTab}`}
                        aria-pressed={motion}
                        aria-label={motion ? "Tắt hiệu ứng chuyển động" : "Bật hiệu ứng chuyển động"}
                        onClick={() => setMotion((previous) => !previous)}
                    >
                        <span aria-hidden="true">✦</span>
                        {motion ? "FX On" : "FX Off"}
                    </button>
                </nav>
                <div className={styles.consoleTop}>
                    <span className={styles.powerLight} aria-hidden="true">
                        <i />
                    </span>

                    <div className={styles.speaker} aria-hidden="true">
                        <b /><b /><b /><b /><b />
                    </div>

                    <span className={styles.consoleMark}>
                        Ju Study Hub <span aria-hidden="true">✦</span>
                    </span>
                </div>
                <div className={styles.consoleGrid}>
                    <section ref={screenRef} tabIndex={-1} className={styles.screen} aria-label="Nội dung bài học">
                        <div className={styles.screenHeader}><span className={styles.subject}>{subjectTitle}</span></div>
                        <h1>{chapterTitle}</h1>
                        <div className={styles.progressLabels} aria-live="polite"><span>Đã chấm <strong>{submittedCount}/{questions.length}</strong> câu</span><span>Đúng: <strong>{correctCount}</strong></span></div>
                        <div className={styles.progressTrack} role="progressbar" aria-label="Tiến độ chấm câu hỏi" aria-valuenow={submittedCount} aria-valuemin={0} aria-valuemax={questions.length}><span style={{ width: `${submittedCount / questions.length * 100}%` }} /></div>
                        {showProgress ? (
                            <QuizResult correctCount={correctCount} submittedCount={submittedCount}
                                totalQuestions={questions.length} onRestart={handleRestart}
                                onContinue={() => { handleNavigate(currentIndex); setShowProgress(false); }} />
                        ) : (
                            <div key={question.id} className={styles.questionEntry}>
                                <div className={styles.questionMeta}><span>Câu {currentIndex + 1} / {questions.length}</span></div>
                                <QuizQuestion question={question} selectedOptionId={selected?.optionId ?? null}
                                    isSubmitted={selected?.isSubmitted ?? false} onSelect={handleSelect} onSubmit={handleSubmit}
                                    reward={activeReward}
                                    navigation={<div className={styles.stepButtons}>
                                        <button type="button" aria-label="Câu trước" title="Câu trước" disabled={currentIndex === 0} onClick={() => handleNavigate(currentIndex - 1)}><GameArrow direction="left" /></button>
                                        <button type="button" aria-label="Câu tiếp theo" title="Câu tiếp theo" disabled={currentIndex === questions.length - 1} onClick={() => handleNavigate(currentIndex + 1)}><GameArrow direction="right" /></button>
                                    </div>} />
                            </div>
                        )}
                    </section>
                    <aside className={styles.sidePanel}>
                        <QuizCompanion mood={mood} />
                        <div className={styles.navigation}>
                            <button type="button" className={styles.navigationToggle} aria-expanded={navigationOpen} aria-controls="quiz-question-nav" onClick={() => setNavigationOpen(!navigationOpen)}>Chọn câu hỏi <span aria-hidden="true">{navigationOpen ? "−" : "+"}</span></button>
                            <div id="quiz-question-nav" className={styles.navigationBody} data-open={navigationOpen}>
                                <QuizNavigation statuses={statuses} currentIndex={currentIndex} page={navigatorPage} onPageChange={setNavigatorPage}
                                    onNavigate={(index) => { handleNavigate(index); setShowProgress(false); }} />
                            </div>
                            <button
                                type="button"
                                className={styles.summaryButton}
                                onClick={() => {
                                    setReward(null);
                                    setShowProgress(true);
                                }}
                            >
                                <span>
                                    {canFinish ? "Xem kết quả" : "Xem tiến độ"}
                                </span>

                                <span className={styles.summaryIcon} aria-hidden="true">
                                    <span className={styles.playTriangle}></span>
                                </span>
                            </button>
                        </div>
                    </aside>
                </div>
                <div className={styles.consoleBottom} aria-hidden="true"><span><i /></span><span>● ● ●</span></div>
            </section>
        </main>
    );
}
