import { notFound, redirect } from "next/navigation";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/project-groups";

export function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  if (slugs.length === 0) return [{ slug: "__placeholder__" }];
  return slugs.map((slug) => ({ slug }));
}

export default async function LegacyProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getProjectBySlug(slug)) notFound();

  redirect(`/projects/project-page/${slug}`);
}
