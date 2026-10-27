"use client";

const STORAGE_KEY = "portfolio:pins:v1";

export type PinKind = "project-group" | "project" | "blog-group" | "blog";

export type Pin = {
  kind: PinKind;
  id: string;
  pinnedAt: number;
};

function readPins(): Pin[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Pin[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((p) => p && typeof p.id === "string" && typeof p.kind === "string");
  } catch {
    return [];
  }
}

function writePins(pins: Pin[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(pins));
  } catch {
    // ignore
  }
}

export function getPins(): Pin[] {
  return readPins();
}

export function isPinned(kind: PinKind, id: string): boolean {
  return readPins().some((p) => p.kind === kind && p.id === id);
}

export function togglePin(kind: PinKind, id: string): Pin[] {
  const pins = readPins();
  const exists = pins.find((p) => p.kind === kind && p.id === id);
  if (exists) {
    const next = pins.filter((p) => !(p.kind === kind && p.id === id));
    writePins(next);
    return next;
  }
  const next = [...pins, { kind, id, pinnedAt: Date.now() }];
  writePins(next);
  return next;
}

export function getPinnedByKind(kind: PinKind): Pin[] {
  return readPins().filter((p) => p.kind === kind);
}
