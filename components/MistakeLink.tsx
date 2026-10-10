"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { flushMistakes, MISTAKES_EVENT, readMistakes, resolveMistakes, type MistakeRef } from "@/lib/mistakes";

function subscribe(onChange: () => void) {
    const resynchronize = () => { flushMistakes(); onChange(); };
    flushMistakes();
    window.addEventListener("storage", resynchronize);
    window.addEventListener("focus", resynchronize);
    window.addEventListener(MISTAKES_EVENT, onChange);
    return () => {
        window.removeEventListener("storage", resynchronize);
        window.removeEventListener("focus", resynchronize);
        window.removeEventListener(MISTAKES_EVENT, onChange);
    };
}

export default function MistakeLink({ className, catalog }: { className?: string; catalog: readonly MistakeRef[] }) {
    const count = useSyncExternalStore(subscribe, () => resolveMistakes(readMistakes(), catalog).length, () => 0);
    return <Link href="/review" className={className}>Ôn câu sai ({count})</Link>;
}
