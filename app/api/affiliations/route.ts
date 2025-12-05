import { NextRequest, NextResponse } from "next/server";
import { RedisCacheService } from "@app/services/redisCache";
import { fetchAffiliationsFromBuilder } from "@app/utils/builderAffiliationUtils";

export const revalidate = 0;

export const GET = async (req: NextRequest) => {
  const cacheKey = "affiliations.json";

  try {
    const cachedData = await RedisCacheService.getFromCache(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    // Fetch affiliations from Builder.io and transform to Wix-compatible format
    const affiliations = await fetchAffiliationsFromBuilder();

    await RedisCacheService.saveToCache(
      cacheKey,
      affiliations,
      4 * 60 * 60 * 1000
    );
    return NextResponse.json(affiliations);
  } catch (error) {
    console.error("Error fetching affiliations:", error);
    return NextResponse.json(
      { message: "Error fetching affiliations" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  const cacheKey = "affiliations.json";

  try {
    // Fetch fresh affiliations from Builder.io (bypass CDN cache)
    const affiliations = await fetchAffiliationsFromBuilder({
      cachebust: true,
    });

    await RedisCacheService.saveToCache(
      cacheKey,
      affiliations,
      4 * 60 * 60 * 1000
    );
    return NextResponse.json(
      { message: "Cache updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating cache:", error);
    return NextResponse.json(
      { message: "Failed to update cache" },
      {
        status: 500,
      }
    );
  }
};
