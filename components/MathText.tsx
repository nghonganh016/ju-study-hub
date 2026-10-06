"use client";

import { Fragment, type ReactNode } from "react";
import { BlockMath, InlineMath } from "react-katex";

/** Dollar delimiters are explicit: no inference from bare LaTeX commands. */
export default function MathText({ text }: { text: string }) {
    const parts: ReactNode[] = [];
    let plain = "";
    let index = 0;

    function flushText() {
        if (plain) parts.push(plain);
        plain = "";
    }

    while (index < text.length) {
        // An escaped dollar is always literal text, including currency.
        if (text.startsWith("\\$", index)) {
            plain += "$";
            index += 2;
            continue;
        }
        if (text[index] !== "$") {
            plain += text[index++];
            continue;
        }

        const block = text.startsWith("$$", index);
        const delimiter = block ? "$$" : "$";
        const start = index + delimiter.length;
        let end = start;
        for (; end < text.length; end++) {
            if (text[end] === "\\") { end++; continue; }
            if (!block && /[\r\n]/.test(text[end])) break;
            if (text.startsWith(delimiter, end)) break;
        }
        const formula = text.slice(start, end);
        const closed = text.startsWith(delimiter, end);
        // Tight inline delimiters avoid treating "$5 and $10" as math.
        const validInline = !/^\s|\s$/.test(formula)
            && !/\d/.test(text[end + 1] ?? "")
            && !text.startsWith("$$", end);
        if (!closed || !formula.trim() || (!block && !validInline)) {
            plain += delimiter;
            index = start;
            continue;
        }

        flushText();
        const original = text.slice(index, end + delimiter.length);
        const fallback = () => <span className="math-fallback">{original}</span>;
        parts.push(block ? (
            <div key={index} className="math-block" tabIndex={0} role="region" aria-label="Công thức toán học">
                <BlockMath math={formula} renderError={fallback} />
            </div>
        ) : (
            <span key={index} className="math-inline">
                <InlineMath math={formula} renderError={fallback} />
            </span>
        ));
        index = end + delimiter.length;
    }
    flushText();
    return <>{parts.map((part, i) => <Fragment key={i}>{part}</Fragment>)}</>;
}
