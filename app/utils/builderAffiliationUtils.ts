/**
 * Builder.io Affiliation Utilities
 *
 * Provides functions for fetching affiliations from Builder.io and
 * transforming them to the Wix-compatible format for backwards compatibility.
 */

import { builder } from "@builder.io/sdk";

// Initialize Builder with API key
const BUILDER_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY || "";

// Builder.io Reference type
export interface BuilderReference {
  "@type": "@builder.io/core:Reference";
  id: string;
  model: string;
  value?: any;
}

// Builder.io Affiliation (raw format from Builder.io)
export interface BuilderAffiliation {
  id: string;
  name: string;
  published?: "published" | "draft";
  createdDate?: number;
  lastUpdated?: number;
  data: {
    title?: string;
    projectTag?: BuilderReference;
    organisationTag?: BuilderReference;
    extraOrganisationTag?: BuilderReference;
    personTag?: BuilderReference;
    role?: string;
    extraIdentifier?: string;
    wixId?: string;
  };
}

// Wix-compatible Affiliation (transformed format for API response)
export interface WixCompatibleAffiliation {
  data: {
    title?: string;
    projectTag?: string | null;
    organisationTag?: string | null;
    extraOrganisationTag?: string | null;
    personTag?: string | null;
    role?: string;
    extraIdentifier?: string;
    _id?: string;
    _createdDate?: { $date: string };
    _updatedDate?: { $date: string };
  };
}

/**
 * Extract the ID from a Builder.io reference field
 * @param ref - Builder.io reference object or undefined
 * @returns The reference ID or null
 */
function extractReferenceId(ref: BuilderReference | undefined): string | null {
  if (!ref) return null;
  return ref.id || null;
}

/**
 * Transform a Builder.io affiliation to Wix-compatible format
 *
 * This maintains backwards compatibility with existing consumers that expect
 * the Wix response format with the `{ data: { ... } }` wrapper.
 *
 * @param builderAffiliation - Raw affiliation from Builder.io
 * @returns Transformed affiliation in Wix-compatible format
 */
export function transformBuilderAffiliationToWixFormat(
  builderAffiliation: BuilderAffiliation
): WixCompatibleAffiliation {
  const data = builderAffiliation.data || {};

  return {
    data: {
      title: data.title || builderAffiliation.name || "",
      projectTag: extractReferenceId(data.projectTag),
      organisationTag: extractReferenceId(data.organisationTag),
      extraOrganisationTag: extractReferenceId(data.extraOrganisationTag),
      personTag: extractReferenceId(data.personTag),
      role: data.role || "",
      extraIdentifier: data.extraIdentifier || "",
      _id: builderAffiliation.id,
      _createdDate: builderAffiliation.createdDate
        ? { $date: new Date(builderAffiliation.createdDate).toISOString() }
        : undefined,
      _updatedDate: builderAffiliation.lastUpdated
        ? { $date: new Date(builderAffiliation.lastUpdated).toISOString() }
        : undefined,
    },
  };
}

/**
 * Fetch all affiliations from Builder.io with pagination
 *
 * Builder.io has a limit of 100 items per request, so this function
 * handles pagination automatically.
 *
 * @param options - Optional configuration
 * @param options.cachebust - Whether to bypass Builder.io CDN cache
 * @returns Array of all affiliations from Builder.io
 */
export async function getAllBuilderAffiliations(options?: {
  cachebust?: boolean;
}): Promise<BuilderAffiliation[]> {
  const allAffiliations: BuilderAffiliation[] = [];
  const limit = 100;
  let offset = 0;
  let hasMore = true;
  let retryCount = 0;
  const maxRetries = 3;

  // Initialize builder with API key
  builder.init(BUILDER_API_KEY);

  while (hasMore) {
    try {
      const results = await builder.getAll("affiliations", {
        limit,
        offset,
        cachebust: options?.cachebust ?? false,
        options: {
          noTargeting: true,
        },
      });

      if (results && results.length > 0) {
        allAffiliations.push(...(results as BuilderAffiliation[]));
        offset += limit;
        retryCount = 0; // Reset retry count on success

        // If we got fewer results than the limit, we've reached the end
        if (results.length < limit) {
          hasMore = false;
        }
      } else {
        hasMore = false;
      }
    } catch (error) {
      retryCount++;
      console.error(
        `Error fetching affiliations (attempt ${retryCount}/${maxRetries}):`,
        error
      );

      if (retryCount >= maxRetries) {
        throw new Error(
          `Failed to fetch affiliations after ${maxRetries} attempts`
        );
      }

      // Exponential backoff: 1s, 2s, 4s
      const waitTime = Math.pow(2, retryCount) * 1000;
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }

  return allAffiliations;
}

/**
 * Fetch all affiliations from Builder.io and transform to Wix-compatible format
 *
 * This is the main function used by the API endpoint to replace Wix fetching.
 *
 * @param options - Optional configuration
 * @param options.cachebust - Whether to bypass Builder.io CDN cache
 * @returns Array of affiliations in Wix-compatible format
 */
export async function fetchAffiliationsFromBuilder(options?: {
  cachebust?: boolean;
}): Promise<WixCompatibleAffiliation[]> {
  const builderAffiliations = await getAllBuilderAffiliations(options);

  return builderAffiliations.map(transformBuilderAffiliationToWixFormat);
}
