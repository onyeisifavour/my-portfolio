import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  getAllPosts,
  getBlogCategoryMeta,
  getBlogGroupById,
  getBlogGroups,
} from "@/lib/posts";
import { getBlogGroupHref } from "@/lib/blog-group-links";
import { BlogGroupCard } from "@/components/blog-group-card";
import { BlogCard } from "@/components/blog-card";

type ExploreBlogSearchParams = {
  group?: string | string[] | undefined;
  category?: string | string[] | undefined;
};

async function ExploreBlogContent({
  searchParams,
}: {
  searchParams: Promise<ExploreBlogSearchParams>;
}) {
  const resolved = await searchParams;
  const groupId =
    typeof resolved.group === "string" ? resolved.group : undefined;
  const categoryFilter =
    typeof resolved.category === "string" ? resolved.category : undefined;

  if (groupId) {
    const group = await getBlogGroupById(groupId);

    if (!group) {
      return (
        <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
          <Link
            href="/explore/blog"
            className="font-mono text-xs tracking-wider text-ink/50 uppercase transition-colors hover:text-accent"
          >
            ← Back to blog groups
          </Link>
          <p className="mt-10 text-ink/60">Group not found.</p>
        </div>
      );
    }

    if (group.id !== groupId) {
      redirect(getBlogGroupHref(group.id));
    }

    return (
      <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <Link
          href="/explore/blog"
          className="font-mono text-xs tracking-wider text-ink/50 uppercase transition-colors hover:text-accent"
        >
          ← Back to blog groups
        </Link>

        <p className="mt-10 font-mono text-xs tracking-[0.2em] text-accent uppercase">
          {group.category}
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
          {group.group}
        </h1>
        <p className="mt-3 max-w-xl text-lg leading-8 text-ink/65">
          {group.summary}
        </p>

        <div className="mt-10 flex items-end justify-between gap-4 border-b border-ink/10 pb-4">
          <h2 className="font-display text-2xl leading-tight tracking-tight text-ink sm:text-3xl">
            All posts
          </h2>
          <span className="shrink-0 font-mono text-[11px] tracking-[0.12em] text-ink/45 uppercase">
            {group.posts.length} {group.posts.length === 1 ? "post" : "posts"}
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {group.posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    );
  }

  if (categoryFilter) {
    const posts = await getAllPosts();
    const categoryPosts = posts.filter(
      (post) => (post.category || "Uncategorized") === categoryFilter,
    );
    const categoryMeta = getBlogCategoryMeta(categoryFilter);

    return (
      <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <Link
          href="/blog/latest"
          className="group inline-flex items-center gap-2 font-mono text-xs tracking-wider text-ink/60 uppercase transition-colors hover:text-accent"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-3.5 transition-transform group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to latest
        </Link>

        <p className="mt-10 font-mono text-xs tracking-[0.2em] text-accent uppercase">
          {categoryFilter}
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
          {categoryMeta.heading}
        </h1>
        <p className="mt-3 max-w-xl text-lg leading-8 text-ink/65">
          {categoryMeta.description}
        </p>

        <div className="mt-10 flex items-end justify-between gap-4 border-b border-ink/10 pb-4">
          <h2 className="font-display text-2xl leading-tight tracking-tight text-ink sm:text-3xl">
            All posts
          </h2>
          <span className="shrink-0 font-mono text-[11px] tracking-[0.12em] text-ink/45 uppercase">
            {categoryPosts.length}{" "}
            {categoryPosts.length === 1 ? "note" : "notes"}
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoryPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    );
  }

  const groups = await getBlogGroups();

  // Group by category
  const byCategory = groups.reduce<Record<string, typeof groups>>((acc, g) => {
    if (!acc[g.category]) acc[g.category] = [];
    acc[g.category].push(g);
    return acc;
  }, {});

  const categories = Object.keys(byCategory).sort();

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <Link
        href="/home?tab=blog#work"
        className="font-mono text-xs tracking-wider text-ink/50 uppercase transition-colors hover:text-accent"
      >
        ← Back
      </Link>

      <h1 className="mt-10 font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
        Blog
      </h1>
      <p className="mt-3 max-w-xl text-lg leading-8 text-ink/65">
        Browse posts grouped by category.
      </p>

      <div className="mt-12 flex flex-col gap-12">
        {categories.map((category) => {
          const categoryMeta = getBlogCategoryMeta(category);
          const categoryGroups = byCategory[category];
          const postCount = categoryGroups.reduce(
            (total, group) => total + group.posts.length,
            0,
          );

          return (
            <section key={category}>
              <header className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-ink/10 pb-4">
                <div className="flex flex-col gap-2">
                  <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
                    {category}
                  </p>
                  <h2 className="font-display text-2xl leading-tight tracking-tight text-ink sm:text-3xl">
                    {categoryMeta.heading}
                  </h2>
                  <p className="max-w-xl text-sm leading-7 text-ink/65">
                    {categoryMeta.description}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[11px] tracking-[0.12em] text-ink/45 uppercase">
                  {postCount} {postCount === 1 ? "note" : "notes"}
                </span>
              </header>

              <div className="grid gap-4 sm:grid-cols-2">
                {categoryGroups.map((group) => (
                  <BlogGroupCard key={group.id} group={group} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default function ExploreBlogPage(
  props: PageProps<"/explore/blog">,
) {
  return (
    <main className="flex-1">
      <Suspense fallback={<div />}>
        <ExploreBlogContent searchParams={props.searchParams} />
      </Suspense>
    </main>
  );
}
