import { ResourcePrefetcher } from "@/components/resource-prefetcher";
import { getAllPosts } from "@/lib/posts";
import {
  explorePages,
  landingExplorePages,
  projectGroups,
} from "@/lib/project-groups";

/**
 * Server-side manifest of every route worth warming in the router cache.
 * Rendered once from the root layout; the client prefetcher does the work.
 */
export async function PrefetchManifest() {
  const posts = await getAllPosts();

  const routes = [
    "/home?tab=projects",
    "/home?tab=blog",
    "/projects/latest",
    "/explore/blog",
    "/explore/projects",
    ...explorePages
      .filter((page) => landingExplorePages.includes(page.id))
      .map((page) => `/explore/projects/${page.id}`),
    ...posts.map((post) => `/blog/${post.slug}`),
    ...projectGroups.flatMap((group) =>
      group.projects.map((project) => `/projects/${project.slug}`),
    ),
  ];

  return <ResourcePrefetcher routes={routes} />;
}