import Link from "next/link";

type SubjectCardProps = {
    title: string;
    description: string;
    href: string;
};

export default function SubjectCard({
    title,
    description,
    href,
}: SubjectCardProps) {
    return (
        <article className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-800">
                {title}
            </h3>

            <p className="mt-2 leading-relaxed text-slate-600">
                {description}
            </p>
            <Link
                href={href}
                className="mt-4 inline-block rounded-2xl bg-pink-700 font-heading px-4 py-2 font-medium text-white hover:bg-pink-800"
            >
                Vào môn học
            </Link>
        </article>
    );
}