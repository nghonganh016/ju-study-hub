import styles from "@/components/QuizConsole.module.css";

type QuizResultProps = {
    correctCount: number;
    totalQuestions: number;
    submittedCount: number;
    onContinue: () => void;
    onRestart: () => void;
    mode?: "quiz" | "review" | "bookmark";
};

export default function QuizResult({
    correctCount,
    totalQuestions,
    submittedCount,
    onContinue,
    onRestart,
    mode = "quiz",
}: QuizResultProps) {
    const percentage =
        submittedCount > 0
            ? Math.round((correctCount / submittedCount) * 100)
            : 0;

    return (
        <div className={styles.result}>
            <h2 className="text-2xl font-bold">
                {submittedCount === totalQuestions ? (mode === "quiz" ? "Hoàn thành bài quiz!" : mode === "review" ? "Hoàn thành lượt ôn!" : "Hoàn thành lượt luyện!") : (mode === "quiz" ? "Tiến độ bài quiz" : "Tiến độ lượt luyện")}
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
                <button type="button" onClick={onContinue} className={styles.primary}>
                    {submittedCount === totalQuestions ? "Xem lại câu hỏi" : "Tiếp tục làm bài"}
                </button>
                {submittedCount === totalQuestions && (
                    <button type="button" onClick={onRestart} className={styles.primary}>
                        {mode === "review" ? "Ôn các câu còn sai" : mode === "bookmark" ? "Luyện lại các câu đã lưu" : "Làm lại bài"}
                    </button>
                )}
            </div>
        </div>
    );
}
