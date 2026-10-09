"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Question } from "@/types/quiz";
import MathText from "@/components/MathText";
import { catLabels, type CatMood } from "@/components/StudyCat";
import QuizCompanion from "@/components/QuizCompanion";
import GameArrow from "@/components/GameArrow";
import styles from "@/components/QuizConsole.module.css";

type Answer = { optionId: string; submitted: boolean };
// Isolated design fixture. No production quiz handlers or browser storage.
export default function QuizConsolePreview({ questions }: { questions: Question[] }) {
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, Answer>>({});
    const [motion, setMotion] = useState(true);
    const [moodPreview, setMoodPreview] = useState<CatMood | null>(null);
    const [reward, setReward] = useState<"correct" | "incorrect" | null>(null);
    const [result, setResult] = useState(false);
    const [navigationOpen, setNavigationOpen] = useState(false);
    const question = questions[index];
    const answer = answers[question.id];
    const submitted = questions.filter((item) => answers[item.id]?.submitted).length;
    const correct = questions.filter((item) => answers[item.id]?.submitted && answers[item.id]?.optionId === item.correctOptionId).length;
    const complete = submitted === questions.length;
    const mood: CatMood = moodPreview ?? (result && complete ? "completed" : reward === "incorrect" ? "wrong" : reward === "correct" ? "correct" : answer && !answer.submitted ? "thinking" : !answer && !result ? "waiting" : "idle");

    useEffect(() => {
        if (!reward) return;
        const timer = window.setTimeout(() => setReward(null), 1100);
        return () => window.clearTimeout(timer);
    }, [reward]);

    function navigate(next: number) {
        setIndex(next);
        setResult(false);
        setReward(null);
        setMoodPreview(null);
    }

    function submit() {
        if (!answer || answer.submitted) return;
        setAnswers((previous) => ({ ...previous, [question.id]: { ...answer, submitted: true } }));
        setMoodPreview(null);
        setReward(answer.optionId === question.correctOptionId ? "correct" : "incorrect");
    }

    function restart() {
        setAnswers({});
        navigate(0);
    }

    return (
        <main className={styles.scene} data-motion={motion ? "on" : "off"}>
            <div className={styles.ambient} aria-hidden="true"><i /><i /><i /><span>✦</span><span>✧</span></div>
            <header className={styles.siteHeader}>
                <Link href="/" className={styles.brand}><span aria-hidden="true">✿</span> Ju Study Hub<span className={styles.brandDot}>●</span></Link>
                <div className={styles.headerTools}><span className={styles.previewBadge}>Bản mẫu tương tác</span><button type="button" className={styles.motionToggle} aria-pressed={!motion} onClick={() => setMotion(!motion)}>{motion ? "Tắt chuyển động" : "Bật chuyển động"}</button></div>
            </header>

            <div className={styles.intro}><span className={styles.eyebrow}>Một chút tập trung, một chút đáng yêu</span><p>Đến giờ lên cấp kiến thức <span aria-hidden="true">✧</span></p></div>

            <section className={styles.console} aria-label="Máy học cùng mèo">
                <div className={styles.consoleTop}><span aria-hidden="true"><i /></span><div aria-hidden="true" className={styles.speaker}><b /><b /><b /><b /><b /></div><span className={styles.consoleMark}>Ju / 01 <span aria-hidden="true">✦</span></span></div>
                <div className={styles.consoleGrid}>
                    <section className={styles.screen} aria-label="Câu hỏi mẫu">
                        <div className={styles.screenHeader}><span className={styles.subject}>Blockchain</span></div>
                        <h1>Wallet, key và transaction</h1>
                        <div className={styles.progressLabels}><span>Đã chấm <strong>{submitted}/{questions.length}</strong> câu mẫu</span><span>Đúng: <strong>{correct}</strong></span></div>
                        <div className={styles.progressTrack} role="progressbar" aria-label="Tiến độ câu mẫu" aria-valuenow={submitted} aria-valuemin={0} aria-valuemax={questions.length}><span style={{ width: `${submitted / questions.length * 100}%` }} /></div>

                        {result ? <div className={styles.result}>
                            <span className={styles.resultStar} aria-hidden="true">✦</span><h2>{complete ? "Một chặng nhỏ, làm tốt lắm!" : "Mỗi câu là một bước tiến"}</h2>
                            <p>Đã chấm {submitted}/{questions.length} câu · Đúng {correct}/{submitted} câu đã chấm.</p>
                            <p className={styles.resultNote}>Đây là lượt thử giao diện, không lưu vào bài học của Ju.</p>
                            <div className={styles.resultButtons}><button type="button" className={styles.primary} onClick={() => setResult(false)}>Quay lại câu hỏi</button><button type="button" className={styles.secondary} onClick={restart}>Thử lại từ đầu</button></div>
                        </div> : <div key={question.id} className={styles.questionEntry}>
                            <div className={styles.questionMeta}><span>Câu mẫu {index + 1} / {questions.length}</span><span>{index === 1 ? "Thử câu dài · Câu 21" : `Câu ${index === 0 ? 1 : 25} trong bài gốc`}</span></div>
                            <fieldset className={styles.answers} disabled={answer?.submitted}>
                                <legend><MathText text={question.prompt} /></legend>
                                {question.options.map((option) => {
                                    const selected = answer?.optionId === option.id;
                                    const status = answer?.submitted && option.id === question.correctOptionId ? "correct" : answer?.submitted && selected ? "incorrect" : selected ? "selected" : "default";
                                    return <label key={option.id} className={styles.option} data-status={status} data-reward={selected ? reward ?? undefined : undefined}>
                                        <input type="radio" name={question.id} value={option.id} checked={selected} onChange={() => { setAnswers((previous) => ({ ...previous, [question.id]: { optionId: option.id, submitted: false } })); setMoodPreview(null); }} />
                                        <span className={styles.optionLetter} aria-hidden="true">{option.id.toUpperCase()}</span>
                                        <span className={styles.optionText}><MathText text={option.text} /></span>
                                        <span className={styles.optionStatus}>{status === "correct" ? "✓ Đúng" : status === "incorrect" ? "× Sai" : selected ? "●" : ""}</span>
                                    </label>;
                                })}
                            </fieldset>
                            {answer?.submitted && <div className={styles.feedback} role="status"><strong>{answer.optionId === question.correctOptionId ? "✦ Chính xác!" : `Đáp án đúng: ${question.correctOptionId.toUpperCase()}.`}</strong><MathText text={question.explanation} />{question.source && <a href={question.source} target="_blank" rel="noopener noreferrer">Nguồn tham khảo ↗</a>}</div>}
                            <div className={styles.actions}><button type="button" className={styles.primary} disabled={!answer || answer.submitted} onClick={submit}>{answer?.submitted ? "✓ Đã kiểm tra" : "Kiểm tra đáp án"}<span aria-hidden="true">✦</span></button><div className={styles.stepButtons}><button type="button" aria-label="Câu trước" disabled={index === 0} onClick={() => navigate(index - 1)}><GameArrow direction="left" /></button><button type="button" aria-label="Câu tiếp theo" disabled={index === questions.length - 1} onClick={() => navigate(index + 1)}><GameArrow direction="right" /></button></div></div>
                        </div>}
                    </section>

                    <aside className={styles.sidePanel}>
                        <QuizCompanion mood={mood} />
                        <div className={styles.navigation}>
                            <button className={styles.navigationToggle} type="button" aria-expanded={navigationOpen} aria-controls="preview-question-nav" onClick={() => setNavigationOpen(!navigationOpen)}>Chọn câu mẫu <span>{navigationOpen ? "−" : "+"}</span></button>
                            <nav id="preview-question-nav" className={styles.navigationBody} data-open={navigationOpen} aria-label="Chọn câu mẫu"><h2>Chọn câu mẫu</h2><div className={styles.questionTiles}>{questions.map((item, i) => {
                                const stored = answers[item.id];
                                const state = stored?.submitted ? stored.optionId === item.correctOptionId ? "correct" : "incorrect" : stored ? "draft" : "unanswered";
                                const label = { correct: "Đúng", incorrect: "Sai", draft: "Chưa chấm", unanswered: "Chưa chọn" }[state];
                                return <button key={item.id} type="button" data-status={state} aria-current={i === index ? "step" : undefined} aria-label={`Câu mẫu ${i + 1}: ${label}`} onClick={() => navigate(i)}>{String(i + 1).padStart(2, "0")}<small aria-hidden="true">{state === "correct" ? "✓" : state === "incorrect" ? "×" : state === "draft" ? "•" : "○"}</small></button>;
                            })}</div><p>○ Chưa chọn · • Chưa chấm<br />✓ Đúng · × Sai</p></nav>
                            <button type="button" className={styles.summaryButton} onClick={() => { setResult(true); setReward(null); setMoodPreview(null); }}>{complete ? "Xem kết quả" : "Xem tiến độ"}<span aria-hidden="true">↗</span></button>
                        </div>
                        <div className={styles.hardware} aria-hidden="true"><span className={styles.dpad}>✚</span><div><i>B</i><i>A</i></div></div>
                    </aside>
                </div>
                <div className={styles.consoleBottom}><span aria-hidden="true"><i /></span><span aria-hidden="true">● ● ●</span></div>
            </section>

            <section className={styles.previewTools} aria-label="Thử biểu cảm linh vật"><span>Thử biểu cảm mèo</span><div>{(Object.keys(catLabels) as CatMood[]).map((item) => <button key={item} type="button" aria-pressed={moodPreview === item} onClick={() => setMoodPreview(item)}>{catLabels[item]}</button>)}<button type="button" aria-pressed={moodPreview === null} onClick={() => setMoodPreview(null)}>Theo câu trả lời</button></div><p>Bản mẫu 3 câu · Không lưu tiến trình · Chưa áp dụng vào quiz thật</p></section>
        </main>
    );
}
