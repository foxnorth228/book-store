import { joinUrl } from "./join-url.js";

export function buildUrl(baseUrl = "", path: string, query?: Record<string, unknown>) {
  const url = joinUrl(baseUrl, path);

  if (!query) {
    return url;
  }

  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const search = searchParams.toString();

  return search ? `${url}?${search}` : url;
}
