import Link from "next/link";
import type { BlogGroup } from "@/lib/posts";

export function BlogGroupCard({ group }: { group: BlogGroup }) {
  const href = `/explore/blog?group=${encodeURIComponent(group.id)}`;

  return (
    <Link
      href={href}
      className="group flex flex-col justify-between gap-4 border border-ink/12 bg-paper-deep px-5 py-5 transition-colors hover:border-accent/40 hover:bg-accent-soft/20 sm:px-6 sm:py-6"
    >
      <div className="flex flex-col gap-2">
        <p className="font-mono text-[11px] tracking-[0.18em] text-ink/45 uppercase">
          {group.category}
        </p>
        <h3 className="font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent sm:text-2xl">
          {group.group}
        </h3>
        <p className="text-sm leading-6 text-ink/60">
          {group.posts.length} {group.posts.length === 1 ? "post" : "posts"}
        </p>
      </div>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-6 shrink-0 self-end text-ink/50 transition-all group-hover:translate-x-1 group-hover:text-accent"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </Link>
  );
}
