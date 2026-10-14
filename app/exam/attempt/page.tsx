import ExamApp from "@/components/ExamApp";
import { examCatalog, examSections } from "@/data/exam-catalog";

export default function ExamAttemptPage() {
    return <ExamApp catalog={examCatalog} sections={examSections} initialView="attempt" />;
}
