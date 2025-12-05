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
