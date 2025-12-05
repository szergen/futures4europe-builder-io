/**
 * API Route: Update/Delete Post in Builder.io
 * PUT /api/builder/post/[id] - Update a post
 * DELETE /api/builder/post/[id] - Delete (unpublish) a post
 *
 * This server-side route handles post operations using the private API key
 */

import { NextRequest, NextResponse } from "next/server";
import { RedisCacheService } from "@app/services/redisCache";

const BUILDER_API_URL = "https://builder.io/api/v1/write";
const BUILDER_PRIVATE_API_KEY = process.env.BUILDER_PRIVATE_API_KEY || "";
const CACHE_KEY = "postPages_builder.json";
const POSTS_CACHE_KEY = "posts_builder.json";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if API key is configured
    if (!BUILDER_PRIVATE_API_KEY) {
      console.error("[Builder.io API] BUILDER_PRIVATE_API_KEY not configured");
      return NextResponse.json(
        { error: "Builder.io API key not configured" },
        { status: 500 }
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
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log("[Builder.io API] Post updated successfully:", {
      id: result.id,
      slug: result.data?.slug,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("[Builder.io API] Error updating post:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/builder/post/[id]
 * Delete (unpublish) a post from Builder.io
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if API key is configured
    if (!BUILDER_PRIVATE_API_KEY) {
      console.error("[Builder.io API] BUILDER_PRIVATE_API_KEY not configured");
      return NextResponse.json(
        { error: "Builder.io API key not configured" },
        { status: 500 }
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
        { status: response.status }
      );
    }

    console.log("[Builder.io API] Post deleted successfully:", {
      id: postId,
    });

    // Invalidate both post caches so the deletion is reflected
    await RedisCacheService.invalidateCache(CACHE_KEY);
    await RedisCacheService.invalidateCache(POSTS_CACHE_KEY);
    console.log("[Builder.io API] Post caches invalidated");

    return NextResponse.json(
      { success: true, deleted: postId },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Builder.io API] Error deleting post:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
