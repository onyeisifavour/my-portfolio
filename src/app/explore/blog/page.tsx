import { Suspense } from "react";
import Link from "next/link";
import { getBlogGroupById, getBlogGroups } from "@/lib/posts";
import { BlogGroupCard } from "@/components/blog-group-card";
import { BlogCard } from "@/components/blog-card";

type ExploreBlogSearchParams = {
  group?: string | string[] | undefined;
};

async function ExploreBlogContent({
  searchParams,
}: {
  searchParams: Promise<ExploreBlogSearchParams>;
}) {
  const resolved = await searchParams;
  const groupId =
    typeof resolved.group === "string" ? resolved.group : undefined;

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
          {group.posts.length} {group.posts.length === 1 ? "post" : "posts"}
        </p>

        <div className="mt-10 grid gap-4 border-y border-ink/10 py-6 sm:grid-cols-2">
          {group.posts.map((post) => (
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
        href="/?tab=blog#work"
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
        {categories.map((category) => (
          <section key={category}>
            <header className="mb-6 flex items-end justify-between gap-4">
              <div className="flex flex-col gap-2">
                <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
                  {category}
                </p>
                <h2 className="font-display text-2xl leading-tight tracking-tight text-ink sm:text-3xl">
                  {category}
                </h2>
              </div>
            </header>

            <div className="grid gap-4 sm:grid-cols-2">
              {byCategory[category].map((group) => (
                <BlogGroupCard key={group.id} group={group} />
              ))}
            </div>
          </section>
        ))}
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
