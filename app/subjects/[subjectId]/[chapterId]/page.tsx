import Link from "next/link";
import { notFound } from "next/navigation";
import { subjects, isValidSubject } from "@/data/subjects";

type ChapterPageProps = {
    params: Promise<{ subjectId: string; chapterId: string }>;
};

export default async function ChapterPage({ params }: ChapterPageProps) {
    const { subjectId, chapterId } = await params;
    if (!isValidSubject(subjectId)) notFound();
    const { chapters } = subjects[subjectId];

    const chapter = chapters.find((item) => item.id === chapterId);

    if (!chapter) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-pink-50 px-6 py-16 text-slate-800">
            <section className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-sm">
                <Link
                    href={`/subjects/${subjectId}`}
                    className="text-sm text-pink-700 hover:underline"
                >
                    Về danh sách chapter
                </Link>

                <h1 className="mt-6 text-3xl font-bold">
                    {chapter.title}
                </h1>

                <p className="mt-4 leading-relaxed text-slate-600">
                    {chapter.description}
                </p>

                <p className="mt-4 font-medium text-pink-700">
                    Số câu hỏi: {chapter.questions.length}
                </p>
                <Link
                    href={`/quiz/${subjectId}/${chapter.id}`}
                    className="mt-6 inline-block rounded-2xl bg-pink-700 font-heading px-4 py-2 font-medium text-white hover:bg-pink-800"
                >
                    Bắt đầu quiz
                </Link>
            </section>
        </main>
    );
}