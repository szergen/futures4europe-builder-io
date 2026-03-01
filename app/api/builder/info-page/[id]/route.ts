/**
 * API Route: Update/Delete Info-Page in Builder.io
 * PUT /api/builder/info-page/[id] - Update an info-page
 * DELETE /api/builder/info-page/[id] - Delete (unpublish) an info-page
 *
 * This server-side route handles info-page operations using the private API key
 * Note: PUT always returns enriched references for Redis cache consistency
 */

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { RedisCacheService } from "@app/services/redisCache";
import { getAllBuilderContent } from "@app/shared-components/Builder/builderUtils";

const BUILDER_API_URL = "https://builder.io/api/v1/write";
const BUILDER_PRIVATE_API_KEY = process.env.BUILDER_PRIVATE_API_KEY || "";
const ALL_INFO_PAGES_CACHE_KEY = "builder_info_pages_all.json";
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
        { status: response.status },
      );
    }

    let result = await response.json();
    console.log("[Builder.io API] Info-page updated successfully:", {
      id: result.id,
      slug: result.data?.slug,
    });

    // Fetch the page again with enriched references before caching.
    // getAllBuilderContent uses builder.getAll with noTargeting: true, which
    // reliably finds the page regardless of publish state or targeting rules.
    // getBuilderContent (builder.get) was used previously but can return null
    // for drafts or pages with no matching targeting attributes.
    let enrichedPage: any = null;
    if (result.id) {
      console.log(
        "[Builder.io API] Fetching enriched version of updated page...",
      );
      try {
        const enrichedPages = await getAllBuilderContent("info-page", {
          query: { id: result.id },
          limit: 1,
        });
        enrichedPage = enrichedPages?.[0] ?? null;

        if (enrichedPage) {
          console.log("[Builder.io API] Successfully enriched page references");
        } else {
          console.warn(
            "[Builder.io API] Could not fetch enriched page, cache will be invalidated",
          );
        }
      } catch (enrichError) {
        console.warn("[Builder.io API] Error enriching page:", enrichError);
      }
    }

    // Update Redis Cache with the raw enriched page (consistent format with getAllBuilderInfoPages).
    // If enrichment failed, invalidate instead of writing un-enriched data.
    try {
      if (enrichedPage) {
        const cached = await RedisCacheService.getFromCache(ALL_INFO_PAGES_CACHE_KEY);
        if (cached && Array.isArray(cached)) {
          const index = cached.findIndex((p: any) => p.id === pageId);
          if (index !== -1) {
            cached[index] = enrichedPage;
            await RedisCacheService.saveToCache(
              ALL_INFO_PAGES_CACHE_KEY,
              cached,
              CACHE_TTL,
            );
            console.log("[Builder.io API] Updated enriched info-page in Redis cache");
          }
        }
      } else {
        await RedisCacheService.invalidateCache(ALL_INFO_PAGES_CACHE_KEY);
        console.log("[Builder.io API] Invalidated Redis cache (enrichment unavailable)");
      }
    } catch (cacheError) {
      console.warn(
        "[Builder.io API] Failed to update Redis cache:",
        cacheError,
      );
      await RedisCacheService.invalidateCache(ALL_INFO_PAGES_CACHE_KEY);
    }

    // Revalidate Next.js cache for info pages.
    // pageType is a plain string field so it is present on the Write API response.
    if (result.data?.slug) {
      const cleanSlug = result.data.slug.replace(/^\//, "");
      console.log(`[Builder.io API] Revalidating info page: /${cleanSlug}`);
      revalidatePath(`/${cleanSlug}`);
      revalidatePath(`/${cleanSlug}`, "page");

      const pageType = result.data?.pageType;
      if (pageType === "project") {
        revalidatePath(`/project/${cleanSlug}`);
        revalidatePath("/dashboard/projects");
      } else if (pageType === "person") {
        revalidatePath(`/person/${cleanSlug}`);
      } else if (pageType === "organisation") {
        revalidatePath(`/organisation/${cleanSlug}`);
        revalidatePath("/dashboard/organisations");
      }
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("[Builder.io API] Error updating info-page:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/builder/info-page/[id]
 * Delete (unpublish) an info-page from Builder.io
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
        { status: response.status },
      );
    }

    console.log("[Builder.io API] Info-page deleted successfully:", {
      id: pageId,
    });

    // Invalidate the info pages cache so the deletion is reflected
    await RedisCacheService.invalidateCache(ALL_INFO_PAGES_CACHE_KEY);
    console.log("[Builder.io API] Info pages cache invalidated");

    // Revalidate Next.js pages
    revalidatePath("/dashboard/projects");
    revalidatePath("/dashboard/organisations");
    console.log("[Builder.io API] Info pages revalidated");

    return NextResponse.json(
      { success: true, deleted: pageId },
      { status: 200 },
    );
  } catch (error) {
    console.error("[Builder.io API] Error deleting info-page:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 },
    );
  }
}
