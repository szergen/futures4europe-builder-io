import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { RedisCacheService } from "@app/services/redisCache";

export async function POST(req: NextRequest) {
  try {
    const { key, path } = await req.json();

    // Invalidate specific cache key
    if (key) {
      console.log(`Invalidating cache key: ${key} (Builder.io-sourced data)`);
      await RedisCacheService.invalidateCache(key);
    }

    // Invalidate all cache
    if (key === "*") {
      console.log("Invalidating all cache (Builder.io-sourced data)");
      await RedisCacheService.invalidateAllCache();
    }

    // Revalidate path if provided
    if (path) {
      console.log(`Revalidating path: ${path}`);
      revalidatePath(path);
    }

    console.log("✓ Cache invalidation complete");
    return NextResponse.json({
      success: true,
      invalidated: key || "none",
      revalidated: path || "none",
      source: "Builder.io",
    });
  } catch (error) {
    console.error("Error invalidating cache:", error);
    return NextResponse.json(
      {
        error: "Failed to invalidate cache",
        action: "Please try again",
        code: "CACHE_INVALIDATION_ERROR",
      },
      { status: 500 }
    );
  }
}
