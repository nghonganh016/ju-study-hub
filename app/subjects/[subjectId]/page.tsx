import Link from "next/link";
import { notFound } from "next/navigation";
import { subjects, isValidSubject } from "@/data/subjects";

type SubjectPageProps = {
    params: Promise<{ subjectId: string }>;
};

export default async function SubjectPage({ params }: SubjectPageProps) {
    const { subjectId } = await params;
    if (!isValidSubject(subjectId)) notFound();
    const subject = subjects[subjectId];
    return (
        <main className="min-h-screen bg-pink-50 px-6 py-16 text-slate-800">
            <section className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-sm">
                <Link href="/" className="text-sm text-pink-700 hover:underline">
                    Về trang chủ
                </Link>

                <h1 className="mt-6 text-3xl font-bold">
                    {subject.title}
                </h1>

                <p className="mt-4 leading-relaxed text-slate-600">
                    {subject.description}
                </p>
                <div className="mt-8">
                    <h2 className="mb-4 text-xl font-semibold">
                        Các chapter
                    </h2>

                    {subject.chapters.map((chapter) => (
                        <article key={chapter.id} className="mt-4 rounded-2xl border border-pink-100 bg-pink-50 p-6">
                            <h3 className="text-lg font-semibold">
                                {chapter.title}
                            </h3>

                            <p className="mt-2 text-slate-600">
                                {chapter.description}
                            </p>

                            <p className="mt-4 text-sm font-medium text-pink-700">
                                {chapter.questions.length} câu hỏi
                            </p>
                            <Link
                                href={`/subjects/${subjectId}/${chapter.id}`}
                                className="mt-4 inline-block rounded-2xl bg-pink-700 font-heading px-4 py-2 font-medium text-white hover:bg-pink-800"
                            >
                                Xem chapter
                            </Link>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}