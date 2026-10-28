"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { SearchFilters, type SearchFilter } from "@/components/search-filters";
import { resolveSearchScope, type SearchScope } from "@/lib/search-scope";

type SearchPost = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  category: string;
  group: string;
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

function postGroupKey(post: SearchPost) {
  return `${post.category || "General"}::${post.group || "Notes"}`;
}

function getScopedPosts(posts: SearchPost[], scope: SearchScope) {
  if (!scope.sections.includes("posts")) return [];

  if (scope.blogGroupId) {
    return posts.filter((post) => postGroupKey(post) === scope.blogGroupId);
  }

  if (scope.blogCategory) {
    return posts.filter(
      (post) => (post.category || "Uncategorized") === scope.blogCategory,
    );
  }

  if (scope.postSlug) {
    const current = posts.find((post) => post.slug === scope.postSlug);
    if (!current) return [];

    const key = postGroupKey(current);
    return posts.filter((post) => postGroupKey(post) === key);
  }

  return posts;
}

function getScopedGroups(groups: SearchGroup[], scope: SearchScope) {
  if (
    !scope.sections.includes("groups") &&
    !scope.sections.includes("projects")
  ) {
    return [];
  }

  if (scope.projectGroupId) {
    const groupId = scope.projectGroupId;
    return groups.filter((group) => group.id === groupId);
  }

  if (scope.projectSlug) {
    const projectSlug = scope.projectSlug;
    return groups.filter((group) =>
      group.projects.some((project) => project.slug === projectSlug),
    );
  }

  if (scope.category) {
    const category = scope.category;
    return groups.filter((group) => group.pages.includes(category));
  }

  return groups;
}

const KIND_LABEL: Record<"posts" | "groups" | "projects", string> = {
  posts: "Posts",
  groups: "Groups",
  projects: "Projects",
};

function SearchIcon() {
  return (
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
  );
}

export function SearchButtonFallback() {
  return (
    <button
      type="button"
      aria-label="Search"
      title="Search"
      className="inline-flex size-9 items-center justify-center rounded-sm text-ink/65 transition-colors"
    >
      <SearchIcon />
    </button>
  );
}

export function SearchButton() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const scope = resolveSearchScope(pathname, searchParams);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<SearchFilter[]>([]);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState<SearchIndex | null>(null);

  const isLanding = pathname === "/";

  const closeSearch = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveFilters([]);
  }, []);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        closeSearch();
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, closeSearch]);

  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeSearch();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeSearch]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  if (isLanding) return null;

  function toggle() {
    if (open) {
      closeSearch();
      return;
    }

    setOpen(true);
    setLoading(true);
    loadIndex()
      .then((data) => setIndex(data))
      .finally(() => setLoading(false));
  }

  function toggleFilter(filter: SearchFilter) {
    setActiveFilters((current) =>
      current.includes(filter)
        ? current.filter((item) => item !== filter)
        : [...current, filter],
    );
  }

  const q = query.trim().toLowerCase();
  const searched = q.length > 0;

  const scopedPosts = index ? getScopedPosts(index.posts, scope) : [];
  const scopedGroups = index ? getScopedGroups(index.groups, scope) : [];

  const postResults =
    searched && scope.sections.includes("posts")
      ? scopedPosts
          .filter((post) =>
            [post.title, post.description, ...post.tags]
              .join(" ")
              .toLowerCase()
              .includes(q),
          )
          .slice(0, 5)
      : [];

  const groupResults =
    searched && scope.sections.includes("groups")
      ? scopedGroups
          .filter((group) =>
            [group.title, group.summary].join(" ").toLowerCase().includes(q),
          )
          .slice(0, 5)
      : [];

  const projectResults =
    searched && scope.sections.includes("projects")
      ? scopedGroups
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
        href: `/projects/group/${group.id}`,
        title: group.title,
        meta: `${group.projects.length} project${group.projects.length === 1 ? "" : "s"}`,
      })),
    },
    {
      kind: "projects" as const,
      items: projectResults.map(({ project, group }) => ({
        href: `/projects/project-page/${project.slug}`,
        title: project.title,
        meta: group.title,
      })),
    },
  ].filter((section) => section.items.length > 0);

  const total = sections.reduce((sum, section) => sum + section.items.length, 0);
  const placeholder = `Search ${scope.label}…`;

  return (
    <div
      ref={containerRef}
      className="relative"
      role="search"
      aria-label={`Search ${scope.label}`}
    >
      <button
        type="button"
        onClick={toggle}
        aria-label={placeholder}
        aria-expanded={open}
        title="Search"
        className="inline-flex size-9 items-center justify-center rounded-sm text-ink/65 transition-colors hover:bg-ink/6 hover:text-ink"
      >
        <SearchIcon />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[min(21rem,calc(100vw-2rem))] border border-ink/10 bg-paper shadow-2xl">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
            className="w-full bg-transparent border-b border-ink/10 px-3.5 py-2.5 font-mono text-xs text-ink placeholder:text-ink/35 focus:outline-none"
          />

          <div className="border-b border-ink/10 px-3.5 py-2">
            <SearchFilters active={activeFilters} onToggle={toggleFilter} />
          </div>

          <div className="max-h-72 overflow-y-auto py-1.5">
            {!searched && (
              <p className="px-3.5 py-2 text-xs leading-5 text-ink/45">
                {loading ? "Loading…" : `Type to search ${scope.label}.`}
              </p>
            )}

            {searched && total === 0 && (
              <p className="px-3.5 py-2 text-xs leading-5 text-ink/45">
                No results for &quot;{query.trim()}&quot;
                {scope.key === "all" ? "" : ` in ${scope.label}`}.
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
                        onClick={closeSearch}
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
