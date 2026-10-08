import styles from "@/components/QuizNotebook.module.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import { chapters } from "@/data/blockchain";
import QuizRunner from "@/components/QuizRunner";
import JournalAsset from "@/components/journal/JournalAsset";

type QuizPageProps = {
    params: Promise<{ chapterId: string }>;
};

export default async function QuizPage({ params }: QuizPageProps) {
    const { chapterId } = await params;

    const chapter = chapters.find((item) => item.id === chapterId);

    if (!chapter) {
        notFound();
    }

    const question = chapter.questions[0];

    if (!question) {
        return (
            <main className="p-8">
                <p>Chapter này chưa có câu hỏi.</p>
                <Link href="/subjects/blockchain" className="text-pink-700 underline">
                    Về danh sách chapter
                </Link>
            </main>
        );
    }

    return (
        <main className={styles.desk}>
            <section className={styles.book}>
                <JournalAsset kind="tape-striped" className={styles.bookTape} />
                <JournalAsset kind="tab-rounded" className={styles.paperTab} />
                <div className={styles.header}>
                    <Link
                        href="/subjects/blockchain"
                        className={styles.backLink}
                    >
                        Về danh sách chapter
                    </Link>
                </div>

                <h1 className={styles.title}>
                    {chapter.title}
                </h1>

                <QuizRunner key={chapter.id} subjectId="blockchain" chapterId={chapter.id} questions={chapter.questions} />
            </section>
        </main>
    );
}
