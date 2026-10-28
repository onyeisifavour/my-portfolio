"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { SearchFilters, type SearchFilter } from "@/components/search-filters";

export function CategoryFilterBar({ active }: { active: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Warm the opposite layout so switching filters feels immediate. Both
    // layouts share this route's stylesheet, so only the server payload needs
    // to be fetched in the background.
    router.prefetch(active ? pathname : `${pathname}?filter=latest`);
  }, [active, pathname, router]);

  function toggle(filter: SearchFilter) {
    if (filter !== "latest") return;

    const params = new URLSearchParams(window.location.search);

    if (active) {
      params.delete("filter");
    } else {
      params.set("filter", "latest");
    }

    const query = params.toString();

    startTransition(() => {
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    });
  }

  return (
    <div
      className={`mt-9 flex flex-wrap items-center justify-between gap-3 border-y border-ink/10 py-3 transition-opacity ${
        isPending ? "opacity-60" : ""
      }`}
    >
      <SearchFilters active={active ? ["latest"] : []} onToggle={toggle} />
      <span
        aria-live="polite"
        className="font-mono text-[10px] tracking-[0.12em] text-ink/45 uppercase"
      >
        {active ? "Latest projects" : "All groups"}
      </span>
    </div>
  );
}
