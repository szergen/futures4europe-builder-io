/**
 * Builder.io Affiliation Utilities
 *
 * Provides functions for fetching affiliations from Builder.io with resolved
 * tag references, for use by info pages (person, organisation, project).
 */

import { getAllBuilderContent } from "@app/shared-components/Builder";
import { RedisCacheService } from "@app/services/redisCache";

// Cache key for affiliations with full ref data
const AFFILIATIONS_CACHE_KEY = "affiliations_builder.json";

// Cache TTL: 4 hours
const CACHE_TTL = 4 * 60 * 60 * 1000;

/**
 * Transform a Builder.io reference to a flat tag object
 * Handles the nested reference structure from Builder.io
 */
function transformTagReference(ref: any): any {
  if (!ref) return null;

  // Handle Builder.io reference format with resolved value
  if (ref["@type"] === "@builder.io/core:Reference" && ref.value) {
    const refData = ref.value.data || {};
    return {
      _id: ref.id,
      name: refData.name || ref.value.name || "",
      tagType: refData.tagType || "",
      tagLine: refData.tagLine || "",
      picture: refData.picture || "",
      tagPageLink: refData.tagPageLink || "",
    };
  }

  // Handle reference without resolved value (just ID)
  if (ref["@type"] === "@builder.io/core:Reference" && ref.id) {
    return { _id: ref.id };
  }

  // Handle if ref itself has the structure (alternative format)
  if (ref.value && ref.value.data) {
    const refData = ref.value.data;
    return {
      _id: ref.id || ref.value.id,
      name: refData.name || ref.value.name || "",
      tagType: refData.tagType || "",
      tagLine: refData.tagLine || "",
      picture: refData.picture || "",
      tagPageLink: refData.tagPageLink || "",
    };
  }

  return null;
}

/**
 * Transform a raw Builder.io affiliation to the format expected by info pages
 * This includes full tag objects resolved from references
 */
function transformAffiliationForInfoPage(affiliation: any): any {
  const data = affiliation.data || {};

  return {
    _id: affiliation.id,
    title: data.title || affiliation.name || "",
    projectTag: transformTagReference(data.projectTag),
    organisationTag: transformTagReference(data.organisationTag),
    extraOrganisationTag: transformTagReference(data.extraOrganisationTag),
    personTag: transformTagReference(data.personTag),
    role: data.role || "",
    extraIdentifier: data.extraIdentifier || "",
  };
}

/**
 * Fetch all affiliations from Builder.io WITH resolved tag references
 * Uses getAllBuilderContent which includes refs automatically
 * Results are cached in Redis for performance
 *
 * @param options.cachebust - Force fresh fetch from Builder.io
 * @returns Array of affiliations with full tag objects
 */
export async function fetchAffiliationsWithRefs(options?: {
  cachebust?: boolean;
}): Promise<any[]> {
  // Check cache first (unless cachebust)
  if (!options?.cachebust) {
    const cached = await RedisCacheService.getFromCache(AFFILIATIONS_CACHE_KEY);
    if (cached) {
      return cached;
    }
  }

  // Fetch all affiliations using getAllBuilderContent (which has includeRefs: true)
  const allAffiliations: any[] = [];
  const limit = 100;
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const results = await getAllBuilderContent("affiliations", {
      limit,
      offset,
    });

    if (results && results.length > 0) {
      allAffiliations.push(...results);
      offset += limit;

      if (results.length < limit) {
        hasMore = false;
      }
    } else {
      hasMore = false;
    }
  }

  // Transform to format with full tag objects
  const transformed = allAffiliations.map(transformAffiliationForInfoPage);

  // Cache the result
  await RedisCacheService.saveToCache(
    AFFILIATIONS_CACHE_KEY,
    transformed,
    CACHE_TTL
  );

  console.log(
    `[Builder.io] Cached ${transformed.length} affiliations with refs`
  );

  return transformed;
}

/**
 * Get all cached affiliations, or fetch if not cached
 * This is the main entry point for getting affiliations
 */
export async function getAllAffiliations(): Promise<any[]> {
  // Try cache first
  const cached = await RedisCacheService.getFromCache(AFFILIATIONS_CACHE_KEY);
  if (cached) {
    return cached;
  }

  // Fetch and cache
  return fetchAffiliationsWithRefs();
}

/**
 * Get affiliations filtered by person tag ID
 */
export async function getAffiliationsByPersonTag(
  personTagId: string
): Promise<any[]> {
  const all = await getAllAffiliations();
  return all.filter((aff) => aff.personTag?._id === personTagId);
}

/**
 * Get affiliations filtered by organisation tag ID
 */
export async function getAffiliationsByOrgTag(
  organisationTagId: string
): Promise<any[]> {
  const all = await getAllAffiliations();
  return all.filter(
    (aff) =>
      aff.organisationTag?._id === organisationTagId ||
      aff.extraOrganisationTag?._id === organisationTagId
  );
}

/**
 * Get affiliations filtered by project tag ID
 */
export async function getAffiliationsByProjectTag(
  projectTagId: string
): Promise<any[]> {
  const all = await getAllAffiliations();
  return all.filter((aff) => aff.projectTag?._id === projectTagId);
}

/**
 * Refresh affiliations cache
 * Called by POST /api/affiliations
 */
export async function refreshAffiliationsCache(): Promise<any[]> {
  return fetchAffiliationsWithRefs({ cachebust: true });
}

// ============================================================================
// WRITE API UTILITIES (FOR CREATING/DELETING AFFILIATIONS)
// ============================================================================

const AFFILIATIONS_API_ROUTE = "/api/builder/affiliations";

/**
 * Create multiple affiliations in Builder.io and update cache
 *
 * @param affiliations - Array of affiliation data objects
 * @returns Object with created and failed arrays
 */
export async function bulkCreateAffiliations(
  affiliations: Array<{
    projectTag: { _id: string; name?: string };
    personTag?: { _id: string; name?: string };
    organisationTag?: { _id: string; name?: string };
    role?: string;
    extraIdentifier: string;
  }>
): Promise<{ created: any[]; failed: any[] }> {
  if (!affiliations || affiliations.length === 0) {
    return { created: [], failed: [] };
  }

  // Transform affiliations to Builder.io API format
  const payload = affiliations.map((aff) => {
    const targetName =
      aff.personTag?.name || aff.organisationTag?.name || "Entity";
    const title = `${aff.projectTag.name || "Project"} -to- ${targetName}`;

    return {
      name: title,
      data: {
        title,
        projectTag: {
          "@type": "@builder.io/core:Reference",
          id: aff.projectTag._id,
          model: "tag",
        },
        ...(aff.personTag && {
          personTag: {
            "@type": "@builder.io/core:Reference",
            id: aff.personTag._id,
            model: "tag",
          },
        }),
        ...(aff.organisationTag && {
          organisationTag: {
            "@type": "@builder.io/core:Reference",
            id: aff.organisationTag._id,
            model: "tag",
          },
        }),
        role: aff.role || "",
        extraIdentifier: aff.extraIdentifier,
      },
      published: "published",
    };
  });

  console.log(
    `[Builder.io] Creating ${affiliations.length} affiliations via API`
  );

  try {
    const response = await fetch(AFFILIATIONS_API_ROUTE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ affiliations: payload }),
    });

    const result = await response.json();

    // Update cache with created affiliations
    if (result.created?.length > 0) {
      await appendToAffiliationsCache(result.created);
    }

    console.log(
      `[Builder.io] Affiliations created: ${
        result.created?.length || 0
      }, failed: ${result.failed?.length || 0}`
    );

    return {
      created: result.created || [],
      failed: result.failed || [],
    };
  } catch (error) {
    console.error("[Builder.io] Error creating affiliations:", error);
    return {
      created: [],
      failed: affiliations.map((aff) => ({
        name: `${aff.projectTag.name} -to- ${
          aff.personTag?.name || aff.organisationTag?.name
        }`,
        error: String(error),
      })),
    };
  }
}

/**
 * Delete multiple affiliations from Builder.io and update cache
 *
 * @param affiliationIds - Array of Builder.io affiliation IDs
 * @returns Object with deleted and failed arrays
 */
export async function bulkDeleteAffiliations(
  affiliationIds: string[]
): Promise<{ deleted: string[]; failed: any[] }> {
  if (!affiliationIds || affiliationIds.length === 0) {
    return { deleted: [], failed: [] };
  }

  console.log(
    `[Builder.io] Deleting ${affiliationIds.length} affiliations via API`
  );

  try {
    const response = await fetch(`${AFFILIATIONS_API_ROUTE}/bulk-delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: affiliationIds }),
    });

    const result = await response.json();

    // Update cache by removing deleted affiliations
    if (result.deleted?.length > 0) {
      await removeFromAffiliationsCache(result.deleted);
    }

    console.log(
      `[Builder.io] Affiliations deleted: ${
        result.deleted?.length || 0
      }, failed: ${result.failed?.length || 0}`
    );

    return {
      deleted: result.deleted || [],
      failed: result.failed || [],
    };
  } catch (error) {
    console.error("[Builder.io] Error deleting affiliations:", error);
    return {
      deleted: [],
      failed: affiliationIds.map((id) => ({
        id,
        error: String(error),
      })),
    };
  }
}

/**
 * Append new affiliations to the cache without full refetch
 *
 * @param newAffiliations - Array of newly created affiliations from API response
 */
export async function appendToAffiliationsCache(
  newAffiliations: any[]
): Promise<void> {
  if (!newAffiliations || newAffiliations.length === 0) return;

  try {
    const cached = await RedisCacheService.getFromCache(AFFILIATIONS_CACHE_KEY);

    // Transform new affiliations to match cache format
    const transformed = newAffiliations.map(transformAffiliationForInfoPage);

    if (cached && Array.isArray(cached)) {
      cached.push(...transformed);
      await RedisCacheService.saveToCache(
        AFFILIATIONS_CACHE_KEY,
        cached,
        CACHE_TTL
      );
      console.log(
        `[Builder.io] Appended ${transformed.length} affiliations to cache (total: ${cached.length})`
      );
    } else {
      // No cache exists - save new affiliations as cache
      await RedisCacheService.saveToCache(
        AFFILIATIONS_CACHE_KEY,
        transformed,
        CACHE_TTL
      );
      console.log(
        `[Builder.io] Created new cache with ${transformed.length} affiliations`
      );
    }
  } catch (error) {
    console.warn("[Builder.io] Failed to update affiliations cache:", error);
    // Don't throw - cache update failure shouldn't block the operation
  }
}

/**
 * Remove affiliations from the cache without full refetch
 *
 * @param affiliationIds - Array of affiliation IDs to remove
 */
export async function removeFromAffiliationsCache(
  affiliationIds: string[]
): Promise<void> {
  if (!affiliationIds || affiliationIds.length === 0) return;

  try {
    const cached = await RedisCacheService.getFromCache(AFFILIATIONS_CACHE_KEY);

    if (cached && Array.isArray(cached)) {
      const idSet = new Set(affiliationIds);
      const filtered = cached.filter((aff) => !idSet.has(aff._id));
      await RedisCacheService.saveToCache(
        AFFILIATIONS_CACHE_KEY,
        filtered,
        CACHE_TTL
      );
      console.log(
        `[Builder.io] Removed ${affiliationIds.length} affiliations from cache (remaining: ${filtered.length})`
      );
    }
  } catch (error) {
    console.warn(
      "[Builder.io] Failed to remove affiliations from cache:",
      error
    );
    // Don't throw - cache update failure shouldn't block the operation
  }
}
