/**
 * Utility functions for cache invalidation and path revalidation
 */

/**
 * Invalidates a specific cache key
 * @param key The cache key to invalidate
 */
export const invalidateCache = async (key: string): Promise<Response> => {
  return fetch("/api/invalidate-cache", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key }),
  });
};

/**
 * Invalidates a cache key and revalidates a path
 * @param key The cache key to invalidate
 * @param path The path to revalidate
 */
export const invalidateCacheAndRevalidatePath = async (
  key: string,
  path: string
): Promise<Response> => {
  return fetch("/api/invalidate-cache", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, path }),
  });
};

/**
 * Invalidates all cache
 */
export const invalidateAllCache = async (): Promise<Response> => {
  return fetch("/api/invalidate-cache", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key: "*" }),
  });
};

/**
 * Revalidates a path
 * @param path The path to revalidate
 */
export const revalidatePath = async (path: string): Promise<Response> => {
  return fetch("/api/invalidate-cache", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path }),
  });
};

/**
 * Invalidates multiple cache keys
 * @param keys Array of cache keys to invalidate
 */
export const invalidateMultipleCache = async (
  keys: string[]
): Promise<Response[]> => {
  return Promise.all(keys.map((key) => invalidateCache(key)));
};

/**
 * Common cache invalidation for person pages
 * @param slug The person page slug
 */
export const invalidatePersonPageCache = async (
  slug: string
): Promise<Response[]> => {
  return Promise.all([revalidatePath(`/person/${slug}`)]);
};

export const invalidateProjectPageCache = async (
  slug: string
): Promise<Response[]> => {
  return Promise.all([
    revalidatePath(`/project/${slug}`),
    revalidatePath(`/project-page/${slug}`),
  ]);
};

export const invalidateOrganisationPageCache = async (
  slug: string
): Promise<Response[]> => {
  return Promise.all([revalidatePath(`/organisation/${slug}`)]);
};

export const invalidatePostPageCache = async (
  slug: string
): Promise<Response[]> => {
  // Extract clean slug (remove /post/ prefix if present)
  const cleanSlug = slug.replace(/^\/post\//, "").replace(/^\/post-page\//, "");
  console.log(`[Cache] Invalidating post page cache for: ${cleanSlug}`);

  // Revalidate both possible paths to be safe
  return Promise.all([
    revalidatePath(`/post-page/${cleanSlug}`), // Main post-page route
    revalidatePath(`/post/${cleanSlug}`), // Legacy/alternate route
  ]);
};
