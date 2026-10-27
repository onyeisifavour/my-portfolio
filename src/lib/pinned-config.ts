// Server-side curated pins visible to all visitors
// Set to true to pin items/groups to the top of the Latest page

export type PinnedConfig = {
  projectGroups: string[]; // project group IDs
  projects: string[]; // project slugs
  blogGroups: string[]; // "category::group" keys
  blogs: string[]; // blog slugs
};

export const pinnedConfig: PinnedConfig = {
  projectGroups: [],
  projects: [],
  blogGroups: [],
  blogs: [],
};
