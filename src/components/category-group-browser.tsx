"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ProjectGroup } from "@/lib/project-groups";
import { ProjectGroupCard } from "@/components/project-group-card";
import { ProjectGroupDialog } from "@/components/project-group-dialog";

const PINNED_INITIAL_ROWS = 3;
const PINNED_MORE_ROWS = 5;
const GRID_COLUMNS = 2;
const ALL_GROUPS_PAGE_SIZE = 4;

function SectionHeader({
  eyebrow,
  title,
  count,
  pinned = false,
}: {
  eyebrow: string;
  title: string;
  count: string;
  pinned?: boolean;
}) {
  return (
    <header
      className={`mb-6 flex items-end justify-between gap-4 border-b pb-4 ${
        pinned ? "border-accent/25" : "border-ink/10"
      }`}
    >
      <div className="flex flex-col gap-1.5">
        <p
          className={`font-mono text-[10px] tracking-[0.18em] uppercase ${
            pinned ? "text-accent" : "text-ink/45"
          }`}
        >
          {eyebrow}
        </p>
        <h2 className="font-display text-2xl leading-tight tracking-tight text-ink sm:text-3xl">
          {title}
        </h2>
      </div>
      <span className="shrink-0 font-mono text-[11px] tracking-[0.12em] text-ink/45 uppercase">
        {count}
      </span>
    </header>
  );
}

function ViewMoreButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-2 border border-ink/16 px-5 py-2.5 font-mono text-[11px] tracking-[0.12em] text-ink uppercase transition-all hover:border-accent/55 hover:bg-accent-soft/45 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-3.5 transition-transform group-hover:translate-y-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </button>
  );
}

export function CategoryGroupBrowser({
  pinnedGroups,
  allGroups,
}: {
  pinnedGroups: ProjectGroup[];
  allGroups: ProjectGroup[];
}) {
  const [activeGroup, setActiveGroup] = useState<ProjectGroup | null>(null);
  const [pinnedRows, setPinnedRows] = useState(PINNED_INITIAL_ROWS);
  const [visibleAllCount, setVisibleAllCount] = useState(ALL_GROUPS_PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const pinnedVisibleCount = pinnedRows * GRID_COLUMNS;
  const visiblePinnedGroups = pinnedGroups.slice(0, pinnedVisibleCount);
  const hasMorePinnedGroups = pinnedGroups.length > pinnedVisibleCount;

  const visibleAllGroups = allGroups.slice(0, visibleAllCount);
  const hasMoreAllGroups = visibleAllCount < allGroups.length;

  function loadMoreAllGroups() {
    setVisibleAllCount((count) =>
      Math.min(count + ALL_GROUPS_PAGE_SIZE, allGroups.length),
    );
  }

  useEffect(() => {
    if (!hasMoreAllGroups) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;

        observer.disconnect();
        setVisibleAllCount((count) =>
          Math.min(count + ALL_GROUPS_PAGE_SIZE, allGroups.length),
        );
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [allGroups.length, hasMoreAllGroups]);

  return (
    <div className="mt-10 flex flex-col gap-12">
      {pinnedGroups.length > 0 && (
        <section>
          <SectionHeader
            eyebrow="Pinned"
            title="Pinned groups"
            count={`${pinnedGroups.length} ${
              pinnedGroups.length === 1 ? "group" : "groups"
            }`}
            pinned
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {visiblePinnedGroups.map((group, index) => (
              <ProjectGroupCard
                key={group.id}
                group={group}
                index={index}
                onSelect={setActiveGroup}
              />
            ))}
          </div>

          {hasMorePinnedGroups && (
            <div className="mt-7 flex justify-center">
              <ViewMoreButton
                onClick={() =>
                  setPinnedRows((rows) => rows + PINNED_MORE_ROWS)
                }
              >
                View more
              </ViewMoreButton>
            </div>
          )}
        </section>
      )}

      <section>
        <SectionHeader
          eyebrow="Groups"
          title="All groups"
          count={`${allGroups.length} ${
            allGroups.length === 1 ? "group" : "groups"
          }`}
        />

        {allGroups.length > 0 ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              {visibleAllGroups.map((group, index) => (
                <ProjectGroupCard
                  key={group.id}
                  group={group}
                  index={index}
                  onSelect={setActiveGroup}
                />
              ))}
            </div>

            {hasMoreAllGroups && (
              <div
                ref={sentinelRef}
                className="mt-7 flex flex-col items-center gap-2.5"
              >
                <ViewMoreButton onClick={loadMoreAllGroups}>
                  Load more groups
                </ViewMoreButton>
                <span className="font-mono text-[9.5px] tracking-[0.16em] text-ink/35 uppercase">
                  Scroll to load more
                </span>
              </div>
            )}
          </>
        ) : (
          <p className="border-y border-ink/10 py-10 text-ink/60">
            Nothing here yet.
          </p>
        )}
      </section>

      <ProjectGroupDialog
        group={activeGroup}
        onClose={() => setActiveGroup(null)}
      />
    </div>
  );
}
