"use client";

import Link from "next/link";
import type { GroupProject, ProjectGroup } from "@/lib/project-groups";
import type { PostMeta } from "@/lib/posts";
import { PinButton } from "@/components/pin-button";

function timeAgo(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 1) return "today";
  if (diffDays === 1) return "1d ago";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}

export function LatestProjectsFeed({
  items,
}: {
  items: Array<{ project: GroupProject; group: ProjectGroup }>;
}) {
  // Group by project group
  const groups = items.reduce<Record<string, { group: ProjectGroup; projects: GroupProject[] }>>(
    (acc, item) => {
      if (!acc[item.group.id]) {
        acc[item.group.id] = { group: item.group, projects: [] };
      }
      acc[item.group.id].projects.push(item.project);
      return acc;
    },
    {},
  );

  const groupEntries = Object.values(groups);

  return (
    <div className="flex flex-col gap-10">
      {groupEntries.map(({ group, projects }) => (
        <section key={group.id}>
          <header className="mb-5 flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
                  {group.pages.find((p) => p !== "latest")?.toUpperCase() || "PROJECT"}
                </p>
                <span className="text-ink/30">·</span>
                <p className="font-mono text-[11px] tracking-[0.18em] text-ink/45 uppercase">
                  Group
                </p>
              </div>
              <h2 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                {group.title}
              </h2>
              {group.summary && (
                <p className="max-w-xl text-sm text-ink/60">{group.summary}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] tracking-[0.12em] text-ink/40 uppercase">
                {projects.length} {projects.length === 1 ? "item" : "items"}
              </span>
              <PinButton kind="project-group" id={group.id} />
            </div>
          </header>

          <div className="grid gap-3 sm:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/project-page/${project.slug}`}
                className="group relative flex flex-col gap-2 border border-ink/10 bg-paper px-4 py-4 transition-colors hover:border-accent/40 sm:px-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-base font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
                    {project.title}
                  </h3>
                  <span className="shrink-0 font-mono text-[9px] tracking-[0.12em] text-ink/40 uppercase">
                    {project.year}
                  </span>
                </div>
                <p className="line-clamp-2 text-sm leading-6 text-ink/60">
                  {project.about}
                </p>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="border border-ink/12 px-1.5 py-0.5 font-mono text-[8px] tracking-wider text-ink/55 uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="shrink-0 font-mono text-[9px] tracking-[0.12em] text-ink/35 uppercase">
                    {project.status}
                  </span>
                </div>
                <div className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <PinButton kind="project" id={project.slug} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function LatestBlogsFeed({ posts }: { posts: PostMeta[] }) {
  const groups = posts.reduce<Record<string, { category: string; group: string; posts: PostMeta[] }>>(
    (acc, post) => {
      const category = post.category || "General";
      const group = post.group || "Notes";
      const key = `${category}::${group}`;
      if (!acc[key]) {
        acc[key] = { category, group, posts: [] };
      }
      acc[key].posts.push(post);
      return acc;
    },
    {},
  );

  const groupEntries = Object.values(groups);

  return (
    <div className="flex flex-col gap-10">
      {groupEntries.map(({ category, group, posts: groupPosts }) => (
        <section key={`${category}::${group}`}>
          <header className="mb-5 flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
                  {category}
                </p>
                <span className="text-ink/30">·</span>
                <p className="font-mono text-[11px] tracking-[0.18em] text-ink/45 uppercase">
                  Group
                </p>
              </div>
              <h2 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                {group}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] tracking-[0.12em] text-ink/40 uppercase">
                {groupPosts.length} {groupPosts.length === 1 ? "item" : "items"}
              </span>
              <PinButton kind="blog-group" id={`${category}::${group}`} />
            </div>
          </header>

          <div className="grid gap-3 sm:grid-cols-2">
            {groupPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative flex flex-col gap-2 border border-ink/10 bg-paper px-4 py-4 transition-colors hover:border-accent/40 sm:px-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-base font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  <span className="shrink-0 font-mono text-[9px] tracking-[0.12em] text-ink/40 uppercase">
                    {timeAgo(post.date)}
                  </span>
                </div>
                <p className="line-clamp-2 text-sm leading-6 text-ink/60">
                  {post.description}
                </p>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="border border-ink/12 px-1.5 py-0.5 font-mono text-[8px] tracking-wider text-ink/55 uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="shrink-0 font-mono text-[9px] tracking-[0.12em] text-ink/35 uppercase">
                    {post.readingTime}
                  </span>
                </div>
                <div className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <PinButton kind="blog" id={post.slug} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
