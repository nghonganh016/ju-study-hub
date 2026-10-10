"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/components/BookmarkedQuestions.module.css";
import { BOOKMARKS_KEY, bookmarkStorageStatus, flushBookmarks, readBookmarks,
    removeBookmark, type BookmarkRef } from "@/lib/bookmarks";
import { filterBookmarkEntries, resolveBookmarkEntries,
    type BookmarkQuestion, type BookmarkSection } from "@/lib/bookmark-catalog";

type StorageStatus = ReturnType<typeof bookmarkStorageStatus>;

export default function BookmarkedQuestions({ catalog, sections }: { catalog: BookmarkQuestion[]; sections: BookmarkSection[] }) {
    const [refs, setRefs] = useState<BookmarkRef[] | null>(null);
    const [storageStatus, setStorageStatus] = useState<StorageStatus>("available");
    const [subjectId, setSubjectId] = useState("all");
    const [chapterId, setChapterId] = useState("all");

    useEffect(() => {
        let cancelled = false;
        const sync = () => {
            flushBookmarks();
            setRefs(readBookmarks());
            setStorageStatus(bookmarkStorageStatus());
        };
        queueMicrotask(() => { if (!cancelled) sync(); });
        const onStorage = (event: StorageEvent) => {
            if (event.key === BOOKMARKS_KEY || event.key === null) sync();
        };
        window.addEventListener("storage", onStorage);
        window.addEventListener("focus", sync);
        return () => {
            cancelled = true;
            window.removeEventListener("storage", onStorage);
            window.removeEventListener("focus", sync);
        };
    }, []);

    const entries = resolveBookmarkEntries(refs ?? [], catalog, sections);
    const visible = filterBookmarkEntries(entries, subjectId, chapterId);
    const subjectOptions = sections.map(section => ({ id: section.id, title: section.title }));
    for (const entry of entries) {
        if (!subjectOptions.some(item => item.id === entry.subjectId)) {
            subjectOptions.push({ id: entry.subjectId, title: entry.subjectTitle });
        }
    }
    const chapterOptions = sections.find(section => section.id === subjectId)?.chapters.map(chapter => ({ ...chapter })) ?? [];
    for (const entry of entries) {
        if (entry.subjectId === subjectId && !chapterOptions.some(item => item.id === entry.chapterId)) {
            chapterOptions.push({ id: entry.chapterId, title: entry.chapterTitle });
        }
    }

    function handleRemove(ref: BookmarkRef) {
        setRefs(removeBookmark({ subjectId: ref.subjectId, chapterId: ref.chapterId, questionId: ref.questionId }));
        setStorageStatus(bookmarkStorageStatus());
    }

    return (
        <main className={styles.page}>
            <div className={styles.content}>
                <header className={styles.header}>
                    <Link href="/" className={styles.brand} aria-label="Ju Study Hub, về trang chủ">
                        <span className={styles.brandMark} aria-hidden="true" />Ju Study Hub
                    </Link>
                    <Link href="/" className={styles.backLink}>← Chọn môn học</Link>
                </header>

                <section className={styles.panel} aria-labelledby="bookmarks-heading">
                    <div className={styles.intro}>
                        <div>
                            <p className={styles.eyebrow}>BOOKMARKED QUESTIONS</p>
                            <h1 id="bookmarks-heading">Câu đã lưu</h1>
                            <p>Những câu bạn muốn xem lại, từ mọi môn học.</p>
                        </div>
                        <span className={styles.total} aria-live="polite">{refs === null ? "Đang tải…" : `${refs.length} câu đã lưu`}</span>
                    </div>

                    {refs !== null && storageStatus !== "available" && (
                        <p className={styles.storageNotice} role="status">
                            {storageStatus === "unavailable"
                                ? "Không truy cập được bộ nhớ trình duyệt. Danh sách đang hiển thị dữ liệu tạm của phiên này; hãy thử lại khi bộ nhớ khả dụng."
                                : "Một số thay đổi chưa lưu được vào trình duyệt. Danh sách tạm thời sẽ được thử lưu lại khi bộ nhớ khả dụng."}
                        </p>
                    )}

                    {refs !== null && refs.length > 0 && (
                        <div className={styles.filters} aria-label="Lọc câu đã lưu">
                            <label>
                                <span>Môn học</span>
                                <select value={subjectId} onChange={event => { setSubjectId(event.target.value); setChapterId("all"); }}>
                                    <option value="all">Tất cả môn học</option>
                                    {subjectOptions.map(subject => <option key={subject.id} value={subject.id}>{subject.title}</option>)}
                                </select>
                            </label>
                            <label>
                                <span>Chapter / session</span>
                                <select value={chapterId} disabled={subjectId === "all"} onChange={event => setChapterId(event.target.value)}>
                                    <option value="all">Tất cả chapter / session</option>
                                    {chapterOptions.map(chapter => <option key={chapter.id} value={chapter.id}>{chapter.title}</option>)}
                                </select>
                            </label>
                        </div>
                    )}

                    {refs === null ? <p className={styles.empty} role="status">Đang tải câu đã lưu…</p>
                        : refs.length === 0 ? (
                            <div className={styles.empty} role="status">
                                <span className={styles.emptyIcon} aria-hidden="true">☆</span>
                                <h2>{storageStatus === "unavailable" ? "Chưa đọc được câu đã lưu" : "Chưa có câu nào được lưu"}</h2>
                                <p>{storageStatus === "unavailable"
                                    ? "Hãy thử lại khi trình duyệt cho phép lưu trữ."
                                    : "Trong quiz, bấm Lưu câu để giữ lại những câu bạn muốn ôn thêm."}</p>
                                <Link href="/" className={styles.homeLink}>Chọn môn học</Link>
                            </div>
                        ) : visible.length === 0 ? (
                            <div className={styles.empty} role="status">
                                <h2>Không có câu trong bộ lọc này</h2>
                                <p>Thử chọn môn hoặc chapter khác để xem các câu đã lưu.</p>
                                <button type="button" className={styles.homeLink} onClick={() => { setSubjectId("all"); setChapterId("all"); }}>Xem tất cả</button>
                            </div>
                        ) : (
                            <>
                                <p className={styles.listCount} aria-live="polite">Hiển thị {visible.length} / {refs.length} câu</p>
                                <ul className={styles.list}>
                                    {visible.map(entry => (
                                        <li key={JSON.stringify([entry.subjectId, entry.chapterId, entry.questionId])}
                                            className={styles.card} data-missing={entry.missing}>
                                            <div className={styles.cardMeta}>
                                                <span className={styles.subject}>{entry.subjectTitle}</span>
                                                <span>{entry.chapterTitle}</span>
                                            </div>
                                            <p className={styles.questionText}>{entry.summary}</p>
                                            {entry.href && <Link href={entry.href} className={styles.openLink}
                                                aria-label={`Mở câu hỏi ${entry.questionId}`}>
                                                <span>Mở câu hỏi <span aria-hidden="true">↗</span></span>
                                            </Link>}
                                            <div className={styles.cardBottom}>
                                                {entry.missing ? <span className={styles.missing}>Không còn trong bộ câu hỏi</span> : <span />}
                                                <button type="button" className={styles.removeButton}
                                                    aria-label={`Bỏ lưu câu hỏi ${entry.questionId}`}
                                                    onClick={() => handleRemove(entry)}>Bỏ lưu</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                </section>
            </div>
        </main>
    );
}
