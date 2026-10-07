import { Suspense } from "react";
import { ContentTabs } from "@/components/content-tabs";
import { Hero } from "@/components/hero";
import { getAllPosts } from "@/lib/posts";
import { projects } from "@/lib/projects";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="flex-1">
      <Hero />
      <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <Suspense
          fallback={
            <div className="border-y border-ink/10 py-10 text-ink/50">
              Loading…
            </div>
          }
        >
          <ContentTabs projects={projects} posts={posts} />
        </Suspense>
      </div>
    </main>
  );
}
