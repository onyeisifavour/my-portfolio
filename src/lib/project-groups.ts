export type ExplorePage = {
  id: string;
  name: string;
  heading: string;
  description: string;
  pageDescription?: string;
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
    pageDescription:
      "A growing set of tools for capturing notes, planning sessions, and making recall stick.",
  },
  {
    id: "creatives",
    name: "creatives",
    heading: "Creative playground",
    description: "My fanciest ideas are here.",
    pageDescription:
      "Visual studies in type, colour, motion, and layout — the ideas I test before they ship.",
  },
  {
    id: "gigs",
    name: "gigs",
    heading: "Freelancing gigs",
    description: "Things I built for real.",
    pageDescription:
      "Client projects built end to end: landing pages, portfolios, and booking flows.",
  },
  {
    id: "products",
    name: "products",
    heading: "Product work",
    description: "From concept to polished product.",
    pageDescription:
      "Dashboards and internal tools shaped around the questions teams ask every day.",
  },
];

export const landingExplorePages = ["study", "creatives", "gigs", "products"];

export const projectGroups: ProjectGroup[] = [
  // Study
  {
    id: "study-kits",
    title: "Study kits",
    pages: ["study"],
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
    id: "study-sprints",
    title: "Study sprints",
    pages: ["study"],
    summary: "Short, timed study sprints with a clear start and finish.",
    projects: [
      {
        slug: "sprint-plan",
        title: "Sprint Plan",
        about: "Plan the next focused session in under a minute.",
        tags: ["Svelte", "Local-first"],
        status: "live",
        year: "2026",
      },
      {
        slug: "focus-timer",
        title: "Focus Timer",
        about: "A distraction-free timer that logs every completed sprint.",
        tags: ["React", "IndexedDB"],
        status: "wip",
        year: "2026",
      },
      {
        slug: "review-log",
        title: "Review Log",
        about: "A lightweight history of what you studied and when.",
        tags: ["TypeScript", "SQLite"],
        status: "live",
        year: "2026",
      },
    ],
  },
  {
    id: "recall-drills",
    title: "Recall drills",
    pages: ["study"],
    summary: "Quick recall drills built around active retrieval.",
    projects: [
      {
        slug: "drill-deck",
        title: "Drill Deck",
        about: "Randomised question decks that adapt to your weak spots.",
        tags: ["Next.js", "Postgres"],
        status: "live",
        year: "2026",
      },
      {
        slug: "recall-map",
        title: "Recall Map",
        about: "A visual map of the topics you have actually retained.",
        tags: ["React", "D3"],
        status: "wip",
        year: "2026",
      },
    ],
  },
  {
    id: "quiz-lab",
    title: "Quiz lab",
    pages: ["study"],
    summary: "Generate, edit, and practice custom quizzes.",
    projects: [
      {
        slug: "quiz-builder",
        title: "Quiz Builder",
        about: "Build and practice with custom quizzes.",
        tags: ["Next.js", "TypeScript"],
        status: "wip",
        year: "2026",
      },
    ],
  },
  {
    id: "note-tools",
    title: "Note tools",
    pages: ["study"],
    summary: "Small utilities for capturing, linking, and exporting notes.",
    projects: [
      {
        slug: "note-sync",
        title: "Note Sync",
        about: "Sync notes across devices seamlessly.",
        tags: ["Rust", "CLI"],
        status: "live",
        year: "2026",
      },
      {
        slug: "note-graph",
        title: "Note Graph",
        about: "See how your notes connect without opening a heavy app.",
        tags: ["TypeScript", "D3"],
        status: "live",
        year: "2026",
      },
      {
        slug: "note-export",
        title: "Note Export",
        about: "Export any note set to markdown, PDF, or plain text.",
        tags: ["Node", "CLI"],
        status: "wip",
        year: "2026",
      },
      {
        slug: "note-search",
        title: "Note Search",
        about: "Instant fuzzy search across every note you have written.",
        tags: ["Rust", "SQLite"],
        status: "live",
        year: "2026",
      },
    ],
  },

  // Creatives
  {
    id: "grid-designs",
    title: "Grid designs",
    pages: ["creatives"],
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
    id: "palette-lab",
    title: "Palette lab",
    pages: ["creatives"],
    summary: "Colour experiments, contrast checks, and palette exploration.",
    projects: [
      {
        slug: "color-lab",
        title: "Color Lab",
        about: "Color palette exploration.",
        tags: ["Figma", "CSS"],
        status: "wip",
        year: "2026",
      },
    ],
  },
  {
    id: "type-studies",
    title: "Type studies",
    pages: ["creatives"],
    summary: "Type scales and specimen pages built to test rhythm.",
    projects: [
      {
        slug: "type-scale",
        title: "Type Scale",
        about: "A responsive type scale you can audit at a glance.",
        tags: ["CSS", "HTML"],
        status: "live",
        year: "2026",
      },
      {
        slug: "type-specimen",
        title: "Type Specimen",
        about: "A specimen page that shows a face under real layout pressure.",
        tags: ["Astro", "CSS"],
        status: "wip",
        year: "2026",
      },
    ],
  },
  {
    id: "motion-sketches",
    title: "Motion sketches",
    pages: ["creatives"],
    summary: "Small motion studies for easing, grids, and scroll.",
    projects: [
      {
        slug: "easing-lab",
        title: "Easing Lab",
        about: "Compare easing curves side by side in the browser.",
        tags: ["JS", "CSS"],
        status: "live",
        year: "2026",
      },
      {
        slug: "motion-grid",
        title: "Motion Grid",
        about: "A grid that reflows with deliberate, readable motion.",
        tags: ["React", "Framer Motion"],
        status: "wip",
        year: "2026",
      },
      {
        slug: "scroll-study",
        title: "Scroll Study",
        about: "Scroll-linked effects without the jank.",
        tags: ["CSS", "JS"],
        status: "live",
        year: "2026",
      },
    ],
  },
  {
    id: "layout-experiments",
    title: "Layout experiments",
    pages: ["creatives"],
    summary: "Editorial and product layouts pushed into unusual shapes.",
    projects: [
      {
        slug: "editorial-grid",
        title: "Editorial Grid",
        about: "A magazine grid that survives long headlines.",
        tags: ["CSS", "HTML"],
        status: "live",
        year: "2026",
      },
      {
        slug: "card-stack",
        title: "Card Stack",
        about: "Stacked cards with clear depth and no visual noise.",
        tags: ["React", "Tailwind"],
        status: "wip",
        year: "2026",
      },
      {
        slug: "split-view",
        title: "Split View",
        about: "A two-pane reading layout for dense content.",
        tags: ["Next.js", "CSS"],
        status: "live",
        year: "2026",
      },
      {
        slug: "whitespace-study",
        title: "Whitespace Study",
        about: "How much empty space a layout can carry before it floats.",
        tags: ["Figma", "CSS"],
        status: "archived",
        year: "2026",
      },
    ],
  },
  {
    id: "texture-sets",
    title: "Texture sets",
    pages: ["creatives"],
    summary: "Border, grain, and pattern sets for quiet interfaces.",
    projects: [
      {
        slug: "grain-set",
        title: "Grain Set",
        about: "Subtle film grain that survives compression.",
        tags: ["CSS", "SVG"],
        status: "live",
        year: "2026",
      },
      {
        slug: "noise-set",
        title: "Noise Set",
        about: "Procedural noise patterns for empty states.",
        tags: ["Canvas", "JS"],
        status: "wip",
        year: "2026",
      },
      {
        slug: "border-set",
        title: "Border Set",
        about: "Hairline border recipes for dense layouts.",
        tags: ["CSS", "Tailwind"],
        status: "live",
        year: "2026",
      },
      {
        slug: "pattern-set",
        title: "Pattern Set",
        about: "A small library of repeatable background patterns.",
        tags: ["SVG", "CSS"],
        status: "archived",
        year: "2026",
      },
    ],
  },

  // Gigs
  {
    id: "freelance-landing",
    title: "Freelance landings",
    pages: ["gigs"],
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
    id: "cafe-weekend",
    title: "Café weekend",
    pages: ["gigs"],
    summary: "A fast one-page build for a local café.",
    projects: [
      {
        slug: "cafe-menu",
        title: "Café Menu",
        about: "A mobile-first menu page that loads in under a second.",
        tags: ["Astro", "CSS"],
        status: "live",
        year: "2026",
      },
    ],
  },
  {
    id: "brand-sprints",
    title: "Brand sprints",
    pages: ["gigs"],
    summary: "Short brand sprints for small teams and solo founders.",
    projects: [
      {
        slug: "brand-kit",
        title: "Brand Kit",
        about: "A compact brand kit with type, colour, and usage rules.",
        tags: ["Figma", "CSS"],
        status: "live",
        year: "2026",
      },
      {
        slug: "logo-grid",
        title: "Logo Grid",
        about: "Logo variations laid out on a single reviewable grid.",
        tags: ["Figma", "SVG"],
        status: "wip",
        year: "2026",
      },
    ],
  },
  {
    id: "launch-pages",
    title: "Launch pages",
    pages: ["gigs"],
    summary: "Launch pages for products, courses, and events.",
    projects: [
      {
        slug: "launch-saas",
        title: "Launch SaaS",
        about: "A product launch page with pricing and social proof.",
        tags: ["Next.js", "Tailwind"],
        status: "live",
        year: "2026",
      },
      {
        slug: "launch-course",
        title: "Launch Course",
        about: "A course landing page built around a single clear promise.",
        tags: ["Astro", "MDX"],
        status: "live",
        year: "2026",
      },
      {
        slug: "launch-event",
        title: "Launch Event",
        about: "An event page with schedule, speakers, and registration.",
        tags: ["React", "Vite"],
        status: "wip",
        year: "2026",
      },
    ],
  },
  {
    id: "studio-sites",
    title: "Studio sites",
    pages: ["gigs"],
    summary: "Portfolio sites for studios that need the work to speak first.",
    projects: [
      {
        slug: "studio-arch",
        title: "Studio Arch",
        about: "A quiet portfolio for an architecture practice.",
        tags: ["Next.js", "Sanity"],
        status: "live",
        year: "2026",
      },
      {
        slug: "studio-photo",
        title: "Studio Photo",
        about: "A full-bleed photography portfolio with fast image loading.",
        tags: ["Astro", "Sharp"],
        status: "live",
        year: "2026",
      },
      {
        slug: "studio-design",
        title: "Studio Design",
        about: "Case-study-first site for a product design studio.",
        tags: ["Next.js", "MDX"],
        status: "wip",
        year: "2026",
      },
      {
        slug: "studio-film",
        title: "Studio Film",
        about: "A reel-led site with lazy-loaded video previews.",
        tags: ["React", "Mux"],
        status: "archived",
        year: "2026",
      },
    ],
  },
  {
    id: "booking-flows",
    title: "Booking flows",
    pages: ["gigs"],
    summary: "Booking pages that get out of the way.",
    projects: [
      {
        slug: "booking-coach",
        title: "Booking Coach",
        about: "A one-screen booking flow for a coaching practice.",
        tags: ["Next.js", "Cal"],
        status: "live",
        year: "2026",
      },
      {
        slug: "booking-clinic",
        title: "Booking Clinic",
        about: "Appointment booking with intake forms for a clinic.",
        tags: ["React", "Supabase"],
        status: "live",
        year: "2026",
      },
      {
        slug: "booking-studio",
        title: "Booking Studio",
        about: "Room and equipment booking for a creative studio.",
        tags: ["Next.js", "Postgres"],
        status: "wip",
        year: "2026",
      },
      {
        slug: "booking-salon",
        title: "Booking Salon",
        about: "A mobile booking flow for a neighbourhood salon.",
        tags: ["Vue", "Tailwind"],
        status: "live",
        year: "2026",
      },
    ],
  },

  // Products
  {
    id: "product-dashboards",
    title: "Product dashboards",
    pages: ["products"],
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
  {
    id: "api-console",
    title: "API console",
    pages: ["products"],
    summary: "A small console for exploring and testing internal APIs.",
    projects: [
      {
        slug: "api-tool",
        title: "API Tool",
        about: "API testing utility.",
        tags: ["TypeScript", "Node"],
        status: "live",
        year: "2026",
      },
    ],
  },
  {
    id: "billing-tools",
    title: "Billing tools",
    pages: ["products"],
    summary: "Invoices, revenue splits, and the maths behind them.",
    projects: [
      {
        slug: "invoice-flow",
        title: "Invoice Flow",
        about: "Create, send, and track invoices without spreadsheets.",
        tags: ["Next.js", "Stripe"],
        status: "live",
        year: "2026",
      },
      {
        slug: "revenue-split",
        title: "Revenue Split",
        about: "Split revenue across collaborators with a clear audit trail.",
        tags: ["React", "Postgres"],
        status: "wip",
        year: "2026",
      },
    ],
  },
  {
    id: "queue-ops",
    title: "Queue ops",
    pages: ["products"],
    summary: "Tools for seeing, tracing, and retrying background jobs.",
    projects: [
      {
        slug: "queue-board",
        title: "Queue Board",
        about: "A live board of every queue and its current depth.",
        tags: ["Next.js", "Redis"],
        status: "live",
        year: "2026",
      },
      {
        slug: "job-trace",
        title: "Job Trace",
        about: "Follow a single job across workers and retries.",
        tags: ["Go", "OpenTelemetry"],
        status: "wip",
        year: "2026",
      },
      {
        slug: "retry-console",
        title: "Retry Console",
        about: "Retry failed jobs in bulk with guardrails.",
        tags: ["React", "Node"],
        status: "live",
        year: "2026",
      },
    ],
  },
  {
    id: "metrics-apps",
    title: "Metrics apps",
    pages: ["products"],
    summary: "Focused apps for the numbers teams check every morning.",
    projects: [
      {
        slug: "metric-cards",
        title: "Metric Cards",
        about: "A compact wall of the metrics that actually matter.",
        tags: ["Next.js", "Recharts"],
        status: "live",
        year: "2026",
      },
      {
        slug: "cohort-view",
        title: "Cohort View",
        about: "Cohort retention without a BI tool.",
        tags: ["React", "DuckDB"],
        status: "live",
        year: "2026",
      },
      {
        slug: "funnel-view",
        title: "Funnel View",
        about: "See exactly where users drop out of a flow.",
        tags: ["Next.js", "Postgres"],
        status: "wip",
        year: "2026",
      },
      {
        slug: "retention-view",
        title: "Retention View",
        about: "A simple retention dashboard for small teams.",
        tags: ["Svelte", "SQLite"],
        status: "live",
        year: "2026",
      },
    ],
  },
  {
    id: "internal-tools",
    title: "Internal tools",
    pages: ["products"],
    summary: "Admin panels and utilities that keep operations moving.",
    projects: [
      {
        slug: "admin-panel",
        title: "Admin Panel",
        about: "A typed admin panel generated from the database schema.",
        tags: ["Next.js", "Drizzle"],
        status: "live",
        year: "2026",
      },
      {
        slug: "role-manager",
        title: "Role Manager",
        about: "Manage roles and permissions without breaking access.",
        tags: ["React", "Postgres"],
        status: "live",
        year: "2026",
      },
      {
        slug: "audit-log",
        title: "Audit Log",
        about: "A readable audit trail for every sensitive action.",
        tags: ["TypeScript", "Postgres"],
        status: "wip",
        year: "2026",
      },
      {
        slug: "feature-flags",
        title: "Feature Flags",
        about: "Ship behind flags with a small, safe rollout UI.",
        tags: ["Next.js", "Redis"],
        status: "archived",
        year: "2026",
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  for (const group of projectGroups) {
    const project = group.projects.find((p) => p.slug === slug);
    if (project) {
      return { project, group };
    }
  }
  return null;
}

export function getProjectGroupById(id: string) {
  return projectGroups.find((group) => group.id === id) ?? null;
}

export function getAllProjectGroupIds() {
  return projectGroups.map((group) => group.id);
}

export function getProjectGroupsForCategory(categoryId: string) {
  return projectGroups.filter((group) => group.pages.includes(categoryId));
}

export function getAllProjectSlugs() {
  const slugs = new Set<string>();
  for (const group of projectGroups) {
    for (const project of group.projects) {
      slugs.add(project.slug);
    }
  }
  return Array.from(slugs);
}

export function getExplorePageForGroup(group: ProjectGroup) {
  // Return the first non-latest page for the group
  for (const pageId of group.pages) {
    if (pageId !== "latest") {
      return explorePages.find((p) => p.id === pageId);
    }
  }
  return explorePages.find((p) => p.id === group.pages[0]);
}

export function getRecentProjects(limit = 8) {
  const projects: Array<{ project: GroupProject; group: ProjectGroup }> = [];
  // Collect all projects with group context
  for (const group of projectGroups) {
    for (const project of group.projects) {
      projects.push({ project, group });
    }
  }
  // Sort by year desc as proxy for recency
  projects.sort((a, b) => b.project.year.localeCompare(a.project.year));
  return projects.slice(0, limit);
}

export function getAllProjectsWithGroups() {
  const projects: Array<{ project: GroupProject; group: ProjectGroup }> = [];
  for (const group of projectGroups) {
    for (const project of group.projects) {
      projects.push({ project, group });
    }
  }
  return projects;
}
