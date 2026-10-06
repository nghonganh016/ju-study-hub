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
};

export type Chapter = {
    id: string;
    title: string;
    description: string;
    revision: number;
    questions: Question[];
};