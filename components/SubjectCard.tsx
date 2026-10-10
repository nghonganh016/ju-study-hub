import Link from "next/link";
import type { SubjectAccent } from "@/data/subjects";
import styles from "./Home.module.css";

type SubjectCardProps = {
    title: string;
    description: string;
    href: string;
    accent: SubjectAccent;
};

export default function SubjectCard({
    title,
    description,
    href,
    accent,
}: SubjectCardProps) {
    return (
        <Link href={href} className={styles.subjectCard} data-accent={accent}>
            <div className={styles.subjectTop}>
                <span className={styles.subjectMarker} aria-hidden="true" />
                <span className={styles.subjectArrow} aria-hidden="true">→</span>
            </div>
            <div className={styles.subjectBody}>
                <h2 className={styles.subjectTitle}>{title}</h2>
                <p className={styles.subjectDescription}>{description}</p>
            </div>
            <span className={styles.subjectAction}>Vào môn học</span>
        </Link>
    );
}
