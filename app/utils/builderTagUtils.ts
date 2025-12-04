/**
 * Builder.io Tag Utilities
 *
 * Provides transformation and CRUD operations for tags using Builder.io as the source of truth.
 * This module replaces Wix-based tag operations with Builder.io equivalents.
 *
 * @module builderTagUtils
 */

import { builder } from "@builder.io/sdk";
import tagMappingData from "../../data/mappings/tag-migration-mapping.json";
import { RedisCacheService } from "../services/redisCache";

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Builder.io Reference type for related content
 */
export interface BuilderReference {
  "@type": "@builder.io/core:Reference";
  id: string;
  model: string;
  value?: any;
}

/**
 * Builder.io tag model structure
 */
export interface BuilderTag {
  id: string;
  data: {
    name: string;
    tagType: string;
    tagLine?: string;
    picture?: string;
    tagPageLink?: string;
    masterTag?: BuilderReference;
    wixId?: string;
  };
  createdDate: number;
  lastUpdated: number;
  published: string;
}

/**
 * Legacy Wix tag format for backward compatibility
 */
export interface WixTag {
  _id: string;
  name: string;
  tagType: string;
  tagLine?: string;
  picture?: string;
  tagPageLink?: string;
  masterTag?: string;
  wixId?: string;
  mentions?: number;
  _createdDate?: {
    $date: string;
  };
  _updatedDate?: {
    $date: string;
  };
}

/**
 * Tag mapping entry structure
 */
export interface TagMappingEntry {
  builderId: string;
  name: string;
  tagType?: string;
  migratedAt?: string;
}

/**
 * Complete mapping file structure
 */
export interface TagMappingFile {
  wixToBuilder: {
    [wixId: string]: TagMappingEntry;
  };
}

// ============================================================================
// Error Classes
// ============================================================================

/**
 * Validation error for invalid tag data
 */
export class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message);
    this.name = "ValidationError";
  }
}

/**
 * Duplicate tag error
 */
export class DuplicateError extends Error {
  constructor(message: string, public existingId: string) {
    super(message);
    this.name = "DuplicateError";
  }
}

/**
 * Tag not found error
 */
export class NotFoundError extends Error {
  constructor(message: string, public id: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

/**
 * Builder.io API error
 */
export class BuilderApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: any
  ) {
    super(message);
    this.name = "BuilderApiError";
  }
}

// ============================================================================
// Module Initialization
// ============================================================================

// Note: Using Builder.io REST API directly instead of SDK for better reliability
// SDK initialization kept for potential future use
if (typeof window !== "undefined") {
  // Client-side initialization
  builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || "");
} else {
  // Server-side initialization with private key for write operations
  builder.init(
    process.env.BUILDER_PRIVATE_API_KEY ||
      process.env.NEXT_PUBLIC_BUILDER_API_KEY ||
      ""
  );
}

// Load mapping file and build lookup maps
const mappingFile = tagMappingData as TagMappingFile;
const wixToBuilderMap = new Map<string, string>();
const builderToWixMap = new Map<string, string>();

// Build bidirectional maps for O(1) lookup
Object.entries(mappingFile.wixToBuilder).forEach(([wixId, entry]) => {
  wixToBuilderMap.set(wixId, entry.builderId);
  builderToWixMap.set(entry.builderId, wixId);
});

console.log(`✓ Tag mapping loaded: ${wixToBuilderMap.size} entries`);

// Export mapping functions
// Track missing IDs to avoid duplicate warnings
const missingWixIds = new Set<string>();

export const translateWixTagIdToBuilderId = (
  wixId: string | undefined | null
): string | undefined => {
  // Guard against undefined/null values
  if (!wixId) {
    return undefined;
  }

  const builderId = wixToBuilderMap.get(wixId);
  if (!builderId) {
    // Only log each missing ID once
    if (!missingWixIds.has(wixId)) {
      missingWixIds.add(wixId);
      console.warn(
        `[MAPPING MISS] Wix tag ID ${wixId} not found in mapping file (total missing: ${missingWixIds.size})`
      );
    }
  }
  return builderId;
};

export const translateBuilderIdToWixTagId = (
  builderId: string | undefined | null
): string | undefined => {
  // Guard against undefined/null values
  if (!builderId) {
    return undefined;
  }

  return builderToWixMap.get(builderId);
};

// Export function to get missing IDs summary
export const getMissingWixIds = (): string[] => {
  return Array.from(missingWixIds);
};

// Export function to clear missing IDs tracking
export const clearMissingWixIds = (): void => {
  missingWixIds.clear();
};

// ============================================================================
// Retry Utility
// ============================================================================

/**
 * Retry a function with exponential backoff
 */
export async function fetchWithRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      const isLastAttempt = attempt === maxRetries - 1;
      if (isLastAttempt) throw error;

      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, attempt) * 1000;
      console.log(
        `Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new Error("Max retries exceeded");
}

// ============================================================================
// Transformation Functions
// ============================================================================

/**
 * Transform Builder.io tag to Wix-compatible format
 *
 * @param builderTag - Builder.io tag object
 * @param mentions - Optional mention count (calculated separately)
 * @returns Wix-compatible tag object
 */
export function transformBuilderTagToWixFormat(
  builderTag: BuilderTag,
  mentions?: number
): WixTag {
  return {
    _id: builderTag.id,
    name: builderTag.data.name,
    tagType: builderTag.data.tagType,
    tagLine: builderTag.data.tagLine,
    picture: builderTag.data.picture,
    tagPageLink: builderTag.data.tagPageLink,
    masterTag: builderTag.data.masterTag?.id,
    wixId: builderTag.data.wixId,
    mentions: mentions,
    _createdDate: builderTag.createdDate
      ? { $date: new Date(builderTag.createdDate).toISOString() }
      : undefined,
    _updatedDate: builderTag.lastUpdated
      ? { $date: new Date(builderTag.lastUpdated).toISOString() }
      : undefined,
  };
}

/**
 * Transform Wix tag to Builder.io creation payload
 *
 * @param wixTag - Wix tag object (partial for creation)
 * @returns Builder.io data payload
 * @throws ValidationError if required fields are missing
 */
export function transformWixTagToBuilderFormat(wixTag: Partial<WixTag>): {
  name: string;
  tagType: string;
  tagLine?: string;
  picture?: string;
  tagPageLink?: string;
  masterTag?: BuilderReference;
  wixId?: string;
} {
  // Validate required fields
  if (!wixTag.name) {
    throw new ValidationError("Tag name is required", "name");
  }
  if (!wixTag.tagType) {
    throw new ValidationError("Tag type is required", "tagType");
  }

  const payload: any = {
    name: wixTag.name,
    tagType: wixTag.tagType,
  };

  // Add optional fields if present
  if (wixTag.tagLine) payload.tagLine = wixTag.tagLine;
  if (wixTag.picture) payload.picture = wixTag.picture;
  if (wixTag.tagPageLink) payload.tagPageLink = wixTag.tagPageLink;
  if (wixTag.wixId) payload.wixId = wixTag.wixId;

  // Convert masterTag string ID to Builder.io reference
  if (wixTag.masterTag) {
    payload.masterTag = {
      "@type": "@builder.io/core:Reference",
      id: wixTag.masterTag,
      model: "tag",
    };
  }

  return payload;
}

/**
 * Batch transform Builder.io tags to Wix format (optimized)
 *
 * @param builderTags - Array of Builder.io tags
 * @param mentionsMap - Optional map of tag ID → mention count
 * @returns Array of Wix-compatible tags
 */
export function batchTransformBuilderTagsToWixFormat(
  builderTags: BuilderTag[],
  mentionsMap?: Map<string, number>
): WixTag[] {
  return builderTags.map((tag) => {
    const mentions = mentionsMap?.get(tag.id);
    return transformBuilderTagToWixFormat(tag, mentions);
  });
}

// ============================================================================
// Builder.io Tag CRUD Operations
// ============================================================================

/**
 * Fetch all tags from Builder.io with caching support
 *
 * @param options - Fetch options
 * @param options.includeRefs - Whether to expand masterTag references
 * @param options.skipCache - Whether to bypass Redis cache
 * @returns Array of Builder.io tag objects
 * @throws BuilderApiError on Builder.io failures
 */
export async function getAllBuilderTags(options?: {
  includeRefs?: boolean;
  skipCache?: boolean;
}): Promise<BuilderTag[]> {
  const { includeRefs = false, skipCache = false } = options || {};
  const cacheKey = "builder-tags-raw_builder.json"; // Builder.io implementation cache (isolated from production)

  try {
    // Check Redis cache first (unless skipCache is true)
    if (!skipCache) {
      const cached = await RedisCacheService.getFromCache(cacheKey);
      if (cached && Array.isArray(cached)) {
        console.log("✓ Builder.io tags fetched from cache:", cached.length);
        return cached;
      }
    }

    // Fetch from Builder.io with manual pagination
    console.log("Fetching tags from Builder.io SDK...");

    const { builderConfig } = await import("../../builder.config");
    if (builderConfig.apiKey) {
      builder.init(builderConfig.apiKey);
    }

    const allTags: BuilderTag[] = [];
    let offset = 0;
    const limit = 100; // Fetch 100 at a time
    let hasMore = true;

    while (hasMore) {
      const batch = await fetchWithRetry(async () => {
        const results = await builder.getAll("tag", {
          limit: limit,
          offset: offset,
          options: {
            noTargeting: true,
            includeRefs: includeRefs,
          },
          cachebust: true,
        });
        return results as BuilderTag[];
      });

      // Validate batch structure
      const invalidTags = batch.filter((tag) => !tag?.data?.name);
      if (invalidTags.length > 0) {
        console.warn(
          `⚠️  Found ${invalidTags.length} tags with missing names in batch at offset ${offset}`
        );
        console.warn(
          `Sample invalid tag:`,
          JSON.stringify(invalidTags[0], null, 2)
        );
      }

      allTags.push(...batch);
      console.log(
        `Fetched ${batch.length} tags (offset: ${offset}, total: ${allTags.length})`
      );

      hasMore = batch.length === limit;
      offset += limit;

      // Safety check
      if (offset > 10000) {
        console.warn("Reached offset limit of 10000, stopping");
        break;
      }
    }

    console.log(`✓ Fetched total ${allTags.length} tags from Builder.io`);

    // Validate all tags
    const validTags = allTags.filter((tag) => tag?.data?.name);
    const invalidTags = allTags.filter((tag) => !tag?.data?.name);

    if (invalidTags.length > 0) {
      console.error(
        `❌ Data quality issue: ${invalidTags.length}/${allTags.length} tags have missing names`
      );
      console.error(
        `Invalid tag IDs:`,
        invalidTags.slice(0, 5).map((t) => t?.id)
      );
    }

    console.log(
      `✅ Valid tags with names: ${validTags.length}/${allTags.length}`
    );
    const tags = allTags;

    // Cache the result (4-hour TTL = 14,400,000 ms)
    if (tags && tags.length > 0) {
      await RedisCacheService.saveToCache(cacheKey, tags, 14400000);
      console.log("✓ Tags fetched from Builder.io and cached:", tags.length);
    }

    return tags || [];
  } catch (error: any) {
    console.error("Failed to fetch tags from Builder.io:", error);
    throw new BuilderApiError(
      "Failed to fetch tags from Builder.io",
      error.statusCode || 500,
      error
    );
  }
}

/**
 * Fetch a single tag by Builder.io ID
 *
 * @param id - Builder.io tag ID
 * @param options - Fetch options
 * @param options.includeRefs - Whether to expand masterTag reference
 * @returns Builder.io tag object or null if not found
 * @throws BuilderApiError on API failures
 */
export async function getBuilderTagById(
  id: string,
  options?: { includeRefs?: boolean }
): Promise<BuilderTag | null> {
  const { includeRefs = false } = options || {};

  try {
    // Initialize builder with API key
    const { builderConfig } = await import("../../builder.config");
    if (builderConfig.apiKey) {
      builder.init(builderConfig.apiKey);
    }

    const tag = await fetchWithRetry(async () => {
      const result = await builder.get("tag", {
        query: {
          id: id,
        },
        options: {
          includeRefs: includeRefs,
        },
        cachebust: true,
      });
      return result as BuilderTag | null;
    });

    return tag;
  } catch (error: any) {
    if (error.statusCode === 404 || error.message?.includes("404")) {
      return null;
    }
    throw new BuilderApiError(
      `Failed to fetch tag ${id}`,
      error.statusCode || 500,
      error
    );
  }
}

/**
 * Create a new tag in Builder.io with validation and duplicate checking
 *
 * @param tagData - Tag data to create
 * @param existingTags - Optional: Pre-loaded tags for duplicate checking (avoids re-fetching)
 * @returns Created Builder.io tag with ID
 * @throws ValidationError if required fields missing
 * @throws DuplicateError if tag name already exists
 * @throws BuilderApiError on Builder.io failures
 */
export async function createBuilderTag(
  tagData: {
    name: string;
    tagType: string;
    tagLine?: string;
    picture?: string;
    tagPageLink?: string;
    masterTag?: string; // Builder.io tag ID
  },
  existingTags?: Array<{ name?: string; _id?: string }> // Optional: pass existing tags to avoid refetch
): Promise<BuilderTag> {
  // Validate required fields
  if (!tagData.name || !tagData.name.trim()) {
    throw new ValidationError("Tag name is required", "name");
  }
  if (!tagData.tagType || !tagData.tagType.trim()) {
    throw new ValidationError("Tag type is required", "tagType");
  }

  try {
    // Check for duplicate name (case-insensitive)
    // OPTIMIZATION: Use provided tags if available, otherwise use cache (not re-fetch!)
    let duplicate: any = null;

    if (existingTags && existingTags.length > 0) {
      // Fast path: Use pre-loaded tags from caller (no API call)
      console.log(
        `Checking for duplicate tag: "${tagData.name}" using ${existingTags.length} pre-loaded tags`
      );
      duplicate = existingTags.find(
        (tag) =>
          tag?.name && tag.name.toLowerCase() === tagData.name.toLowerCase()
      );
    } else {
      // Fallback: Use cache (skipCache: false to avoid re-fetching everything)
      const cachedTags = await RedisCacheService.getFromCache(
        "tags_builder.json"
      );
      if (cachedTags && Array.isArray(cachedTags)) {
        console.log(
          `Checking for duplicate tag: "${tagData.name}" using ${cachedTags.length} cached tags`
        );
        duplicate = cachedTags.find(
          (tag: any) =>
            tag?.name && tag.name.toLowerCase() === tagData.name.toLowerCase()
        );
      } else {
        // Last resort: Only fetch if no cache exists
        console.log(
          `No cache available, fetching tags for duplicate check: "${tagData.name}"`
        );
        const allTags = await getAllBuilderTags({ skipCache: false });
        duplicate = allTags.find((tag) => {
          if (!tag?.data?.name) return false;
          return tag.data.name.toLowerCase() === tagData.name.toLowerCase();
        });
      }
    }

    if (duplicate) {
      console.log(
        `Tag "${tagData.name}" already exists with ID ${duplicate.id}`
      );
      throw new DuplicateError(
        `Tag with name "${tagData.name}" already exists`,
        duplicate.id
      );
    }

    console.log(
      `No duplicate found for "${tagData.name}", proceeding with creation`
    );

    // Transform to Builder.io format
    const payload = transformWixTagToBuilderFormat(tagData);

    // Get private API key for write operations
    const { builderConfig } = await import("../../builder.config");
    const apiKey = builderConfig.privateApiKey;

    if (!apiKey) {
      throw new Error(
        "Builder.io private API key required for write operations. Set BUILDER_PRIVATE_API_KEY in environment."
      );
    }

    const createdTag = await fetchWithRetry(async () => {
      const res = await fetch("https://builder.io/api/v1/write/tag", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: payload.name,
          data: payload,
          published: "published",
        }),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Builder.io create error: ${res.status} - ${error}`);
      }

      return res.json();
    });

    console.log(
      `✓ Tag "${tagData.name}" created in Builder.io:`,
      createdTag.id
    );

    // OPTIMIZATION: Append to cache instead of invalidating
    // This is faster and doesn't require refetching all 3000+ tags
    try {
      // 1. Append to raw Builder.io tags cache
      const rawCacheKey = "builder-tags-raw_builder.json";
      const rawCached = await RedisCacheService.getFromCache(rawCacheKey);
      if (rawCached && Array.isArray(rawCached)) {
        rawCached.push(createdTag);
        await RedisCacheService.saveToCache(
          rawCacheKey,
          rawCached,
          4 * 60 * 60 * 1000
        );
        console.log("✓ New tag appended to raw cache");
      }

      // 2. Append to transformed Wix format cache
      const wixCacheKey = "tags_builder.json";
      const wixCached = await RedisCacheService.getFromCache(wixCacheKey);
      if (wixCached && Array.isArray(wixCached)) {
        const wixFormatted = transformBuilderTagToWixFormat(createdTag);
        wixCached.push(wixFormatted);
        await RedisCacheService.saveToCache(
          wixCacheKey,
          wixCached,
          4 * 60 * 60 * 1000
        );
        console.log("✓ New tag appended to Wix format cache");
      }

      // 3. Append to tags-with-popularity cache (with 0 mentions initially)
      const popCacheKey = "tags-with-popularity_builder.json";
      const popCached = await RedisCacheService.getFromCache(popCacheKey);
      if (popCached && Array.isArray(popCached)) {
        const wixFormatted = transformBuilderTagToWixFormat(createdTag);
        popCached.push({ ...wixFormatted, mentions: 0 });
        await RedisCacheService.saveToCache(
          popCacheKey,
          popCached,
          4 * 60 * 60 * 1000
        );
        console.log("✓ New tag appended to popularity cache");
      }
    } catch (cacheError) {
      console.warn(
        "Failed to append tag to cache, will invalidate:",
        cacheError
      );
      // Fallback to invalidation if append fails
      await RedisCacheService.invalidateCache("builder-tags-raw_builder.json");
      await RedisCacheService.invalidateCache("tags_builder.json");
      await RedisCacheService.invalidateCache(
        "tags-with-popularity_builder.json"
      );
    }

    return createdTag;
  } catch (error: any) {
    if (error instanceof DuplicateError) {
      throw error;
    }
    if (error instanceof ValidationError) {
      throw error;
    }

    console.error("Failed to create tag in Builder.io:", error);
    throw new BuilderApiError(
      `Failed to create tag "${tagData.name}"`,
      error.statusCode || 500,
      error
    );
  }
}

/**
 * Update an existing tag in Builder.io
 *
 * @param id - Builder.io tag ID
 * @param updates - Partial tag data to update
 * @returns Updated Builder.io tag
 * @throws NotFoundError if tag doesn't exist
 * @throws ValidationError on circular reference
 * @throws BuilderApiError on Builder.io failures
 */
export async function updateBuilderTag(
  id: string,
  updates: Partial<{
    name: string;
    tagType: string;
    tagLine: string;
    picture: string;
    tagPageLink: string;
    masterTag: string;
  }>
): Promise<BuilderTag> {
  try {
    // Fetch current tag
    const currentTag = await getBuilderTagById(id);
    if (!currentTag) {
      throw new NotFoundError(`Tag with ID ${id} not found`, id);
    }

    // Check for circular masterTag reference
    if (updates.masterTag) {
      if (updates.masterTag === id) {
        throw new ValidationError(
          "Tag cannot reference itself as masterTag",
          "masterTag"
        );
      }
      // TODO: Add deeper circular reference check if needed
    }

    // Merge updates
    const updatedData: any = { ...currentTag.data };
    if (updates.name) updatedData.name = updates.name;
    if (updates.tagType) updatedData.tagType = updates.tagType;
    if (updates.tagLine !== undefined) updatedData.tagLine = updates.tagLine;
    if (updates.picture !== undefined) updatedData.picture = updates.picture;
    if (updates.tagPageLink !== undefined)
      updatedData.tagPageLink = updates.tagPageLink;
    if (updates.masterTag !== undefined) {
      updatedData.masterTag = {
        "@type": "@builder.io/core:Reference",
        id: updates.masterTag,
        model: "tag",
      };
    }

    // Get private API key for write operations
    const { builderConfig } = await import("../../builder.config");
    const apiKey = builderConfig.privateApiKey;

    if (!apiKey) {
      throw new Error(
        "Builder.io private API key required for write operations. Set BUILDER_PRIVATE_API_KEY in environment."
      );
    }

    const updatedTag = await fetchWithRetry(async () => {
      const res = await fetch(`https://builder.io/api/v1/write/tag/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: updatedData.name,
          data: updatedData,
          published: "published",
        }),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Builder.io update error: ${res.status} - ${error}`);
      }

      return res.json();
    });

    console.log(`✓ Tag ${id} updated in Builder.io`);

    // OPTIMIZATION: Update cache entries instead of invalidating
    try {
      // 1. Update raw Builder.io tags cache
      const rawCacheKey = "builder-tags-raw_builder.json";
      const rawCached = await RedisCacheService.getFromCache(rawCacheKey);
      if (rawCached && Array.isArray(rawCached)) {
        const index = rawCached.findIndex((tag) => tag.id === id);
        if (index !== -1) {
          rawCached[index] = updatedTag;
          await RedisCacheService.saveToCache(
            rawCacheKey,
            rawCached,
            4 * 60 * 60 * 1000
          );
          console.log("✓ Tag updated in raw cache");
        }
      }

      // 2. Update transformed Wix format cache
      const wixCacheKey = "tags_builder.json";
      const wixCached = await RedisCacheService.getFromCache(wixCacheKey);
      if (wixCached && Array.isArray(wixCached)) {
        const index = wixCached.findIndex((tag) => tag._id === id);
        if (index !== -1) {
          const wixFormatted = transformBuilderTagToWixFormat(updatedTag);
          // Preserve existing mentions if present
          const existingMentions = wixCached[index].mentions;
          wixCached[index] = { ...wixFormatted, mentions: existingMentions };
          await RedisCacheService.saveToCache(
            wixCacheKey,
            wixCached,
            4 * 60 * 60 * 1000
          );
          console.log("✓ Tag updated in Wix format cache");
        }
      }

      // 3. Update tags-with-popularity cache
      const popCacheKey = "tags-with-popularity_builder.json";
      const popCached = await RedisCacheService.getFromCache(popCacheKey);
      if (popCached && Array.isArray(popCached)) {
        const index = popCached.findIndex((tag) => tag._id === id);
        if (index !== -1) {
          const wixFormatted = transformBuilderTagToWixFormat(updatedTag);
          // Preserve existing mentions
          const existingMentions = popCached[index].mentions;
          popCached[index] = { ...wixFormatted, mentions: existingMentions };
          await RedisCacheService.saveToCache(
            popCacheKey,
            popCached,
            4 * 60 * 60 * 1000
          );
          console.log("✓ Tag updated in popularity cache");
        }
      }
    } catch (cacheError) {
      console.warn(
        "Failed to update tag in cache, will invalidate:",
        cacheError
      );
      // Fallback to invalidation if update fails
      await RedisCacheService.invalidateCache("builder-tags-raw_builder.json");
      await RedisCacheService.invalidateCache("tags_builder.json");
      await RedisCacheService.invalidateCache(
        "tags-with-popularity_builder.json"
      );
    }

    return updatedTag;
  } catch (error: any) {
    if (error instanceof NotFoundError || error instanceof ValidationError) {
      throw error;
    }

    console.error(`Failed to update tag ${id}:`, error);
    throw new BuilderApiError(
      `Failed to update tag ${id}`,
      error.statusCode || 500,
      error
    );
  }
}
