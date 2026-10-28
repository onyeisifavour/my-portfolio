import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { BlogCard } from "@/components/blog-card";

export const metadata = {
  title: "Latest writings — Blog",
  description: "Notes, dev logs, and things I'm learning out loud.",
};

export default async function BlogLatestPage() {
  const posts = await getAllPosts();

  // Group posts by category
  const byCategory = posts.reduce<Record<string, typeof posts>>((acc, post) => {
    const category = post.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(post);
    return acc;
  }, {});

  // Sort categories alphabetically
  const categories = Object.keys(byCategory).sort();

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <Link
          href="/?tab=blog#work"
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
          Back
        </Link>

        <header className="mt-10 mb-12 flex flex-col gap-3 sm:mb-16">
          <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
            Blog
          </p>
          <h1 className="font-display text-4xl leading-[0.98] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Latest writings
          </h1>
          <p className="max-w-2xl text-base leading-7 text-ink/65 sm:text-lg sm:leading-8">
            Notes, dev logs, and things I&apos;m learning out loud.
          </p>
        </header>

        <div className="flex flex-col gap-14 sm:gap-18">
          {categories.map((category) => {
            const categoryPosts = byCategory[category];
            const preview = categoryPosts.slice(0, 3);
            const hasMore = categoryPosts.length > 3;

            return (
              <section key={category} className="flex flex-col gap-7 sm:gap-8">
                <header className="flex items-end justify-between gap-4 border-b border-ink/10 pb-4">
                  <div className="flex flex-col gap-1.5">
                    <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                      {category}
                    </h2>
                  </div>
                  <span className="font-mono text-[11px] tracking-[0.12em] text-ink/45 uppercase">
                    {categoryPosts.length} {categoryPosts.length === 1 ? "note" : "notes"}
                  </span>
                </header>

                <div className="grid gap-4 sm:grid-cols-2">
                  {preview.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>

                {hasMore && (
                  <div className="flex justify-center">
                    <Link
                      href={`/explore/blog?category=${encodeURIComponent(category)}`}
                      className="group inline-flex items-center gap-2 border border-ink/16 px-5 py-2.5 font-mono text-[11px] tracking-[0.12em] uppercase text-ink transition-all hover:border-accent/55 hover:bg-accent-soft/45 hover:text-accent"
                    >
                      See all in {category}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="size-3.5 transition-transform group-hover:translate-x-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
