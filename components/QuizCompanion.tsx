import StudyCat, { type CatMood } from "@/components/StudyCat";
import styles from "@/components/QuizConsole.module.css";

export default function QuizCompanion({ mood }: { mood: CatMood }) {
    return (
        <div className={styles.companion}>
            <svg className={styles.heart} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 20S3 14 3 8.5C3 3 9 2 12 7C15 2 21 3 21 8.5C21 14 12 20 12 20Z" />
            </svg>
            <div className={styles.catStage}><StudyCat mood={mood} /></div>
        </div>
    );
}
