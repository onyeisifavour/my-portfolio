import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ExploreAllGroups } from "@/components/explore-all-groups";

type ExploreSearchParams = {
  page?: string | string[] | undefined;
  open?: string | string[] | undefined;
};

async function ExploreContent({
  searchParams,
}: {
  searchParams: Promise<ExploreSearchParams>;
}) {
  const resolved = await searchParams;
  const pageId =
    typeof resolved.page === "string" ? resolved.page : undefined;

  if (pageId === "latest") {
    redirect("/projects/latest");
  }

  if (pageId) {
    redirect(`/projects/category/${pageId}`);
  }

  const openGroupId =
    typeof resolved.open === "string" ? resolved.open : undefined;

  if (openGroupId) {
    redirect(`/projects/group/${openGroupId}`);
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <Link
        href="/home?tab=projects#work"
        className="font-mono text-xs tracking-wider text-ink/50 uppercase transition-colors hover:text-accent"
      >
        ← Back
      </Link>
      <ExploreAllGroups />
    </div>
  );
}

export default function ExploreProjectsPage(
  props: PageProps<"/explore/projects">
) {
  return (
    <main className="flex-1">
      <Suspense fallback={<div />}>
        <ExploreContent searchParams={props.searchParams} />
      </Suspense>
    </main>
  );
}
