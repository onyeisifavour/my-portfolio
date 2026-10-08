export function generateStaticParams() {
  return [{ slug: "__placeholder__" }];
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;

  return <main className="flex-1" data-project-slug={slug} />;
}