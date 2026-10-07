import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

function formatDate(date: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function BlogList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return (
      <p className="border-y border-ink/10 py-10 text-ink/60">
        No posts yet. Drop a Markdown or MDX file into{" "}
        <code className="rounded bg-ink/6 px-1.5 py-0.5 font-mono text-sm">
          content/posts
        </code>
        .
      </p>
    );
  }

  return (
    <ul className="divide-y divide-ink/10 border-y border-ink/10">
      {posts.map((post) => (
        <li key={post.slug} className="py-6 first:pt-0 last:pb-0">
          <Link href={`/blog/${post.slug}`} className="group block">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <h3 className="font-display text-xl tracking-tight text-ink transition-colors group-hover:text-accent sm:text-2xl">
                {post.title}
              </h3>
              <time
                dateTime={post.date}
                className="shrink-0 font-mono text-xs tracking-wide text-ink/45"
              >
                {formatDate(post.date)} · {post.readingTime}
              </time>
            </div>
            {post.description && (
              <p className="mt-2 max-w-2xl text-base leading-7 text-ink/65">
                {post.description}
              </p>
            )}
            {post.tags.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="font-mono text-[11px] tracking-wider text-ink/45 uppercase"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
