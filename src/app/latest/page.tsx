import { Suspense } from "react";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { getAllProjectsWithGroups } from "@/lib/project-groups";
import { CuratedLatestBlogsFeed, CuratedLatestProjectsFeed } from "@/components/curated-latest-feed";

export const metadata = {
  title: "Latest",
  description: "Latest projects and blog posts grouped by project/blog groups.",
};

export default async function LatestPage() {
  const [posts, projects] = await Promise.all([
    getAllPosts(),
    Promise.resolve(getAllProjectsWithGroups()),
  ]);

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <Link
          href="/home?tab=projects"
          className="font-mono text-xs tracking-wider text-ink/50 uppercase transition-colors hover:text-accent"
        >
          ← Back
        </Link>

        <header className="mt-10 flex flex-col gap-3">
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
            Latest
          </p>
          <h1 className="font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
            Latest builds &amp; notes
          </h1>
          <p className="max-w-xl text-lg leading-8 text-ink/65">
            Grouped by project/blog groups. Pinned items are curated by me and shown first.
          </p>
        </header>

        <div className="mt-12 flex flex-col gap-12">
          <section>
            <header className="mb-6 flex items-end justify-between gap-4 border-b border-ink/10 pb-4">
              <div className="flex flex-col gap-1.5">
                <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
                  Projects
                </p>
                <h2 className="font-display text-2xl leading-tight tracking-tight text-ink sm:text-3xl">
                  Project groups
                </h2>
              </div>
              <Link
                href="/explore/projects"
                className="group inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-ink/60 uppercase transition-colors hover:text-accent"
              >
                Explore Projects groups
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
            </header>
            <Suspense fallback={<div className="text-ink/50">Loading…</div>}>
              <CuratedLatestProjectsFeed items={projects} />
            </Suspense>
          </section>

          <section>
            <header className="mb-6 flex items-end justify-between gap-4 border-b border-ink/10 pb-4">
              <div className="flex flex-col gap-1.5">
                <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
                  Blog
                </p>
                <h2 className="font-display text-2xl leading-tight tracking-tight text-ink sm:text-3xl">
                  Blog groups
                </h2>
              </div>
              <Link
                href="/explore/blog"
                className="group inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-ink/60 uppercase transition-colors hover:text-accent"
              >
                Explore Blog groups
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
            </header>
            <Suspense fallback={<div className="text-ink/50">Loading…</div>}>
              <CuratedLatestBlogsFeed posts={posts} />
            </Suspense>
          </section>
        </div>
      </div>
    </main>
  );
}
