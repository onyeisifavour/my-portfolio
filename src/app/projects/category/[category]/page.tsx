import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  explorePages,
  getProjectGroupsForCategory,
  landingExplorePages,
  type ExplorePage,
} from "@/lib/project-groups";
import { pinnedConfig } from "@/lib/pinned-config";
import { CategoryFilterBar } from "@/components/category-filter-bar";
import { CategoryGroupBrowser } from "@/components/category-group-browser";
import { CuratedLatestProjectsFeed } from "@/components/curated-latest-feed";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getCategoryPage(id: string): ExplorePage | undefined {
  return explorePages.find(
    (page) => landingExplorePages.includes(page.id) && page.id === id,
  );
}

function getGroupYear(group: { projects: Array<{ year: string }> }) {
  return Math.max(
    0,
    ...group.projects.map((project) => Number(project.year) || 0),
  );
}

export function generateStaticParams() {
  return landingExplorePages.map((category) => ({ category }));
}

export async function generateMetadata(
  props: CategoryPageProps,
): Promise<Metadata> {
  const { category } = await props.params;
  const page = getCategoryPage(category);
  if (!page) return {};

  return {
    title: `${page.name.charAt(0).toUpperCase() + page.name.slice(1)} projects`,
    description: page.pageDescription ?? page.description,
  };
}

export default async function ProjectCategoryPage(
  props: CategoryPageProps,
) {
  const { category } = await props.params;
  const searchParams = await props.searchParams;
  const page = getCategoryPage(category);
  if (!page) notFound();

  const latestActive = searchParams.filter === "latest";
  const categoryGroups = getProjectGroupsForCategory(page.id);

  const pinnedGroups = pinnedConfig.projectGroups.flatMap((id) => {
    const group = categoryGroups.find((candidate) => candidate.id === id);
    return group ? [group] : [];
  });

  const allGroups = [...categoryGroups].sort((a, b) => {
    const yearDelta = getGroupYear(b) - getGroupYear(a);
    if (yearDelta !== 0) return yearDelta;
    return a.title.localeCompare(b.title);
  });

  const projects = categoryGroups
    .flatMap((group) =>
      group.projects.map((project) => ({ project, group })),
    )
    .sort((a, b) => b.project.year.localeCompare(a.project.year));

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <Link
          href="/explore/projects"
          className="group inline-flex items-center gap-2 font-mono text-xs tracking-wider text-ink/60 uppercase transition-colors hover:text-accent"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-3.5 transition-transform group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to all groups
        </Link>

        <header className="mt-10 flex flex-col gap-3">
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
            Category
          </p>
          <h1 className="font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
            {page.name.charAt(0).toUpperCase() + page.name.slice(1)}
          </h1>
          <p className="max-w-xl text-lg leading-8 text-ink/65">
            {page.pageDescription ?? page.description}
          </p>
        </header>

        <CategoryFilterBar active={latestActive} />

        {latestActive ? (
          <section className="mt-10">
            <header className="mb-6 flex items-end justify-between gap-4 border-b border-ink/10 pb-4">
              <div className="flex flex-col gap-1.5">
                <p className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
                  Latest
                </p>
                <h2 className="font-display text-2xl leading-tight tracking-tight text-ink sm:text-3xl">
                  Latest projects
                </h2>
              </div>
              <span className="shrink-0 font-mono text-[11px] tracking-[0.12em] text-ink/45 uppercase">
                {projects.length}{" "}
                {projects.length === 1 ? "project" : "projects"}
              </span>
            </header>

            {projects.length > 0 ? (
              <CuratedLatestProjectsFeed items={projects} />
            ) : (
              <p className="border-y border-ink/10 py-10 text-ink/60">
                Nothing here yet.
              </p>
            )}
          </section>
        ) : (
          <CategoryGroupBrowser
            key={page.id}
            pinnedGroups={pinnedGroups}
            allGroups={allGroups}
          />
        )}
      </div>
    </main>
  );
}
