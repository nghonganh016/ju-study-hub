import styles from "@/components/QuizNotebook.module.css";

type QuizResultProps = {
    correctCount: number;
    totalQuestions: number;
    submittedCount: number;
    onContinue: () => void;
    onRestart: () => void;
};

export default function QuizResult({
    correctCount,
    totalQuestions,
    submittedCount,
    onContinue,
    onRestart,
}: QuizResultProps) {
    const percentage =
        submittedCount > 0
            ? Math.round((correctCount / submittedCount) * 100)
            : 0;

    return (
        <div className={styles.result}>
            <h2 className="text-2xl font-bold">
                {submittedCount === totalQuestions ? "Hoàn thành bài quiz!" : "Tiến độ bài quiz"}
            </h2>

            <p className={`mt-4 ${styles.muted}`}>Đã chấm {submittedCount} / {totalQuestions} câu</p>
            <progress className={styles.progress} value={submittedCount} max={totalQuestions} aria-label="Tiến độ chấm câu hỏi" />
            {submittedCount > 0 && <p className="mt-4 text-lg">
                Bạn trả lời đúng{" "}
                <span className={styles.resultScore}>
                    {correctCount} / {submittedCount}
                </span>{" "}
                câu đã chấm.
            </p>}

            <p className={`mt-2 ${styles.muted}`}>
                {submittedCount > 0 ? `Tỉ lệ đúng trên câu đã chấm: ${percentage}%` : "Chưa có câu nào được chấm."}
            </p>
            <p className={`mt-2 ${styles.muted}`}>
                Sai: {submittedCount - correctCount} · Chưa chấm: {totalQuestions - submittedCount}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button type="button" onClick={onContinue} className={styles.action}>
                    {submittedCount === totalQuestions ? "Xem lại câu hỏi" : "Tiếp tục làm bài"}
                </button>
                {submittedCount === totalQuestions && (
                    <button type="button" onClick={onRestart} className={styles.action}>
                        Làm lại bài
                    </button>
                )}
            </div>
        </div>
    );
}
