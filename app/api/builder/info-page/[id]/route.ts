/**
 * API Route: Update/Delete Info-Page in Builder.io
 * PUT /api/builder/info-page/[id] - Update an info-page
 * DELETE /api/builder/info-page/[id] - Delete (unpublish) an info-page
 *
 * This server-side route handles info-page operations using the private API key
 */

import { NextRequest, NextResponse } from "next/server";
import { RedisCacheService } from "@app/services/redisCache";

const BUILDER_API_URL = "https://builder.io/api/v1/write";
const BUILDER_PRIVATE_API_KEY = process.env.BUILDER_PRIVATE_API_KEY || "";
const CACHE_KEY = "infoPages_builder.json";

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

    const pageId = params.id;
    const payload = await request.json();

    console.log("[Builder.io API] Updating info-page:", {
      id: pageId,
      slug: payload.data?.slug,
      title: payload.data?.title,
    });

    // Make request to Builder.io Write API
    const response = await fetch(`${BUILDER_API_URL}/info-page/${pageId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${BUILDER_PRIVATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Builder.io API] Update info-page failed:", {
        id: pageId,
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });

      return NextResponse.json(
        {
          error: `Failed to update info-page: ${response.status} ${response.statusText}`,
          details: errorText,
        },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log("[Builder.io API] Info-page updated successfully:", {
      id: result.id,
      slug: result.data?.slug,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("[Builder.io API] Error updating info-page:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/builder/info-page/[id]
 * Delete (unpublish) an info-page from Builder.io
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

    const pageId = params.id;

    console.log("[Builder.io API] Deleting info-page:", { id: pageId });

    // Make request to Builder.io Write API to delete/unpublish
    const response = await fetch(`${BUILDER_API_URL}/info-page/${pageId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${BUILDER_PRIVATE_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Builder.io API] Delete info-page failed:", {
        id: pageId,
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });

      return NextResponse.json(
        {
          error: `Failed to delete info-page: ${response.status} ${response.statusText}`,
          details: errorText,
        },
        { status: response.status }
      );
    }

    console.log("[Builder.io API] Info-page deleted successfully:", {
      id: pageId,
    });

    // Invalidate the info pages cache so the deletion is reflected
    await RedisCacheService.invalidateCache(CACHE_KEY);
    console.log("[Builder.io API] Info pages cache invalidated");

    return NextResponse.json(
      { success: true, deleted: pageId },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Builder.io API] Error deleting info-page:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
