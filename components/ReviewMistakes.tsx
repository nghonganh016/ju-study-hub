"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import QuizRunner from "@/components/QuizRunner";
import styles from "@/components/QuizConsole.module.css";
import { isProgressComplete, restoreProgress } from "@/lib/quiz-progress";
import { mistakeId, readMistakes, ROUND_KEY, REVIEW_PROGRESS_KEY, type ReviewItem } from "@/lib/mistakes";
import { ALL_SCOPE, createReviewRound, filterReviewItems, reviewScopeLabel, type ReviewScope } from "@/lib/review-round";
import { createReviewState, inspectLegacyReview, parseReviewProgress, parseReviewState,
    REVIEW_STATE_KEY, type ReviewState } from "@/lib/review-state";
import { localStudyStorage } from "@/lib/storage";

type Section = { id: string; title: string; chapters: { id: string; title: string }[] };
type View = "loading" | "select" | "round" | "legacy-choice" | "legacy-issue" | "blocked";

export default function ReviewMistakes({ catalog, sections }: { catalog: ReviewItem[]; sections: Section[] }) {
    const [record, setRecord] = useState<ReviewState | null>(null);
    const recordRef = useRef<ReviewState | null>(null);
    const [view, setView] = useState<View>("loading");
    const [scope, setScope] = useState<ReviewScope>(ALL_SCOPE);
    const [available, setAvailable] = useState<ReviewItem[]>([]);
    const [scopeComplete, setScopeComplete] = useState(false);
    const [legacyChoice, setLegacyChoice] = useState<ReviewState | null>(null);
    const [problem, setProblem] = useState<string | null>(null);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [pendingProgress, setPendingProgress] = useState(false);
    const [reloadToken, setReloadToken] = useState(0);

    useEffect(() => {
        let cancelled = false;
        queueMicrotask(() => {
            if (cancelled) return;
            // Resolving catalog refs is only for display. Never rewrite raw mistakes here.
            const current = createReviewRound(readMistakes(), catalog, ALL_SCOPE);
            setAvailable(current);
            setProblem(null);
            setSaveError(null);
            setPendingProgress(false);
            let v2Raw: string | null;
            try { v2Raw = localStudyStorage.getItem(REVIEW_STATE_KEY); }
            catch {
                setProblem("Không đọc được Review v2. Dữ liệu cũ vẫn nguyên vẹn; hãy kiểm tra quyền lưu trữ rồi thử lại.");
                setView("blocked");
                return;
            }
            let next: ReviewState | null = null;
            if (v2Raw !== null) {
                try { next = parseReviewState(v2Raw, sections); }
                catch (error) {
                    setProblem(`Review v2 không hợp lệ: ${error instanceof Error ? error.message : "Không thể khôi phục."} Không tự chuyển về v1.`);
                    setView("blocked");
                    return;
                }
            } else {
                let roundRaw: string | null;
                let progressRaw: string | null;
                try {
                    roundRaw = localStudyStorage.getItem(ROUND_KEY);
                    progressRaw = localStudyStorage.getItem(REVIEW_PROGRESS_KEY);
                } catch {
                    setProblem("Không đọc được dữ liệu Review v1. Dữ liệu cũ vẫn nguyên vẹn; hãy thử lại khi storage hoạt động.");
                    setView("blocked");
                    return;
                }
                const legacy = inspectLegacyReview(roundRaw, progressRaw, sections, catalog);
                if (legacy.kind === "invalid") {
                    setProblem(`${legacy.reason} Hai key v1 được giữ nguyên; chỉ bắt đầu lượt mới khi bạn chọn.`);
                    setView("legacy-issue");
                    return;
                }
                if (legacy.kind === "choice") {
                    setLegacyChoice(legacy.state);
                    setScope(legacy.state.scope);
                    setView("legacy-choice");
                    return;
                }
                if (legacy.kind === "ready") {
                    try {
                        // A second check avoids overwriting a v2 round opened by another tab.
                        if (localStudyStorage.getItem(REVIEW_STATE_KEY) !== null) throw Error("V2 đã thay đổi.");
                        localStudyStorage.setItem(REVIEW_STATE_KEY, JSON.stringify(legacy.state));
                        next = legacy.state;
                    } catch {
                        setProblem("Chưa chuyển được lượt Review v1 sang v2. Hai key v1 vẫn nguyên vẹn; hãy thử lại.");
                        setView("blocked");
                        return;
                    }
                }
            }
            recordRef.current = next;
            setRecord(next);
            setLegacyChoice(null);
            const nextScope = next?.scope ?? ALL_SCOPE;
            const items = next ? createReviewRound(next.items, catalog, nextScope) : [];
            const questions = items.map(item => ({ ...item.question, id: mistakeId(item) }));
            const complete = next ? isProgressComplete(JSON.stringify(next.progress), questions) : false;
            setScope(nextScope);
            setScopeComplete(complete && filterReviewItems(current, nextScope).length === 0);
            setView(items.length && !complete ? "round" : "select");
        });
        return () => { cancelled = true; };
    }, [catalog, sections, reloadToken]);

    const filtered = filterReviewItems(available, scope);
    const savedItems = record?.items;
    const savedScope = record?.scope;
    const items = useMemo(() => savedItems && savedScope ? createReviewRound(savedItems, catalog, savedScope) : [],
        [savedItems, savedScope, catalog]);
    const questions = useMemo(() => items.map(item => ({ ...item.question, id: mistakeId(item) })), [items]);
    const complete = record ? isProgressComplete(JSON.stringify(record.progress), questions) : false;
    const hasMissingItems = record !== null && items.length < record.items.length;
    const hasUnresolvedAnswers = record !== null && Object.keys(record.progress.answers).length
        > Object.keys(restoreProgress(JSON.stringify(record.progress), questions).answers).length;
    const catalogWarning = [hasMissingItems ? "Một số câu trong lượt không còn trong ngân hàng; tham chiếu đã lưu vẫn được giữ." : null,
        hasUnresolvedAnswers ? "Một số đáp án đã lưu không còn khớp ngân hàng câu hỏi; dữ liệu gốc vẫn được giữ." : null]
        .filter(Boolean).join(" ");

    function persist(next: ReviewState, expectedRoundId: string | null) {
        try {
            const raw = localStudyStorage.getItem(REVIEW_STATE_KEY);
            if (expectedRoundId === null ? raw !== null
                : raw === null || parseReviewState(raw, sections).roundId !== expectedRoundId) {
                throw Error("Lượt ôn đã thay đổi trong tab khác.");
            }
            localStudyStorage.setItem(REVIEW_STATE_KEY, JSON.stringify(next));
            setSaveError(null);
            return true;
        } catch {
            setSaveError("Thay đổi Review chưa được lưu. Dữ liệu đã lưu trước đó vẫn còn; hãy thử lại trước khi tải lại trang.");
            return false;
        }
    }

    function activate(next: ReviewState) {
        recordRef.current = next;
        setRecord(next);
        setLegacyChoice(null);
        setScope(next.scope);
        setScopeComplete(false);
        setPendingProgress(false);
        setView(next.items.length ? "round" : "select");
    }

    function startRound(nextItems: ReviewItem[], nextScope: ReviewScope) {
        const next = createReviewState(nextItems, nextScope);
        if (!persist(next, recordRef.current?.roundId ?? null)) return;
        activate(next);
    }

    function beginSelected() {
        if (!filtered.length) return;
        if (record?.items.length && (!complete || saveError)
            && !window.confirm("Lượt ôn đang dở sẽ được thay bằng lượt mới. Bạn có muốn tiếp tục?")) return;
        startRound(filtered, scope);
    }

    function chooseLegacy(continueOld: boolean) {
        if (!legacyChoice) return;
        const next = continueOld ? legacyChoice
            : createReviewState(filterReviewItems(available, legacyChoice.scope), legacyChoice.scope);
        if (!persist(next, null)) return;
        activate(next);
    }

    function startAfterLegacyIssue() {
        const next = createReviewState(available, ALL_SCOPE);
        if (!persist(next, null)) return;
        activate(next);
    }

    function saveProgress(roundId: string, raw: string) {
        const current = recordRef.current;
        if (!current || current.roundId !== roundId) return;
        let progress;
        try { progress = parseReviewProgress(JSON.parse(raw), current.items); }
        catch {
            setPendingProgress(false);
            setSaveError("Không thể lưu tiến độ Review vì dữ liệu đáp án không hợp lệ.");
            return;
        }
        // Keep answers for saved refs that are temporarily absent from the catalog.
        const next = { ...current, progress: { ...progress,
            answers: { ...current.progress.answers, ...progress.answers } } };
        recordRef.current = next;
        setRecord(next);
        setPendingProgress(true);
        if (persist(next, roundId)) setPendingProgress(false);
    }

    function retrySave() {
        const current = recordRef.current;
        if (pendingProgress && current && persist(current, current.roundId)) setPendingProgress(false);
    }

    function changeScope() {
        setAvailable(createReviewRound(readMistakes(), catalog, ALL_SCOPE));
        setScopeComplete(false);
        setView("select");
    }

    function nextRound() {
        const current = recordRef.current;
        if (!current) return;
        const latest = createReviewRound(readMistakes(), catalog, ALL_SCOPE);
        const remaining = filterReviewItems(latest, current.scope);
        setAvailable(latest);
        if (remaining.length) startRound(remaining, current.scope);
        else {
            setScope(current.scope);
            setScopeComplete(true);
            setView("select");
        }
    }

    if (view === "round" && record && items.length) return <QuizRunner key={record.roundId}
        subjectId="review" subjectTitle="Ôn câu sai" chapterId="mistakes" chapterTitle="Luyện lại các câu cần ôn"
        questions={questions} reviewItems={items} reviewScopeLabel={reviewScopeLabel(record.scope, sections)}
        initialReviewProgress={JSON.stringify(record.progress)}
        onReviewProgressChange={raw => saveProgress(record.roundId, raw)}
        reviewSaveWarning={[saveError, catalogWarning].filter(Boolean).join(" ") || null}
        onRetryReviewSave={saveError && pendingProgress ? retrySave : undefined}
        onChangeReviewScope={changeScope} onNewReviewRound={nextRound} />;

    return <main className={styles.scene}>
        <section className={styles.console}>
            <div className={styles.screen}>
                <h1>Ôn câu sai</h1>
                {view === "loading" ? <p className="my-6" role="status">Đang tải câu cần ôn…</p>
                    : view === "blocked" ? <>
                        <p role="alert" className="my-5">{problem}</p>
                        <button type="button" className={styles.primary} onClick={() => setReloadToken(value => value + 1)}>Thử đọc lại</button>
                    </> : view === "legacy-choice" ? <>
                        <p className="my-5">Review v1 có tiến độ nhưng không có round ID để xác nhận đáp án thuộc lượt nào. Hai key v1 sẽ được giữ nguyên.</p>
                        {saveError && <p role="alert" className="my-3">{saveError}</p>}
                        <div className="mt-5 flex flex-wrap gap-3">
                            <button type="button" className={styles.primary} onClick={() => chooseLegacy(true)}>Tiếp tục lượt cũ</button>
                            <button type="button" className={styles.primary} onClick={() => chooseLegacy(false)}>Bắt đầu lượt mới</button>
                            <button type="button" className={styles.primary} onClick={() => setReloadToken(value => value + 1)}>Thử đọc lại</button>
                        </div>
                    </> : view === "legacy-issue" ? <>
                        <p role="alert" className="my-5">{problem}</p>
                        {saveError && <p role="alert" className="my-3">{saveError}</p>}
                        <div className="mt-5 flex flex-wrap gap-3">
                            <button type="button" className={styles.primary} onClick={startAfterLegacyIssue}>Bắt đầu lượt mới từ kho câu sai</button>
                            <button type="button" className={styles.primary} onClick={() => setReloadToken(value => value + 1)}>Thử đọc lại</button>
                        </div>
                    </> : <>
                        {saveError && <div role="alert" className="my-3"><p>{saveError}</p>
                            {pendingProgress && <button type="button" className="font-bold underline" onClick={retrySave}>Thử lưu lại</button>}
                        </div>}
                        {catalogWarning && <p role="status">{catalogWarning}</p>}
                        <div className="my-5 grid gap-3 sm:grid-cols-2">
                            <label className="grid min-w-0 gap-1 font-semibold">Môn học
                                <select className="w-full min-w-0 rounded-xl border border-violet-300 bg-white p-3 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                                    value={scope.subjectId ?? "all"} onChange={event => {
                                        setScope({ subjectId: event.target.value === "all" ? null : event.target.value, chapterId: null });
                                        setScopeComplete(false);
                                    }}>
                                    <option value="all">Tất cả môn học</option>
                                    {sections.map(section => <option key={section.id} value={section.id}>{section.title}</option>)}
                                </select>
                            </label>
                            <label className="grid min-w-0 gap-1 font-semibold">Chapter / session
                                <select className="w-full min-w-0 rounded-xl border border-violet-300 bg-white p-3 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
                                    value={scope.chapterId ?? "all"} disabled={!scope.subjectId}
                                    onChange={event => { setScope({ ...scope, chapterId: event.target.value === "all" ? null : event.target.value }); setScopeComplete(false); }}>
                                    <option value="all">Tất cả chapter / session</option>
                                    {sections.find(section => section.id === scope.subjectId)?.chapters.map(chapter =>
                                        <option key={chapter.id} value={chapter.id}>{chapter.title}</option>)}
                                </select>
                            </label>
                        </div>
                        <p className="mb-4" aria-live="polite">{filtered.length} câu sai trong phạm vi đã chọn</p>
                        {scopeComplete ? <p role="status">Bạn đã hoàn thành phạm vi này. Hãy chọn phạm vi khác để ôn tiếp.</p>
                            : available.length === 0 ? <p role="status">Hiện chưa có câu sai trong kho cần ôn.</p>
                            : filtered.length === 0 ? <p role="status">Không có câu sai trong bộ lọc này.</p> : null}
                        <div className="mt-5 flex flex-wrap gap-3">
                            <button type="button" className={styles.primary} disabled={filtered.length === 0} onClick={beginSelected}>Bắt đầu ôn</button>
                            {record && !complete && items.length > 0 && <button type="button" className={styles.primary} onClick={() => setView("round")}>Tiếp tục lượt đang dở</button>}
                            <Link href="/" className={styles.primary}>Về chọn môn học</Link>
                        </div>
                    </>}
            </div>
        </section>
    </main>;
}
