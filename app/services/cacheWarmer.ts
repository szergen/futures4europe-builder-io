import { RedisCacheService } from "./redisCache";

export async function warmCache() {
  try {
    console.log("Warming cache...");

    // Determine the base URL for API calls
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

    // Fetch and cache tags from Builder.io
    console.log("Fetching tags from Builder.io for cache warming...");
    const tagsResponse = await fetch(`${baseUrl}/api/tags`);
    const tags = await tagsResponse.json();
    await RedisCacheService.saveToCache(
      "tags_builder.json",
      tags,
      4 * 60 * 60 * 1000
    );
    console.log(`✓ Cached ${tags.length} tags from Builder.io`);

    // Fetch and cache all info pages from Builder.io
    console.log("Fetching info pages from Builder.io for cache warming...");
    const infoPagesResponse = await fetch(`${baseUrl}/api/infoPages`);
    const infoPages = await infoPagesResponse.json();
    // Note: The API route handles caching with key "infoPages_builder.json"
    console.log(
      `✓ Cached ${
        Array.isArray(infoPages) ? infoPages.length : 0
      } info pages from Builder.io`
    );

    // Fetch and cache all post pages from Builder.io
    console.log("Fetching post pages from Builder.io for cache warming...");
    const postPagesResponse = await fetch(`${baseUrl}/api/postPages`);
    const postPages = await postPagesResponse.json();
    // Note: The API route handles caching with key "postPages_builder.json"
    console.log(
      `✓ Cached ${
        Array.isArray(postPages) ? postPages.length : 0
      } post pages from Builder.io`
    );

    // Fetch affiliations from Builder.io (caches automatically via the API)
    console.log("Fetching affiliations from Builder.io for cache warming...");
    const affiliationsResponse = await fetch(`${baseUrl}/api/affiliations`);
    const affiliations = await affiliationsResponse.json();
    console.log(`✓ Cached ${affiliations.length} affiliations from Builder.io`);

    // Now fetch and cache the calculated data
    const popularTagsResponse = await fetch(
      `${baseUrl}/api/tags-with-popularity`
    );
    const popularTags = await popularTagsResponse.json();
    await RedisCacheService.saveToCache(
      "tags-with-popularity_builder.json",
      popularTags,
      4 * 60 * 60 * 1000
    );

    console.log("Cache warming complete!");
    return true;
  } catch (error) {
    console.error("Error warming cache:", error);
    return false;
  }
}
