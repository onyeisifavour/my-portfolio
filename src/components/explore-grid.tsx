import type { ExplorePage } from "@/lib/project-groups";
import { landingExplorePages } from "@/lib/project-groups";
import { ExploreCard } from "@/components/explore-card";

export function ExploreGrid({ pages }: { pages: ExplorePage[] }) {
  const cards = pages.filter((page) => landingExplorePages.includes(page.id));

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cards.map((page) => (
        <ExploreCard key={page.id} page={page} />
      ))}
    </div>
  );
}