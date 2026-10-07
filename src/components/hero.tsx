import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-[78vh] w-full max-w-5xl flex-col justify-end px-5 pb-16 pt-24 sm:min-h-[72vh] sm:px-8 sm:pb-20 sm:pt-28">
        <p className="animate-rise font-mono text-xs tracking-[0.22em] text-accent uppercase">
          {site.role}
        </p>
        <h1 className="animate-rise-delay-1 mt-4 font-display text-[clamp(3.4rem,12vw,6.5rem)] leading-[0.92] font-semibold tracking-[-0.04em] text-ink">
          {site.name}
        </h1>
        <p className="animate-rise-delay-2 mt-6 max-w-xl text-lg leading-8 text-ink/70 sm:text-xl sm:leading-9">
          {site.tagline}
        </p>
        <div className="animate-rise-delay-3 mt-10 flex flex-wrap items-center gap-3">
          <a href="#work" className="btn-primary">
            View work
          </a>
          <a
            href={site.links.email}
            className="btn-ghost"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
