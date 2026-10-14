"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import QuizRunner from "@/components/QuizRunner";
import styles from "@/components/QuizConsole.module.css";
import { readBookmarks } from "@/lib/bookmarks";
import { isPracticeComplete, readPractice, resolvePractice, selectPracticeItems,
    startPractice, updatePractice, type PracticeRecord } from "@/lib/bookmark-practice";
import { mistakeId, type ReviewItem } from "@/lib/mistakes";
import { reviewScopeLabel } from "@/lib/review-round";
import type { Answer } from "@/lib/quiz-progress";

type Section = { id: string; title: string; chapters: { id: string; title: string }[] };

export default function BookmarkPractice({ catalog, sections }: { catalog: ReviewItem[]; sections: Section[] }) {
    const [round, setRound] = useState<PracticeRecord | null | undefined>(undefined);
    const [saved, setSaved] = useState(true);
    const [emptyNext, setEmptyNext] = useState(false);

    useEffect(() => {
        let cancelled = false;
        queueMicrotask(() => {
            if (cancelled) return;
            const record = readPractice();
            setRound(record ? resolvePractice(record, catalog) : null);
        });
        return () => { cancelled = true; };
    }, [catalog]);

    const items = useMemo(() => round ? selectPracticeItems(round.items, catalog,
        { subjectId: null, chapterId: null }) : [], [round, catalog]);
    const questions = useMemo(() => items.map(item => ({ ...item.question, id: mistakeId(item) })), [items]);

    function handleProgress(id: string | null, answers: Record<string, Answer>) {
        if (!round) return;
        const result = updatePractice(round.roundId, id, answers);
        if (result === null) return;
        setSaved(result);
        // The QuizRunner owns live answer state; only update this wrapper on a new round.
    }

    function nextRound() {
        if (!round) return;
        const current = selectPracticeItems(readBookmarks(), catalog, round.scope);
        if (!current.length) { setEmptyNext(true); return; }
        const result = startPractice(current, round.scope);
        setSaved(result.saved);
        setEmptyNext(false);
        setRound(result.record);
    }

    if (round === undefined) return <main className={styles.scene}><section className={styles.console}><div className={styles.screen} role="status">Đang tải lượt luyện…</div></section></main>;
    if (!round || !items.length || emptyNext) return <main className={styles.scene}><section className={styles.console}><div className={styles.screen}>
        <h1>Luyện câu đã lưu</h1>
        <p className="my-5" role="status">{emptyNext ? "Không còn câu đã lưu hợp lệ trong phạm vi này để luyện tiếp."
            : round ? "Các câu trong lượt luyện không còn trong bộ dữ liệu." : "Chưa có lượt luyện nào."}</p>
        <Link href="/bookmarks" className={styles.primary}>Về câu đã lưu</Link>
    </div></section></main>;

    const initialProgress = JSON.stringify({ version: 1, currentQuestionId: round.currentQuestionId, answers: round.answers });
    return <>
        {!saved && <p className="mx-auto max-w-4xl p-3 text-center text-sm" role="status">Không lưu được tiến độ. Lượt luyện đang giữ trong bộ nhớ phiên này.</p>}
        <QuizRunner key={round.roundId} mode="bookmark" subjectId="bookmark-practice" subjectTitle="Luyện câu đã lưu"
            chapterId={round.roundId} chapterTitle="Luyện câu đã lưu" questions={questions}
            reviewItems={items} reviewScopeLabel={reviewScopeLabel(round.scope, sections)}
            initialPracticeProgress={initialProgress} initialComplete={isPracticeComplete(round, catalog)}
            onPracticeProgressChange={handleProgress} onNewPracticeRound={nextRound} />
    </>;
}
