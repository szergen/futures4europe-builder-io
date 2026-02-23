/**
 * API Route: Update/Delete Post in Builder.io
 * PUT /api/builder/post/[id] - Update a post
 * DELETE /api/builder/post/[id] - Delete (unpublish) a post
 *
 * This server-side route handles post operations using the private API key
 * Note: PUT always returns enriched references for Redis cache consistency
 */

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { RedisCacheService } from "@app/services/redisCache";
import { getBuilderContent } from "@app/shared-components/Builder/builderUtils";
import { transformBuilderPostToWixFormat } from "@app/utils/builderPostUtils";

const BUILDER_API_URL = "https://builder.io/api/v1/write";
const BUILDER_PRIVATE_API_KEY = process.env.BUILDER_PRIVATE_API_KEY || "";
const ALL_POSTS_CACHE_KEY = "builder_posts_all.json";
// Cache TTL: 1 day
const CACHE_TTL = 24 * 60 * 60 * 1000;

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Check if API key is configured
    if (!BUILDER_PRIVATE_API_KEY) {
      console.error("[Builder.io API] BUILDER_PRIVATE_API_KEY not configured");
      return NextResponse.json(
        { error: "Builder.io API key not configured" },
        { status: 500 },
      );
    }

    const postId = params.id;

    // Parse request body
    const payload = await request.json();

    console.log("[Builder.io API] Updating post:", {
      id: postId,
      slug: payload.data?.slug,
      title: payload.data?.title,
    });

    // Make request to Builder.io Write API
    const response = await fetch(`${BUILDER_API_URL}/post-page/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${BUILDER_PRIVATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Builder.io API] Update post failed:", {
        id: postId,
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });

      return NextResponse.json(
        {
          error: `Failed to update post: ${response.status} ${response.statusText}`,
          details: errorText,
        },
        { status: response.status },
      );
    }

    let result = await response.json();
    console.log("[Builder.io API] Post updated successfully:", {
      id: result.id,
      slug: result.data?.slug,
    });

    // Always fetch the page again with enriched references before caching
    if (result.id) {
      console.log(
        "[Builder.io API] Fetching enriched version of updated post...",
      );
      try {
        const enrichedPost = await getBuilderContent("post-page", {
          query: { id: result.id },
        });

        const transformedEnrichedPost =
          transformBuilderPostToWixFormat(enrichedPost);

        if (transformedEnrichedPost) {
          result = transformedEnrichedPost;
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

    // Update Redis Cache (All Posts) with enriched result
    try {
      const cached = await RedisCacheService.getFromCache(ALL_POSTS_CACHE_KEY);
      if (cached && Array.isArray(cached)) {
        const index = cached.findIndex((p: any) => p.id === postId);
        if (index !== -1) {
          cached[index] = result;
          await RedisCacheService.saveToCache(
            ALL_POSTS_CACHE_KEY,
            cached,
            CACHE_TTL,
          );
          console.log("[Builder.io API] Updated enriched post in Redis cache");
        }
      }
    } catch (cacheError) {
      console.warn(
        "[Builder.io API] Failed to update Redis cache:",
        cacheError,
      );
      // Fallback: invalidate if update fails
      await RedisCacheService.invalidateCache(ALL_POSTS_CACHE_KEY);
    }

    // Revalidate Next.js cache for the post page
    if (result.data?.slug) {
      const cleanSlug = result.data.slug.replace(/^\/post\//, "").replace(/^\/post-page\//, "");
      console.log(`[Builder.io API] Revalidating post page: /post/${cleanSlug}`);
      revalidatePath(`/post/${cleanSlug}`);
      revalidatePath(`/post/${cleanSlug}`, 'page');
      // Also revalidate the posts list pages
      revalidatePath('/pages/post');
      revalidatePath('/dashboard/posts');
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("[Builder.io API] Error updating post:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/builder/post/[id]
 * Delete (unpublish) a post from Builder.io
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Check if API key is configured
    if (!BUILDER_PRIVATE_API_KEY) {
      console.error("[Builder.io API] BUILDER_PRIVATE_API_KEY not configured");
      return NextResponse.json(
        { error: "Builder.io API key not configured" },
        { status: 500 },
      );
    }

    const postId = params.id;

    console.log("[Builder.io API] Deleting post:", { id: postId });

    // Make request to Builder.io Write API to delete/unpublish
    const response = await fetch(`${BUILDER_API_URL}/post-page/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${BUILDER_PRIVATE_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Builder.io API] Delete post failed:", {
        id: postId,
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });

      return NextResponse.json(
        {
          error: `Failed to delete post: ${response.status} ${response.statusText}`,
          details: errorText,
        },
        { status: response.status },
      );
    }

    console.log("[Builder.io API] Post deleted successfully:", {
      id: postId,
    });

    // Invalidate both post caches so the deletion is reflected
    await RedisCacheService.invalidateCache(ALL_POSTS_CACHE_KEY);
    console.log("[Builder.io API] Post caches invalidated");

    // Revalidate Next.js pages
    revalidatePath('/pages/post');
    revalidatePath('/dashboard/posts');
    console.log("[Builder.io API] Post pages revalidated");

    return NextResponse.json(
      { success: true, deleted: postId },
      { status: 200 },
    );
  } catch (error) {
    console.error("[Builder.io API] Error deleting post:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 },
    );
  }
}
