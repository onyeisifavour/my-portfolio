"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { LogoLoader } from "@/components/logo-loader";
import {
  blogTipGroups,
  pickLabeledTip,
  projectTipGroups,
  type LabeledTip,
  type TipGroup,
} from "@/lib/tips";

const groupsByKind: Record<"projects" | "blog", TipGroup[]> = {
  projects: projectTipGroups,
  blog: blogTipGroups,
};

const MIN_DURATION_MS = 4000;
const MAX_DURATION_MS = 6000;
const TIP_INTERVAL_MS = 4200;
const FADE_OUT_MS = 450;

function randomDurationMs() {
  return (
    MIN_DURATION_MS +
    Math.floor(Math.random() * (MAX_DURATION_MS - MIN_DURATION_MS + 1))
  );
}

export function SplashScreen({
  kind,
  children,
}: {
  kind: "projects" | "blog";
  children: ReactNode;
}) {
  const router = useRouter();
  const groups = groupsByKind[kind];

  const [tip, setTip] = useState<LabeledTip | null>(null);
  const [tipKey, setTipKey] = useState(0);
  const [closing, setClosing] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const total = randomDurationMs();

    const firstTick = setTimeout(() => {
      setTip(pickLabeledTip(groups));
      setTipKey((key) => key + 1);
    }, 0);
    const tipTimer = setInterval(() => {
      setTip(pickLabeledTip(groups));
      setTipKey((key) => key + 1);
    }, TIP_INTERVAL_MS);

    const closeTimer = setTimeout(() => setClosing(true), total);
    const revealTimer = setTimeout(() => {
      setClosing(false);
      setDone(true);
    }, total + FADE_OUT_MS);

    return () => {
      clearTimeout(firstTick);
      clearInterval(tipTimer);
      clearTimeout(closeTimer);
      clearTimeout(revealTimer);
    };
  }, [groups]);

  function cancel() {
    if (done) return;
    setClosing(true);
    setTimeout(() => {
      if (window.history.length > 1) {
        router.back();
      } else {
        router.replace("/#work");
      }
    }, 220);
  }

  if (done) return <div className="animate-fade-in">{children}</div>;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-paper px-6 text-center transition-opacity duration-500 ${
        closing ? "opacity-0" : "opacity-100"
      }`}
    >
      <button
        type="button"
        onClick={cancel}
        aria-label="Cancel and go back"
        className="absolute top-4 left-4 grid size-10 place-items-center text-ink/60 transition-colors hover:text-accent"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <LogoLoader />

      <p className="animate-pulse font-mono text-xs tracking-[0.24em] text-ink/40 uppercase">
        Loading
      </p>

      <p
        role="status"
        aria-live="polite"
        className="line-clamp-2 min-h-12 max-w-md text-base leading-6 text-ink/55"
      >
        {tip && (
          <span key={tipKey} className="block animate-fade-in">
            {tip.tip}
          </span>
        )}
      </p>
    </div>
  );
}