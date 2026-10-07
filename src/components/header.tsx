import Link from "next/link";
import { SocialLinks } from "@/components/social-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";

const nav = [
  { href: "/?tab=projects#work", label: "Projects" },
  { href: "/?tab=blog#work", label: "Blog" },
];

export function Header() {
  return (
    <header className="site-header animate-fade-in">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-ink transition-opacity hover:opacity-70"
        >
          {site.name}
        </Link>

        <div className="flex items-center gap-1 sm:gap-4">
          <nav className="mr-1 flex items-center gap-3 text-sm text-ink/70 sm:mr-0 sm:gap-5">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mx-1 hidden h-4 w-px bg-ink/12 sm:mx-0 sm:block" aria-hidden="true" />

          <SocialLinks />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
