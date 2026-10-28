export type ProjectCardProps = {
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  status?: "shipped" | "wip" | "archived";
  className?: string;
  group?: string;
  year?: string;
};

const statusLabel = {
  shipped: "Shipped",
  wip: "In progress",
  archived: "Archived",
} as const;

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-3.5 text-ink/50 transition-all group-hover:translate-x-1 group-hover:text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ProjectCard({
  title,
  description,
  techStack,
  liveUrl,
  githubUrl,
  status,
  className = "",
  group,
  year,
}: ProjectCardProps) {
  const hasLive = Boolean(liveUrl);
  const hasGithub = Boolean(githubUrl);
  const href = hasLive ? liveUrl : hasGithub ? githubUrl : "#";

  return (
    <a
      href={href}
      target={hasLive || hasGithub ? "_blank" : undefined}
      rel={hasLive || hasGithub ? "noopener noreferrer" : undefined}
      className={`group flex h-full flex-col border border-ink/10 bg-paper/40 transition-all hover:border-accent/45 hover:bg-accent-soft/15 ${className}`.trim()}
    >
      <header className="flex items-start justify-between gap-3 border-b border-ink/10 px-4 py-3.5 sm:px-5">
        <div className="flex min-w-0 flex-col gap-1.5">
          {group && (
            <span className="font-mono text-[10px] tracking-[0.14em] text-accent uppercase">
              {group}
            </span>
          )}
          <h3 className="font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent sm:text-[1.25rem]">
            {title}
          </h3>
        </div>
        {status && (
          <span className="shrink-0 font-mono text-[11px] tracking-wider text-ink/45 uppercase">
            {statusLabel[status]}
          </span>
        )}
      </header>

      <div className="flex flex-1 flex-col gap-4 px-4 py-4 sm:px-5">
        <p className="text-sm leading-[1.65] text-ink/62 sm:text-[14px]">
          {description}
        </p>

        {techStack.length > 0 && (
          <ul className="mt-auto flex flex-wrap items-center gap-1.5" aria-label="Tech stack">
            {techStack.map((tech) => (
              <li
                key={tech}
                className="border border-ink/12 px-2 py-0.5 font-mono text-[9.5px] tracking-[0.06em] uppercase text-ink/60"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer className="mt-auto flex items-center justify-between gap-3 border-t border-ink/10 px-4 py-3 sm:px-5">
        <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink/50">
          {year || ""}
        </span>
        <ArrowIcon />
      </footer>
    </a>
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
