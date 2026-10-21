"use client";

import { useEffect, useState, type ReactNode } from "react";
import { captureBrowserRaw } from "@/lib/import-staging-idb";
import type { CaptureResult } from "@/lib/import-staging-capture";

type GateState = { phase: "loading" } | { phase: "ready" } | { phase: "error"; result: Exclude<CaptureResult, { status: "captured" | "reused" }> };

function errorMessage(result: Extract<GateState, { phase: "error" }>["result"]): string {
    switch (result.status) {
        case "source-changed": return "Dữ liệu học đã thay đổi trong lúc sao lưu. Hãy thử lại để chụp bản mới.";
        case "source-incomplete":
            return result.snapshot.inventoryStatus === "unsupported-key"
                ? "Có key Ju Study Hub chưa được nhận diện. Dữ liệu vẫn nguyên vẹn; cần kiểm tra phiên bản ứng dụng trước khi tiếp tục."
                : "Không thể đọc đầy đủ dữ liệu học từ trình duyệt. Dữ liệu gốc vẫn nguyên vẹn; hãy kiểm tra quyền lưu trữ rồi thử lại.";
        case "corrupt-snapshot": return "Bản sao dữ liệu đã lưu bị hỏng. Ứng dụng không tự dùng bản khác để thay thế.";
        case "invalid-descriptor": return "Thông tin staging không nhất quán với bản sao dữ liệu. Ứng dụng chưa mở dữ liệu học.";
        case "quota-exceeded": return "Trình duyệt không còn đủ dung lượng để sao lưu dữ liệu học.";
        case "transaction-aborted": return "Giao dịch sao lưu bị hủy trước khi hoàn tất.";
        case "storage-unavailable": return "Trình duyệt hiện không cho phép truy cập vùng sao lưu dữ liệu học.";
    }
}

export default function StorageBootstrapGate({ children }: { children: ReactNode }) {
    const [attempt, setAttempt] = useState(0);
    const [state, setState] = useState<GateState>({ phase: "loading" });

    useEffect(() => {
        let active = true;
        captureBrowserRaw().then((result) => {
            if (!active) return;
            setState(result.status === "captured" || result.status === "reused"
                ? { phase: "ready" } : { phase: "error", result });
        }, (error) => {
            if (!active) return;
            setState({ phase: "error", result: {
                status: "storage-unavailable", errorName: error instanceof Error ? error.name : "UnknownError",
            } });
        });
        return () => { active = false; };
    }, [attempt]);

    if (state.phase === "ready") return <>{children}</>;
    if (state.phase === "loading") {
        return <main className="mx-auto flex min-h-screen max-w-xl items-center justify-center p-6" role="status">
            <p>Đang bảo vệ dữ liệu học trên thiết bị...</p>
        </main>;
    }
    return <main className="mx-auto flex min-h-screen max-w-xl flex-col items-start justify-center gap-4 p-6" role="alert">
        <h1 className="text-xl font-bold">Chưa thể mở dữ liệu học</h1>
        <p>{errorMessage(state.result)}</p>
        <button type="button" className="rounded-lg border px-4 py-2 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={() => { setState({ phase: "loading" }); setAttempt((value) => value + 1); }}>
            Thử lại
        </button>
    </main>;
}
