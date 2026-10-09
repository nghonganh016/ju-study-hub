export default function GameArrow({ direction }: { direction: "left" | "right" }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
            <g transform={direction === "left" ? "rotate(180 12 12)" : undefined} stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12H19M13 6L19 12L13 18" />
            </g>
        </svg>
    );
}
