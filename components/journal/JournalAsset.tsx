import type { ReactNode } from "react";

// Original paths, drawn for Ju Study Hub. One palette and rounded pen stroke.
export const journalPalette = {
    paper: "#FFF8E9", cream: "#F7EBCF", blue: "#98A8D2",
    violet: "#B2ABC0", pink: "#E4D3DD", peach: "#F0BFB4",
    ink: "#465170", pencil: "#8D755F",
} as const;
const c = journalPalette;
type AssetDrawing = { width: number; height: number; art: ReactNode };

// No SVG IDs, external images, fonts, filters or random values. Safe to repeat.
export const journalAssets = {
    "tape-striped": { width: 160, height: 44, art: <>
        <path d="M5 5 154 4 152 11 156 18 153 25 155 37 6 39 8 30 4 23 7 15Z" fill={c.pink} strokeOpacity=".3" />
        <g stroke={c.peach} strokeWidth="5" opacity=".6">
            {[20, 42, 64, 86, 108, 130].map(x => <path key={x} d={`M${x} 8l-7 27`} />)}
        </g>
        <path d="M12 9 146 8M13 34l133-1" stroke={c.paper} opacity=".65" />
    </> },
    "tape-dotted": { width: 160, height: 44, art: <>
        <path d="M5 6 154 5 152 15 156 24 153 37 7 38 9 29 4 20Z" fill={c.blue} fillOpacity=".65" strokeOpacity=".3" />
        <g fill={c.paper} stroke="none">
            {[20, 44, 68, 92, 116, 140].map((x, i) => <g key={x}><circle cx={x} cy={i % 2 ? 15 : 14} r="2" /><circle cx={x-5} cy="29" r="2" /></g>)}
        </g>
        <path d="M10 9l137-1" stroke={c.paper} opacity=".6" />
    </> },
    "tape-wave": { width: 160, height: 44, art: <>
        <path d="M6 5 154 7 151 14 155 22 152 38 5 36 8 26 4 17Z" fill={c.cream} strokeOpacity=".35" />
        <path d="M13 19q9-10 18 0t18 0t18 0t18 0t18 0t18 0t18 0" stroke={c.violet} strokeWidth="3" />
        <path d="M16 28q8-7 16 0t16 0t16 0t16 0t16 0t16 0t16 0" stroke={c.peach} opacity=".7" />
    </> },
    "tab-rounded": { width: 96, height: 60, art: <>
        <path d="M9 54 10 21Q10 9 24 8L70 7Q86 8 86 22L87 54Z" fill={c.blue} strokeOpacity=".55" />
        <path d="M16 47 80 47" stroke={c.ink} opacity=".3" />
        <path d="M22 17q18-3 37-2" stroke={c.paper} opacity=".8" />
    </> },
    "tab-folded": { width: 96, height: 60, art: <>
        <path d="M9 53 11 10 67 8 86 25 85 53Z" fill={c.pink} strokeOpacity=".55" />
        <path d="m67 8-1 18 20-1Z" fill={c.cream} strokeOpacity=".45" />
        <path d="M16 46h62M22 19l32-1" strokeOpacity=".3" />
    </> },
    "bookmark": { width: 48, height: 96, art: <>
        <path d="M8 5Q24 3 40 6L38 89 24 77 10 90Z" fill={c.violet} strokeOpacity=".6" />
        <path d="M13 12 15 77M35 12 33 76" stroke={c.paper} strokeDasharray="3 5" opacity=".8" />
        <path d="M8 12q16 4 32 0" stroke={c.ink} opacity=".2" />
        <path d="m24 27 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" fill={c.cream} stroke="none" />
    </> },
    "paper-clip": { width: 48, height: 96, art: <>
        <path d="M19 71 20 26q1-11 10-10t9 11L36 70q-1 17-15 16T8 68l4-44Q13 7 27 7" stroke={c.violet} strokeWidth="5" />
        <path d="M19 71 20 26q1-11 10-10t9 11L36 70q-1 17-15 16T8 68l4-44Q13 7 27 7" stroke={c.ink} strokeWidth="1.4" opacity=".55" />
    </> },
    "note-folded": { width: 120, height: 104, art: <>
        <path d="m9 9 103-2 5 72-24 18-81-3Z" fill={c.cream} strokeOpacity=".45" />
        <path d="m93 97-2-22 26 4" fill={c.paper} strokeOpacity=".4" />
        <path d="m19 18 71-2" stroke={c.paper} strokeWidth="3" />
    </> },
    "label-torn": { width: 160, height: 56, art: <>
        <path d="m6 7 145-2 4 8-3 7 5 8-5 8 2 10-145 4 3-9-5-8 4-9-5-8Z" fill={c.paper} strokeOpacity=".5" />
        <path d="m18 13 120-2M19 43l117-3" stroke={c.violet} strokeDasharray="3 5" opacity=".45" />
    </> },
    "star-soft": { width: 64, height: 64, art: <>
        <path d="m32 7 7 17 18 2-13 13 3 18-16-9-17 8 4-18L6 25l19-2Z" fill={c.cream} stroke={c.pencil} />
        <path d="m30 16-5 14-10 1" stroke={c.paper} strokeWidth="3" />
    </> },
    "star-sketch": { width: 64, height: 64, art: <>
        <path d="m30 8 8 17 17 2-13 12 3 17-15-8-17 7 4-18L6 25l18-1Z" stroke={c.violet} strokeWidth="2.5" />
        <path d="m33 10 5 18 16 2M16 53l16-9 11 9" stroke={c.pencil} opacity=".5" />
    </> },
    "sparkle-diamond": { width: 64, height: 64, art: <>
        <path d="M31 6q2 22 24 25-22 3-24 27-3-23-23-27Q28 28 31 6Z" fill={c.pink} stroke={c.violet} />
        <path d="M49 8v9m-4-4h9" stroke={c.pencil} />
    </> },
    "sparkle-rays": { width: 64, height: 64, art: <>
        <path d="m31 13 1 10m0 18-1 10M13 32h10m18 0 11-1M18 17l7 7m15 16 7 7m0-29-7 7M24 40l-7 7" stroke={c.violet} strokeWidth="2.5" />
        <circle cx="32" cy="32" r="4" fill={c.peach} stroke="none" />
    </> },
    "flower": { width: 72, height: 80, art: <>
        <path d="M35 46q-5 15 2 27m-3-10q-14 1-17-9 12-2 17 9" stroke={c.pencil} />
        <path d="M34 29C17 11 31 2 38 20 46 3 61 17 45 29 64 27 65 45 46 39 49 58 29 59 31 42 12 50 7 30 26 29Z" fill={c.pink} stroke={c.violet} />
        <circle cx="36" cy="32" r="7" fill={c.cream} />
    </> },
    "heart": { width: 64, height: 64, art: <>
        <path d="M32 54C23 44 8 36 8 23 8 10 24 8 31 20 40 6 56 12 56 24 56 36 42 46 32 54Z" fill={c.peach} stroke={c.pencil} />
        <path d="M15 24q-1-6 5-7" stroke={c.paper} strokeWidth="3" />
    </> },
    "cloud": { width: 112, height: 72, art: <>
        <path d="M23 59C1 57 5 33 23 33 20 9 50 7 58 26 72 14 91 24 88 38 110 37 111 59 91 60Z" fill={c.paper} stroke={c.blue} strokeWidth="2.5" />
        <path d="m28 53 48 1" stroke={c.pink} strokeWidth="3" />
    </> },
    "arrow": { width: 120, height: 64, art: <>
        <path d="M9 49c22 2 8-37 31-35 25 1 5 36 38 28l28-15m-19-2 21 1-7 20" stroke={c.pencil} strokeWidth="2.5" />
        <path d="M10 54q9 1 13-7" stroke={c.violet} opacity=".65" />
    </> },
    "underline": { width: 160, height: 32, art: <>
        <path d="M8 13q62-7 142-1" stroke={c.peach} strokeWidth="7" opacity=".5" />
        <path d="M7 18q62-7 145-2M29 24q50-5 109-3" stroke={c.pencil} opacity=".65" />
    </> },
} satisfies Record<string, AssetDrawing>;

export type JournalAssetKind = keyof typeof journalAssets;

/** Decorative only. Keep meaningful text in HTML beside/above the SVG. */
export default function JournalAsset({ kind, className }: { kind: JournalAssetKind; className?: string }) {
    const asset = journalAssets[kind];
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${asset.width} ${asset.height}`}
            width={asset.width} height={asset.height} className={className}
            aria-hidden="true" focusable="false" fill="none" stroke={c.pencil}
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            style={{ pointerEvents: "none", userSelect: "none" }}>
            {asset.art}
        </svg>
    );
}
