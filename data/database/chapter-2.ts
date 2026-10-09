import type { Chapter } from "@/types/quiz";

export const chapter2: Chapter = {
    id: "chapter-2",
    title: "Advanced Internals and Programmability",
    description: "This is a test chapter",
    revision: 1,
    questions: [
        {
            id: "db-ch2-1-q01",
            prompt: "What is the main goal of PostgreSQL's 'fail fast, fail early' approach?",
            options: [
                {
                    id: "a",
                    text: "To speed up the insertion of very large datasets"
                },
                {
                    id: "b",
                    text: "To ensure that invalid data never touches the disk"
                },
                {
                    id: "c",
                    text: "To allow the system to automatically fix data errors"
                },
                {
                    id: "d",
                    text: "To ignore minor schema mismatches during updates"}
            ],
            correctOptionId: "b",
            explanation: "PostgreSQL's 'fail fast, fail early' approach is designed to catch errors as soon as possible, preventing invalid data from being written to disk. This ensures data integrity and helps maintain the reliability of the database system.",
        }
    ]
};