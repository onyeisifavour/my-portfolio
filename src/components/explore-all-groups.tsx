"use client";

import { useState } from "react";
import Link from "next/link";
import type { ProjectGroup } from "@/lib/project-groups";
import { explorePages, projectGroups } from "@/lib/project-groups";
import { ProjectGroupCard } from "@/components/project-group-card";
import { ProjectGroupDialog } from "@/components/project-group-dialog";

const SECTIONS = ["study", "creatives", "gigs", "products"];

export function ExploreAllGroups({
  openGroupId,
}: {
  openGroupId?: string;
}) {
  const [activeGroup, setActiveGroup] = useState<ProjectGroup | null>(
    () => projectGroups.find((group) => group.id === openGroupId) ?? null,
  );

  return (
    <div className="flex flex-col gap-12">
      <header className="mt-10 flex flex-col gap-3">
        <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
          Projects
        </p>
        <h1 className="font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
          Explore all groups
        </h1>
        <p className="max-w-xl text-lg leading-8 text-ink/65">
          Browse projects grouped by study, creatives, gigs, and products.
        </p>
      </header>

      {SECTIONS.map((sectionId) => {
        const page = explorePages.find((p) => p.id === sectionId);
        const groups = projectGroups.filter((group) =>
          group.pages.includes(sectionId),
        );
        if (groups.length === 0) return null;

        const preview = groups.slice(0, 4);
        const hasMore = groups.length > 4;
        const label = page?.name
          ? page.name.charAt(0).toUpperCase() + page.name.slice(1)
          : sectionId;

        return (
          <section key={sectionId}>
            <header className="mb-6 flex items-end justify-between gap-4">
              <div className="flex flex-col gap-2">
                <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
                  {page?.name ?? sectionId}
                </p>
                <h2 className="font-display text-2xl leading-tight tracking-tight text-ink sm:text-3xl">
                  {page?.heading ?? sectionId}
                </h2>
                {page?.description && (
                  <p className="max-w-xl text-sm leading-7 text-ink/65 sm:text-base sm:leading-8">
                    {page.description}
                  </p>
                )}
              </div>
            </header>

            <div className="grid gap-4 sm:grid-cols-2">
              {preview.map((group, i) => (
                <ProjectGroupCard
                  key={group.id}
                  group={group}
                  index={i}
                  onSelect={(selected) => setActiveGroup(selected)}
                />
              ))}
            </div>

            {hasMore && (
              <div className="mt-6 flex justify-center">
                <Link
                  href={`/projects/category/${sectionId}`}
                  className="group inline-flex items-center gap-2 border border-ink/16 px-5 py-2.5 font-mono text-[11px] tracking-[0.12em] uppercase text-ink transition-all hover:border-accent/55 hover:bg-accent-soft/45 hover:text-accent"
                >
                  See all in {label}
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
            )}
          </section>
        );
      })}

      <ProjectGroupDialog
        key={activeGroup?.id ?? "closed"}
        group={activeGroup}
        onClose={() => setActiveGroup(null)}
      />
    </div>
  );
}
