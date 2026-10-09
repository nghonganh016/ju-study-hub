import styles from "./QuizConsole.module.css";

export type CatMood = "idle" | "waiting" | "thinking" | "correct" | "wrong" | "celebrating" | "completed";
export const catLabels: Record<CatMood, string> = {
    idle: "Nghỉ", waiting: "Chờ", thinking: "Suy nghĩ", correct: "Đúng",
    wrong: "Sai", celebrating: "Ăn mừng", completed: "Hoàn thành",
};

// One articulated silhouette for every state. Preserve Ju's orange cat identity.
export default function StudyCat({ mood }: { mood: CatMood }) {
    const happy = ["correct", "celebrating", "completed"].includes(mood);
    // Each rotating group lives at its joint; only its angle is interpolated.
    const pose = {
        idle: [0, 0, 0], waiting: [-4, 45, 0], thinking: [7, 0, 155],
        correct: [0, 155, 0], wrong: [-7, 0, -50],
        celebrating: [0, 135, -135], completed: [0, -65, 65],
    }[mood];
    return (
        <svg className={styles.cat} data-mood={mood} viewBox="0 0 220 225" role="img" aria-label={`Mèo của Ju: ${catLabels[mood].toLowerCase()}`}>
            <ellipse cx="110" cy="211" rx="70" ry="9" fill="#d9cbf3" stroke="#ab94d1" strokeWidth="2" />
            <ellipse className={styles.catShadow} cx="110" cy="208" rx="44" ry="5" fill="#69518c" opacity=".2" />
            <g className={styles.catBody} fill="#ffc27d" stroke="#69518c" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <g className={styles.catTail}><path d="M143 174 Q186 191 180 160 Q177 149 169 155 Q164 158 168 166 Q170 177 147 163Z" /></g>
                <g className={styles.catLeftLeg}><path d="M78 181 Q67 197 74 205 Q81 212 99 207 L102 180Z" /></g>
                <g className={styles.catRightLeg}><path d="M120 180 L122 207 Q141 212 147 204 Q153 195 141 180Z" /></g>
                <path d="M87 115 Q65 134 71 167 L76 185 Q109 196 145 185 L151 167 Q155 133 132 115Z" />
                <ellipse cx="111" cy="161" rx="23" ry="25" fill="#fff9ef" stroke="none" />
                <path d="M79 120 Q110 132 140 120 L139 135 L111 148 L81 135Z" fill="#a4f0f4" />
                <rect x="103" y="131" width="16" height="15" rx="5" fill="#9576ce" strokeWidth="2" />
                <path d="M108 137 L111 140 L115 135" fill="none" stroke="#fff9ef" strokeWidth="2" />
                <g transform="translate(110 124)"><g className={styles.catHead} transform={`rotate(${pose[0]})`}><g transform="translate(-110 -124)">
                    <path d="M43 46 L44 18 Q45 12 50 16 L71 33 Q109 23 148 33 L168 15 Q173 11 175 18 L179 46 Q193 61 191 88 Q189 119 167 126 Q111 140 54 126 Q31 119 29 89 Q27 63 43 46Z" />
                    <path d="M49 40 L50 25 L63 36 M155 36 L169 23 L171 41" fill="#ffd9e8" strokeWidth="2.5" />
                    <path d="M56 112 Q62 98 83 99 Q88 85 110 85 Q130 86 137 100 Q161 100 166 114 Q149 132 110 131 Q75 132 56 112Z" fill="#fff9ef" stroke="none" />
                    <g className={styles.catEyes} fill="none" stroke="#352655" strokeWidth="5">
                        {happy ? <><path d="M67 85 Q74 77 81 85" /><path d="M139 85 Q146 77 153 85" /></> : mood === "wrong" ? <><path d="M69 82 L78 86" /><path d="M142 86 L151 82" /></> : <><path d="M74 80 L74 85" /><path d="M146 80 L146 85" /></>}
                    </g>
                    <path d="M99 98 Q103 105 110 99 Q117 106 122 98" fill="none" stroke="#352655" strokeWidth="3.5" />
                    <g fill="#ff98c4" stroke="none"><ellipse cx="60" cy="95" rx="8" ry="4" /><ellipse cx="160" cy="95" rx="8" ry="4" /></g>
                </g></g></g>
                {mood === "completed" && <path className={styles.catPrize} d="M110 144 L120 160 L139 164 L125 177 L128 195 L110 186 L92 195 L95 177 L81 164 L100 160Z" fill="#ffe18e" strokeWidth="3" />}
                {/* Foreground arms keep raised paws visible against the large head. */}
                <g transform="translate(63 139)"><g className={styles.catLeftArm} transform={`rotate(${pose[1]})`}><path transform="translate(-63 -139)" d="M64 135 Q57 128 50 138 L39 157 Q33 170 43 176 Q55 181 62 167 L70 148 Q73 139 64 135Z" /></g></g>
                <g transform="translate(157 139)"><g className={styles.catRightArm} transform={`rotate(${pose[2]})`}><path transform="translate(-157 -139)" d="M156 135 Q163 128 170 138 L181 157 Q187 170 177 176 Q165 181 158 167 L150 148 Q147 139 156 135Z" /></g></g>
            </g>
            {(mood === "correct" || mood === "celebrating") && <g className={styles.catStars} fill="#9576ce" aria-hidden="true"><path d="M16 60 L19 68 L27 71 L19 74 L16 82 L13 74 L5 71 L13 68Z" /><path d="M199 42 L203 52 L213 56 L203 60 L199 70 L195 60 L185 56 L195 52Z" /></g>}
        </svg>
    );
}
