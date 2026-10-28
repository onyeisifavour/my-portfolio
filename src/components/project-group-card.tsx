"use client";

import type { GroupProject, ProjectGroup } from "@/lib/project-groups";

const CELL_CLASSES_4 = [
  "border-b border-r border-ink/10",
  "border-b border-ink/10",
  "border-r border-ink/10",
  "",
];

function getCellClasses(count: number, index: number) {
  if (count === 1) return "col-span-2 row-span-2";
  if (count === 2) {
    return index === 0 ? "col-span-2 border-b border-ink/10" : "col-span-2";
  }
  if (count === 3) {
    if (index === 0) return "border-b border-r border-ink/10";
    if (index === 1) return "border-b border-ink/10";
    return "col-span-2";
  }
  if (count === 4) return CELL_CLASSES_4[index] ?? "";
  return "";
}

function Cell({
  project,
  cellClass,
  single = false,
}: {
  project: GroupProject;
  cellClass: string;
  single?: boolean;
}) {
  if (single) {
    return (
      <div
        className={`flex h-full flex-col justify-center gap-3 p-5 sm:p-6 ${cellClass}`}
      >
        <h4 className="font-display text-lg leading-snug font-semibold tracking-tight text-ink sm:text-xl">
          {project.title}
        </h4>
        <p className="line-clamp-3 text-xs leading-relaxed text-ink/60 sm:text-[13px]">
          {project.about}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="border border-ink/12 bg-ink/[0.03] px-1.5 py-0.5 font-mono text-[9px] tracking-[0.08em] text-ink/70 uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-full flex-col gap-1.5 overflow-hidden p-3 ${cellClass}`}>
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
  index,
  onSelect,
}: {
  group: ProjectGroup;
  index: number;
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
      className="group relative flex cursor-pointer flex-col border border-ink/10 bg-paper/40 outline-none transition-colors hover:border-accent/45 focus-visible:border-accent/45"
    >
      <header className="flex items-baseline justify-between gap-3 border-b border-ink/10 px-3.5 py-2.5">
        <div className="flex min-w-0 items-baseline gap-2.5">
          <span className="font-mono text-[10px] tracking-[0.12em] text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="truncate font-display text-[15px] leading-tight font-semibold tracking-tight text-ink">
            {group.title}
          </h3>
        </div>
        <span className="shrink-0 font-mono text-[10px] tracking-[0.12em] text-ink/45 uppercase">
          {group.projects.length}
        </span>
      </header>

      <div className="grid h-[208px] grid-cols-2 grid-rows-2">
        {preview.map((project, i) => (
          <Cell
            key={project.slug}
            project={project}
            cellClass={getCellClasses(preview.length, i)}
            single={preview.length === 1}
          />
        ))}
      </div>

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