/**
 * API Route: Create Post in Builder.io
 * POST /api/builder/post
 *
 * This server-side route handles post creation using the private API key
 * Note: Always returns enriched references for Redis cache consistency
 */

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  transformBuilderPostToWixFormat,
} from "@app/utils/builderPostUtils";
import {
  getEntryForCacheAfterWrite,
  upsertCachedEntry,
} from "@app/utils/builderReferenceEnrichment";

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
    // Transformed to Wix format, used for both the cache and pageType detection.
    const transformedPost = result.id
      ? transformBuilderPostToWixFormat(
          await getEntryForCacheAfterWrite("post-page", result),
        )
      : null;

    // Redis entries never expire, so a post missing here stays out of every
    // listing and search until someone clears the cache by hand.
    try {
      if (transformedPost) {
        await upsertCachedEntry(POSTS_CACHE_KEY, transformedPost, CACHE_TTL);
        console.log("[Builder.io API] Added transformed post to Redis cache");
      }
    } catch (cacheError) {
      console.warn(
        "[Builder.io API] Failed to update Redis cache (leaving intact):",
        cacheError,
      );
    }

    // Revalidate Next.js cache for post pages
    if (result.data?.slug) {
      const cleanSlug = result.data.slug
        .replace(/^\/post\//, "")
        .replace(/^\/post-page\//, "");
      console.log(
        `[Builder.io API] Revalidating new post page: /post/${cleanSlug}`,
      );
      revalidatePath(`/post/${cleanSlug}`);
      revalidatePath(`/post/${cleanSlug}`, "page");
    }
    // Revalidate list pages based on pageType.
    const pageTypeName = transformedPost?.data?.pageTypes?.[0]?.name;
    if (pageTypeName === "project result") {
      revalidatePath("/pages/project-result");
      revalidatePath("/dashboard/project-results");
    } else if (pageTypeName === "event") {
      revalidatePath("/pages/event");
      revalidatePath("/dashboard/events");
    } else {
      revalidatePath("/pages/post");
      revalidatePath("/dashboard/posts");
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
