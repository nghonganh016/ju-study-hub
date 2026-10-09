import { subjects } from "@/data/subjects";
import SubjectCard from "@/components/SubjectCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-pink-50 px-6 py-16 text-slate-800">
      <section className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-sm">
        <p className="mb-3 text-sm font-medium text-pink-600">
          Góc học tập của Ju
        </p>

        <h1 className="text-4xl font-bold">
          Ju Study Hub
        </h1>

        <p className="mt-4 leading-relaxed text-slate-600">
          Mỗi ngày hiểu thêm một chút. Hôm nay cùng chọn môn để ôn tập nhé!
        </p>
      </section>
      <section className="mx-auto mt-8 max-w-2xl">
        <h2 className="mb-4 text-2xl font-bold">
          Môn học
        </h2>

        <div className="space-y-4">
          {Object.entries(subjects).map(([subjectId, subject]) => (
            <SubjectCard
              key={subjectId}
              title={subject.title}
              description={subject.description}
              href={`/subjects/${subjectId}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}