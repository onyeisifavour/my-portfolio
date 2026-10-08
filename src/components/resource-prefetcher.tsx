"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function ResourcePrefetcher({ routes }: { routes: string[] }) {
  const router = useRouter();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    function prefetch() {
      routes.forEach((route) => router.prefetch(route));
      fetch("/api/search", {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(8000),
      }).catch(() => {});
    }

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      window.requestIdleCallback(
        () => prefetch(),
        { timeout: 2500 },
      );
    } else {
      setTimeout(prefetch, 300);
    }
  }, [routes, router]);

  return null;
}