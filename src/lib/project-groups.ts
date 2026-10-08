export type ExplorePage = {
  id: string;
  name: string;
  heading: string;
  description: string;
};

export type GroupProjectStatus = "live" | "wip" | "archived";

export type GroupProject = {
  slug: string;
  title: string;
  about: string;
  tags: string[];
  status: GroupProjectStatus;
  year: string;
};

export type ProjectGroup = {
  id: string;
  title: string;
  pages: string[];
  summary?: string;
  projects: GroupProject[];
};

export const explorePages: ExplorePage[] = [
  {
    id: "latest",
    name: "latest",
    heading: "Latest builds",
    description: "The newest things I have designed, coded, and shipped.",
  },
  {
    id: "study",
    name: "study",
    heading: "All study kits and tools.",
    description: "Tools help me study better. They might for you.",
  },
  {
    id: "creatives",
    name: "creatives",
    heading: "Creative playground",
    description: "Design experiments, palettes, and visual systems.",
  },
  {
    id: "gigs",
    name: "gigs",
    heading: "Freelancing gigs",
    description: "Client work — landing pages and portfolios shipped fast.",
  },
  {
    id: "products",
    name: "products",
    heading: "Product work",
    description: "Dashboards and tools built for real users.",
  },
];

export const landingExplorePages = ["study", "creatives", "gigs", "products"];

export const projectGroups: ProjectGroup[] = [
  {
    id: "study-kits",
    title: "Study kits",
    pages: ["study", "latest"],
    summary: "Everything I use to turn messy notes into a focused study loop.",
    projects: [
      {
        slug: "loom-notes",
        title: "Loom Notes",
        about: "Realtime shared notes for remote product teams, with presence cursors and offline replay.",
        tags: ["Next.js", "TypeScript", "Postgres"],
        status: "live",
        year: "2025",
      },
      {
        slug: "flashdeck",
        title: "Flashdeck",
        about: "A spaced-repetition deck builder that keeps review sessions short and sticky.",
        tags: ["React", "IndexedDB"],
        status: "live",
        year: "2025",
      },
      {
        slug: "notion-links",
        title: "Notion Links",
        about: "Turn scattered Notion pages into a navigable knowledge graph.",
        tags: ["Next.js", "Notion API"],
        status: "wip",
        year: "2024",
      },
      {
        slug: "readalong",
        title: "Readalong",
        about: "Margin notes and highlights synced across any device while reading.",
        tags: ["TypeScript", "Local-first"],
        status: "archived",
        year: "2023",
      },
    ],
  },
  {
    id: "anki-suite",
    title: "Anki suite",
    pages: ["study"],
    summary: "Small add-ons and scripts that make daily reviews a little less painful.",
    projects: [
      {
        slug: "review-timer",
        title: "Review Timer",
        about: "A lightweight pomodoro overlay for long flashcard sessions.",
        tags: ["Python", "Anki"],
        status: "live",
        year: "2024",
      },
      {
        slug: "export-notes",
        title: "Export Notes",
        about: "One-click markdown export of your review history and tags.",
        tags: ["Rust", "CLI"],
        status: "live",
        year: "2024",
      },
      {
        slug: "deck-fit",
        title: "Deck Fit",
        about: "Plots overdue card load to help you size daily new-card limits.",
        tags: ["Python", "Matplotlib"],
        status: "wip",
        year: "2024",
      },
      {
        slug: "clip-paste",
        title: "Clip Paste",
        about: "Pastes images from clipboard straight into cloze cards.",
        tags: ["Python", "GTK"],
        status: "archived",
        year: "2023",
      },
    ],
  },
  {
    id: "grid-designs",
    title: "Grid designs",
    pages: ["creatives", "latest"],
    summary: "Modular grid studies — 1px hairlines, deliberate whitespace, and quiet type.",
    projects: [
      {
        slug: "baseline",
        title: "Baseline",
        about: "A type specimen built entirely on an 8px baseline grid.",
        tags: ["CSS", "Figma"],
        status: "live",
        year: "2025",
      },
      {
        slug: "plaid",
        title: "Plaid",
        about: "A tiny design-system starter with token-driven spacing.",
        tags: ["React", "Tailwind"],
        status: "live",
        year: "2025",
      },
      {
        slug: "margins",
        title: "Margins",
        about: "Editorial layouts that let empty space do the talking.",
        tags: ["HTML", "CSS"],
        status: "wip",
        year: "2024",
      },
      {
        slug: "swatches",
        title: "Swatches",
        about: "An interactive palette explorer with a focus on accessible contrast.",
        tags: ["Svelte", "Oklch"],
        status: "archived",
        year: "2023",
      },
    ],
  },
  {
    id: "freelance-landing",
    title: "Freelance landings",
    pages: ["gigs", "latest"],
    summary: "Landing pages and portfolios built for clients under tight deadlines.",
    projects: [
      {
        slug: "atlas-studio",
        title: "Atlas Studio",
        about: "Marketing site for an architecture studio, with a focus on process.",
        tags: ["Next.js", "Sanity"],
        status: "live",
        year: "2025",
      },
      {
        slug: "northwind-sales",
        title: "Northwind",
        about: "Open sales dashboard with a calm dark theme and keyboard-first navigation.",
        tags: ["React", "Tailwind"],
        status: "live",
        year: "2025",
      },
      {
        slug: "harbor-cafe",
        title: "Harbor Café",
        about: "Menu and story page for a neighborhood café, built in a weekend.",
        tags: ["Astro", "MDX"],
        status: "wip",
        year: "2024",
      },
      {
        slug: "pulse-coaching",
        title: "Pulse Coaching",
        about: "A personal brand page with booking flow for a fitness coach.",
        tags: ["Next.js", "Cal"],
        status: "archived",
        year: "2023",
      },
    ],
  },
  {
    id: "product-dashboards",
    title: "Product dashboards",
    pages: ["products", "latest"],
    summary: "Real dashboards for real users — charts, tables, and the boring bits done right.",
    projects: [
      {
        slug: "metrics-hub",
        title: "Metrics Hub",
        about: "A single pane of glass for customer success metrics across tools.",
        tags: ["Next.js", "Postgres", "Recharts"],
        status: "live",
        year: "2025",
      },
      {
        slug: "billing-vista",
        title: "Billing Vista",
        about: "Invoice and revenue dashboards for subscription businesses.",
        tags: ["React", "Stripe"],
        status: "live",
        year: "2024",
      },
      {
        slug: "queue-lens",
        title: "Queue Lens",
        about: "Live monitoring for background job queues with drill-down logs.",
        tags: ["Next.js", "Redis"],
        status: "wip",
        year: "2024",
      },
      {
        slug: "ledger-view",
        title: "Ledger View",
        about: "A double-entry bookkeeping UI that keeps accountants calm.",
        tags: ["Vue", "FastAPI"],
        status: "archived",
        year: "2023",
      },
    ],
  },
];