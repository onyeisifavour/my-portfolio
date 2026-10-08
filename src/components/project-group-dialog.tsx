"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { GroupProject, ProjectGroup } from "@/lib/project-groups";

const STATUS_LABELS: Record<GroupProject["status"], string> = {
  live: "Live",
  wip: "In progress",
  archived: "Archived",
};

const STATUS_STYLES: Record<GroupProject["status"], string> = {
  live: "border-accent/42 bg-accent-soft/45 text-accent",
  wip: "border-ink/20 bg-ink/[0.06] text-ink/70",
  archived: "border-ink/12 bg-ink/[0.03] text-ink/50",
};

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function ProjectPanel({ project, index }: { project: GroupProject; index: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex min-h-[172px] flex-col gap-2.5 border border-ink/10 bg-paper/50 p-4 transition-colors duration-200 hover:-translate-y-0.5 hover:border-accent/45 hover:bg-accent-soft/22"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] tracking-[0.12em] text-ink/42">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`border px-1.5 py-0.5 font-mono text-[9.5px] tracking-[0.1em] uppercase ${STATUS_STYLES[project.status]}`}
        >
          {STATUS_LABELS[project.status]}
        </span>
      </div>

      <h4 className="font-display text-[17px] leading-tight font-semibold tracking-tight text-ink">
        {project.title}
      </h4>
      <p className="text-[12.5px] leading-relaxed text-ink/62">{project.about}</p>

      {project.tags.length > 0 && (
        <ul className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="border border-ink/10 bg-paper-deep/45 px-1.5 py-0.5 font-mono text-[10px] tracking-[0.03em] text-ink/68"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex items-center justify-between gap-2.5 pt-1.5">
        <span className="font-mono text-[10px] tracking-[0.08em] text-ink/42">
          {project.year}
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.1em] text-ink/50 uppercase transition-colors group-hover:text-accent">
          Open project
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}

export function ProjectGroupDialog({
  group,
  onClose,
}: {
  group: ProjectGroup | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!group) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [group]);

  useEffect(() => {
    if (!group) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [group, onClose]);

  if (!group) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-group-dialog-title"
      className="animate-fade-in fixed inset-0 z-50 grid place-items-center bg-ink/42 p-[4vh_4vw] backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="animate-panel flex h-[76vh] w-[78vw] max-w-full flex-col overflow-hidden border border-ink/10 bg-paper shadow-2xl">
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-ink/10 px-4 py-3.5">
          <h2
            id="project-group-dialog-title"
            className="font-mono text-xs tracking-[0.08em] text-ink uppercase"
          >
            {group.title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project group"
            className="grid size-7.5 place-items-center border border-ink/10 text-ink transition-colors hover:border-accent/55 hover:bg-accent-soft/40 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5 pb-7">
          <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-ink/10 pb-3.5">
            {group.summary && (
              <p className="text-[13px] leading-normal text-ink/60">{group.summary}</p>
            )}
            <span className="shrink-0 font-mono text-[10px] tracking-[0.12em] text-ink/45 uppercase">
              {group.projects.length}{" "}
              {group.projects.length === 1 ? "project" : "projects"}
            </span>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {group.projects.map((project, i) => (
              <ProjectPanel key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}