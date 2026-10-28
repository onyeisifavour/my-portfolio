export type SearchSection = "posts" | "groups" | "projects";

export type SearchScope = {
  key: string;
  label: string;
  sections: SearchSection[];
  category?: string;
  projectGroupId?: string;
  projectSlug?: string;
  blogGroupId?: string;
  blogCategory?: string;
  postSlug?: string;
};

type SearchParams = {
  get(name: string): string | null;
};

function param(searchParams: SearchParams, key: string): string | undefined {
  const value = searchParams.get(key);
  return value || undefined;
}

/**
 * Resolve which slice of the search index should be searched for a given route.
 *
 * The scope is deliberately route-derived so every page gets the right context
 * without having to register its content with the search component.
 */
export function resolveSearchScope(
  pathname: string,
  searchParams: SearchParams,
): SearchScope {
  const path = pathname !== "/" ? pathname.replace(/\/+$/, "") : pathname;
  const segments = path.split("/").filter(Boolean);

  if (path === "/" || path === "/home") {
    if (searchParams.get("tab") === "blog") {
      return {
        key: "home-blog",
        label: "blog posts",
        sections: ["posts"],
      };
    }

    return {
      key: "home-projects",
      label: "projects and groups",
      sections: ["groups", "projects"],
    };
  }

  if (path === "/latest") {
    return {
      key: "latest",
      label: "latest work",
      sections: ["posts", "groups", "projects"],
    };
  }

  if (segments[0] === "projects") {
    if (segments[1] === "latest") {
      return {
        key: "projects-latest",
        label: "latest projects",
        sections: ["groups", "projects"],
      };
    }

    if (segments[1] === "category" && segments[2]) {
      return {
        key: `project-category:${segments[2]}`,
        label: `${segments[2]} projects`,
        sections: ["groups", "projects"],
        category: segments[2],
      };
    }

    if (segments[1] === "group" && segments[2]) {
      return {
        key: `project-group:${segments[2]}`,
        label: "this project group",
        sections: ["projects"],
        projectGroupId: segments[2],
      };
    }

    if (segments[1] === "project-page" && segments[2]) {
      return {
        key: `project:${segments[2]}`,
        label: "this project group",
        sections: ["groups", "projects"],
        projectSlug: segments[2],
      };
    }

    if (segments[1]) {
      return {
        key: `project:${segments[1]}`,
        label: "this project group",
        sections: ["groups", "projects"],
        projectSlug: segments[1],
      };
    }

    return {
      key: "projects",
      label: "projects",
      sections: ["groups", "projects"],
    };
  }

  if (segments[0] === "explore" && segments[1] === "projects") {
    if (segments[2] === "groups" && segments[3]) {
      return {
        key: `project-group:${segments[3]}`,
        label: "this group",
        sections: ["projects"],
        projectGroupId: segments[3],
      };
    }

    const category = segments[2];

    if (category) {
      return {
        key: `project-category:${category}`,
        label: `${category} projects`,
        sections: ["groups", "projects"],
        category,
      };
    }

    const openGroupId = param(searchParams, "open");
    if (openGroupId) {
      return {
        key: `project-group:${openGroupId}`,
        label: "this group",
        sections: ["projects"],
        projectGroupId: openGroupId,
      };
    }

    const legacyPage = param(searchParams, "page");
    if (legacyPage === "latest") {
      return {
        key: "projects-latest",
        label: "latest projects",
        sections: ["groups", "projects"],
      };
    }

    if (legacyPage) {
      return {
        key: `project-category:${legacyPage}`,
        label: `${legacyPage} projects`,
        sections: ["groups", "projects"],
        category: legacyPage,
      };
    }

    return {
      key: "explore-projects",
      label: "project groups",
      sections: ["groups", "projects"],
    };
  }

  if (segments[0] === "explore" && segments[1] === "blog") {
    const blogGroupId = param(searchParams, "group");
    if (blogGroupId) {
      return {
        key: `blog-group:${blogGroupId}`,
        label: "this blog group",
        sections: ["posts"],
        blogGroupId,
      };
    }

    const blogCategory = param(searchParams, "category");
    if (blogCategory) {
      return {
        key: `blog-category:${blogCategory}`,
        label: "this category",
        sections: ["posts"],
        blogCategory,
      };
    }

    return {
      key: "explore-blog",
      label: "blog posts",
      sections: ["posts"],
    };
  }

  if (segments[0] === "blog") {
    if (segments[1] === "latest") {
      return {
        key: "blog-latest",
        label: "latest posts",
        sections: ["posts"],
      };
    }

    if (segments[1]) {
      return {
        key: `post:${segments[1]}`,
        label: "this blog group",
        sections: ["posts"],
        postSlug: segments[1],
      };
    }

    return {
      key: "blog",
      label: "blog posts",
      sections: ["posts"],
    };
  }

  return {
    key: "all",
    label: "the site",
    sections: ["posts", "groups", "projects"],
  };
}
