/**
 * API Route: Create Post in Builder.io
 * POST /api/builder/post
 *
 * This server-side route handles post creation using the private API key
 * Note: Always returns enriched references for Redis cache consistency
 */

import { NextRequest, NextResponse } from "next/server";
import { RedisCacheService } from "@app/services/redisCache";
import { getBuilderContent } from "@app/shared-components/Builder/builderUtils";

const BUILDER_API_URL = "https://builder.io/api/v1/write";
const BUILDER_PRIVATE_API_KEY = process.env.BUILDER_PRIVATE_API_KEY || "";
const POSTS_CACHE_KEY = "builder_posts_all.json";
// Cache TTL: 1 day (match utils)
const CACHE_TTL = 24 * 60 * 60 * 1000;

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!BUILDER_PRIVATE_API_KEY) {
      console.error("[Builder.io API] BUILDER_PRIVATE_API_KEY not configured");
      return NextResponse.json(
        { error: "Builder.io API key not configured" },
        { status: 500 },
      );
    }

    // Parse request body
    const payload = await request.json();

    console.log("[Builder.io API] Creating post:", {
      slug: payload.data?.slug,
      title: payload.data?.title,
    });

    // Make request to Builder.io Write API
    const response = await fetch(`${BUILDER_API_URL}/post-page`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${BUILDER_PRIVATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Builder.io API] Create post failed:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });

      return NextResponse.json(
        {
          error: `Failed to create post: ${response.status} ${response.statusText}`,
          details: errorText,
        },
        { status: response.status },
      );
    }

    let result = await response.json();
    console.log("[Builder.io API] Post created successfully:", {
      id: result.id,
      slug: result.data?.slug,
    });

    // Always fetch the page again with enriched references before caching
    if (result.id) {
      console.log(
        "[Builder.io API] Fetching enriched version of created post...",
      );
      try {
        const enrichedPost = await getBuilderContent("post-page", {
          query: { id: result.id },
        });

        if (enrichedPost) {
          result = enrichedPost;
          console.log("[Builder.io API] Successfully enriched post references");
        } else {
          console.warn(
            "[Builder.io API] Could not fetch enriched post, using original",
          );
        }
      } catch (enrichError) {
        console.warn("[Builder.io API] Error enriching post:", enrichError);
        // Continue with non-enriched result
      }
    }

    // Update Redis Cache with enriched result
    try {
      const cached = await RedisCacheService.getFromCache(POSTS_CACHE_KEY);
      if (cached && Array.isArray(cached)) {
        cached.push(result);
        await RedisCacheService.saveToCache(POSTS_CACHE_KEY, cached, CACHE_TTL);
        console.log("[Builder.io API] Added enriched post to Redis cache");
      }
    } catch (cacheError) {
      console.warn(
        "[Builder.io API] Failed to update Redis cache:",
        cacheError,
      );
      // Don't fail the request if cache update fails, just invalidate
      await RedisCacheService.invalidateCache(POSTS_CACHE_KEY);
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("[Builder.io API] Error creating post:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 },
    );
  }
}
