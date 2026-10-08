"use client";

import { useState } from "react";
import type { ProjectGroup } from "@/lib/project-groups";
import { ProjectGroupCard } from "@/components/project-group-card";
import { ProjectGroupDialog } from "@/components/project-group-dialog";

export function ProjectGroupGallery({
  groups,
  openGroupId,
}: {
  groups: ProjectGroup[];
  openGroupId?: string;
}) {
  const [activeGroup, setActiveGroup] = useState<ProjectGroup | null>(
    () => groups.find((group) => group.id === openGroupId) ?? null,
  );

  if (groups.length === 0) {
    return (
      <p className="border-y border-ink/10 py-10 text-ink/60">
        Nothing here yet.
      </p>
    );
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {groups.map((group, i) => (
          <ProjectGroupCard
            key={group.id}
            group={group}
            index={i}
            onSelect={(selected) => setActiveGroup(selected)}
          />
        ))}
      </div>
      <ProjectGroupDialog
        key={activeGroup?.id ?? "closed"}
        group={activeGroup}
        onClose={() => setActiveGroup(null)}
      />
    </>
  );
}