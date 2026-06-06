import { useSyncExternalStore } from "react";

export type Consent = {
  cookies: "accepted" | "rejected" | null;
  analytics: boolean;
  location: boolean;
  decidedAt: string | null;
};

const KEY = "vt:privacy:v1";
const DEFAULT: Consent = {
  cookies: null,
  analytics: false,
  location: false,
  decidedAt: null,
};

let memory: Consent = { ...DEFAULT };
let hydrated = false;
const listeners = new Set<() => void>();

function readStorage(): Consent {
  if (typeof window === "undefined") return { ...DEFAULT };
  try {
    const raw =
      window.localStorage.getItem(KEY) ?? window.sessionStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT, ...parsed };
  } catch {
    return { ...DEFAULT };
  }
}

function writeStorage(c: Consent) {
  if (typeof window === "undefined") return;
  try {
    const json = JSON.stringify(c);
    // If cookies rejected, only keep the decision in sessionStorage (no persistence across sessions)
    if (c.cookies === "rejected") {
      window.localStorage.removeItem(KEY);
      window.sessionStorage.setItem(KEY, json);
    } else {
      window.sessionStorage.removeItem(KEY);
      window.localStorage.setItem(KEY, json);
    }
  } catch {
    /* noop */
  }
}

function ensureHydrated() {
  if (hydrated) return;
  memory = readStorage();
  hydrated = true;
}

function emit() {
  listeners.forEach((l) => l());
}

export function getConsent(): Consent {
  ensureHydrated();
  return memory;
}

export function setConsent(partial: Partial<Consent>) {
  ensureHydrated();
  memory = {
    ...memory,
    ...partial,
    decidedAt:
      partial.cookies !== undefined ? new Date().toISOString() : memory.decidedAt,
  };
  writeStorage(memory);
  emit();
}

export function resetConsent() {
  memory = { ...DEFAULT };
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(KEY);
      window.sessionStorage.removeItem(KEY);
    } catch {
      /* noop */
    }
  }
  emit();
}

function subscribe(cb: () => void) {
  ensureHydrated();
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function useConsent(): Consent {
  return useSyncExternalStore(
    subscribe,
    () => {
      ensureHydrated();
      return memory;
    },
    () => DEFAULT
  );
}