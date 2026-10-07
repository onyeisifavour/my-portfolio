import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-ink/8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-5 py-8 text-sm text-ink/55 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© 2026 {site.name}. Built with Next.js & Markdown.</p>
        <div className="flex gap-5">
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            GitHub
          </a>
          <a
            href={site.links.x}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            X
          </a>
          <a
            href={site.links.email}
            className="transition-colors hover:text-ink"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
