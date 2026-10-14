import ExamApp from "@/components/ExamApp";
import { examCatalog, examSections } from "@/data/exam-catalog";

export default function ExamPage() {
    return <ExamApp catalog={examCatalog} sections={examSections} initialView="config" />;
}
