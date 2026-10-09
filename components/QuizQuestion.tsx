"use client";

import type { ReactNode } from "react";
import styles from "@/components/QuizConsole.module.css";
import MathText from "@/components/MathText";
import type { Question } from "@/types/quiz";

type QuizQuestionProps = {
    question: Question;
    selectedOptionId: string | null;
    isSubmitted: boolean;
    onSelect: (optionId: string) => void;
    onSubmit: () => void;
    navigation?: ReactNode;
    reward?: "correct" | "incorrect";
};

export default function QuizQuestion({ question, selectedOptionId, isSubmitted, onSelect, onSubmit, navigation, reward }: QuizQuestionProps) {
    const isCorrect = selectedOptionId === question.correctOptionId;
    function handleSubmit() {
        if (selectedOptionId === null || isSubmitted) return;
        onSubmit();
    }

    return (
        <div>
            <fieldset disabled={isSubmitted} className={styles.answers}>
                <legend><MathText text={question.prompt} /></legend>
                {question.options.map((option) => {
                    const selected = selectedOptionId === option.id;
                    const status = isSubmitted && option.id === question.correctOptionId ? "correct"
                        : isSubmitted && selected ? "incorrect" : selected ? "selected" : "default";
                    return (
                        <label key={option.id} className={styles.option} data-status={status} data-reward={selected ? reward : undefined}>
                            <input type="radio" name={question.id} value={option.id} checked={selected} onChange={() => onSelect(option.id)} />
                            <span className={styles.optionLetter} aria-hidden="true">{option.id.toUpperCase()}</span>
                            <span className={styles.optionText}><MathText text={option.text} /></span>
                            <span className={styles.optionStatus}>{status === "correct" ? "✓ Đúng" : status === "incorrect" ? "× Sai" : selected ? "●" : ""}</span>
                        </label>
                    );
                })}
            </fieldset>
            {isSubmitted && (
                <div role="status" className={styles.feedback}>
                    <strong>{isCorrect ? "Chính xác!" : "Chưa đúng."} Đáp án đúng: {question.correctOptionId.toUpperCase()}.</strong>
                    {question.explanation && <MathText text={question.explanation} />}
                    {question.source && <a href={question.source} target="_blank" rel="noopener noreferrer" aria-label="Đọc nguồn tham khảo (mở tab mới)">Nguồn tham khảo ↗</a>}
                </div>
            )}
            <div className={styles.actions}>
                <button type="button" onClick={handleSubmit} disabled={selectedOptionId === null || isSubmitted} className={styles.primary}>
                    {isSubmitted ? "Đã kiểm tra" : "Kiểm tra đáp án"}<span aria-hidden="true">✦</span>
                </button>
                {navigation}
            </div>
        </div>
    );
}
