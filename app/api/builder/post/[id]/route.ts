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
import { getAllBuilderContent } from "@app/shared-components/Builder/builderUtils";
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

    // Fetch the post again with enriched references before caching.
    // getAllBuilderContent uses builder.getAll with noTargeting: true, which
    // reliably finds the post regardless of publish state or targeting rules.
    // getBuilderContent (builder.get) was used previously but can return null
    // for drafts or posts with no matching targeting attributes.
    let enrichedPost: any = null;
    if (result.id) {
      console.log(
        "[Builder.io API] Fetching enriched version of updated post...",
      );
      try {
        const enrichedPosts = await getAllBuilderContent("post-page", {
          query: { id: result.id },
          limit: 1,
        });
        enrichedPost = enrichedPosts?.[0] ?? null;

        if (enrichedPost) {
          console.log("[Builder.io API] Successfully enriched post references");
        } else {
          console.warn(
            "[Builder.io API] Could not fetch enriched post, cache will be invalidated",
          );
        }
      } catch (enrichError) {
        console.warn("[Builder.io API] Error enriching post:", enrichError);
      }
    }

    // Update Redis Cache with the raw enriched post (consistent format with getAllBuilderPosts).
    // If enrichment failed, invalidate instead of writing un-enriched data.
    try {
      if (enrichedPost) {
        const cached = await RedisCacheService.getFromCache(ALL_POSTS_CACHE_KEY);
        if (cached && Array.isArray(cached)) {
          const index = cached.findIndex((p: any) => p.id === postId);
          if (index !== -1) {
            cached[index] = enrichedPost;
            await RedisCacheService.saveToCache(ALL_POSTS_CACHE_KEY, cached, CACHE_TTL);
            console.log("[Builder.io API] Updated enriched post in Redis cache");
          }
        }
      } else {
        await RedisCacheService.invalidateCache(ALL_POSTS_CACHE_KEY);
        console.log("[Builder.io API] Invalidated Redis cache (enrichment unavailable)");
      }
    } catch (cacheError) {
      console.warn(
        "[Builder.io API] Failed to update Redis cache:",
        cacheError,
      );
      await RedisCacheService.invalidateCache(ALL_POSTS_CACHE_KEY);
    }

    // Revalidate Next.js cache for the post page
    if (result.data?.slug) {
      const cleanSlug = result.data.slug.replace(/^\/post\//, "").replace(/^\/post-page\//, "");
      console.log(`[Builder.io API] Revalidating post page: /post/${cleanSlug}`);
      revalidatePath(`/post/${cleanSlug}`);
      revalidatePath(`/post/${cleanSlug}`, 'page');
    }
    // Revalidate list pages based on pageType.
    // The Write API response (result) has un-enriched refs so pageType names are absent.
    // Use the enriched post (which has resolved reference values) to determine the type.
    const pageTypeName = enrichedPost
      ? transformBuilderPostToWixFormat(enrichedPost)?.data?.pageTypes?.[0]?.name
      : undefined;
    if (pageTypeName === "project result") {
      revalidatePath('/pages/project-result');
      revalidatePath('/dashboard/project-results');
    } else if (pageTypeName === "event") {
      revalidatePath('/pages/event');
      revalidatePath('/dashboard/events');
    } else {
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

    // Revalidate all post-type list pages (type unknown at deletion time)
    revalidatePath('/pages/post');
    revalidatePath('/dashboard/posts');
    revalidatePath('/pages/project-result');
    revalidatePath('/dashboard/project-results');
    revalidatePath('/pages/event');
    revalidatePath('/dashboard/events');
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
