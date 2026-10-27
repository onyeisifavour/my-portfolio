"use client";

import { useCallback, useEffect, useState } from "react";
import { isPinned, togglePin, type PinKind } from "@/lib/pins";

export function PinButton({
  kind,
  id,
  className = "",
}: {
  kind: PinKind;
  id: string;
  className?: string;
}) {
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    setPinned(isPinned(kind, id));
  }, [kind, id]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const next = togglePin(kind, id);
      setPinned(next.some((p) => p.kind === kind && p.id === id));
    },
    [kind, id],
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={pinned}
      aria-label={pinned ? "Unpin" : "Pin"}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 font-mono text-[9px] tracking-wider uppercase transition-colors ${
        pinned
          ? "border-accent/60 text-accent"
          : "border-ink/15 text-ink/50 hover:text-ink"
      } ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-3"
        fill={pinned ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 17v5M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
      </svg>
      {pinned ? "Pinned" : "Pin"}
    </button>
  );
}
