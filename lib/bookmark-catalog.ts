import type { BookmarkRef } from "./bookmarks";

export type BookmarkQuestion = BookmarkRef & {
    subjectTitle: string;
    chapterTitle: string;
    prompt: string;
};

export type BookmarkSection = {
    id: string;
    title: string;
    chapters: { id: string; title: string }[];
};

export type BookmarkEntry = BookmarkRef & {
    subjectTitle: string;
    chapterTitle: string;
    summary: string;
    missing: boolean;
    href: string | null;
};

function key(ref: BookmarkRef) {
    return JSON.stringify([ref.subjectId, ref.chapterId, ref.questionId]);
}

function summarize(prompt: string) {
    const text = prompt.replace(/\s+/g, " ").trim();
    return text.length > 180 ? `${text.slice(0, 179).trimEnd()}…` : text;
}

// Task 5 can use this address once the quiz supports selecting questionId.
export function bookmarkedQuestionHref(ref: BookmarkRef) {
    return `/quiz/${encodeURIComponent(ref.subjectId)}/${encodeURIComponent(ref.chapterId)}?questionId=${encodeURIComponent(ref.questionId)}`;
}

export function resolveBookmarkEntries(refs: readonly BookmarkRef[], catalog: readonly BookmarkQuestion[], sections: readonly BookmarkSection[]): BookmarkEntry[] {
    const questions = new Map(catalog.map(item => [key(item), item]));
    const subjects = new Map(sections.map(section => [section.id, section]));
    return refs.map(ref => {
        const question = questions.get(key(ref));
        const subject = subjects.get(ref.subjectId);
        const chapter = subject?.chapters.find(item => item.id === ref.chapterId);
        return {
            subjectId: ref.subjectId,
            chapterId: ref.chapterId,
            questionId: ref.questionId,
            subjectTitle: question?.subjectTitle ?? subject?.title ?? ref.subjectId,
            chapterTitle: question?.chapterTitle ?? chapter?.title ?? ref.chapterId,
            summary: question ? summarize(question.prompt) : "Câu hỏi này không còn trong bộ dữ liệu.",
            missing: !question,
            href: question ? bookmarkedQuestionHref(ref) : null,
        };
    });
}

export function filterBookmarkEntries(entries: readonly BookmarkEntry[], subjectId: string, chapterId: string): BookmarkEntry[] {
    return entries.filter(item => (subjectId === "all" || item.subjectId === subjectId)
        && (chapterId === "all" || item.chapterId === chapterId));
}
