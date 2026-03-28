function normalizeBase(baseUrl: string) {
  if (baseUrl === "/") {
    return "";
  }

  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}

export function withBase(path: string) {
  const base = normalizeBase(import.meta.env.BASE_URL);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}` || "/";
}

export function authorPath(authorId: string) {
  return withBase(`/authors/${authorId}/`);
}

export function postPath(authorId: string, slug: string) {
  return withBase(`/posts/${authorId}/${slug}/`);
}

