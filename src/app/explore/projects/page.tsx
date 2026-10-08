import { Suspense } from "react";
import Link from "next/link";
import { SplashScreen } from "@/components/splash-screen";
import { ProjectGroupGallery } from "@/components/project-group-gallery";
import {
  explorePages,
  projectGroups,
  type ExplorePage,
} from "@/lib/project-groups";

type ExploreSearchParams = { page?: string | string[] | undefined };

function getPage(id: string | undefined): ExplorePage | undefined {
  if (!id) return undefined;
  return explorePages.find((page) => page.id === id);
}

async function ExploreContent({
  searchParams,
}: {
  searchParams: Promise<ExploreSearchParams>;
}) {
  const resolved = await searchParams;
  const pageId =
    typeof resolved.page === "string" ? resolved.page : undefined;
  const page = getPage(pageId);

  const groups = page
    ? projectGroups.filter((group) => group.pages.includes(page.id))
    : [];

  return (
    <>
      <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <Link
          href="/#work"
          className="font-mono text-xs tracking-wider text-ink/50 uppercase transition-colors hover:text-accent"
        >
          ← Back
        </Link>

        {page ? (
          <>
            <p className="mt-10 font-mono text-xs tracking-[0.2em] text-accent uppercase">
              {page.name}
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              {page.heading}
            </h1>
            {page.description && (
              <p className="mt-3 max-w-xl text-lg leading-8 text-ink/65">
                {page.description}
              </p>
            )}
            <div className="mt-10">
              <ProjectGroupGallery groups={groups} />
            </div>
          </>
        ) : (
          <>
            <p className="mt-10 font-mono text-xs tracking-[0.2em] text-accent uppercase">
              Explore
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              All explore groups
            </h1>
            <p className="mt-3 max-w-xl text-lg leading-8 text-ink/65">
              This space is coming together — check back soon.
            </p>
          </>
        )}
      </div>
    </>
  );
}

export default function ExploreProjectsPage(
  props: PageProps<"/explore/projects">
) {
  return (
    <SplashScreen kind="projects">
      <main className="flex-1">
        <Suspense fallback={<div />}>
          <ExploreContent searchParams={props.searchParams} />
        </Suspense>
      </main>
    </SplashScreen>
  );
}