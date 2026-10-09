import type { Chapter } from "@/types/quiz";
import { chapters as blockchainChapters } from "./blockchain";
import { chapters as databaseChapters } from "./database";

type Subject = {
    title: string;
    description: string;
    chapters: Chapter[];
};

// Registry keys are the unique subject IDs used in URLs and saved progress.
export const subjects = {
    blockchain: {
        title: "Blockchain",
        description: "Ôn tập kiến thức và luyện câu hỏi Blockchain theo từng chapter.",
        chapters: blockchainChapters,
    },
    database: {
        title: "Database",
        description: "Ôn tập cơ sở dữ liệu và luyện câu hỏi theo từng chapter.",
        chapters: databaseChapters,
    },
} satisfies Record<string, Subject>;

export type SubjectId = keyof typeof subjects;

export function isValidSubject(id: string): id is SubjectId {
    return Object.hasOwn(subjects, id);
}