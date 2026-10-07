export type Project = {
  title: string;
  description: string;
  stack: string[];
  href: string;
  repo?: string;
  status: "shipped" | "wip" | "archived";
};

export const projects: Project[] = [
  {
    title: "Study Ledger",
    description:
      "A lightweight habit tracker for daily learning — streaks, notes, and weekly reviews without the noise.",
    stack: ["Next.js", "SQLite", "Tailwind"],
    href: "https://example.com/study-ledger",
    repo: "https://github.com",
    status: "shipped",
  },
  {
    title: "Markdown Shelf",
    description:
      "Local-first reading list that turns markdown bookmarks into a searchable shelf of articles.",
    stack: ["TypeScript", "Node", "Fuse.js"],
    href: "https://example.com/markdown-shelf",
    repo: "https://github.com",
    status: "shipped",
  },
  {
    title: "CLI Snippets",
    description:
      "A tiny terminal tool for saving, tagging, and pasting code snippets across projects.",
    stack: ["Rust", "clap"],
    href: "#",
    repo: "https://github.com",
    status: "wip",
  },
];
