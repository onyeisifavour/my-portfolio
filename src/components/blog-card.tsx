import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { site } from "@/lib/site";

function formatDate(date: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function BlogCard({ post }: { post: PostMeta }) {
  const eyebrow = [post.category, post.group].filter(Boolean).join(" · ");

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex min-h-[300px] flex-col border border-ink/12 bg-paper-deep p-6 transition-[border-color,background,transform] hover:-translate-y-0.5 hover:border-accent/45 hover:bg-accent-soft/20"
    >
      <div className="flex items-baseline justify-between gap-3 border-b border-ink/10 pb-3.5 font-mono text-[10px] tracking-[0.08em] uppercase text-ink/45">
        <span className="text-ink/70">{post.author || site.name}</span>
        <span className="shrink-0">
          {formatDate(post.date)} · {post.readingTime}
        </span>
      </div>

      {eyebrow && (
        <p className="mt-5 font-mono text-[10px] tracking-[0.2em] uppercase text-accent">
          {eyebrow}
        </p>
      )}

      <h3 className="mt-2.5 font-display text-[1.6rem] font-semibold leading-[1.22] tracking-tight text-ink transition-colors group-hover:text-accent">
        {post.title}
      </h3>

      {post.description && (
        <p className="mt-3 text-[14.5px] leading-[1.65] text-ink/62">
          {post.description}
        </p>
      )}

      {post.tags.length > 0 && (
        <ul className="mb-1 mt-5 flex flex-wrap items-center gap-x-1 font-mono text-[10.5px] tracking-[0.04em] uppercase text-ink/60">
          {post.tags.map((tag, i) => (
            <li key={tag} className="flex items-center gap-x-1">
              {i > 0 && (
                <span aria-hidden="true" className="text-ink/25">
                  ·
                </span>
              )}
              {tag}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-ink/10 pt-4">
        <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink/45">
          Read more
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-3.5 shrink-0 text-ink/50 transition-all group-hover:translate-x-1 group-hover:text-accent"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    </Link>
  );
}
