import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  transpilePackages: ["next-mdx-remote"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "query", key: "tab", value: "blog" }],
        destination: "/home?tab=blog",
        permanent: false,
      },
      {
        source: "/",
        destination: "/home?tab=projects",
        permanent: false,
      },
      {
        source: "/home",
        missing: [{ type: "query", key: "tab" }],
        destination: "/home?tab=projects",
        permanent: false,
      },
      {
        source: "/latest-projects",
        destination: "/projects/latest",
        permanent: false,
      },
      {
        source: "/explore/projects/groups/:group",
        destination: "/projects/group/:group",
        permanent: false,
      },
      {
        source: "/explore/projects/:category",
        destination: "/projects/category/:category",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
