import styles from "@/components/QuizConsole.module.css";

type BookmarkButtonProps = {
    bookmarked: boolean;
    pending: boolean;
    ready: boolean;
    onToggle: () => void;
};

export default function BookmarkButton({ bookmarked, pending, ready, onToggle }: BookmarkButtonProps) {
    const action = bookmarked ? "Bỏ lưu câu hỏi" : "Lưu câu hỏi";
    const label = !ready ? "Đang tải" : pending ? bookmarked ? "Lưu tạm" : "Bỏ tạm" : bookmarked ? "Đã lưu" : "Lưu câu";
    const description = pending ? `${action}. Thay đổi chưa lưu được vào trình duyệt.` : action;

    return (
        <button type="button" className={styles.bookmarkButton} disabled={!ready}
            aria-label={ready ? description : "Đang tải bookmark"} aria-pressed={bookmarked}
            data-pending={pending} title={ready ? description : undefined} onClick={onToggle}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
                <path d="M6 3.5h12v17l-6-4-6 4z" fill={bookmarked ? "currentColor" : "none"}
                    stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
            <span>{label}</span>
        </button>
    );
}
