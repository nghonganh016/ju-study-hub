"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import styles from "@/components/QuizConsole.module.css";
import Link from "next/link";
import GameArrow from "@/components/GameArrow";
import QuizCompanion from "@/components/QuizCompanion";
import type { CatMood } from "@/components/StudyCat";

import QuizQuestion from "@/components/QuizQuestion";
import BookmarkButton from "@/components/BookmarkButton";
import QuizNavigation, { QUESTIONS_PER_PAGE, type QuestionStatus } from "@/components/QuizNavigation";
import QuizResult from "@/components/QuizResult";
import MistakeLink from "@/components/MistakeLink";
import { recordAttempt, REVIEW_PROGRESS_KEY, type ReviewItem, type MistakeRef } from "@/lib/mistakes";
import { addBookmark, BOOKMARKS_KEY, flushBookmarks, isBookmarked, isBookmarkPending,
    removeBookmark } from "@/lib/bookmarks";
import type { Question } from "@/types/quiz";

import { questionIndexFromLink, restoreProgress, type Answer } from "@/lib/quiz-progress";

export default function QuizRunner({ subjectId, subjectTitle, chapterId, chapterTitle, questions, reviewItems, reviewScopeLabel, onChangeReviewScope, onNewReviewRound, initialReviewProgress, onReviewProgressChange, mistakeCatalog = [], requestedQuestionId = null }: { subjectId: string; subjectTitle: string; chapterId: string; chapterTitle: string; questions: Question[]; reviewItems?: ReviewItem[]; reviewScopeLabel?: string; onChangeReviewScope?: (complete: boolean) => void; onNewReviewRound?: () => void; initialReviewProgress?: string | null; onReviewProgressChange?: (raw: string) => void; mistakeCatalog?: MistakeRef[]; requestedQuestionId?: string | null }) {
    const isReview = reviewItems !== undefined;
    const storageKey = isReview ? REVIEW_PROGRESS_KEY : `ju-study-hub:quiz-progress:${subjectId}:${chapterId}`;
    const [restoredKey, setRestoredKey] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    // Draft selections and graded answers survive navigation between questions.
    const [answers, setAnswers] = useState<Record<string, Answer>>({});
    const [showProgress, setShowProgress] = useState(false);
    const [navigatorPage, setNavigatorPage] = useState(0);
    const [motion, setMotion] = useState(true);
    const [navigationOpen, setNavigationOpen] = useState(false);
    const [reward, setReward] = useState<{ questionId: string; status: "correct" | "incorrect" } | null>(null);
    const [bookmarkState, setBookmarkState] = useState<{ key: string; bookmarked: boolean; pending: boolean } | null>(null);
    const screenRef = useRef<HTMLElement>(null);
    const appliedQuestionId = useRef(requestedQuestionId);
    const latestRequestedQuestionId = useEffectEvent(() => requestedQuestionId);
    const latestInitialReviewProgress = useEffectEvent(() => initialReviewProgress);
    const reportReviewProgress = useEffectEvent((raw: string) => onReviewProgressChange?.(raw));
    const question = questions[currentIndex];
    const bookmarkSubjectId = reviewItems?.[currentIndex]?.subjectId ?? subjectId;
    const bookmarkChapterId = reviewItems?.[currentIndex]?.chapterId ?? chapterId;
    const bookmarkQuestionId = reviewItems?.[currentIndex]?.questionId ?? question?.id;
    const bookmarkKey = bookmarkQuestionId
        ? JSON.stringify([bookmarkSubjectId, bookmarkChapterId, bookmarkQuestionId]) : null;

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
            const restored = restoreProgress(raw ?? (isReview ? latestInitialReviewProgress() : null) ?? null, questions);
            const targetIndex = questionIndexFromLink(questions, latestRequestedQuestionId(), restored.currentIndex);
            setCurrentIndex(targetIndex);
            setAnswers(restored.answers);
            setNavigatorPage(Math.floor(targetIndex / QUESTIONS_PER_PAGE));
            setRestoredKey(storageKey);
        });
        return () => { cancelled = true; };
    }, [storageKey, questions, isReview]);

    useEffect(() => {
        if (restoredKey !== storageKey || appliedQuestionId.current === requestedQuestionId) return;
        let cancelled = false;
        queueMicrotask(() => {
            if (cancelled) return;
            appliedQuestionId.current = requestedQuestionId;
            const index = questionIndexFromLink(questions, requestedQuestionId, currentIndex);
            if (index !== currentIndex) {
                setCurrentIndex(index);
                setNavigatorPage(Math.floor(index / QUESTIONS_PER_PAGE));
                setReward(null);
                setShowProgress(false);
            }
        });
        return () => { cancelled = true; };
    }, [requestedQuestionId, restoredKey, storageKey, questions, currentIndex]);

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

    useEffect(() => {
        if (!bookmarkQuestionId || !bookmarkKey) return;
        let cancelled = false;
        const ref = { subjectId: bookmarkSubjectId, chapterId: bookmarkChapterId, questionId: bookmarkQuestionId };
        const sync = () => {
            flushBookmarks();
            setBookmarkState({ key: bookmarkKey, bookmarked: isBookmarked(ref), pending: isBookmarkPending(ref) });
        };
        // Keep the server and first client render identical, including Strict Mode replays.
        queueMicrotask(() => { if (!cancelled) sync(); });
        const onStorage = (event: StorageEvent) => {
            if (event.key === BOOKMARKS_KEY || event.key === null) sync();
        };
        window.addEventListener("storage", onStorage);
        window.addEventListener("focus", sync);
        return () => {
            cancelled = true;
            window.removeEventListener("storage", onStorage);
            window.removeEventListener("focus", sync);
        };
    }, [bookmarkSubjectId, bookmarkChapterId, bookmarkQuestionId, bookmarkKey]);

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
        // The link chooses the opening question only. Manual navigation owns the URL afterward.
        const url = new URL(window.location.href);
        if (url.searchParams.has("questionId")) {
            url.searchParams.delete("questionId");
            window.history.replaceState(window.history.state, "", url);
            // Keep the last applied prop until Next supplies a new one.
            appliedQuestionId.current = requestedQuestionId;
        }
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

    function handleToggleBookmark() {
        if (!bookmarkQuestionId || !bookmarkKey || bookmarkState?.key !== bookmarkKey) return;
        const ref = { subjectId: bookmarkSubjectId, chapterId: bookmarkChapterId, questionId: bookmarkQuestionId };
        if (bookmarkState.bookmarked) removeBookmark(ref);
        else addBookmark(ref);
        setBookmarkState({ key: bookmarkKey, bookmarked: isBookmarked(ref), pending: isBookmarkPending(ref) });
    }

    function handleSubmit() {
        if (!question || restoredKey !== storageKey) return;
        const selected = answers[question.id];
        if (!selected || selected.isSubmitted) return;
        const context = reviewItems?.[currentIndex] ?? { subjectId, chapterId, questionId: question.id };
        recordAttempt(context, selected.optionId === question.correctOptionId, isReview);
        // Feedback belongs only to this click, never to restored or revisited answers.
        setReward({ questionId: question.id, status: selected.optionId === question.correctOptionId ? "correct" : "incorrect" });
        setAnswers((previous) => {
            const answer = previous[question.id];
            if (!answer || answer.isSubmitted) return previous;
            return { ...previous, [question.id]: { ...answer, isSubmitted: true } };
        });
    }

    function handleRestart() {
        if (isReview && onNewReviewRound) {
            onNewReviewRound();
            return;
        }
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
    const currentBookmarkState = bookmarkKey !== null && bookmarkState?.key === bookmarkKey ? bookmarkState : null;
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
                        href={isReview ? "/" : `/subjects/${subjectId}`}
                        className={`${styles.consoleTab} ${styles.chapterTab}`}
                    >
                        <span aria-hidden="true">‹</span>
                        {isReview ? "Chọn môn" : "Chọn chapter"}
                    </Link>

                    {isReview ? <button type="button" className={`${styles.consoleTab} ${styles.chapterTab}`} onClick={() => onChangeReviewScope?.(canFinish)}>Đổi phạm vi</button>
                        : <MistakeLink catalog={mistakeCatalog} className={`${styles.consoleTab} ${styles.chapterTab}`} />}

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
                        {reviewScopeLabel && <p className={styles.muted}>Phạm vi: {reviewScopeLabel}</p>}
                        {reviewItems && <p className={styles.muted}>
                            {reviewItems[currentIndex].subjectTitle} · {reviewItems[currentIndex].chapterTitle}
                            {" · "}<Link href={`/quiz/${reviewItems[currentIndex].subjectId}/${reviewItems[currentIndex].chapterId}`}>Về bài gốc</Link>
                        </p>}
                        <div className={styles.progressLabels} aria-live="polite"><span>Đã chấm <strong>{submittedCount}/{questions.length}</strong> câu</span><span>Đúng: <strong>{correctCount}</strong></span></div>
                        <div className={styles.progressTrack} role="progressbar" aria-label="Tiến độ chấm câu hỏi" aria-valuenow={submittedCount} aria-valuemin={0} aria-valuemax={questions.length}><span style={{ width: `${submittedCount / questions.length * 100}%` }} /></div>
                        {showProgress ? (
                            <QuizResult correctCount={correctCount} submittedCount={submittedCount}
                                isReview={isReview}
                                totalQuestions={questions.length} onRestart={handleRestart}
                                onContinue={() => { handleNavigate(currentIndex); setShowProgress(false); }} />
                        ) : (
                            <div key={question.id} className={styles.questionEntry}>
                                <div className={styles.questionMeta}>
                                    <span>Câu {currentIndex + 1} / {questions.length}</span>
                                    <BookmarkButton ready={currentBookmarkState !== null}
                                        bookmarked={currentBookmarkState?.bookmarked ?? false}
                                        pending={currentBookmarkState?.pending ?? false}
                                        onToggle={handleToggleBookmark} />
                                </div>
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
