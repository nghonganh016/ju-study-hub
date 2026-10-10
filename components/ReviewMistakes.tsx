"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import QuizRunner from "@/components/QuizRunner";
import styles from "@/components/QuizConsole.module.css";
import { isProgressComplete } from "@/lib/quiz-progress";
import { mistakeId, parseMistakes, readMistakes, resolveMistakes, saveMistakes,
    ROUND_KEY, REVIEW_PROGRESS_KEY, type ReviewItem } from "@/lib/mistakes";

export default function ReviewMistakes({ catalog }: { catalog: ReviewItem[] }) {
    const [round, setRound] = useState<ReviewItem[] | null>(null);
    const [generation, setGeneration] = useState(0);

    useEffect(() => {
        let cancelled = false;
        queueMicrotask(() => {
            if (cancelled) return;
            const current = resolveMistakes(readMistakes(), catalog);
            saveMistakes(current.map(({ subjectId, chapterId, questionId }) => ({ subjectId, chapterId, questionId })));
            let saved: ReviewItem[] = [];
            try {
                saved = resolveMistakes(parseMistakes(window.localStorage.getItem(ROUND_KEY)), catalog);
                const progress = window.localStorage.getItem(REVIEW_PROGRESS_KEY);
                // Reopening a completed round starts with the remaining mistakes.
                if (isProgressComplete(progress, saved.map(item => ({ ...item.question, id: mistakeId(item) })))) saved = [];
            } catch { /* Start in memory. */ }
            const next = saved.length ? saved : current;
            if (!saved.length) {
                try { window.localStorage.removeItem(REVIEW_PROGRESS_KEY); } catch { /* Start in memory. */ }
            }
            try { window.localStorage.setItem(ROUND_KEY, JSON.stringify({ version: 1, items: next.map(({ subjectId, chapterId, questionId }) => ({ subjectId, chapterId, questionId })) })); } catch { /* Start in memory. */ }
            setRound(next);
        });
        return () => { cancelled = true; };
    }, [catalog, generation]);

    function newRound() {
        try {
            window.localStorage.removeItem(ROUND_KEY);
            window.localStorage.removeItem(REVIEW_PROGRESS_KEY);
        } catch { /* Start in memory. */ }
        setRound(null);
        setGeneration(value => value + 1);
    }

    if (!round?.length) return (
        <main className={styles.scene}>
            <section className={styles.console}>
                <div className={styles.screen}>
                    <h1>Ôn câu sai</h1>
                    <p className="my-6" role="status">{round === null ? "Đang tải câu cần ôn…" : "Tuyệt! Hiện không có câu sai cần ôn. Câu trả lời sai trong bài thường sẽ được lưu ở đây."}</p>
                    <Link href="/" className={styles.primary}>Về chọn môn học</Link>
                </div>
            </section>
        </main>
    );

    return <QuizRunner key={generation} subjectId="review" subjectTitle="Ôn câu sai"
        chapterId="mistakes" chapterTitle="Luyện lại các câu cần ôn"
        questions={round.map(item => ({ ...item.question, id: mistakeId(item) }))}
        reviewItems={round} onNewReviewRound={newRound} />;
}
