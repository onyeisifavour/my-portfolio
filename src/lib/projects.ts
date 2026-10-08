export type Project = {
  title: string;
  description: string;
  stack: string[];
  href: string;
  repo?: string;
  status: "shipped" | "wip" | "archived";
};

export const projects: Project[] = [];
