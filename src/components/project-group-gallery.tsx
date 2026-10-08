"use client";

import { useState } from "react";
import type { ProjectGroup } from "@/lib/project-groups";
import { ProjectGroupCard } from "@/components/project-group-card";
import { ProjectGroupDialog } from "@/components/project-group-dialog";

export function ProjectGroupGallery({ groups }: { groups: ProjectGroup[] }) {
  const [activeGroup, setActiveGroup] = useState<ProjectGroup | null>(null);

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
        {groups.map((group) => (
          <ProjectGroupCard
            key={group.id}
            group={group}
            onSelect={(selected) => setActiveGroup(selected)}
          />
        ))}
      </div>
      <ProjectGroupDialog
        group={activeGroup}
        onClose={() => setActiveGroup(null)}
      />
    </>
  );
}