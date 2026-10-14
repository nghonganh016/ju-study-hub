import { subjects, questionCatalog } from "@/data/subjects";
import Link from "next/link";
import SubjectCard from "@/components/SubjectCard";
import MistakeLink from "@/components/MistakeLink";
import styles from "@/components/Home.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <header className={styles.header}>
          <span className={styles.brandMark} aria-hidden="true" />
          <span className={styles.brand}>Ju Study Hub</span>
        </header>

        <section className={styles.subjects} aria-labelledby="subjects-heading">
          <div className={styles.intro}>
            <p className={styles.eyebrow}>Sẵn sàng ôn tập?</p>
            <h1 id="subjects-heading">Chọn môn học</h1>
            <p>Chọn một môn để tiếp tục hành trình học của bạn.</p>
          </div>

          <div className={styles.subjectGrid}>
            {Object.entries(subjects).map(([subjectId, subject]) => (
              <SubjectCard
                key={subjectId}
                title={subject.title}
                description={subject.description}
                accent={subject.accent}
                href={`/subjects/${subjectId}`}
              />
            ))}
          </div>
        </section>

        <aside className={styles.review} aria-label="Ôn tập nhanh">
          <p>Ôn tập thông minh hơn với những câu đã lưu hoặc trả lời sai.</p>
          <div className={styles.reviewActions}>
            <Link href="/bookmarks" className={styles.reviewLink}>Câu đã lưu</Link>
            <MistakeLink catalog={questionCatalog} className={styles.reviewLink} />
            <Link href="/exam" className={styles.reviewLink}>Thi thử</Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
