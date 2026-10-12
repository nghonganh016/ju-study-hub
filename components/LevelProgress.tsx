"use client";

import { useEffect, useState } from "react";
import { quizProgressKey, readLevelProgress, summarizeProgress } from "@/lib/quiz-progress";
import { localStudyStorage } from "@/lib/storage";
import styles from "@/components/LevelSelect.module.css";

type ProgressQuestion = { id: string; options: { id: string }[] };
type Snapshot = ReturnType<typeof summarizeProgress> | "unavailable" | null;

export default function LevelProgress({ subjectId, chapterId, chapterTitle, questions }: {
    subjectId: string; chapterId: string; chapterTitle: string; questions: ProgressQuestion[];
}) {
    const [snapshot, setSnapshot] = useState<Snapshot>(null);
    const key = quizProgressKey(subjectId, chapterId);

    useEffect(() => {
        const refresh = () => {
            try {
                setSnapshot(readLevelProgress(localStudyStorage, key, questions));
            } catch {
                setSnapshot("unavailable");
            }
        };
        const onStorage = (event: StorageEvent) => {
            if (event.key === key || event.key === null) refresh();
        };
        refresh();
        window.addEventListener("focus", refresh);
        window.addEventListener("pageshow", refresh);
        window.addEventListener("storage", onStorage);
        return () => {
            window.removeEventListener("focus", refresh);
            window.removeEventListener("pageshow", refresh);
            window.removeEventListener("storage", onStorage);
        };
    }, [key, questions]);

    const total = questions.length;
    const submitted = typeof snapshot === "object" && snapshot !== null ? snapshot.submitted : 0;
    const label = total === 0 ? "Chưa có câu hỏi"
        : snapshot === null ? "Đang đọc tiến độ"
        : snapshot === "unavailable" ? "Không đọc được tiến độ"
        : submitted === total ? "Đã hoàn thành"
        : submitted > 0 || snapshot.hasAnswers ? `Đã chấm ${submitted}/${total} câu` : "Chưa bắt đầu";
    const countInStatus = label.startsWith("Đã chấm");

    return (
        <span className={styles.progressBlock}>
            {!countInStatus && total > 0 && <span className={styles.questionCount}>{total} câu hỏi</span>}
            <span className={styles.progressStatus}>{label}{total > 0 && submitted === total && <span aria-hidden="true"> ✓</span>}</span>
            {total > 0 && <span className={styles.progressTrack} role="progressbar"
                aria-label={`Tiến độ ${chapterTitle}: ${label}`} aria-valuemin={0} aria-valuemax={total}
                aria-valuenow={snapshot === null || snapshot === "unavailable" ? undefined : submitted}
                aria-valuetext={label}>
                <span className={styles.progressFill} style={{ width: `${submitted / total * 100}%` }} />
            </span>}
        </span>
    );
}
