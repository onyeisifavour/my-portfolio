import Link from "next/link";
import type { ExplorePage } from "@/lib/project-groups";
import { landingExplorePages } from "@/lib/project-groups";
import { ExploreCard } from "@/components/explore-card";

export function ExploreGrid({ pages }: { pages: ExplorePage[] }) {
  const cards = pages.filter((page) => landingExplorePages.includes(page.id));

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((page) => (
          <ExploreCard key={page.id} page={page} />
        ))}
      </div>
      <div className="flex justify-end">
        <Link
          href="/explore/projects"
          className="group inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-ink/60 uppercase transition-colors hover:text-accent"
        >
          See all explore groups
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-3.5 transition-transform group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}