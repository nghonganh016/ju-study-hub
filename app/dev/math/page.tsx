import { notFound } from "next/navigation";
import MathText from "@/components/MathText";

export default function MathExamplesPage() {
    if (process.env.NODE_ENV !== "development") notFound();

    const examples = [
        String.raw`Bình phương: $x^2$.`,
        String.raw`Phân số: $\frac{a}{b}$.`,
        String.raw`Tổng: $\sum_{i=1}^{n} x_i$.`,
        String.raw`Xác suất: $P(A|B)$.`,
        String.raw`Công thức nhiều dòng:
$$\begin{aligned}
H(X) &= -\sum_i p_i \log_2 p_i \\
P(A|B) &= \frac{P(B|A)P(A)}{P(B)}
\end{aligned}$$`,
        String.raw`Giá $5 và $10; ký hiệu \$; công thức lỗi: $\frac{a}{$.`,
        String.raw`$$a_1 + a_2 + a_3 + a_4 + a_5 + a_6 + a_7 + a_8 + a_9 + a_{10} = \sum_{i=1}^{10} a_i$$`,
    ];
    return (
        <main className="mx-auto w-full max-w-3xl p-4 text-slate-800 bg-white">
            <h1 className="text-xl font-bold">Kiểm tra công thức toán</h1>
            {examples.map((text, index) => (
                <div key={index} className="my-4 min-w-0 rounded border p-3">
                    <MathText text={text} />
                </div>
            ))}
        </main>
    );
}
