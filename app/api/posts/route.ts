import { NextRequest, NextResponse } from "next/server";
import { RedisCacheService } from "@app/services/redisCache";
import { getAllBuilderContent } from "@app/shared-components/Builder";
import { transformBuilderPostToWixFormat } from "@app/utils/builderPostUtils";

export const revalidate = 0; // Disable caching

// Cache key - using _builder.json suffix for consistency with other Builder.io caches
// Note: This route is similar to /api/postPages but kept for backward compatibility
const CACHE_KEY = "posts_builder.json";
const CACHE_TTL = 4 * 60 * 60 * 1000; // 4 hours

/**
 * Fetch all posts from Builder.io
 * Handles pagination to get all posts
 */
async function fetchAllPostsFromBuilder(): Promise<any[]> {
  const allPosts: any[] = [];
  let offset = 0;
  const limit = 100; // Builder.io limit per request
  let hasMore = true;

  console.log("[Builder.io] Fetching all posts...");

  while (hasMore) {
    const posts = await getAllBuilderContent("post-page", {
      limit,
      offset,
    });

    if (posts && posts.length > 0) {
      allPosts.push(...posts);
      offset += posts.length;
      hasMore = posts.length === limit;
      console.log(`[Builder.io] Fetched ${allPosts.length} posts so far...`);
    } else {
      hasMore = false;
    }
  }

  console.log(`[Builder.io] Completed fetching ${allPosts.length} posts`);
  return allPosts;
}

/**
 * GET /api/posts
 * Returns all posts from Builder.io (with caching)
 */
export const GET = async (req: NextRequest) => {
  try {
    // Try cache first
    const cachedData = await RedisCacheService.getFromCache(CACHE_KEY);
    if (cachedData && Array.isArray(cachedData) && cachedData.length > 0) {
      console.log(`[Cache] Returning ${cachedData.length} cached posts`);
      return NextResponse.json(cachedData);
    }

    // Fetch from Builder.io
    const builderPosts = await fetchAllPostsFromBuilder();

    // Transform to Wix format for backward compatibility
    const transformedPosts = builderPosts
      .map((post) => transformBuilderPostToWixFormat(post))
      .filter((post) => post !== null);

    // Cache the results
    await RedisCacheService.saveToCache(CACHE_KEY, transformedPosts, CACHE_TTL);
    console.log(`[Cache] Saved ${transformedPosts.length} posts to cache`);

    return NextResponse.json(transformedPosts);
  } catch (error) {
    console.error("[Builder.io] Error fetching posts:", error);
    return NextResponse.json(
      { message: "Error fetching posts", error: String(error) },
      { status: 500 }
    );
  }
};

/**
 * POST /api/posts
 * Force refresh the posts cache from Builder.io
 */
export const POST = async (req: NextRequest) => {
  try {
    console.log("[Builder.io] Force refreshing posts cache...");

    // Fetch fresh data from Builder.io
    const builderPosts = await fetchAllPostsFromBuilder();

    // Transform to Wix format for backward compatibility
    const transformedPosts = builderPosts
      .map((post) => transformBuilderPostToWixFormat(post))
      .filter((post) => post !== null);

    // Update cache
    await RedisCacheService.saveToCache(CACHE_KEY, transformedPosts, CACHE_TTL);

    return NextResponse.json(
      {
        message: "Cache updated successfully.",
        count: transformedPosts.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Builder.io] Error updating posts cache:", error);
    return NextResponse.json(
      { message: "Failed to update cache", error: String(error) },
      { status: 500 }
    );
  }
};
