"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { blogTipPool, nextTip, projectTipPool } from "@/lib/tips";

const TIP_INTERVAL_MS = 3600;

export function SplashTips() {
  const pathname = usePathname();
  const isBlog = pathname?.includes("/blog") ?? false;
  const pool = isBlog ? blogTipPool : projectTipPool;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (pool.length === 0) return;
    const timer = setInterval(() => {
      setIndex((i) => i + 1);
    }, TIP_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [pool]);

  if (pool.length === 0) return null;
  const tip = nextTip(pool, index);
  if (!tip) return null;

  return (
    <p
      role="status"
      aria-live="polite"
      className="line-clamp-2 min-h-12 max-w-md text-base leading-6 text-ink/55"
    >
      <span key={index} className="block animate-fade-in">
        {tip}
      </span>
    </p>
  );
}