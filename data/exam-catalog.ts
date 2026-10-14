import { subjects } from "./subjects";
import type { ExamCatalogItem } from "../lib/exam";

export const examSections = Object.entries(subjects).map(([id, subject]) => ({
    id, title: subject.title,
    chapters: subject.chapters.map(chapter => ({ id: chapter.id, title: chapter.title })),
}));

export const examCatalog: ExamCatalogItem[] = Object.entries(subjects).flatMap(([subjectId, subject]) =>
    subject.chapters.flatMap(chapter => chapter.questions.map(question => ({
        subjectId, chapterId: chapter.id, questionId: question.id,
        subjectTitle: subject.title, chapterTitle: chapter.title,
        contentRevision: chapter.revision, question,
    }))));
