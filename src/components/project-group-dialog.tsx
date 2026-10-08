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

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className || "size-3.5"}
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

function StatusBadge({ status }: { status: GroupProject["status"] }) {
  return (
    <span
      className={`grid shrink-0 place-items-center border px-2 py-0.5 font-mono text-[9.5px] tracking-[0.1em] uppercase ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

function Tags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <li
          key={tag}
          className="border border-ink/10 bg-paper-deep/45 px-1.5 py-0.5 font-mono text-[10px] tracking-[0.03em] text-ink/68"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function FeaturedProject({ project }: { project: GroupProject }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col gap-4 border border-ink/10 bg-paper/50 p-5 transition-colors duration-200 hover:border-accent/45 hover:bg-accent-soft/22 sm:flex-row sm:items-start sm:justify-between sm:gap-8"
    >
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center gap-2">
          <span className="font-mono text-[10px] tracking-[0.12em] text-ink/42">
            01
          </span>
          <StatusBadge status={project.status} />
        </div>
        <h4 className="font-display text-2xl leading-tight font-semibold tracking-tight text-ink transition-colors group-hover:text-accent sm:text-3xl">
          {project.title}
        </h4>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/62">
          {project.about}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-3">
          <Tags tags={project.tags} />
          <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.1em] text-ink/50 uppercase transition-colors group-hover:text-accent">
            Open project
            <ArrowIcon />
          </span>
        </div>
      </div>
      <span className="shrink-0 font-mono text-[10px] tracking-[0.08em] text-ink/42">
        {project.year}
      </span>
    </Link>
  );
}

function ProjectPanel({ project, index }: { project: GroupProject; index: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex min-h-[190px] flex-col bg-paper/50 p-4 transition-colors duration-200 hover:-translate-y-0.5 hover:bg-accent-soft/22"
    >
      <div className="flex items-start justify-between gap-3 border-b border-ink/10 pb-2.5">
        <h4 className="font-display text-lg leading-tight font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
          {project.title}
        </h4>
        <StatusBadge status={project.status} />
      </div>
      <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink/62">
        {project.about}
      </p>
      <div className="mt-3">
        <Tags tags={project.tags} />
      </div>
      <div className="mt-auto flex items-center justify-between gap-2.5 border-t border-ink/10 pt-2.5">
        <span className="font-mono text-[10px] tracking-[0.08em] text-ink/42">
          {String(index + 1).padStart(2, "0")} · {project.year}
        </span>
        <ArrowIcon className="size-3.5 text-ink/50 transition-all group-hover:translate-x-1 group-hover:text-accent" />
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

          <div className="flex flex-col gap-4">
            {group.projects[0] && (
              <FeaturedProject project={group.projects[0]} />
            )}
            {group.projects.length > 1 && (
              <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                {group.projects.slice(1).map((project, i) => (
                  <ProjectPanel key={project.slug} project={project} index={i + 1} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}