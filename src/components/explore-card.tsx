import Link from "next/link";
import type { ExplorePage } from "@/lib/project-groups";

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-6 shrink-0 text-ink/50 transition-all group-hover:translate-x-1 group-hover:text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ExploreCard({ page }: { page: ExplorePage }) {
  return (
    <Link
      href={`/explore/projects?page=${page.id}`}
      className="group flex flex-col justify-between gap-4 border border-ink/12 bg-paper-deep px-5 py-5 transition-colors hover:border-accent/40 hover:bg-accent-soft/20 sm:px-6 sm:py-6"
    >
      <div className="flex flex-col gap-2">
        <p className="font-mono text-[11px] tracking-[0.18em] text-ink/45 uppercase">
          {page.name}
        </p>
        <h3 className="font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent sm:text-2xl">
          {page.heading}
        </h3>
        <p className="text-sm leading-6 text-ink/60">{page.description}</p>
      </div>
      <ArrowIcon />
    </Link>
  );
}