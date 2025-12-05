import { NextRequest, NextResponse } from "next/server";
import { RedisCacheService } from "@app/services/redisCache";
import { getAllBuilderContent } from "@app/shared-components/Builder";
import { transformBuilderInfoPageToWixFormat } from "@app/utils/builderInfoPageUtils";

export const revalidate = 0; // Disable caching

// Cache key - using _builder.json suffix for consistency with other Builder.io caches
const CACHE_KEY = "infoPages_builder.json";
const CACHE_TTL = 4 * 60 * 60 * 1000; // 4 hours

/**
 * Fetch all info pages from Builder.io
 * Handles pagination to get all pages
 */
async function fetchAllInfoPagesFromBuilder(): Promise<any[]> {
  const allPages: any[] = [];
  let offset = 0;
  const limit = 100; // Builder.io limit per request
  let hasMore = true;

  console.log("[Builder.io] Fetching all info pages...");

  while (hasMore) {
    const pages = await getAllBuilderContent("info-page", {
      limit,
      offset,
    });

    if (pages && pages.length > 0) {
      allPages.push(...pages);
      offset += pages.length;
      hasMore = pages.length === limit; // If we got a full page, there might be more
      console.log(
        `[Builder.io] Fetched ${allPages.length} info pages so far...`
      );
    } else {
      hasMore = false;
    }
  }

  console.log(`[Builder.io] Completed fetching ${allPages.length} info pages`);
  return allPages;
}

/**
 * GET /api/infoPages
 * Returns all info pages from Builder.io (with caching)
 */
export const GET = async (req: NextRequest) => {
  try {
    // Try cache first
    const cachedData = await RedisCacheService.getFromCache(CACHE_KEY);
    if (cachedData && Array.isArray(cachedData) && cachedData.length > 0) {
      console.log(`[Cache] Returning ${cachedData.length} cached info pages`);
      return NextResponse.json(cachedData);
    }

    // Fetch from Builder.io
    const builderPages = await fetchAllInfoPagesFromBuilder();

    // Transform to Wix format for backward compatibility
    const transformedPages = builderPages.map((page) =>
      transformBuilderInfoPageToWixFormat(page)
    );

    // Cache the results
    await RedisCacheService.saveToCache(CACHE_KEY, transformedPages, CACHE_TTL);
    console.log(`[Cache] Saved ${transformedPages.length} info pages to cache`);

    return NextResponse.json(transformedPages);
  } catch (error) {
    console.error("[Builder.io] Error fetching info pages:", error);
    return NextResponse.json(
      { message: "Error fetching Info Pages", error: String(error) },
      { status: 500 }
    );
  }
};

/**
 * POST /api/infoPages
 * Force refresh the info pages cache from Builder.io
 */
export const POST = async (req: NextRequest) => {
  try {
    console.log("[Builder.io] Force refreshing info pages cache...");

    // Fetch fresh data from Builder.io
    const builderPages = await fetchAllInfoPagesFromBuilder();

    // Transform to Wix format for backward compatibility
    const transformedPages = builderPages.map((page) =>
      transformBuilderInfoPageToWixFormat(page)
    );

    // Update cache
    await RedisCacheService.saveToCache(CACHE_KEY, transformedPages, CACHE_TTL);

    return NextResponse.json(
      {
        message: "Cache updated successfully.",
        count: transformedPages.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Builder.io] Error updating info pages cache:", error);
    return NextResponse.json(
      { message: "Failed to update cache", error: String(error) },
      { status: 500 }
    );
  }
};
