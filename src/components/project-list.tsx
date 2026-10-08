import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/projects";

export function ProjectList({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <p className="border-y border-ink/10 py-10 text-ink/60">
        No projects yet. Add entries to{" "}
        <code className="rounded bg-ink/6 px-1.5 py-0.5 font-mono text-sm">
          src/lib/projects
        </code>
        .
      </p>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {projects.map((project) => (
        <li key={project.title} className="min-h-full">
          <ProjectCard
            title={project.title}
            description={project.description}
            techStack={project.stack}
            liveUrl={project.href !== "#" ? project.href : undefined}
            githubUrl={project.repo}
            status={project.status}
            className="h-full"
          />
        </li>
      ))}
    </ul>
  );
}
