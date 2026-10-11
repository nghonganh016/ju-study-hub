"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import QuizRunner from "@/components/QuizRunner";
import styles from "@/components/QuizConsole.module.css";
import { isProgressComplete } from "@/lib/quiz-progress";
import { mistakeId, readMistakes, saveMistakes, ROUND_KEY, REVIEW_PROGRESS_KEY, type ReviewItem } from "@/lib/mistakes";
import { ALL_SCOPE, createReviewRound, filterReviewItems, parseReviewRound, reviewScopeLabel,
    serializeReviewRound, type ReviewScope } from "@/lib/review-round";

type Section = { id: string; title: string; chapters: { id: string; title: string }[] };
type Round = { items: ReviewItem[]; scope: ReviewScope; complete: boolean };

export default function ReviewMistakes({ catalog, sections }: { catalog: ReviewItem[]; sections: Section[] }) {
    const [round, setRound] = useState<Round | null>(null);
    const [view, setView] = useState<"loading" | "select" | "round">("loading");
    const [scope, setScope] = useState<ReviewScope>(ALL_SCOPE);
    const [available, setAvailable] = useState<ReviewItem[]>([]);
    const [scopeComplete, setScopeComplete] = useState(false);
    const [memoryProgress, setMemoryProgress] = useState<string | null>(null);
    const [generation, setGeneration] = useState(0);

    useEffect(() => {
        let cancelled = false;
        queueMicrotask(() => {
            if (cancelled) return;
            const current = createReviewRound(readMistakes(), catalog, ALL_SCOPE);
            saveMistakes(current.map(({ subjectId, chapterId, questionId }) => ({ subjectId, chapterId, questionId })));
            let saved: ReturnType<typeof parseReviewRound> = { refs: [], scope: ALL_SCOPE };
            let progress: string | null = null;
            try {
                saved = parseReviewRound(window.localStorage.getItem(ROUND_KEY), sections);
                progress = window.localStorage.getItem(REVIEW_PROGRESS_KEY);
            } catch { /* Storage unavailable; selection and quiz work in memory. */ }
            const items = createReviewRound(saved.refs, catalog, saved.scope);
            const complete = isProgressComplete(progress, items.map(item => ({ ...item.question, id: mistakeId(item) })));
            setAvailable(current);
            setScope(saved.scope);
            setScopeComplete(complete && filterReviewItems(current, saved.scope).length === 0);
            setRound(items.length ? { items, scope: saved.scope, complete } : null);
            setView(items.length && !complete ? "round" : "select");
        });
        return () => { cancelled = true; };
    }, [catalog, sections]);

    const filtered = filterReviewItems(available, scope);
    const questions = useMemo(() => round?.items.map(item => ({ ...item.question, id: mistakeId(item) })) ?? [], [round?.items]);

    function startRound(items: ReviewItem[], nextScope: ReviewScope) {
        if (items.length === 0) return;
        try {
            window.localStorage.removeItem(REVIEW_PROGRESS_KEY);
            window.localStorage.setItem(ROUND_KEY, serializeReviewRound(items, nextScope));
        } catch { /* Keep the new round in memory. */ }
        setRound({ items, scope: nextScope, complete: false });
        setMemoryProgress(null);
        setScope(nextScope);
        setScopeComplete(false);
        setGeneration(value => value + 1);
        setView("round");
    }

    function beginSelected() {
        if (!filtered.length) return;
        if (round && !round.complete && !window.confirm("Lượt ôn đang dở sẽ được thay bằng lượt mới. Bạn có muốn tiếp tục?")) return;
        startRound(filtered, scope);
    }

    function changeScope(complete: boolean) {
        setRound(previous => previous ? { ...previous, complete } : previous);
        setAvailable(createReviewRound(readMistakes(), catalog, ALL_SCOPE));
        setScopeComplete(false);
        setView("select");
    }

    function nextRound() {
        if (!round) return;
        const current = createReviewRound(readMistakes(), catalog, ALL_SCOPE);
        const remaining = filterReviewItems(current, round.scope);
        setAvailable(current);
        if (remaining.length) startRound(remaining, round.scope);
        else {
            setScope(round.scope);
            setScopeComplete(true);
            setRound({ ...round, complete: true });
            setView("select");
        }
    }

    if (view === "round" && round?.items.length) return <QuizRunner key={generation}
        subjectId="review" subjectTitle="Ôn câu sai" chapterId="mistakes" chapterTitle="Luyện lại các câu cần ôn"
        questions={questions}
        reviewItems={round.items} reviewScopeLabel={reviewScopeLabel(round.scope, sections)}
        initialReviewProgress={memoryProgress} onReviewProgressChange={setMemoryProgress}
        onChangeReviewScope={changeScope} onNewReviewRound={nextRound} />;

    return <main className={styles.scene}>
        <section className={styles.console}>
            <div className={styles.screen}>
                <h1>Ôn câu sai</h1>
                {view === "loading" ? <p className="my-6" role="status">Đang tải câu cần ôn…</p> : <>
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
                        {round && !round.complete && <button type="button" className={styles.primary} onClick={() => setView("round")}>Tiếp tục lượt đang dở</button>}
                        <Link href="/" className={styles.primary}>Về chọn môn học</Link>
                    </div>
                </>}
            </div>
        </section>
    </main>;
}
