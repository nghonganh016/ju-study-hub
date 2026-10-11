import { subjects } from "@/data/subjects";
import ReviewMistakes from "@/components/ReviewMistakes";

export default function ReviewPage() {
    const sections = Object.entries(subjects).map(([id, subject]) => ({
        id, title: subject.title,
        chapters: subject.chapters.map(chapter => ({ id: chapter.id, title: chapter.title })),
    }));
    const catalog = Object.entries(subjects).flatMap(([subjectId, subject]) =>
        subject.chapters.flatMap(chapter => chapter.questions.map(question => ({
            subjectId, subjectTitle: subject.title, chapterId: chapter.id,
            chapterTitle: chapter.title, questionId: question.id, question,
        }))));
    return <ReviewMistakes catalog={catalog} sections={sections} />;
}
