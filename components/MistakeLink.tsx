"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { MISTAKES_EVENT, readMistakes } from "@/lib/mistakes";

function subscribe(onChange: () => void) {
    window.addEventListener("storage", onChange);
    window.addEventListener(MISTAKES_EVENT, onChange);
    return () => {
        window.removeEventListener("storage", onChange);
        window.removeEventListener(MISTAKES_EVENT, onChange);
    };
}

export default function MistakeLink({ className }: { className?: string }) {
    const count = useSyncExternalStore(subscribe, () => readMistakes().length, () => 0);
    return <Link href="/review" className={className}>Ôn câu sai ({count})</Link>;
}
