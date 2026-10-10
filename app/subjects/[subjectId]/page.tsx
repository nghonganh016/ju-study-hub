import Link from "next/link";
import { notFound } from "next/navigation";
import { subjects, isValidSubject } from "@/data/subjects";
import styles from "@/components/LevelSelect.module.css";

type SubjectPageProps = {
    params: Promise<{ subjectId: string }>;
};

export default async function SubjectPage({ params }: SubjectPageProps) {
    const { subjectId } = await params;
    if (!isValidSubject(subjectId)) notFound();
    const subject = subjects[subjectId];
    return (
        <main className={styles.page} data-accent={subject.accent}>
            <div className={styles.content}>
                <header className={styles.header}>
                    <Link href="/" className={styles.brand} aria-label="Ju Study Hub, về trang chủ">
                        <span className={styles.brandMark} aria-hidden="true" />
                        Ju Study Hub
                    </Link>
                    <Link href="/" className={styles.backLink}>← Chọn môn học</Link>
                </header>

                <section className={styles.levels} aria-labelledby="levels-heading">
                    <div className={styles.intro}>
                        <p className={styles.eyebrow}>Chọn màn chơi của bạn</p>
                        <h1 id="levels-heading">{subject.title}</h1>
                        <p>Chọn chapter để bắt đầu ôn tập.</p>
                    </div>

                    <div className={styles.levelList}>
                        {subject.chapters.map((chapter, index) => (
                            <Link
                                key={chapter.id}
                                href={`/quiz/${subjectId}/${chapter.id}`}
                                className={styles.levelCard}
                            >
                                <span className={styles.levelMarker}>
                                    <span>Level</span>
                                    <strong>{String(index + 1).padStart(2, "0")}</strong>
                                </span>
                                <span className={styles.levelContent}>
                                    <span className={styles.levelTitle}>{chapter.title}</span>
                                    <span className={styles.questionCount}>{chapter.questions.length} câu hỏi</span>
                                </span>
                                <span className={styles.levelArrow} aria-hidden="true">→</span>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
