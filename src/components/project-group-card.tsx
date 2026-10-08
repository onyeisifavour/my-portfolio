"use client";

import type { GroupProject, ProjectGroup } from "@/lib/project-groups";

const CELL_CLASSES = [
  "border-b border-r border-ink/10",
  "border-b border-ink/10",
  "border-r border-ink/10",
  "",
];

function Cell({
  project,
  cellClass,
}: {
  project: GroupProject;
  cellClass: string;
}) {
  return (
    <div className={`flex min-h-[104px] flex-col gap-1.5 overflow-hidden p-3 ${cellClass}`}>
      <h4 className="font-display text-[13px] leading-tight font-semibold tracking-tight text-ink">
        {project.title}
      </h4>
      <p className="truncate text-[11px] leading-normal text-ink/60">
        {project.about}
      </p>
      <div className="mt-auto flex gap-1" aria-hidden="true">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="grid size-4.5 place-items-center border border-ink/12 bg-ink/[0.03] font-mono text-[8px] text-ink/70"
            title={tag}
          >
            {tag.charAt(0).toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ProjectGroupCard({
  group,
  onSelect,
}: {
  group: ProjectGroup;
  onSelect: (group: ProjectGroup) => void;
}) {
  const preview = group.projects.slice(0, 4);

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`Open the ${group.title} group`}
      onClick={() => onSelect(group)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(group);
        }
      }}
      className="group relative grid cursor-pointer grid-cols-2 border border-ink/10 bg-paper/40 outline-none transition-colors hover:border-accent/45 focus-visible:border-accent/45"
    >
      {preview.map((project, i) => (
        <Cell key={project.slug} project={project} cellClass={CELL_CLASSES[i]} />
      ))}

      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 grid place-items-center bg-paper/85 opacity-0 backdrop-blur-[3px] transition-opacity duration-220 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <span className="grid size-12 place-items-center border border-accent/45 bg-accent-soft/45 text-accent transition-transform duration-220 group-hover:translate-x-1">
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </article>
  );
}