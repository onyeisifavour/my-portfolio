export type ProjectCardProps = {
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  status?: "shipped" | "wip" | "archived" | "live";
  className?: string;
  group?: string;
  year?: string;
  slug?: string;
  href?: string;
};

const statusLabel = {
  shipped: "Shipped",
  live: "Live",
  wip: "In progress",
  archived: "Archived",
} as const;

const statusStyles = {
  shipped: "border-accent/42 bg-accent-soft/45 text-accent",
  live: "border-accent/42 bg-accent-soft/45 text-accent",
  wip: "border-ink/20 bg-ink/[0.06] text-ink/70",
  archived: "border-ink/15 bg-ink/[0.04] text-ink/60",
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
  slug,
  href: hrefProp,
}: ProjectCardProps) {
  const hasLive = Boolean(liveUrl);
  const hasGithub = Boolean(githubUrl);
  const href = hrefProp || (slug ? `/projects/project-page/${slug}` : hasLive && liveUrl ? liveUrl : hasGithub && githubUrl ? githubUrl : "#");
  const isExternal = href.startsWith("http");

  const normalizedStatus = status === "shipped" ? "live" : status;

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
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
        {normalizedStatus && (
          <span
            className={`grid shrink-0 place-items-center border px-2 py-0.5 font-mono text-[9.5px] tracking-[0.1em] uppercase ${statusStyles[normalizedStatus as keyof typeof statusStyles]}`}
          >
            {statusLabel[normalizedStatus as keyof typeof statusLabel]}
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
