/** Raw capture deliberately never parses or writes the source storage. */
export const RAW_INVENTORY_VERSION = 1;
export const QUIZ_PROGRESS_PREFIX = "ju-study-hub:quiz-progress:";
export const FIXED_RAW_KEYS = [
    "ju-study-hub:bookmarks:v1",
    "ju-study-hub:mistakes:v1",
    "ju-study-hub:review-state:v2",
    "ju-study-hub:review-round:v1",
    "ju-study-hub:review-progress:v1",
    "ju-study-hub:bookmark-practice:v1",
    "ju-study-hub:exam-attempt:v1",
] as const;

export type RawEntry =
    | { key: string; state: "present"; raw: string }
    | { key: string; state: "missing" }
    | { key: string; state: "read-error"; errorName: string };

export type InventoryStatus = "complete" | "enumeration-error" | "unstable" | "unsupported-key";

export type RawSnapshot = {
    schemaVersion: 1;
    captureId: string;
    origin: string;
    capturedAt: string;
    inventoryVersion: 1;
    inventoryStatus: InventoryStatus;
    inventoryErrorName: string | null;
    unrecognizedAppKeys: string[];
    entries: RawEntry[];
    sourceFingerprint: string | null;
};

export type ImportStagingDescriptor = {
    schemaVersion: 1;
    stagingId: string;
    captureId: string;
    sourceFingerprint: string;
    state: "captured" | "previewed" | "confirmed" | "conflict";
    revision: number;
    targetUserId: string | null;
    previewFingerprint: string | null;
    createdAt: string;
};

export interface RawStorageReader {
    readonly length: number;
    key(index: number): string | null;
    getItem(key: string): string | null;
}

export interface StagingRepository {
    findByFingerprint(fingerprint: string): Promise<ImportStagingDescriptor | null>;
    getDescriptor(stagingId: string): Promise<ImportStagingDescriptor | null>;
    getSnapshot(captureId: string): Promise<RawSnapshot | null>;
    addPair(snapshot: RawSnapshot, descriptor: ImportStagingDescriptor): Promise<void>;
}

export type CaptureResult =
    | { status: "captured"; snapshot: RawSnapshot; descriptor: ImportStagingDescriptor }
    | { status: "reused"; snapshot: RawSnapshot; descriptor: ImportStagingDescriptor }
    | { status: "source-incomplete" | "source-changed"; snapshot: RawSnapshot }
    | { status: "storage-unavailable" | "quota-exceeded" | "transaction-aborted" | "corrupt-snapshot" | "invalid-descriptor"; errorName: string };

export type ResumeResult =
    | { status: "ready" | "source-changed"; snapshot: RawSnapshot; descriptor: ImportStagingDescriptor }
    | { status: "missing-descriptor" | "storage-unavailable" | "corrupt-snapshot" | "invalid-descriptor"; errorName: string };

type ValidatedPair =
    | { status: "reused"; snapshot: RawSnapshot; descriptor: ImportStagingDescriptor }
    | { status: "corrupt-snapshot" | "invalid-descriptor"; errorName: string };

type SourcePass = Pick<RawSnapshot, "inventoryStatus" | "inventoryErrorName" | "unrecognizedAppKeys" | "entries">;
const fixedKeySet: ReadonlySet<string> = new Set(FIXED_RAW_KEYS);
const codeUnitCompare = (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0;
const errorName = (error: unknown) => error instanceof Error ? error.name : "UnknownError";

export function readRawSource(source: RawStorageReader): SourcePass {
    const keys = new Set<string>(FIXED_RAW_KEYS);
    const unknown = new Set<string>();
    let inventoryErrorName: string | null = null;
    try {
        const count = source.length;
        for (let index = 0; index < count; index += 1) {
            const key = source.key(index);
            if (key === null) {
                inventoryErrorName = "EnumerationError";
                break;
            }
            if (key.startsWith(QUIZ_PROGRESS_PREFIX)) keys.add(key);
            else if (key.startsWith("ju-study-hub:") && !fixedKeySet.has(key)) unknown.add(key);
        }
    } catch (error) {
        inventoryErrorName = errorName(error);
    }

    const entries: RawEntry[] = [...keys].sort(codeUnitCompare).map((key) => {
        try {
            const raw = source.getItem(key);
            return raw === null ? { key, state: "missing" } : { key, state: "present", raw };
        } catch (error) {
            return { key, state: "read-error", errorName: errorName(error) };
        }
    });
    const unrecognizedAppKeys = [...unknown].sort(codeUnitCompare);
    return {
        inventoryStatus: inventoryErrorName ? "enumeration-error" : unrecognizedAppKeys.length ? "unsupported-key" : "complete",
        inventoryErrorName,
        unrecognizedAppKeys,
        entries,
    };
}

function samePass(a: SourcePass, b: SourcePass): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
}

function encodeFingerprint(origin: string, entries: RawEntry[]): ArrayBuffer {
    const bytes: number[] = [];
    const uint32 = (value: number) => {
        if (!Number.isSafeInteger(value) || value < 0 || value > 0xffffffff) throw new RangeError("Fingerprint field too large");
        for (let index = 0; index < 4; index += 1) bytes.push((value >>> (index * 8)) & 0xff);
    };
    const string = (value: string) => {
        uint32(value.length * 2);
        for (let index = 0; index < value.length; index += 1) {
            const unit = value.charCodeAt(index);
            bytes.push(unit & 0xff, unit >>> 8);
        }
    };
    for (const character of "JSH-RAW-1") bytes.push(character.charCodeAt(0));
    string(origin);
    uint32(RAW_INVENTORY_VERSION);
    uint32(entries.length);
    for (const entry of entries) {
        string(entry.key);
        bytes.push(entry.state === "present" ? 1 : 0);
        if (entry.state === "present") string(entry.raw);
    }
    return new Uint8Array(bytes).buffer;
}

export async function fingerprintRaw(origin: string, entries: RawEntry[], subtle: SubtleCrypto): Promise<string> {
    if (entries.some((entry) => entry.state === "read-error")) throw new Error("Incomplete raw inventory");
    const ordered = [...entries].sort((a, b) => codeUnitCompare(a.key, b.key));
    if (ordered.some((entry, index) => index > 0 && ordered[index - 1].key === entry.key)) {
        throw new Error("Duplicate raw key");
    }
    const digest = new Uint8Array(await subtle.digest("SHA-256", encodeFingerprint(origin, ordered)));
    return `sha256:${[...digest].map((byte) => byte.toString(16).padStart(2, "0")).join("")}`;
}

function isComplete(pass: SourcePass): boolean {
    return pass.inventoryStatus === "complete" && pass.entries.every((entry) => entry.state !== "read-error");
}

async function validatePair(
    descriptor: ImportStagingDescriptor,
    repository: StagingRepository,
    fingerprint: string,
    origin: string,
    subtle: SubtleCrypto,
): Promise<ValidatedPair> {
    if (descriptor.schemaVersion !== 1 || typeof descriptor.stagingId !== "string" || !descriptor.stagingId ||
        typeof descriptor.captureId !== "string" || !descriptor.captureId || typeof descriptor.createdAt !== "string" ||
        descriptor.sourceFingerprint !== fingerprint || !["captured", "previewed", "confirmed", "conflict"].includes(descriptor.state) ||
        !Number.isSafeInteger(descriptor.revision) || descriptor.revision < 1 ||
        (descriptor.targetUserId !== null && typeof descriptor.targetUserId !== "string") ||
        (descriptor.previewFingerprint !== null && typeof descriptor.previewFingerprint !== "string")) {
        return { status: "invalid-descriptor", errorName: "InvalidDescriptor" };
    }
    const snapshot = await repository.getSnapshot(descriptor.captureId);
    if (!snapshot || snapshot.schemaVersion !== 1 || snapshot.captureId !== descriptor.captureId || snapshot.inventoryVersion !== 1 ||
        snapshot.origin !== origin || snapshot.inventoryStatus !== "complete" ||
        snapshot.inventoryErrorName !== null || !Array.isArray(snapshot.unrecognizedAppKeys) || snapshot.unrecognizedAppKeys.length !== 0 ||
        snapshot.sourceFingerprint !== fingerprint ||
        !Array.isArray(snapshot.entries) || snapshot.entries.some((entry) =>
            !entry || typeof entry.key !== "string" ||
            (entry.state !== "present" && entry.state !== "missing") ||
            (entry.state === "present" && typeof entry.raw !== "string")) ||
        snapshot.entries.some((entry, index) => index > 0 && codeUnitCompare(snapshot.entries[index - 1].key, entry.key) >= 0) ||
        FIXED_RAW_KEYS.some((key) => !snapshot.entries.some((entry) => entry.key === key)) ||
        snapshot.entries.some((entry) => !fixedKeySet.has(entry.key) && !entry.key.startsWith(QUIZ_PROGRESS_PREFIX))) {
        return { status: "corrupt-snapshot", errorName: "InvalidSnapshot" };
    }
    try {
        if (await fingerprintRaw(origin, snapshot.entries, subtle) !== fingerprint) {
            return { status: "corrupt-snapshot", errorName: "ChecksumMismatch" };
        }
    } catch {
        return { status: "corrupt-snapshot", errorName: "ChecksumError" };
    }
    return { status: "reused", snapshot, descriptor };
}

/** Resume an exact descriptor. Never substitute another snapshot when it is broken. */
export async function resumeRaw(
    stagingId: string,
    source: RawStorageReader,
    repository: StagingRepository,
    origin: string,
    subtle: SubtleCrypto,
): Promise<ResumeResult> {
    try {
        const descriptor = await repository.getDescriptor(stagingId);
        if (!descriptor) return { status: "missing-descriptor", errorName: "NotFoundError" };
        const checked = await validatePair(descriptor, repository, descriptor.sourceFingerprint, origin, subtle);
        if (checked.status !== "reused") return checked;
        const first = readRawSource(source);
        const second = readRawSource(source);
        if (!samePass(first, second) || !isComplete(second)) {
            return { status: "source-changed", snapshot: checked.snapshot, descriptor };
        }
        const current = await fingerprintRaw(origin, second.entries, subtle);
        return { status: current === descriptor.sourceFingerprint ? "ready" : "source-changed", snapshot: checked.snapshot, descriptor };
    } catch (error) {
        return { status: "storage-unavailable", errorName: errorName(error) };
    }
}

export type CaptureOptions = {
    source: RawStorageReader;
    repository: StagingRepository;
    origin: string;
    subtle: SubtleCrypto;
    randomUUID: () => string;
    now: () => string;
};

export async function captureRaw(options: CaptureOptions): Promise<CaptureResult> {
    const { source, repository, origin, subtle, randomUUID, now } = options;
    const first = readRawSource(source);
    const second = readRawSource(source);
    const pass: SourcePass = samePass(first, second) ? second : { ...second, inventoryStatus: "unstable" };
    let fingerprint: string | null = null;
    if (isComplete(pass)) {
        try { fingerprint = await fingerprintRaw(origin, pass.entries, subtle); }
        catch (error) { return { status: "storage-unavailable", errorName: errorName(error) }; }
    }
    const captureId = randomUUID();
    const capturedAt = now();
    const snapshot: RawSnapshot = {
        schemaVersion: 1, captureId, origin, capturedAt, inventoryVersion: 1,
        ...pass, sourceFingerprint: fingerprint,
    };
    if (!fingerprint) return { status: pass.inventoryStatus === "unstable" ? "source-changed" : "source-incomplete", snapshot };

    try {
        const existing = await repository.findByFingerprint(fingerprint);
        if (existing) {
            const reused = await validatePair(existing, repository, fingerprint, origin, subtle);
            if (reused.status !== "reused") return reused;
            const latest = readRawSource(source);
            return samePass(second, latest) ? reused : { status: "source-changed", snapshot: reused.snapshot };
        }
        const descriptor: ImportStagingDescriptor = {
            schemaVersion: 1, stagingId: randomUUID(), captureId, sourceFingerprint: fingerprint,
            state: "captured", revision: 1, targetUserId: null, previewFingerprint: null, createdAt: capturedAt,
        };
        try { await repository.addPair(snapshot, descriptor); }
        catch (error) {
            if (errorName(error) !== "ConstraintError") throw error;
            const winner = await repository.findByFingerprint(fingerprint);
            if (!winner) return { status: "transaction-aborted", errorName: "ConstraintError" };
            const reused = await validatePair(winner, repository, fingerprint, origin, subtle);
            if (reused.status !== "reused") return reused;
            const latest = readRawSource(source);
            return samePass(second, latest) ? reused : { status: "source-changed", snapshot: reused.snapshot };
        }
        const stored = await repository.findByFingerprint(fingerprint);
        if (!stored || stored.stagingId !== descriptor.stagingId) return { status: "invalid-descriptor", errorName: "ReadBackMismatch" };
        const checked = await validatePair(stored, repository, fingerprint, origin, subtle);
        if (checked.status !== "reused") return checked;
        const latest = readRawSource(source);
        return samePass(second, latest) ? { status: "captured", snapshot: checked.snapshot, descriptor: checked.descriptor } :
            { status: "source-changed", snapshot: checked.snapshot };
    } catch (error) {
        const name = errorName(error);
        return { status: name === "QuotaExceededError" ? "quota-exceeded" : name === "AbortError" ? "transaction-aborted" : "storage-unavailable", errorName: name };
    }
}
