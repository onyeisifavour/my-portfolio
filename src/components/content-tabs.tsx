"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import type { PostMeta } from "@/lib/posts";
import { BlogList } from "@/components/blog-list";
import { ExploreGrid } from "@/components/explore-grid";
import { LatestBlogCard, LatestProjectCard } from "@/components/latest-card";
import { explorePages } from "@/lib/project-groups";

type Tab = "projects" | "blog";

function parseTab(value: string | null): Tab {
  return value === "blog" ? "blog" : "projects";
}

export function ContentTabs({ posts }: { posts: PostMeta[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const tab = parseTab(searchParams.get("tab"));

  function selectTab(next: Tab) {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "projects") {
      params.delete("tab");
    } else {
      params.set("tab", next);
    }
    const query = params.toString();
    startTransition(() => {
      router.replace(query ? `/?${query}#work` : "/#work", { scroll: false });
    });
  }

  return (
    <section id="work" className="scroll-mt-24">
      <div className="mb-8 flex items-end justify-between gap-4 border-b border-ink/10">
        <div className="relative flex gap-1" role="tablist" aria-label="Work">
          {(
            [
              { id: "projects", label: "Projects" },
              { id: "blog", label: "Blog" },
            ] as const
          ).map((item) => {
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                id={`tab-${item.id}`}
                aria-controls={`panel-${item.id}`}
                onClick={() => selectTab(item.id)}
                className={`relative px-1 pb-3 text-sm font-medium transition-colors sm:text-base ${
                  active ? "text-ink" : "text-ink/45 hover:text-ink/70"
                } ${isPending ? "opacity-80" : ""}`}
              >
                <span className="px-3">{item.label}</span>
                {active && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 bg-accent" />
                )}
              </button>
            );
          })}
        </div>
        <Link
          href={tab === "projects" ? "/explore/projects" : "/explore/blog"}
          className="group inline-flex shrink-0 items-center gap-1.5 pb-3 font-mono text-xs tracking-wider text-ink/60 uppercase transition-colors hover:text-accent"
        >
          {tab === "projects" ? "See all explore groups" : "View blogs"}
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

      <div
        role="tabpanel"
        id={`panel-${tab}`}
        aria-labelledby={`tab-${tab}`}
        className="animate-panel"
        key={tab}
      >
        {tab === "projects" ? (
          <div className="flex flex-col gap-8">
            <LatestProjectCard />
            <ExploreGrid pages={explorePages} />
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <LatestBlogCard />
            <BlogList posts={posts} />
          </div>
        )}
      </div>
    </section>
  );
}
