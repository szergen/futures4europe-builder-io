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
import { getAllBuilderContent } from "@app/shared-components/Builder/builderUtils";
import { transformBuilderInfoPageToWixFormat } from "@app/utils/builderInfoPageUtils";
import { normaliseName } from "@app/utils/builderTagUtils";
import {
  getEntryForCacheAfterWrite,
  upsertCachedEntry,
} from "@app/utils/builderReferenceEnrichment";

const BUILDER_API_URL = "https://builder.io/api/v1/write";
const BUILDER_PRIVATE_API_KEY = process.env.BUILDER_PRIVATE_API_KEY || "";
const INFO_PAGES_CACHE_KEY = "builder_info_pages_all.json";
// Cache TTL: 1 day
const CACHE_TTL = 24 * 60 * 60 * 1000;

const INFO_PAGE_TYPES = ["person", "organisation", "project"] as const;
type InfoPageType = (typeof INFO_PAGE_TYPES)[number];

const escapeRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

async function findExistingInfoPage(
  pageType: InfoPageType,
  tagId: string | undefined,
  normalisedTitle: string,
): Promise<any> {
  // 1. Live Builder.io queries, so a cold or stale Redis cache can't hide a page.
  if (tagId) {
    const byTag = await getAllBuilderContent("info-page", {
      query: { [`data.${pageType}.${pageType}Item.id`]: tagId },
      limit: 1,
    });
    if (byTag?.[0]) return byTag[0];
  }

  if (normalisedTitle) {
    const titlePattern = normalisedTitle
      .split(" ")
      .map(escapeRegex)
      .join("\\s+");
    const byTitle = await getAllBuilderContent("info-page", {
      query: {
        "data.slug": { $regex: `^/${pageType}/` },
        "data.title": { $regex: `^\\s*${titlePattern}\\s*$`, $options: "i" },
      },
      limit: 1,
    });
    if (byTitle?.[0]) return byTitle[0];
  }

  // 2. Redis cache, which may already hold a page Builder hasn't indexed yet.
  const cached = await RedisCacheService.getFromCache(INFO_PAGES_CACHE_KEY);
  if (!Array.isArray(cached)) return null;
  const tagKey = pageType === "project" ? "Project" : pageType;
  return (
    cached.find(
      (page: any) =>
        page?.data?.slug?.startsWith(`/${pageType}/`) &&
        ((tagId && page.data?.[tagKey]?.[0]?._id === tagId) ||
          (normalisedTitle &&
            normaliseName(page.data?.title) === normalisedTitle)),
    ) ?? null
  );
}

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

    // Guard: one info page per person, organisation or project.
    // Slugs include a unique hash, so they can't be used. Instead check for an
    // existing page of the same type that uses the same tag, or has the same
    // title ignoring case and repeated whitespace.
    const pageType = INFO_PAGE_TYPES.find((type) =>
      payload.data?.slug?.startsWith(`/${type}/`),
    );
    if (pageType) {
      const incomingTitle = normaliseName(payload.data?.title);
      const tagId = payload.data?.[pageType]?.[0]?.[`${pageType}Item`]?.id;
      let duplicate: any = null;

      try {
        duplicate = await findExistingInfoPage(pageType, tagId, incomingTitle);
      } catch (guardError) {
        // If the duplicate check itself fails, log and proceed rather than
        // blocking a legitimate create.
        console.warn(
          "[Builder.io API] Duplicate info page check failed, proceeding:",
          guardError,
        );
      }

      if (duplicate) {
        console.warn(
          `[Builder.io API] Duplicate ${pageType} page blocked:`,
          payload.data?.title,
          duplicate.data?.slug,
        );
        return NextResponse.json(
          {
            error: `${pageType === "organisation" ? "An" : "A"} ${pageType} page already exists for "${payload.data?.title}" (${duplicate.data?.slug}). Each ${pageType} can only have one page.`,
            duplicateId: duplicate.id,
            duplicateSlug: duplicate.data?.slug,
          },
          { status: 409 },
        );
      }
    }

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

    // Redis entries never expire, so a page missing here stays out of every
    // listing and search until someone clears the cache by hand.
    try {
      if (result.id) {
        const transformedPage = transformBuilderInfoPageToWixFormat(
          await getEntryForCacheAfterWrite("info-page", result),
        );
        if (transformedPage) {
          await upsertCachedEntry(INFO_PAGES_CACHE_KEY, transformedPage, CACHE_TTL);
          console.log("[Builder.io API] Added transformed info-page to Redis cache");
        }
      }
    } catch (cacheError) {
      console.warn(
        "[Builder.io API] Failed to update Redis cache (leaving intact):",
        cacheError,
      );
    }

    // Revalidate Next.js cache for info pages.
    // Derive pageType from the slug prefix for reliability, since the Write API
    // response may not always include the pageType field.
    if (result.data?.slug) {
      const slug = result.data.slug;
      const cleanSlug = slug.replace(/^\//, "");
      console.log(`[Builder.io API] Revalidating new info page: /${cleanSlug}`);
      revalidatePath(`/${cleanSlug}`);
      revalidatePath(`/${cleanSlug}`, "page");

      if (slug.startsWith("/project/")) {
        revalidatePath(`/project/${cleanSlug}`);
        revalidatePath("/pages/project");
        revalidatePath("/dashboard/projects");
      } else if (slug.startsWith("/person/")) {
        revalidatePath(`/person/${cleanSlug}`);
        revalidatePath("/pages/person");
      } else if (slug.startsWith("/organisation/")) {
        revalidatePath(`/organisation/${cleanSlug}`);
        revalidatePath("/pages/organisation");
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
