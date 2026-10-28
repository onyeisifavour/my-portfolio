import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProjectGroupIds,
  getExplorePageForGroup,
  getProjectGroupById,
} from "@/lib/project-groups";
import { ProjectCard } from "@/components/project-card";

export function generateStaticParams() {
  return getAllProjectGroupIds().map((group) => ({ group }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ group: string }>;
}): Promise<Metadata> {
  const { group: id } = await params;
  const group = getProjectGroupById(id);
  if (!group) return {};

  return {
    title: group.title,
    description: group.summary ?? group.projects[0]?.about,
  };
}

export default async function ProjectGroupPage({
  params,
}: {
  params: Promise<{ group: string }>;
}) {
  const { group: id } = await params;
  const group = getProjectGroupById(id);
  if (!group) notFound();

  const category = getExplorePageForGroup(group);
  const backHref = category
    ? `/projects/category/${category.id}`
    : "/explore/projects";
  const categoryLabel = category
    ? category.name.charAt(0).toUpperCase() + category.name.slice(1)
    : "All groups";

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <Link
          href={backHref}
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
          Back to {category ? categoryLabel : "all groups"}
        </Link>

        <header className="mt-10 flex flex-col gap-3">
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
            {category ? `${category.name} group` : "Project group"}
          </p>
          <h1 className="font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
            {group.title}
          </h1>
          {group.summary && (
            <p className="max-w-xl text-lg leading-8 text-ink/65">
              {group.summary}
            </p>
          )}
        </header>

        <section className="mt-12">
          <header className="mb-6 flex items-end justify-between gap-4 border-b border-ink/10 pb-4">
            <h2 className="font-display text-2xl leading-tight tracking-tight text-ink sm:text-3xl">
              Projects
            </h2>
            <span className="font-mono text-[11px] tracking-[0.12em] text-ink/45 uppercase">
              {group.projects.length}{" "}
              {group.projects.length === 1 ? "project" : "projects"}
            </span>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.projects.map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                description={project.about}
                techStack={project.tags}
                slug={project.slug}
                status={project.status}
                group={group.title}
                year={project.year}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
