import Link from "next/link";
import { SplashScreen } from "@/components/splash-screen";

export default function ExploreBlogPage() {
  return (
    <SplashScreen kind="blog">
      <main className="flex-1">
        <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
          <Link
            href="/#work"
            className="font-mono text-xs tracking-wider text-ink/50 uppercase transition-colors hover:text-accent"
          >
            ← Back
          </Link>
          <p className="mt-10 font-mono text-xs tracking-[0.2em] text-accent uppercase">
            Latest writings
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
            Reading my latest posts
          </h1>
          <p className="mt-3 max-w-xl text-lg leading-8 text-ink/65">
            This space is coming together — check back soon.
          </p>
        </div>
      </main>
    </SplashScreen>
  );
}