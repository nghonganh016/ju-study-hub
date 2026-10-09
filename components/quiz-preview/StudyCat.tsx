import styles from "./QuizConsolePreview.module.css";

export type CatMood = "idle" | "thinking" | "correct" | "incorrect" | "celebration" | "complete";
export const catLabels: Record<CatMood, string> = {
    idle: "Chờ", thinking: "Suy nghĩ", correct: "Đúng", incorrect: "Sai",
    celebration: "Ăn mừng", complete: "Hoàn thành",
};

// Vector interpretation of Ju's drawing. The source image is never modified.
export default function StudyCat({ mood }: { mood: CatMood }) {
    const happy = ["correct", "celebration", "complete"].includes(mood);
    return (
        <svg className={styles.cat} data-mood={mood} viewBox="0 0 220 225" role="img" aria-label={`Mèo của Ju: ${catLabels[mood].toLowerCase()}`}>
            <ellipse cx="110" cy="209" rx="60" ry="7" fill="#6550b1" opacity=".13" />
            <g className={styles.catBody}>
                <path d="M149 162 Q192 143 181 178 Q174 191 155 180" fill="#ffb451" />
                <path d="M60 153 Q43 180 52 204 Q60 214 68 194 L151 194 Q155 218 166 204 Q176 181 159 150Z" fill="#ffb451" />
                <path d="M75 121 Q49 145 57 186 Q60 203 109 202 Q159 204 163 185 Q172 147 145 124Z" fill="#fffdf7" />
                <g className={styles.catLeftArm}><path d="M61 139 Q36 145 44 165 Q50 172 64 153" fill="#ffb451" /></g>
                <g className={styles.catRightArm}><path d="M159 139 Q184 144 174 165 Q170 171 156 153" fill="#ffb451" /></g>
                <g className={styles.catHead}>
                    <path d="M39 55 L43 15 L69 39 Q103 22 137 31 L153 7 L170 39 Q204 57 204 105 Q203 139 175 144 Q152 156 110 150 Q66 157 34 139 Q14 130 17 103 Q19 77 39 55Z" fill="#ffb451" />
                    <path d="M46 43 L48 26 L59 39Z M144 29 L153 17 L160 31Z" fill="#fffdf7" />
                    <path d="M39 128 Q46 111 77 105 Q84 87 104 86 Q122 88 130 103 Q168 107 183 129 Q169 151 113 149 Q59 152 39 128Z" fill="#fffdf7" />
                    <g className={styles.catEyes} stroke="#352349" strokeWidth="4.5" strokeLinecap="round" fill="none">
                        {happy ? <><path d="M65 93 Q70 84 75 93" /><path d="M137 93 Q142 84 147 93" /></> : <><path d={mood === "incorrect" ? "M66 91 L74 94" : "M70 90 L70 94"} /><path d={mood === "incorrect" ? "M138 94 L146 91" : "M142 90 L142 94"} /></>}
                    </g>
                    <path d="M99 96 Q103 104 109 98 Q115 105 120 97" fill="none" stroke="#352349" strokeWidth="3" strokeLinecap="round" />
                    <ellipse cx="57" cy="104" rx="8" ry="4" fill="#ff87b4" opacity=".55" />
                    <ellipse cx="155" cy="104" rx="8" ry="4" fill="#ff87b4" opacity=".55" />
                </g>
                {mood === "complete" && <path d="M110 146 L119 163 L138 166 L124 179 L127 197 L110 188 L93 197 L96 179 L82 166 L101 163Z" fill="#ffe389" stroke="#c38c30" strokeWidth="2" />}
            </g>
            {(mood === "correct" || mood === "celebration") && <g className={styles.catStars} fill="#9571ee"><path d="M18 43 L21 51 L29 54 L21 57 L18 65 L15 57 L7 54 L15 51Z" /><path d="M195 24 L199 35 L210 39 L199 43 L195 54 L191 43 L180 39 L191 35Z" /></g>}
        </svg>
    );
}
