import type { ComponentPropsWithoutRef, ReactNode } from "react";

type MDXProps = {
  children?: ReactNode;
  className?: string;
};

function Anchor(props: ComponentPropsWithoutRef<"a">) {
  return (
    <a
      {...props}
      className="font-medium text-accent underline decoration-accent/40 underline-offset-3 transition-colors hover:decoration-accent"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
    />
  );
}

export const mdxComponents = {
  h1: (props: MDXProps) => (
    <h1
      className="mt-10 mb-4 font-display text-3xl tracking-tight text-ink"
      {...props}
    />
  ),
  h2: (props: MDXProps) => (
    <h2
      className="mt-10 mb-3 font-display text-2xl tracking-tight text-ink"
      {...props}
    />
  ),
  h3: (props: MDXProps) => (
    <h3
      className="mt-8 mb-2 font-display text-xl tracking-tight text-ink"
      {...props}
    />
  ),
  p: (props: MDXProps) => (
    <p className="mb-5 text-[1.05rem] leading-8 text-ink/85" {...props} />
  ),
  ul: (props: MDXProps) => (
    <ul className="mb-5 list-disc space-y-2 pl-6 text-ink/85" {...props} />
  ),
  ol: (props: MDXProps) => (
    <ol className="mb-5 list-decimal space-y-2 pl-6 text-ink/85" {...props} />
  ),
  li: (props: MDXProps) => <li className="leading-7" {...props} />,
  a: Anchor,
  blockquote: (props: MDXProps) => (
    <blockquote
      className="my-6 border-l-2 border-accent pl-4 text-ink/70 italic"
      {...props}
    />
  ),
  code: (props: MDXProps) => (
    <code
      className="rounded bg-ink/6 px-1.5 py-0.5 font-mono text-[0.9em] text-ink"
      {...props}
    />
  ),
  pre: (props: MDXProps) => (
    <pre
      className="mb-6 overflow-x-auto rounded-lg bg-ink px-4 py-4 font-mono text-sm leading-6 text-paper [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-ink/10" />,
  strong: (props: MDXProps) => (
    <strong className="font-semibold text-ink" {...props} />
  ),
};
