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

// Initialize Builder.io SDK with public key
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
export const translateWixTagIdToBuilderId = (
  wixId: string
): string | undefined => {
  const builderId = wixToBuilderMap.get(wixId);
  if (!builderId) {
    console.warn(
      `Wix tag ID ${wixId} not found in mapping file - skipping mention`
    );
  }
  return builderId;
};

export const translateBuilderIdToWixTagId = (
  builderId: string
): string | undefined => {
  return builderToWixMap.get(builderId);
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
  const cacheKey = "tags.json";

  try {
    // Check Redis cache first (unless skipCache is true)
    if (!skipCache) {
      const cached = await RedisCacheService.getFromCache(cacheKey);
      if (cached && Array.isArray(cached)) {
        console.log("✓ Tags fetched from cache:", cached.length);
        return cached;
      }
    }

    // Fetch from Builder.io with retry logic
    const tags = await fetchWithRetry(async () => {
      const result = await builder.getAll("tag", {
        limit: 100, // Builder.io maximum per request
        options: {
          noTargeting: true, // Faster for backend queries
          includeRefs: includeRefs,
        },
      });
      return result as BuilderTag[];
    });

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
    const tag = await fetchWithRetry(async () => {
      const result = await builder.get("tag", {
        query: {
          id: id,
        },
        options: {
          includeRefs: includeRefs,
        },
      });
      return result as BuilderTag | null;
    });

    return tag;
  } catch (error: any) {
    if (error.statusCode === 404) {
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
 * @returns Created Builder.io tag with ID
 * @throws ValidationError if required fields missing
 * @throws DuplicateError if tag name already exists
 * @throws BuilderApiError on Builder.io failures
 */
export async function createBuilderTag(tagData: {
  name: string;
  tagType: string;
  tagLine?: string;
  picture?: string;
  tagPageLink?: string;
  masterTag?: string; // Builder.io tag ID
}): Promise<BuilderTag> {
  // Validate required fields
  if (!tagData.name || !tagData.name.trim()) {
    throw new ValidationError("Tag name is required", "name");
  }
  if (!tagData.tagType || !tagData.tagType.trim()) {
    throw new ValidationError("Tag type is required", "tagType");
  }

  try {
    // Check for duplicate name (case-insensitive)
    const allTags = await getAllBuilderTags({ skipCache: true });
    const duplicate = allTags.find(
      (tag) => tag.data.name.toLowerCase() === tagData.name.toLowerCase()
    );

    if (duplicate) {
      console.log(
        `Tag "${tagData.name}" already exists, returning existing tag`
      );
      throw new DuplicateError(
        `Tag with name "${tagData.name}" already exists`,
        duplicate.id
      );
    }

    // Transform to Builder.io format
    const payload = transformWixTagToBuilderFormat(tagData);

    // Create in Builder.io
    const createdTag = await fetchWithRetry(async () => {
      // @ts-ignore - Builder.io SDK types may not be complete
      const result = await builder.create({
        model: "tag",
        data: payload,
        published: "published",
      });
      return result as BuilderTag;
    });

    console.log(
      `✓ Tag "${tagData.name}" created in Builder.io:`,
      createdTag.id
    );

    // Invalidate cache to include new tag
    await RedisCacheService.invalidateCache("tags.json");

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

    // Update in Builder.io
    const updatedTag = await fetchWithRetry(async () => {
      // @ts-ignore - Builder.io SDK types may not be complete
      const result = await builder.update({
        model: "tag",
        id: id,
        data: updatedData,
      });
      return result as BuilderTag;
    });

    console.log(`✓ Tag ${id} updated in Builder.io`);

    // Invalidate cache
    await RedisCacheService.invalidateCache("tags.json");

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
