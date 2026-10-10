import type { Chapter } from "@/types/quiz";
import { chapters as blockchainChapters } from "./blockchain";
import { chapters as databaseChapters } from "./database";

export type SubjectAccent = "cyan" | "lavender";

type Subject = {
    title: string;
    description: string;
    accent: SubjectAccent;
    chapters: Chapter[];
};

// Registry keys are the unique subject IDs used in URLs and saved progress.
export const subjects = {
    blockchain: {
        title: "Blockchain",
        description: "Ôn tập kiến thức và luyện câu hỏi Blockchain theo từng chapter.",
        accent: "cyan",
        chapters: blockchainChapters,
    },
    database: {
        title: "Database",
        description: "Ôn tập cơ sở dữ liệu và luyện câu hỏi theo từng chapter.",
        accent: "lavender",
        chapters: databaseChapters,
    },
} satisfies Record<string, Subject>;

// Send only IDs to the mistake counter, not full question content.
export const questionCatalog = Object.entries(subjects).flatMap(([subjectId, subject]) =>
    subject.chapters.flatMap(chapter => chapter.questions.map(question => ({
        subjectId, chapterId: chapter.id, questionId: question.id,
    }))));

export type SubjectId = keyof typeof subjects;

export function isValidSubject(id: string): id is SubjectId {
    return Object.hasOwn(subjects, id);
}
