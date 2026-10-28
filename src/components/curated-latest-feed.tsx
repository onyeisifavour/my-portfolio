import Link from "next/link";
import type { GroupProject, ProjectGroup } from "@/lib/project-groups";
import type { PostMeta } from "@/lib/posts";
import { pinnedConfig } from "@/lib/pinned-config";
import { getProjectGroupHref } from "@/lib/project-group-links";

function ArrowIcon({ className = "size-3" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function timeAgo(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date("2026-10-27T00:00:00Z");
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 1) return "today";
  if (diffDays === 1) return "1d ago";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}

export function CuratedLatestProjectsFeed({
  items,
}: {
  items: Array<{ project: GroupProject; group: ProjectGroup }>;
}) {
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
  // Sort: pinned groups first, then by recency (year desc)
  groupEntries.sort((a, b) => {
    const aPinned = pinnedConfig.projectGroups.includes(a.group.id) ? 1 : 0;
    const bPinned = pinnedConfig.projectGroups.includes(b.group.id) ? 1 : 0;
    if (aPinned !== bPinned) return bPinned - aPinned;
    const aYear = Math.max(...a.projects.map((p) => parseInt(p.year) || 0));
    const bYear = Math.max(...b.projects.map((p) => parseInt(p.year) || 0));
    if (aYear !== bYear) return bYear - aYear;
    return a.group.title.localeCompare(b.group.title);
  });

  // Sort projects within groups: pinned first, then by year desc
  for (const entry of groupEntries) {
    entry.projects.sort((a, b) => {
      const aPinned = pinnedConfig.projects.includes(a.slug) ? 1 : 0;
      const bPinned = pinnedConfig.projects.includes(b.slug) ? 1 : 0;
      if (aPinned !== bPinned) return bPinned - aPinned;
      if (a.year !== b.year) return b.year.localeCompare(a.year);
      return a.title.localeCompare(b.title);
    });
  }

  return (
    <div className="flex flex-col gap-10">
      {groupEntries.map(({ group, projects }) => {
        const isGroupPinned = pinnedConfig.projectGroups.includes(group.id);
        return (
          <section key={group.id} className={isGroupPinned ? "rounded-lg ring-1 ring-accent/30" : ""}>
            <header className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
                    {group.pages.find((p) => p !== "latest")?.toUpperCase() || "PROJECT"}
                  </p>
                  <span className="text-ink/30">·</span>
                  <p className="font-mono text-[11px] tracking-[0.18em] text-ink/45 uppercase">
                    Group
                  </p>
                  {isGroupPinned && (
                    <>
                      <span className="text-ink/30">·</span>
                      <p className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
                        Pinned
                      </p>
                    </>
                  )}
                </div>
                <h2 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                  {group.title}
                </h2>
                {group.summary && (
                  <p className="max-w-xl text-sm text-ink/60">{group.summary}</p>
                )}
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <span className="font-mono text-[10px] tracking-[0.12em] text-ink/40 uppercase">
                  {projects.length} {projects.length === 1 ? "item" : "items"}
                </span>
                <Link
                  href={getProjectGroupHref(group.id)}
                  className="group/link inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.1em] text-ink/55 uppercase transition-colors hover:text-accent"
                >
                  Group page
                  <ArrowIcon className="size-3 transition-transform group-hover/link:translate-x-0.5" />
                </Link>
              </div>
            </header>

            <div className="grid gap-3 sm:grid-cols-2">
              {projects.map((project) => {
                const isPinned = pinnedConfig.projects.includes(project.slug);
                return (
                  <Link
                    key={project.slug}
                    href={`/projects/project-page/${project.slug}`}
                    className={`group relative flex flex-col gap-2 border px-4 py-4 transition-colors sm:px-5 ${
                      isPinned
                        ? "border-accent/40 bg-accent-soft/10 hover:border-accent/60"
                        : "border-ink/10 bg-paper hover:border-accent/40"
                    }`}
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
                      <div className="flex items-center gap-2">
                        {isPinned && (
                          <span className="font-mono text-[8px] tracking-[0.12em] text-accent uppercase">
                            Pinned
                          </span>
                        )}
                        <span className="shrink-0 font-mono text-[9px] tracking-[0.12em] text-ink/35 uppercase">
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function CuratedLatestBlogsFeed({ posts }: { posts: PostMeta[] }) {
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
  groupEntries.sort((a, b) => {
    const aKey = `${a.category}::${a.group}`;
    const bKey = `${b.category}::${b.group}`;
    const aPinned = pinnedConfig.blogGroups.includes(aKey) ? 1 : 0;
    const bPinned = pinnedConfig.blogGroups.includes(bKey) ? 1 : 0;
    if (aPinned !== bPinned) return bPinned - aPinned;
    // Sort by most recent post in group
    const aLatest = Math.max(...a.posts.map((p) => new Date(p.date).getTime() || 0));
    const bLatest = Math.max(...b.posts.map((p) => new Date(p.date).getTime() || 0));
    if (aLatest !== bLatest) return bLatest - aLatest;
    return a.group.localeCompare(b.group);
  });

  for (const entry of groupEntries) {
    entry.posts.sort((a, b) => {
      const aPinned = pinnedConfig.blogs.includes(a.slug) ? 1 : 0;
      const bPinned = pinnedConfig.blogs.includes(b.slug) ? 1 : 0;
      if (aPinned !== bPinned) return bPinned - aPinned;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  return (
    <div className="flex flex-col gap-10">
      {groupEntries.map(({ category, group, posts: groupPosts }) => {
        const groupKey = `${category}::${group}`;
        const isGroupPinned = pinnedConfig.blogGroups.includes(groupKey);
        return (
          <section key={groupKey} className={isGroupPinned ? "rounded-lg ring-1 ring-accent/30" : ""}>
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
                  {isGroupPinned && (
                    <>
                      <span className="text-ink/30">·</span>
                      <p className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
                        Pinned
                      </p>
                    </>
                  )}
                </div>
                <h2 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                  {group}
                </h2>
              </div>
              <span className="font-mono text-[10px] tracking-[0.12em] text-ink/40 uppercase">
                {groupPosts.length} {groupPosts.length === 1 ? "item" : "items"}
              </span>
            </header>

            <div className="grid gap-3 sm:grid-cols-2">
              {groupPosts.map((post) => {
                const isPinned = pinnedConfig.blogs.includes(post.slug);
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className={`group relative flex flex-col gap-2 border px-4 py-4 transition-colors sm:px-5 ${
                      isPinned
                        ? "border-accent/40 bg-accent-soft/10 hover:border-accent/60"
                        : "border-ink/10 bg-paper hover:border-accent/40"
                    }`}
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
                      <div className="flex items-center gap-2">
                        {isPinned && (
                          <span className="font-mono text-[8px] tracking-[0.12em] text-accent uppercase">
                            Pinned
                          </span>
                        )}
                        <span className="shrink-0 font-mono text-[9px] tracking-[0.12em] text-ink/35 uppercase">
                          {post.readingTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
