import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/projects";

export function ProjectList({ projects }: { projects: Project[] }) {
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
