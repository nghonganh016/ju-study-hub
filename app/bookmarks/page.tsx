import { subjects } from "@/data/subjects";
import BookmarkedQuestions from "@/components/BookmarkedQuestions";
import type { BookmarkQuestion, BookmarkSection } from "@/lib/bookmark-catalog";

export default function BookmarksPage() {
    const sections: BookmarkSection[] = Object.entries(subjects).map(([subjectId, subject]) => ({
        id: subjectId,
        title: subject.title,
        chapters: subject.chapters.map(chapter => ({ id: chapter.id, title: chapter.title })),
    }));
    // The client receives prompt text and IDs only, never correct answers.
    const catalog: BookmarkQuestion[] = Object.entries(subjects).flatMap(([subjectId, subject]) =>
        subject.chapters.flatMap(chapter => chapter.questions.map(question => ({
            subjectId,
            chapterId: chapter.id,
            questionId: question.id,
            subjectTitle: subject.title,
            chapterTitle: chapter.title,
            prompt: question.prompt,
        }))));

    return <BookmarkedQuestions catalog={catalog} sections={sections} />;
}
