import { NextRequest, NextResponse } from "next/server";
import { RedisCacheService } from "@app/services/redisCache";
import { getAllBuilderContent } from "@app/shared-components/Builder";
import { transformBuilderPostToWixFormat } from "@app/utils/builderPostUtils";

export const revalidate = 0; // Disable caching

// Cache key - using _builder.json suffix for consistency with other Builder.io caches
const CACHE_KEY = "postPages_builder.json";
const CACHE_TTL = 4 * 60 * 60 * 1000; // 4 hours

/**
 * Fetch all post pages from Builder.io
 * Handles pagination to get all posts
 */
async function fetchAllPostPagesFromBuilder(): Promise<any[]> {
  const allPosts: any[] = [];
  let offset = 0;
  const limit = 100; // Builder.io limit per request
  let hasMore = true;

  console.log("[Builder.io] Fetching all post pages...");

  while (hasMore) {
    const posts = await getAllBuilderContent("post-page", {
      limit,
      offset,
    });

    if (posts && posts.length > 0) {
      allPosts.push(...posts);
      offset += posts.length;
      hasMore = posts.length === limit; // If we got a full page, there might be more
      console.log(
        `[Builder.io] Fetched ${allPosts.length} post pages so far...`
      );
    } else {
      hasMore = false;
    }
  }

  console.log(`[Builder.io] Completed fetching ${allPosts.length} post pages`);
  return allPosts;
}

/**
 * GET /api/postPages
 * Returns all post pages from Builder.io (with caching)
 */
export const GET = async (req: NextRequest) => {
  try {
    // Try cache first
    const cachedData = await RedisCacheService.getFromCache(CACHE_KEY);
    if (cachedData && Array.isArray(cachedData) && cachedData.length > 0) {
      console.log(`[Cache] Returning ${cachedData.length} cached post pages`);
      return NextResponse.json(cachedData);
    }

    // Fetch from Builder.io
    const builderPosts = await fetchAllPostPagesFromBuilder();

    // Transform to Wix format for backward compatibility
    const transformedPosts = builderPosts
      .map((post) => transformBuilderPostToWixFormat(post))
      .filter((post) => post !== null);

    // Only cache if we got results - don't cache empty arrays
    if (transformedPosts.length > 0) {
      await RedisCacheService.saveToCache(
        CACHE_KEY,
        transformedPosts,
        CACHE_TTL
      );
      console.log(
        `[Cache] Saved ${transformedPosts.length} post pages to cache`
      );
    } else {
      // Invalidate any existing empty cache to force fresh fetch next time
      await RedisCacheService.invalidateCache(CACHE_KEY);
      console.log(`[Cache] No post pages fetched, cache invalidated`);
    }

    return NextResponse.json(transformedPosts);
  } catch (error) {
    console.error("[Builder.io] Error fetching post pages:", error);
    return NextResponse.json(
      { message: "Error fetching post pages", error: String(error) },
      { status: 500 }
    );
  }
};

/**
 * POST /api/postPages
 * Force refresh the post pages cache from Builder.io
 */
export const POST = async (req: NextRequest) => {
  try {
    console.log("[Builder.io] Force refreshing post pages cache...");

    // Fetch fresh data from Builder.io
    const builderPosts = await fetchAllPostPagesFromBuilder();

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
    console.error("[Builder.io] Error updating post pages cache:", error);
    return NextResponse.json(
      { message: "Failed to update cache", error: String(error) },
      { status: 500 }
    );
  }
};
