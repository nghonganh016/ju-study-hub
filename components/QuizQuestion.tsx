"use client";

import styles from "@/components/QuizNotebook.module.css";
import MathText from "@/components/MathText";
import type { Question } from "@/types/quiz";

type QuizQuestionProps = {
    question: Question;
    selectedOptionId: string | null;
    isSubmitted: boolean;
    onSelect: (optionId: string) => void;
    onSubmit: () => void;
};

export default function QuizQuestion({ question, selectedOptionId, isSubmitted, onSelect, onSubmit }: QuizQuestionProps) {
    const isCorrect = selectedOptionId === question.correctOptionId;

    function handleSubmit() {
        if (selectedOptionId === null || isSubmitted) {
            return;
        }

        onSubmit();
    }

    return (
        <div className="mt-4">
            <fieldset disabled={isSubmitted} className="min-w-0">
                <legend className="text-lg font-semibold leading-snug">
                    <MathText text={question.prompt} />
                </legend>

                <div className="mt-3 space-y-2">
                    {question.options.map((option) => (
                        <label
                            key={option.id}
                            className={styles.option}
                        >
                            <input
                                type="radio"
                                name={question.id}
                                value={option.id}
                                checked={selectedOptionId === option.id}
                                onChange={() => onSelect(option.id)}
                                className={styles.radio}
                            />

                            <span className="min-w-0 flex-1">
                                <span className={styles.letter}>
                                    {option.id.toUpperCase()}.
                                </span>
                                <MathText text={option.text} />
                            </span>
                        </label>
                    ))}
                </div>
            </fieldset>

            <button
                type="button"
                onClick={handleSubmit}
                disabled={selectedOptionId === null || isSubmitted}
                className={`mt-4 ${styles.action}`}
            >
                {isSubmitted ? "Đã kiểm tra" : "Kiểm tra đáp án"}
            </button>

            {isSubmitted && (
                <div
                    role="status"
                    className={styles.feedback}
                >
                    <p className="font-semibold">
                        {isCorrect ? "Chính xác!" : "Chưa đúng."}
                    </p>

                    <p className="mt-2">
                        Đáp án đúng: {question.correctOptionId.toUpperCase()}.
                    </p>

                    {question.explanation && (
                        <div className={`mt-2 leading-relaxed ${styles.muted}`}>
                            <MathText text={question.explanation} />
                            {question.source && (
                                <>{" "}<a
                                    href={question.source}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline underline-offset-2"
                                    aria-label="Đọc nguồn tham khảo (mở tab mới)"
                                >Nguồn tham khảo ↗</a></>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
