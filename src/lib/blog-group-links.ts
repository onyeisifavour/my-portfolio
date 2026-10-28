export function getBlogGroupHref(id: string) {
  return `/explore/blog?group=${encodeURIComponent(id)}`;
}
