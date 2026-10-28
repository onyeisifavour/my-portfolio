import Link from "next/link";
import {
  explorePages,
  projectGroups,
  type GroupProject,
  type ProjectGroup,
} from "@/lib/project-groups";
import { ProjectCard } from "@/components/project-card";

export const metadata = {
  title: "Latest builds",
  description: "The newest things I've designed, coded, and shipped.",
};

export default function LatestProjectsPage() {
  // Group projects by category (explorePages)
  const categories = ["study", "creatives", "gigs", "products"];

  const projectsByCategory = categories.map((categoryId) => {
    const page = explorePages.find((p) => p.id === categoryId);
    const groups = projectGroups.filter((g) => g.pages.includes(categoryId));
    const projects: Array<{ project: GroupProject; group: ProjectGroup }> = [];
    for (const group of groups) {
      for (const project of group.projects) {
        projects.push({ project, group });
      }
    }
    // Sort by year desc
    projects.sort((a, b) => b.project.year.localeCompare(a.project.year));
    return {
      categoryId,
      page,
      projects: projects.slice(0, 3),
      totalCount: projects.length,
    };
  }).filter((c) => c.projects.length > 0);

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <Link
          href="/home?tab=projects#work"
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
          Back
        </Link>

        <header className="mt-10 mb-12 flex flex-col gap-3 sm:mb-16">
          <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
            Projects
          </p>
          <h1 className="font-display text-4xl leading-[0.98] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Latest builds
          </h1>
          <p className="max-w-2xl text-base leading-7 text-ink/65 sm:text-lg sm:leading-8">
            The newest things I&apos;ve designed, coded, and shipped.
          </p>
        </header>

        <div className="flex flex-col gap-14 sm:gap-18">
          {projectsByCategory.map(({ categoryId, page, projects, totalCount }) => {
            const label = page?.name ?? categoryId;
            const categoryLabel =
              label.charAt(0).toUpperCase() + label.slice(1);

            return (
              <section key={categoryId} className="flex flex-col gap-7 sm:gap-8">
                <header className="flex items-end justify-between gap-4 border-b border-ink/10 pb-4">
                  <div className="flex flex-col gap-1.5">
                    <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                      {categoryLabel}
                    </h2>
                  </div>
                  <span className="font-mono text-[11px] tracking-[0.12em] text-ink/45 uppercase">
                    {totalCount} {totalCount === 1 ? "project" : "projects"}
                  </span>
                </header>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {projects.map(({ project, group }) => (
                    <ProjectCard
                      key={project.slug}
                      title={project.title}
                      description={project.about}
                      techStack={project.tags}
                      slug={project.slug}
                      status={project.status === "live" ? "live" : project.status === "wip" ? "wip" : "archived"}
                      group={group.title}
                      year={project.year}
                    />
                  ))}
                </div>

                <div className="flex justify-center">
                  <Link
                    href={`/explore/projects/${categoryId}?filter=latest`}
                    className="group inline-flex items-center gap-2 border border-ink/16 px-5 py-2.5 font-mono text-[11px] tracking-[0.12em] uppercase text-ink transition-all hover:border-accent/55 hover:bg-accent-soft/45 hover:text-accent"
                  >
                    See all in {categoryLabel}
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
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
