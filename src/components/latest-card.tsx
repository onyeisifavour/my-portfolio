function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-6 shrink-0 text-ink/50 transition-all group-hover:translate-x-1 group-hover:text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function LatestProjectCard() {
  return (
    <a
      href="/explore/projects"
      className="group flex w-full items-center justify-between gap-6 border border-accent/25 bg-accent-soft/25 px-6 py-5 transition-colors hover:border-accent/45 hover:bg-accent-soft/40 sm:px-8 sm:py-6"
    >
      <div className="flex flex-col gap-2">
        <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
          Latest
        </p>
        <h3 className="font-display text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent sm:text-3xl">
          Explore my latest builds
        </h3>
        <p className="text-ink/60">
          See what I&apos;ve been designing, coding, and shipping.
        </p>
      </div>
      <ArrowIcon />
    </a>
  );
}

export function LatestBlogCard() {
  return (
    <a
      href="/explore/blog"
      className="group flex w-full items-center justify-between gap-6 border border-ink/12 bg-paper-deep px-6 py-5 transition-colors hover:border-accent/40 hover:bg-accent-soft/20 sm:px-8 sm:py-6"
    >
      <div className="flex flex-col gap-2">
        <p className="font-mono text-[11px] tracking-[0.18em] text-ink/45 uppercase">
          Newest note
        </p>
        <h3 className="font-display text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent sm:text-3xl">
          Read my latest writing
        </h3>
        <p className="text-ink/60">
          Notes, dev logs, and things I&apos;m learning out loud.
        </p>
      </div>
      <ArrowIcon />
    </a>
  );
}