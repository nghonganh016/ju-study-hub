import { captureRaw } from "./import-staging-capture";
import type { CaptureResult, ImportStagingDescriptor, RawSnapshot, StagingRepository } from "./import-staging-capture";

export const IMPORT_STAGING_DB = "ju-study-hub-import-staging";

function requestResult<T>(request: IDBRequest<T>): Promise<T> {
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error ?? new DOMException("IndexedDB request failed", "UnknownError"));
    });
}

function transactionDone(transaction: IDBTransaction): Promise<void> {
    return new Promise((resolve, reject) => {
        let requestError: DOMException | null = null;
        transaction.oncomplete = () => resolve();
        transaction.onerror = (event) => {
            const target = event.target as IDBRequest | null;
            if (target?.error) requestError = target.error;
        };
        transaction.onabort = () => reject(transaction.error ?? requestError ?? new DOMException("IndexedDB transaction aborted", "AbortError"));
    });
}

export class IndexedDbStagingRepository implements StagingRepository {
    constructor(private readonly factory: IDBFactory) {}

    private open(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            let request: IDBOpenDBRequest;
            try { request = this.factory.open(IMPORT_STAGING_DB, 1); }
            catch (error) { reject(error); return; }
            request.onupgradeneeded = () => {
                const database = request.result;
                if (!database.objectStoreNames.contains("raw_snapshots")) {
                    const store = database.createObjectStore("raw_snapshots", { keyPath: "captureId" });
                    store.createIndex("by_fingerprint", "sourceFingerprint", { unique: true });
                }
                if (!database.objectStoreNames.contains("import_staging")) {
                    const store = database.createObjectStore("import_staging", { keyPath: "stagingId" });
                    store.createIndex("by_fingerprint", "sourceFingerprint");
                }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error ?? new DOMException("IndexedDB unavailable", "UnknownError"));
            request.onblocked = () => reject(new DOMException("IndexedDB upgrade blocked", "BlockedError"));
        });
    }

    async findByFingerprint(fingerprint: string): Promise<ImportStagingDescriptor | null> {
        const database = await this.open();
        try {
            const transaction = database.transaction("import_staging", "readonly");
            const done = transactionDone(transaction);
            const [result] = await Promise.all([requestResult<ImportStagingDescriptor | undefined>(
                transaction.objectStore("import_staging").index("by_fingerprint").get(fingerprint),
            ), done]);
            return result ?? null;
        } finally { database.close(); }
    }

    async getSnapshot(captureId: string): Promise<RawSnapshot | null> {
        const database = await this.open();
        try {
            const transaction = database.transaction("raw_snapshots", "readonly");
            const done = transactionDone(transaction);
            const [result] = await Promise.all([
                requestResult<RawSnapshot | undefined>(transaction.objectStore("raw_snapshots").get(captureId)), done,
            ]);
            return result ?? null;
        } finally { database.close(); }
    }

    async getSnapshotByFingerprint(fingerprint: string): Promise<RawSnapshot | null> {
        const database = await this.open();
        try {
            const transaction = database.transaction("raw_snapshots", "readonly");
            const done = transactionDone(transaction);
            const [result] = await Promise.all([
                requestResult<RawSnapshot | undefined>(
                    transaction.objectStore("raw_snapshots").index("by_fingerprint").get(fingerprint),
                ), done,
            ]);
            return result ?? null;
        } finally { database.close(); }
    }

    async getDescriptor(stagingId: string): Promise<ImportStagingDescriptor | null> {
        const database = await this.open();
        try {
            const transaction = database.transaction("import_staging", "readonly");
            const done = transactionDone(transaction);
            const [result] = await Promise.all([
                requestResult<ImportStagingDescriptor | undefined>(transaction.objectStore("import_staging").get(stagingId)), done,
            ]);
            return result ?? null;
        } finally { database.close(); }
    }

    async addPair(snapshot: RawSnapshot, descriptor: ImportStagingDescriptor): Promise<void> {
        const database = await this.open();
        try {
            const transaction = database.transaction(["raw_snapshots", "import_staging"], "readwrite");
            const done = transactionDone(transaction);
            transaction.objectStore("raw_snapshots").add(snapshot);
            transaction.objectStore("import_staging").add(descriptor);
            await done;
        } finally { database.close(); }
    }
}

/** Access browser globals only when explicitly called, never during module import. */
export function browserStagingRepository(): IndexedDbStagingRepository {
    return new IndexedDbStagingRepository(window.indexedDB);
}

export async function captureBrowserRaw(): Promise<CaptureResult> {
    try {
        return await captureRaw({
            source: window.localStorage,
            repository: browserStagingRepository(),
            origin: window.location.origin,
            subtle: window.crypto.subtle,
            randomUUID: () => window.crypto.randomUUID(),
            now: () => new Date().toISOString(),
        });
    } catch (error) {
        return { status: "storage-unavailable", errorName: error instanceof Error ? error.name : "UnknownError" };
    }
}
