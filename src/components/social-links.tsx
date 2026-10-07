import { site } from "@/lib/site";

const links = [
  {
    href: site.links.github,
    label: "GitHub",
    external: true,
    icon: GitHubIcon,
  },
  {
    href: site.links.x,
    label: "X",
    external: true,
    icon: XIcon,
  },
  {
    href: site.links.email,
    label: "Email",
    external: false,
    icon: EmailIcon,
  },
] as const;

export function SocialLinks({
  className = "",
  iconOnly = false,
}: {
  className?: string;
  iconOnly?: boolean;
}) {
  return (
    <ul className={`flex items-center gap-1 ${className}`.trim()}>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <li key={link.label}>
            <a
              href={link.href}
              aria-label={link.label}
              title={link.label}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="inline-flex size-9 items-center justify-center rounded-sm text-ink/65 transition-colors hover:bg-ink/6 hover:text-ink"
            >
              <Icon />
              {!iconOnly && <span className="sr-only">{link.label}</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-[18px]"
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .26.18.59.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-[16px]"
      fill="currentColor"
    >
      <path d="M18.9 2H22l-7.7 8.8L23 22h-6.5l-5.1-6.7L5.7 22H2.6l8.2-9.4L1 2h6.7l4.6 6.1L18.9 2Zm-1.1 18h1.8L6.3 3.9H4.4L17.8 20Z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}
