import Link from "next/link";
import { notFound } from "next/navigation";
import { getCompiledPost, getPostBySlug, getPostSlugs } from "@/lib/posts";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

function formatDate(date: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getCompiledPost(slug);

  if (!post) notFound();

  return (
    <main className="flex-1">
      <article className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <Link
          href="/?tab=blog#work"
          className="font-mono text-xs tracking-wider text-ink/50 uppercase transition-colors hover:text-accent"
        >
          ← Blog
        </Link>

        <header className="mt-8 border-b border-ink/10 pb-8">
          <p className="font-mono text-xs tracking-wider text-ink/45">
            {formatDate(post.date)} · {post.readingTime}
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-4 text-lg leading-8 text-ink/65">
              {post.description}
            </p>
          )}
          {post.tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="font-mono text-[11px] tracking-wider text-accent uppercase"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        <div className="prose-custom mt-10">{post.content}</div>
      </article>
    </main>
  );
}
