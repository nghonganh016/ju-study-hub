"use client";

import { useCallback, useEffect, useEffectEvent, useRef, useState } from "react";
import Link from "next/link";
import GameArrow from "@/components/GameArrow";
import MathText from "@/components/MathText";
import QuizNavigation, { QUESTIONS_PER_PAGE, type QuestionStatus } from "@/components/QuizNavigation";
import consoleStyles from "@/components/QuizConsole.module.css";
import styles from "@/components/Exam.module.css";
import { EXAM_KEY, changeExamAnswer, createExam, examPool, incorrectExamRefs, moveExam, readExam, saveExam,
    submitExam, updateExam, type ExamCatalogItem, type ExamConfig, type ExamRecord } from "@/lib/exam";
import { MISTAKES_KEY, mistakeId, parseMistakes, recordAttempt } from "@/lib/mistakes";
import { localStudyStorage } from "@/lib/storage";

type Section = { id: string; title: string; chapters: { id: string; title: string }[] };
type View = "config" | "attempt";

function duration(ms: number) {
    const seconds = Math.max(0, Math.floor(ms / 1000));
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    return hours ? `${hours} giờ ${minutes} phút ${seconds % 60} giây` : `${minutes} phút ${seconds % 60} giây`;
}

function clockTime(ms: number) {
    const seconds = Math.max(0, Math.ceil(ms / 1000));
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    const minutesText = hours ? String(minutes).padStart(2, "0") : String(minutes);
    const clock = `${minutesText}:${String(seconds % 60).padStart(2, "0")}`;
    return hours ? `${hours}:${clock}` : clock;
}

export default function ExamApp({ catalog, sections, initialView }: {
    catalog: ExamCatalogItem[]; sections: Section[]; initialView: View;
}) {
    const [loaded, setLoaded] = useState(false);
    const [record, setRecord] = useState<ExamRecord | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [saved, setSaved] = useState(true);
    const [view, setView] = useState<View>(initialView);
    const [config, setConfig] = useState<ExamConfig>({ subjectId: sections[0]?.id ?? "", chapterId: null, count: 20, minutes: 30 });
    const [page, setPage] = useState(0);
    const [now, setNow] = useState(0);
    const screenRef = useRef<HTMLElement>(null);
    const recordRef = useRef<ExamRecord | null>(null);

    const showRecord = useCallback((next: ExamRecord, wasSaved: boolean) => {
        recordRef.current = next;
        setRecord(next);
        setSaved(wasSaved);
        setPage(Math.floor(next.currentIndex / QUESTIONS_PER_PAGE));
    }, []);

    const applyMistakes = useCallback((current: ExamRecord) => {
        if (current.status !== "submitted" || current.mistakesApplied) return;
        const wrong = incorrectExamRefs(current, catalog);
        for (const item of wrong) recordAttempt(item, false, false);
        let persisted = wrong.length === 0;
        if (wrong.length) {
            try {
                const stored = new Set(parseMistakes(localStudyStorage.getItem(MISTAKES_KEY)).map(mistakeId));
                persisted = wrong.every(item => stored.has(mistakeId(item)));
            } catch { /* Mistakes remain pending in their existing store. */ }
        }
        if (persisted) {
            const result = updateExam(current.attemptId, value => value.status === "submitted"
                ? { ...value, mistakesApplied: true } : value);
            if (result) showRecord(result.record, result.saved);
        }
    }, [catalog, showRecord]);

    const checkDeadline = useEffectEvent(() => {
        const current = recordRef.current;
        const time = Date.now();
        setNow(time);
        if (!current || current.status !== "working" || current.deadlineAt === null || time < current.deadlineAt) return;
        const result = updateExam(current.attemptId, value => submitExam(value, time, "timeout"));
        if (result) { showRecord(result.record, result.saved); applyMistakes(result.record); }
    });

    useEffect(() => {
        let cancelled = false;
        queueMicrotask(() => {
            if (cancelled) return;
            const loaded = readExam();
            recordRef.current = loaded.record;
            setRecord(loaded.record);
            setError(loaded.error);
            setSaved(loaded.saved);
            setNow(Date.now());
            setLoaded(true);
            if (loaded.record) {
                setPage(Math.floor(loaded.record.currentIndex / QUESTIONS_PER_PAGE));
                if (loaded.record.status === "submitted") applyMistakes(loaded.record);
                else if (loaded.record.deadlineAt !== null && Date.now() >= loaded.record.deadlineAt) checkDeadline();
            }
        });
        return () => { cancelled = true; };
    }, [applyMistakes]);

    useEffect(() => {
        if (!loaded) return;
        const timer = window.setInterval(() => checkDeadline(), 1000);
        const refresh = () => { checkDeadline(); const current = recordRef.current; if (current?.status === "submitted") applyMistakes(current); };
        window.addEventListener("focus", refresh);
        window.addEventListener("pageshow", refresh);
        const visibility = () => { if (!document.hidden) refresh(); };
        document.addEventListener("visibilitychange", visibility);
        return () => {
            window.clearInterval(timer);
            window.removeEventListener("focus", refresh);
            window.removeEventListener("pageshow", refresh);
            document.removeEventListener("visibilitychange", visibility);
        };
    }, [loaded, applyMistakes]);

    useEffect(() => {
        if (!loaded) return;
        const onStorage = (event: StorageEvent) => {
            if (event.key !== EXAM_KEY && event.key !== null) return;
            const state = readExam();
            if (state.record) showRecord(state.record, state.saved);
            setError(state.error);
            checkDeadline();
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, [loaded, showRecord]);

    function start(nextConfig: ExamConfig) {
        const previous = recordRef.current;
        if (previous?.status === "working" && !window.confirm("Bài thi đang làm sẽ được thay bằng đề mới. Bạn có muốn tiếp tục?")) return;
        if (error && !window.confirm("Dữ liệu lượt thi cũ không thể khôi phục. Thay bằng đề thi mới?")) return;
        try {
            const next = createExam(nextConfig, catalog, Date.now());
            showRecord(next, saveExam(next));
            setError(null);
            setView("attempt");
            window.history.pushState(window.history.state, "", "/exam/attempt");
        } catch (cause) { setError(cause instanceof Error ? cause.message : "Không thể tạo đề thi."); }
    }

    function change(currentId: string, transform: (value: ExamRecord) => ExamRecord) {
        const result = updateExam(currentId, transform);
        if (result) {
            showRecord(result.record, result.saved);
            if (result.record.status === "submitted") applyMistakes(result.record);
        }
    }

    function select(optionId: string) {
        const current = recordRef.current;
        if (!current) return;
        change(current.attemptId, value => changeExamAnswer(value, value.currentIndex, optionId, Date.now()));
    }

    function navigate(index: number) {
        const current = recordRef.current;
        if (!current || index < 0 || index >= current.items.length) return;
        change(current.attemptId, value => moveExam(value, index));
        screenRef.current?.focus({ preventScroll: true });
    }

    function submit() {
        const current = recordRef.current;
        if (!current || current.status === "submitted") return;
        const time = Date.now();
        if (current.deadlineAt !== null && time >= current.deadlineAt) {
            change(current.attemptId, value => submitExam(value, time, "timeout"));
            return;
        }
        const unanswered = current.items.filter(item => !current.answers[mistakeId(item)]).length;
        if (!window.confirm(`Bạn muốn nộp bài? Còn ${unanswered} câu bỏ trống. Sau khi nộp, đáp án sẽ bị khóa.`)) return;
        change(current.attemptId, value => submitExam(value, Date.now()));
    }

    const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
        const current = recordRef.current;
        if (!loaded || view !== "attempt" || !current || current.status !== "working"
            || event.defaultPrevented || event.repeat || event.isComposing
            || event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) return;
        const target = event.target;
        if (target instanceof HTMLElement) {
            if (target.closest("input, textarea, select") || target.isContentEditable) return;
            if (event.key === "Enter" && target.closest("button, a[href], summary, [role='button'], [role='link']")) return;
        }
        const question = current.items[current.currentIndex].question;
        if (["1", "2", "3", "4"].includes(event.key)) {
            const optionId = ["a", "b", "c", "d"][Number(event.key) - 1];
            if (question.options.some(option => option.id === optionId)) { event.preventDefault(); select(optionId); }
        } else if (event.key === "ArrowLeft" && current.currentIndex > 0) {
            event.preventDefault(); navigate(current.currentIndex - 1);
        } else if (event.key === "ArrowRight" && current.currentIndex < current.items.length - 1) {
            event.preventDefault(); navigate(current.currentIndex + 1);
        } else if (event.key === "Enter" && current.answers[mistakeId(current.items[current.currentIndex])]
            && current.currentIndex < current.items.length - 1) {
            event.preventDefault(); navigate(current.currentIndex + 1);
        }
    });

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    const pool = examPool(catalog, config);
    const counts = ([10, 20, 30] as const).filter(value => value <= pool.length);
    const selectedCount = config.count !== "all" && !counts.includes(config.count) ? "all" : config.count;
    const current = record?.items[record.currentIndex];
    const answered = record?.items.filter(item => Boolean(record.answers[mistakeId(item)])).length ?? 0;
    const statuses: QuestionStatus[] = record?.items.map(item => {
        const option = record.answers[mistakeId(item)];
        if (!option) return "unanswered";
        if (record.status === "working") return "draft";
        return option === item.question.correctOptionId ? "correct" : "incorrect";
    }) ?? [];
    const scopeLabel = record?.config.chapterId === null
        ? "Tất cả chapter" : record?.items[0]?.chapterTitle;
    const remaining = record?.deadlineAt === null ? null : Math.max(0, (record?.deadlineAt ?? 0) - now);

    return <main className={consoleStyles.scene} data-motion="off">
        <div className={consoleStyles.ambient} aria-hidden="true"><i /><i /><i /><span>✦</span><span>✧</span></div>
        <section className={`${consoleStyles.console} ${view === "config" ? styles.configConsole : ""}`} aria-label="Thi thử">
            <nav className={consoleStyles.consoleTabs} aria-label="Điều hướng thi thử">
                <Link href="/" className={`${consoleStyles.consoleTab} ${consoleStyles.homeTab}`}>⌂ Trang chủ</Link>
                <Link href="/exam" className={`${consoleStyles.consoleTab} ${consoleStyles.chapterTab}`} onClick={() => setView("config")}>‹ Cấu hình</Link>
            </nav>
            <div className={consoleStyles.consoleTop}>
                <span className={consoleStyles.powerLight} aria-hidden="true"><i /></span>
                <div className={consoleStyles.speaker} aria-hidden="true"><b /><b /><b /><b /><b /></div>
                <span className={consoleStyles.consoleMark}>Ju Study Hub <span aria-hidden="true">✦</span></span>
            </div>
            {!loaded ? <div className={consoleStyles.screen} role="status">Đang khôi phục lượt thi…</div>
                : view === "config" ? <section className={`${consoleStyles.screen} ${styles.config}`}>
                    <h1>Thi thử</h1>
                    <p>Chọn phạm vi và thời gian để tạo đề mới.</p>
                    {error && <p className={styles.warning} role="alert">{error}</p>}
                    <div className={styles.fields}>
                        <label>Môn học<select value={config.subjectId} onChange={event => setConfig({ ...config, subjectId: event.target.value, chapterId: null })}>
                            {sections.map(section => <option key={section.id} value={section.id}>{section.title}</option>)}
                        </select></label>
                        <label>Chapter<select value={config.chapterId ?? "all"} onChange={event => setConfig({ ...config, chapterId: event.target.value === "all" ? null : event.target.value })}>
                            <option value="all">Tất cả chapter</option>
                            {sections.find(section => section.id === config.subjectId)?.chapters.map(chapter => <option key={chapter.id} value={chapter.id}>{chapter.title}</option>)}
                        </select></label>
                        <label>Số câu<select value={selectedCount} onChange={event => setConfig({ ...config, count: event.target.value === "all" ? "all" : Number(event.target.value) as 10 | 20 | 30 })}>
                            {counts.map(count => <option key={count} value={count}>{count} câu</option>)}
                            <option value="all">Toàn bộ ({pool.length} câu)</option>
                        </select></label>
                        <label>Thời gian<select value={config.minutes ?? "none"} onChange={event => setConfig({ ...config, minutes: event.target.value === "none" ? null : Number(event.target.value) as 15 | 30 | 60 })}>
                            <option value="none">Không giới hạn</option><option value={15}>15 phút</option><option value={30}>30 phút</option><option value={60}>60 phút</option>
                        </select></label>
                    </div>
                    <p aria-live="polite">Có <strong>{pool.length}</strong> câu trong phạm vi này.</p>
                    {pool.length < 20 && <p role="status">Ngân hàng có ít hơn 20 câu. Hãy chọn số lượng hợp lệ; mặc định là toàn bộ.</p>}
                    <div className={styles.actions}>
                        <button type="button" className={consoleStyles.primary} disabled={pool.length === 0} onClick={() => start({ ...config, count: selectedCount })}>Bắt đầu thi</button>
                        {record?.status === "working" && <button type="button" className={consoleStyles.secondary} onClick={() => { setView("attempt"); window.history.pushState(window.history.state, "", "/exam/attempt"); }}>Tiếp tục bài đang làm</button>}
                        {record?.status === "submitted" && <button type="button" className={consoleStyles.secondary} onClick={() => { setView("attempt"); window.history.pushState(window.history.state, "", "/exam/attempt"); }}>Xem kết quả gần nhất</button>}
                    </div>
                </section> : !record ? <section className={consoleStyles.screen}>
                    <h1>Chưa có lượt thi</h1><p role="alert">{error ?? "Hãy cấu hình đề thi trước khi bắt đầu."}</p>
                    <Link href="/exam" className={consoleStyles.primary}>Về cấu hình</Link>
                </section> : <div className={consoleStyles.consoleGrid}>
                    <section ref={screenRef} tabIndex={-1} className={consoleStyles.screen} aria-label="Nội dung bài thi">
                        <div className={consoleStyles.screenHeader}><span className={consoleStyles.subject}>{current?.subjectTitle}</span></div>
                        <h1>{record.status === "submitted" ? "Kết quả thi thử" : "Bài thi thử"}</h1>
                        <p className={styles.scope}>Phạm vi: {scopeLabel}</p>
                        {!saved && <p className={styles.warning} role="status">Tiến độ chưa lưu được. Bài đang được giữ trong bộ nhớ của tab này.</p>}
                        {record.status === "working" ? <>
                            <div className={consoleStyles.progressLabels} aria-live="polite"><span>Đã trả lời <strong>{answered}/{record.items.length}</strong> câu</span></div>
                            <div className={consoleStyles.progressTrack} role="progressbar" aria-label="Số câu đã trả lời"
                                aria-valuenow={answered} aria-valuemin={0} aria-valuemax={record.items.length}>
                                <span style={{ width: `${answered / record.items.length * 100}%` }} />
                            </div>
                        </> : <div className={styles.result} role="status">
                            <p><strong className={styles.score}>{record.result?.correct}/{record.items.length}</strong> câu đúng, {record.result?.percentage}% trên tổng số câu.</p>
                            <p>Sai: {record.result?.incorrect} · Bỏ trống: {record.result?.unanswered}</p>
                            <div className={styles.actions}><button type="button" className={consoleStyles.primary} onClick={() => start(record.config)}>Thi lại với đề mới</button>
                                <button type="button" className={consoleStyles.secondary} onClick={() => { setConfig(record.config); setView("config"); window.history.pushState(window.history.state, "", "/exam"); }}>Đổi cấu hình</button></div>
                        </div>}
                        {current && <div key={`${record.attemptId}:${record.currentIndex}`} className={styles.question}>
                            <div className={consoleStyles.questionMeta}><span>Câu {record.currentIndex + 1} / {record.items.length}</span>
                                {record.config.chapterId === null && <span>{current.chapterTitle}</span>}</div>
                            <fieldset disabled={record.status === "submitted"} className={consoleStyles.answers}>
                                <legend><MathText text={current.question.prompt} /></legend>
                                {current.question.options.map(option => {
                                    const chosen = record.answers[mistakeId(current)] === option.id;
                                    const state = record.status === "working" ? chosen ? "selected" : "default"
                                        : option.id === current.question.correctOptionId ? "correct" : chosen ? "incorrect" : "default";
                                    return <label key={option.id} className={consoleStyles.option} data-status={state}>
                                        <input type="radio" name={`exam-${record.currentIndex}`} value={option.id} checked={chosen} onChange={() => select(option.id)} />
                                        <span className={consoleStyles.optionLetter} aria-hidden="true">{option.id.toUpperCase()}</span>
                                        <span className={consoleStyles.optionText}><MathText text={option.text} /></span>
                                        {record.status === "submitted" && <span className={consoleStyles.optionStatus}>{state === "correct" ? "✓ Đúng" : state === "incorrect" ? "× Đã chọn" : ""}</span>}
                                    </label>;
                                })}
                            </fieldset>
                            {record.status === "submitted" && <div className={consoleStyles.feedback}>
                                <strong>{record.answers[mistakeId(current)] ? `Đã chọn: ${record.answers[mistakeId(current)].toUpperCase()}` : "Bạn bỏ trống câu này."} Đáp án đúng: {current.question.correctOptionId.toUpperCase()}.</strong>
                                {current.question.explanation && <p><MathText text={current.question.explanation} /></p>}
                                {current.question.source && <p>Nguồn: {/^https?:\/\/|^\//.test(current.question.source) ? <a href={current.question.source} target="_blank" rel="noopener noreferrer">Mở tài liệu ↗</a> : current.question.source}</p>}
                                {current.question.sources?.map((source, index) => <p key={index}>Nguồn {index + 1}: {source.kind === "lecture" ? `${source.file}, trang PDF ${source.pdfPage}, slide ${source.slideNumber}: ${source.slideTitle}` : <a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}, {source.section} ↗</a>}</p>)}
                            </div>}
                            <div className={styles.questionActions}>
                                <div className={consoleStyles.stepButtons}>
                                    <button type="button" aria-label="Câu trước" title="Câu trước" disabled={record.currentIndex === 0} onClick={() => navigate(record.currentIndex - 1)}><GameArrow direction="left" /></button>
                                    <button type="button" aria-label="Câu tiếp theo" title="Câu tiếp theo" disabled={record.currentIndex === record.items.length - 1} onClick={() => navigate(record.currentIndex + 1)}><GameArrow direction="right" /></button>
                                </div>
                            </div>
                        </div>}
                        {record.status === "working" && <div className={styles.submitDock}><button type="button" className={consoleStyles.primary} onClick={submit}>Nộp bài</button></div>}
                    </section>
                    <aside className={consoleStyles.sidePanel}>
                        <section className={styles.timePanel} data-warning={record.status === "working" && remaining !== null && remaining <= 5 * 60_000}
                            data-complete={record.status === "submitted"} aria-label={record.status === "working" ? "Thời gian thi" : "Thời gian làm bài"}>
                            <h2>{record.status === "working" && remaining !== null ? "Thời gian còn lại" : "Thời gian làm bài"}</h2>
                            <p className={styles.timeValue}>{record.status === "working"
                                ? remaining === null ? "Không giới hạn" : clockTime(remaining)
                                : duration(record.result?.elapsedMs ?? 0)}</p>
                            {record.status === "submitted" && <p className={styles.timeNote}>{record.reason === "timeout" ? "Hết giờ" : "Nộp bài"}</p>}
                        </section>
                        <div className={consoleStyles.navigation}>
                            <QuizNavigation statuses={statuses} currentIndex={record.currentIndex} page={page}
                                onPageChange={setPage} onNavigate={navigate} />
                            {record.status === "working" && <button type="button" className={`${consoleStyles.summaryButton} ${styles.sideSubmit}`} onClick={submit}>
                                <span>Nộp bài</span><span className={consoleStyles.summaryIcon} aria-hidden="true"><span className={consoleStyles.playTriangle} /></span>
                            </button>}
                        </div>
                    </aside>
                </div>}
            <div className={consoleStyles.consoleBottom} aria-hidden="true"><span><i /></span><span>● ● ●</span></div>
        </section>
    </main>;
}
