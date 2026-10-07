export type ProjectCardProps = {
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  status?: "shipped" | "wip" | "archived";
  className?: string;
};

const statusLabel = {
  shipped: "Shipped",
  wip: "In progress",
  archived: "Archived",
} as const;

export function ProjectCard({
  title,
  description,
  techStack,
  liveUrl,
  githubUrl,
  status,
  className = "",
}: ProjectCardProps) {
  const hasLive = Boolean(liveUrl);
  const hasGithub = Boolean(githubUrl);

  return (
    <article
      className={`group flex h-full flex-col border border-ink/10 bg-paper/40 p-5 transition-colors hover:border-accent/35 hover:bg-accent-soft/25 sm:p-6 ${className}`.trim()}
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="font-display text-xl tracking-tight text-ink transition-colors group-hover:text-accent sm:text-2xl">
          {title}
        </h3>
        {status && (
          <span className="font-mono text-[11px] tracking-wider text-ink/45 uppercase">
            {statusLabel[status]}
          </span>
        )}
      </div>

      <p className="mt-3 flex-1 text-base leading-7 text-ink/70">{description}</p>

      {techStack.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
          {techStack.map((tech) => (
            <li
              key={tech}
              className="border border-ink/12 bg-ink/[0.03] px-2 py-1 font-mono text-[11px] tracking-wide text-ink/65"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-ink/8 pt-4 text-sm">
        {hasLive && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            Live preview
            <ExternalIcon />
          </a>
        )}
        {hasGithub && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-ink/60 underline decoration-ink/15 underline-offset-4 transition-colors hover:text-ink hover:decoration-accent"
          >
            GitHub
            <GitHubIcon />
          </a>
        )}
        {!hasLive && !hasGithub && (
          <span className="text-ink/40">Coming soon</span>
        )}
      </div>
    </article>
  );
}

function ExternalIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M4 12 12 4M7 4h5v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-3.5"
      fill="currentColor"
    >
      <path d="M8 1C4.13 1 1 4.22 1 8.21c0 3.18 2.01 5.88 4.8 6.83.35.07.48-.16.48-.34 0-.17-.01-.61-.01-1.2-1.95.43-2.36-.96-2.36-.96-.32-.83-.78-1.05-.78-1.05-.64-.45.05-.44.05-.44.7.05 1.07.74 1.07.74.63 1.1 1.64.78 2.04.6.06-.47.24-.78.44-.96-1.56-.18-3.2-.8-3.2-3.56 0-.79.27-1.43.72-1.93-.07-.18-.31-.91.07-1.9 0 0 .59-.19 1.93.74A6.5 6.5 0 0 1 8 4.24c.6 0 1.2.08 1.76.24 1.34-.93 1.93-.74 1.93-.74.38.99.14 1.72.07 1.9.45.5.72 1.14.72 1.93 0 2.77-1.64 3.38-3.21 3.56.25.22.48.66.48 1.34 0 .96-.01 1.74-.01 1.98 0 .18.12.4.48.33A7.05 7.05 0 0 0 15 8.21C15 4.22 11.87 1 8 1Z" />
    </svg>
  );
}
