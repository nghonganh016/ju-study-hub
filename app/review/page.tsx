import { subjects } from "@/data/subjects";
import ReviewMistakes from "@/components/ReviewMistakes";

export default function ReviewPage() {
    const catalog = Object.entries(subjects).flatMap(([subjectId, subject]) =>
        subject.chapters.flatMap(chapter => chapter.questions.map(question => ({
            subjectId, subjectTitle: subject.title, chapterId: chapter.id,
            chapterTitle: chapter.title, questionId: question.id, question,
        }))));
    return <ReviewMistakes catalog={catalog} />;
}
