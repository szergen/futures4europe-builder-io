import { NextRequest, NextResponse } from "next/server";
import { RedisCacheService } from "@app/services/redisCache";
import {
  getAllBuilderTags,
  batchTransformBuilderTagsToWixFormat,
  BuilderApiError,
} from "@app/utils/builderTagUtils";

export const revalidate = 0;

export const GET = async (req: NextRequest) => {
  const cacheKey = "tags.json";

  try {
    // Try to get from cache first
    const cachedData = await RedisCacheService.getFromCache(cacheKey);
    if (cachedData) {
      console.log("✓ Returning cached tags");
      return NextResponse.json(cachedData);
    }

    // Fetch all tags from Builder.io
    console.log("Fetching tags from Builder.io...");
    const builderTags = await getAllBuilderTags({ skipCache: false });

    // Transform to Wix format for backward compatibility
    const wixFormattedTags = batchTransformBuilderTagsToWixFormat(builderTags);

    // Cache the transformed data
    await RedisCacheService.saveToCache(
      cacheKey,
      wixFormattedTags,
      4 * 60 * 60 * 1000
    );

    console.log(
      `✓ Fetched and cached ${wixFormattedTags.length} tags from Builder.io`
    );
    return NextResponse.json(wixFormattedTags);
  } catch (error) {
    console.error("Error fetching tags from Builder.io:", error);

    if (error instanceof BuilderApiError) {
      return NextResponse.json(
        {
          error: "Unable to fetch tags at this time",
          action: "Please try again in a few moments",
          code: "TAG_FETCH_FAILED",
          details: error.message,
        },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      {
        error: "Unable to fetch tags",
        action: "Please try again later",
        code: "TAG_FETCH_ERROR",
      },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  const cacheKey = "tags.json";

  try {
    console.log("Rebuilding tags cache from Builder.io...");

    // Fetch all tags from Builder.io (skip cache to force refresh)
    const builderTags = await getAllBuilderTags({ skipCache: true });

    // Transform to Wix format for backward compatibility
    const wixFormattedTags = batchTransformBuilderTagsToWixFormat(builderTags);

    // Save to cache
    await RedisCacheService.saveToCache(
      cacheKey,
      wixFormattedTags,
      4 * 60 * 60 * 1000
    );

    console.log(
      `✓ Cache rebuilt successfully with ${wixFormattedTags.length} tags`
    );
    return NextResponse.json(
      {
        message: "Tags cache updated successfully",
        count: wixFormattedTags.length,
        source: "Builder.io",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating tags cache:", error);

    if (error instanceof BuilderApiError) {
      return NextResponse.json(
        {
          error: "Unable to update tags cache",
          action: "Please try again in a few moments",
          code: "CACHE_UPDATE_FAILED",
          details: error.message,
        },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to update cache",
        action: "Please contact support if this persists",
        code: "CACHE_UPDATE_ERROR",
      },
      { status: 500 }
    );
  }
};
