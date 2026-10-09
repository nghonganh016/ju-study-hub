import { notFound } from "next/navigation";
import { chapter1 } from "@/data/blockchain/chapter-1";
import QuizConsolePreview from "@/components/quiz-preview/QuizConsolePreview";

export default function QuizConsolePreviewPage() {
    if (process.env.NODE_ENV !== "development") notFound();
    return <QuizConsolePreview questions={[0, 20, 24].map((index) => chapter1.questions[index])} />;
}
