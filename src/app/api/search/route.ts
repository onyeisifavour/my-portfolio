import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";
import { projectGroups } from "@/lib/project-groups";

export async function GET() {
  const posts = await getAllPosts();

  return NextResponse.json({
    posts: posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      tags: post.tags,
      date: post.date,
    })),
    groups: projectGroups.map((group) => ({
      id: group.id,
      title: group.title,
      pages: group.pages,
      summary: group.summary ?? "",
      projects: group.projects.map((project) => ({
        slug: project.slug,
        title: project.title,
        about: project.about,
        tags: project.tags,
        status: project.status,
        year: project.year,
      })),
    })),
  });
}