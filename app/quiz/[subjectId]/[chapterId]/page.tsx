
import Link from "next/link";
import { notFound } from "next/navigation";
import { subjects, isValidSubject, questionCatalog } from "@/data/subjects";
import QuizRunner from "@/components/QuizRunner";


type QuizPageProps = {
    params: Promise<{ subjectId: string; chapterId: string }>;
};

export default async function QuizPage({ params }: QuizPageProps) {
    const { subjectId, chapterId } = await params;
    if (!isValidSubject(subjectId)) notFound();
    const { chapters } = subjects[subjectId];

    const chapter = chapters.find((item) => item.id === chapterId);

    if (!chapter) {
        notFound();
    }

    const question = chapter.questions[0];

    if (!question) {
        return (
            <main className="p-8">
                <p>Chapter này chưa có câu hỏi.</p>
                <Link href={`/subjects/${subjectId}`} className="text-pink-700 underline">
                    Về danh sách chapter
                </Link>
            </main>
        );
    }

    return (
        <>
            <QuizRunner key={`${subjectId}:${chapter.id}`} subjectId={subjectId} subjectTitle={subjects[subjectId].title}
                chapterId={chapter.id} chapterTitle={chapter.title} questions={chapter.questions} mistakeCatalog={questionCatalog} />
        </>
    );
}
