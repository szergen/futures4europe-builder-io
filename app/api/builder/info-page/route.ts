/**
 * API Route: Create Info-Page in Builder.io
 * POST /api/builder/info-page
 *
 * This server-side route handles info-page creation using the private API key
 * Used for creating project pages (and later person/organisation pages)
 *
 * Note: Always returns enriched references for Redis cache consistency
 */

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { RedisCacheService } from "@app/services/redisCache";
import { getBuilderContent } from "@app/shared-components/Builder/builderUtils";
import { transformBuilderInfoPageToWixFormat } from "@app/utils/builderInfoPageUtils";

const BUILDER_API_URL = "https://builder.io/api/v1/write";
const BUILDER_PRIVATE_API_KEY = process.env.BUILDER_PRIVATE_API_KEY || "";
const INFO_PAGES_CACHE_KEY = "builder_info_pages_all.json";
// Cache TTL: 1 day
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

    console.log("[Builder.io API] Creating info-page:", {
      slug: payload.data?.slug,
      title: payload.data?.title,
    });

    // Make request to Builder.io Write API
    const response = await fetch(`${BUILDER_API_URL}/info-page`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${BUILDER_PRIVATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Builder.io API] Create info-page failed:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });

      return NextResponse.json(
        {
          error: `Failed to create info-page: ${response.status} ${response.statusText}`,
          details: errorText,
        },
        { status: response.status },
      );
    }

    let result = await response.json();
    console.log("[Builder.io API] Info-page created successfully:", {
      id: result.id,
      slug: result.data?.slug,
    });

    // Always fetch the page again with enriched references before caching
    if (result.id) {
      console.log(
        "[Builder.io API] Fetching enriched version of created page...",
      );
      try {
        const enrichedPage = await getBuilderContent("info-page", {
          query: { id: result.id },
        });

        const transformedEnrichedPage =
          transformBuilderInfoPageToWixFormat(enrichedPage);

        if (transformedEnrichedPage) {
          result = transformedEnrichedPage;
          console.log("[Builder.io API] Successfully enriched page references");
        } else {
          console.warn(
            "[Builder.io API] Could not fetch enriched page, using original",
          );
        }
      } catch (enrichError) {
        console.warn("[Builder.io API] Error enriching page:", enrichError);
        // Continue with non-enriched result
      }
    }

    // Update Redis Cache
    try {
      const cached = await RedisCacheService.getFromCache(INFO_PAGES_CACHE_KEY);
      if (cached && Array.isArray(cached)) {
        cached.push(result);
        await RedisCacheService.saveToCache(
          INFO_PAGES_CACHE_KEY,
          cached,
          CACHE_TTL,
        );
        console.log("[Builder.io API] Added enriched info-page to Redis cache");
      }
    } catch (cacheError) {
      console.warn(
        "[Builder.io API] Failed to update Redis cache:",
        cacheError,
      );
      // Fallback: invalidate cache
      await RedisCacheService.invalidateCache(INFO_PAGES_CACHE_KEY);
    }

    // Revalidate Next.js cache for info pages
    if (result.data?.slug) {
      const cleanSlug = result.data.slug.replace(/^\//, "");
      console.log(`[Builder.io API] Revalidating new info page: /${cleanSlug}`);
      revalidatePath(`/${cleanSlug}`);
      revalidatePath(`/${cleanSlug}`, "page");

      // Also revalidate based on page type
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
    console.error("[Builder.io API] Error creating info-page:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 },
    );
  }
}
