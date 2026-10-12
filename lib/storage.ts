// Synchronous browser persistence. Access is lazy so importing this module during
// server rendering never reads window; callers handle blocked/quota errors.
export interface StudyStorage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
}

export const localStudyStorage: StudyStorage = {
    getItem(key) { return window.localStorage.getItem(key); },
    setItem(key, value) { window.localStorage.setItem(key, value); },
    removeItem(key) { window.localStorage.removeItem(key); },
};
