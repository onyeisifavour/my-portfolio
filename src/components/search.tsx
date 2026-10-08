"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SearchPost = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
};

type SearchProject = {
  slug: string;
  title: string;
  about: string;
  tags: string[];
  status: string;
  year: string;
};

type SearchGroup = {
  id: string;
  title: string;
  pages: string[];
  summary: string;
  projects: SearchProject[];
};

type SearchIndex = {
  posts: SearchPost[];
  groups: SearchGroup[];
};

const EMPTY_INDEX: SearchIndex = { posts: [], groups: [] };

let indexCache: Promise<SearchIndex> | null = null;

function loadIndex() {
  if (!indexCache) {
    indexCache = fetch("/api/search", {
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error(`search index ${response.status}`);
        return response.json() as Promise<SearchIndex>;
      })
      .catch(() => {
        indexCache = null;
        return EMPTY_INDEX;
      });
  }
  return indexCache;
}

const KIND_LABEL: Record<"posts" | "groups" | "projects", string> = {
  posts: "Posts",
  groups: "Groups",
  projects: "Projects",
};

export function SearchButton() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState<SearchIndex | null>(null);

  const isLanding = pathname === "/";

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (isLanding) return null;

  function toggle() {
    setOpen((wasOpen) => {
      if (wasOpen) {
        setQuery("");
        return false;
      }
      requestAnimationFrame(() => inputRef.current?.focus());
      return true;
    });
    setLoading(true);
    loadIndex()
      .then((data) => setIndex(data))
      .finally(() => setLoading(false));
  }

  const q = query.trim().toLowerCase();
  const searched = q.length > 0;

  const postResults = searched && index
    ? index.posts
        .filter((post) =>
          [post.title, post.description, ...post.tags]
            .join(" ")
            .toLowerCase()
            .includes(q),
        )
        .slice(0, 5)
    : [];

  const groupResults = searched && index
    ? index.groups
        .filter((group) =>
          [group.title, group.summary].join(" ").toLowerCase().includes(q),
        )
        .slice(0, 5)
    : [];

  const projectResults = searched && index
    ? index.groups
        .flatMap((group) =>
          group.projects
            .filter((project) =>
              [project.title, project.about, ...project.tags]
                .join(" ")
                .toLowerCase()
                .includes(q),
            )
            .map((project) => ({ project, group })),
        )
        .slice(0, 8)
    : [];

  const sections = [
    {
      kind: "posts" as const,
      items: postResults.map((post) => ({
        href: `/blog/${post.slug}`,
        title: post.title,
        meta: post.tags[0] ?? post.date,
      })),
    },
    {
      kind: "groups" as const,
      items: groupResults.map((group) => ({
        href: `/explore/projects?page=${group.pages[0] ?? "latest"}&open=${group.id}`,
        title: group.title,
        meta: `${group.projects.length} project${group.projects.length === 1 ? "" : "s"}`,
      })),
    },
    {
      kind: "projects" as const,
      items: projectResults.map(({ project, group }) => ({
        href: `/projects/${project.slug}`,
        title: project.title,
        meta: group.title,
      })),
    },
  ].filter((section) => section.items.length > 0);

  const total = sections.reduce((sum, section) => sum + section.items.length, 0);

  return (
    <div
      ref={containerRef}
      className="relative"
      role="search"
      aria-label="Search the site"
    >
      <button
        type="button"
        onClick={toggle}
        aria-label="Search projects, groups, and posts"
        aria-expanded={open}
        title="Search"
        className="inline-flex size-9 items-center justify-center rounded-sm text-ink/65 transition-colors hover:bg-ink/6 hover:text-ink"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-[18px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[min(21rem,calc(100vw-2rem))] border border-ink/10 bg-paper shadow-2xl">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, groups, and posts…"
            aria-label="Search"
            className="w-full bg-transparent border-b border-ink/10 px-3.5 py-2.5 font-mono text-xs text-ink placeholder:text-ink/35 focus:outline-none"
          />

          <div className="max-h-72 overflow-y-auto py-1.5">
            {!searched && (
              <p className="px-3.5 py-2 text-xs leading-5 text-ink/45">
                {loading ? "Loading…" : "Type to search projects, groups, and posts."}
              </p>
            )}

            {searched && total === 0 && (
              <p className="px-3.5 py-2 text-xs leading-5 text-ink/45">
                No results for &quot;{query.trim()}&quot;.
              </p>
            )}

            {sections.map((section) => (
              <div key={section.kind} className="py-1">
                <p className="px-3.5 pb-1 pt-2 font-mono text-[9.5px] tracking-[0.16em] text-accent uppercase">
                  {KIND_LABEL[section.kind]}
                </p>
                <ul>
                  {section.items.map((item) => (
                    <li key={`${section.kind}-${item.href}`}>
                      <Link
                        href={item.href}
                        onClick={() => {
                          setOpen(false);
                          setQuery("");
                        }}
                        className="flex items-baseline justify-between gap-3 px-3.5 py-1.5 transition-colors hover:bg-accent-soft/22"
                      >
                        <span className="truncate text-[13px] font-medium text-ink">
                          {item.title}
                        </span>
                        <span className="shrink-0 font-mono text-[9.5px] tracking-[0.08em] text-ink/42 uppercase">
                          {item.meta}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}