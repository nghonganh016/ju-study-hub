export type QuestionSource =
    | { kind: "lecture"; file: string; pdfPage: number; slideNumber: number; slideTitle: string }
    | { kind: "documentation"; title: string; url: string; section: string };

export type Question = {
    id: string;
    prompt: string;
    options: {
        id: string;
        text: string;
    }[];
    correctOptionId: string;
    explanation: string;
    source?: string;
    topic?: string;
    difficulty?: "easy" | "medium" | "hard";
    sources?: QuestionSource[];
};

export type Chapter = {
    id: string;
    title: string;
    description: string;
    revision: number;
    questions: Question[];
};
