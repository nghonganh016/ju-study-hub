import styles from "@/components/QuizConsole.module.css";

export type QuestionStatus = "unanswered" | "draft" | "correct" | "incorrect";
export const QUESTIONS_PER_PAGE = 25;

const statusDetails = {
    unanswered: { label: "Chưa chọn", symbol: "○", className: "" },
    draft: { label: "Chưa chấm", symbol: "•", className: styles.draft },
    correct: { label: "Đúng", symbol: "✓", className: styles.correct },
    incorrect: { label: "Sai", symbol: "×", className: styles.incorrect },
};

type QuizNavigationProps = {
    statuses: QuestionStatus[];
    currentIndex: number;
    page: number;
    onPageChange: (page: number) => void;
    onNavigate: (index: number) => void;
};

export default function QuizNavigation({ statuses, currentIndex, page, onPageChange, onNavigate }: QuizNavigationProps) {
    const start = page * QUESTIONS_PER_PAGE;
    const end = Math.min(start + QUESTIONS_PER_PAGE, statuses.length);
    const pageCount = Math.ceil(statuses.length / QUESTIONS_PER_PAGE);
    return (
        <nav aria-label="Bảng chọn câu hỏi">
            <h2 className={styles.navTitle}><span aria-hidden="true" className={styles.star}>✦</span> Chọn câu hỏi</h2>
            <div className={styles.pageControls}>
                <button type="button" className={styles.pageButton} disabled={page === 0}
                    aria-label="Nhóm câu trước" onClick={() => onPageChange(page - 1)}>‹</button>
                <span aria-live="polite">{start + 1 === end ? end : `${start + 1}–${end}`} / {statuses.length}</span>
                <button type="button" className={styles.pageButton} disabled={page >= pageCount - 1}
                    aria-label="Nhóm câu sau" onClick={() => onPageChange(page + 1)}>›</button>
            </div>
            <div className={styles.questionGrid}>
                {statuses.slice(start, end).map((status, offset) => {
                    const index = start + offset;
                    const details = statusDetails[status];
                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => onNavigate(index)}
                            aria-label={`Câu ${index + 1}: ${details.label}`}
                            aria-current={currentIndex === index ? "step" : undefined}
                            title={`Câu ${index + 1}: ${details.label}`}
                            className={`${styles.tile} ${details.className}`}
                        >
                            <span>{index + 1}</span>
                            <span aria-hidden="true" className="text-xs leading-3">{details.symbol}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
