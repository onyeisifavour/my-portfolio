import Link from "next/link";

export function generateStaticParams() {
  return [{ slug: "__placeholder__" }];
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <Link
          href="/?tab=projects#work"
          className="font-mono text-xs tracking-wider text-ink/50 uppercase transition-colors hover:text-accent"
        >
          ← Projects
        </Link>
        <h1 className="mt-10 font-mono text-xs tracking-[0.2em] text-ink/45 uppercase">
          /projects/{slug}
        </h1>
        <p className="mt-4 font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
          Project page coming soon.
        </p>
      </div>
    </main>
  );
}