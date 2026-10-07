import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import readingTime from "reading-time";
import remarkGfm from "remark-gfm";
import type { ReactElement } from "react";
import { mdxComponents } from "@/components/mdx-components";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  readingTime: string;
};

export type Post = PostMeta & {
  /** Markdown/MDX body with frontmatter removed */
  content: string;
};

export type CompiledPost = PostMeta & {
  content: ReactElement;
};

function normalizeFrontmatter(
  data: Record<string, unknown>,
  slug: string,
): PostFrontmatter {
  return {
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
  };
}

function toMeta(slug: string, data: Record<string, unknown>, body: string): PostMeta {
  return {
    slug,
    ...normalizeFrontmatter(data, slug),
    readingTime: readingTime(body).text,
  };
}

/**
 * List markdown/MDX filenames under content/posts.
 */
async function getPostFilenames() {
  "use cache";

  try {
    const files = await fs.readdir(postsDirectory);
    return files.filter(
      (file) => file.endsWith(".md") || file.endsWith(".mdx"),
    );
  } catch {
    return [];
  }
}

/**
 * Resolve a post path by slug (prefers .mdx over .md).
 */
async function resolvePostPath(slug: string) {
  for (const ext of [".mdx", ".md"] as const) {
    const fullPath = path.join(postsDirectory, `${slug}${ext}`);
    try {
      await fs.access(fullPath);
      return fullPath;
    } catch {
      // try next extension
    }
  }
  return null;
}

/**
 * Parse a raw markdown/MDX string with gray-matter.
 */
export function parsePostSource(slug: string, raw: string): Post {
  const { data, content } = matter(raw);
  return {
    ...toMeta(slug, data, content),
    content,
  };
}

/**
 * Slugs used by generateStaticParams for /blog/[slug].
 */
export async function getPostSlugs() {
  const files = await getPostFilenames();
  return files.map((file) => file.replace(/\.mdx?$/, ""));
}

/**
 * All posts for the blog feed (frontmatter only, newest first).
 */
export async function getAllPosts(): Promise<PostMeta[]> {
  "use cache";

  const files = await getPostFilenames();
  const posts = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(/\.mdx?$/, "");
      const raw = await fs.readFile(path.join(postsDirectory, filename), "utf8");
      const { data, content } = matter(raw);
      return toMeta(slug, data, content);
    }),
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/**
 * Read and parse a single post with gray-matter (raw MDX body included).
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  "use cache";

  const fullPath = await resolvePostPath(slug);
  if (!fullPath) return null;

  const raw = await fs.readFile(fullPath, "utf8");
  return parsePostSource(slug, raw);
}

/**
 * Compile a post body with next-mdx-remote for rendering on /blog/[slug].
 */
export async function compilePostContent(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return content;
}

/**
 * Full pipeline: gray-matter parse + next-mdx-remote compile for a slug.
 * Powers the dynamic /blog/[slug] route.
 */
export async function getCompiledPost(
  slug: string,
): Promise<CompiledPost | null> {
  const post = await getPostBySlug(slug);
  if (!post) return null;

  const content = await compilePostContent(post.content);

  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    readingTime: post.readingTime,
    content,
  };
}
