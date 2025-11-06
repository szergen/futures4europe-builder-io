/**
 * Builder.io Post Page Utilities
 *
 * Functions to fetch and transform Builder.io post data to match
 * the structure expected by PostPageComponent (originally from Wix)
 */

import { getBuilderContent } from "@app/shared-components/Builder/builderUtils";

/**
 * Fetch a post from Builder.io by slug
 * @param slug - The post slug (e.g., "my-post-title")
 * @returns The Builder.io content entry or null
 */
export async function getBuilderPostBySlug(slug: string) {
  try {
    // Query Builder.io for a post with matching slug
    // The slug in Builder.io should be stored as "/post/slug-name"
    const content = await getBuilderContent("post-page", {
      query: {
        "data.slug": `/post/${slug}`,
      },
      limit: 1,
      // Enable enrich to get referenced tag data
      // Note: enrich is handled via query params, not here in Gen 2
    });

    return content;
  } catch (error) {
    console.error("[Builder.io] Error fetching post by slug:", error);
    return null;
  }
}

/**
 * Fetch all posts from Builder.io for static generation
 * @returns Array of Builder.io post entries
 */
export async function getAllBuilderPosts() {
  try {
    const { builder } = await import("@builder.io/sdk");
    const { builderConfig } = await import("../../builder.config");

    if (builderConfig.apiKey) {
      builder.init(builderConfig.apiKey);
    }

    // Get all posts (paginated if needed)
    const posts = await builder.getAll("post-page", {
      limit: 100,
      fields: "data.slug,data.title",
      options: {
        noTargeting: true,
      },
    });

    return posts || [];
  } catch (error) {
    console.error("[Builder.io] Error fetching all posts:", error);
    return [];
  }
}

/**
 * Transform a Builder.io Reference object to a simple tag object
 * Builder.io references have nested structure: { @type, id, model, value: {...} }
 * We need to flatten this to match Wix's simpler structure
 */
function transformReference(ref: any) {
  if (!ref) return null;

  // Handle Builder.io reference format
  if (ref["@type"] === "@builder.io/core:Reference" && ref.value) {
    const refData = ref.value.data || {};
    return {
      _id: ref.id,
      name: refData.name || ref.value.name,
      tagType: refData.tagType,
      tagLine: refData.tagLine,
      tagPageLink: refData.tagPageLink,
      picture: refData.picture,
      // Include any other fields from the reference
      ...refData,
    };
  }

  // If already in simple format, return as-is
  return ref;
}

/**
 * Transform an array of Builder.io reference items to simple tag objects
 * Handles arrays like: [{ authorItem: { @type, id, model, value } }]
 */
function transformReferenceArray(arr: any[], itemKey?: string): any[] {
  if (!arr || !Array.isArray(arr)) return [];

  return arr
    .map((item) => {
      // Handle wrapped references: { authorItem: {...} }
      if (itemKey && item[itemKey]) {
        return transformReference(item[itemKey]);
      }
      // Handle direct references
      return transformReference(item);
    })
    .filter(Boolean); // Remove null/undefined
}

/**
 * Transform Builder.io post data to match Wix PostPageComponent structure
 * @param builderPost - Raw Builder.io post data
 * @returns Transformed post object matching Wix structure
 */
export function transformBuilderPostToWixFormat(builderPost: any) {
  if (!builderPost) return null;

  const data = builderPost.data || {};

  // Transform the post to match the expected structure
  return {
    // Keep Builder.io metadata
    id: builderPost.id,
    createdDate: builderPost.createdDate,
    lastUpdated: builderPost.lastUpdated,
    published: builderPost.published,

    // Main data object matching Wix structure
    data: {
      // Basic fields
      title: data.title,
      subtitle: data.subtitle,
      slug: data.slug,

      // Dates
      _createdDate: { $date: builderPost.createdDate },
      _updatedDate: { $date: builderPost.lastUpdated },
      postPublicationDate:
        data.postPublicationDate || builderPost.firstPublished,

      // Page type
      pageTypes: transformReferenceArray(data.pageTypes, "pageTypeItem"),

      // Country tag (single item)
      countryTag: data.countryTag ? [transformReference(data.countryTag)] : [],

      // Recommendations
      recomendations: data.recommendations || 0,

      // Authors and contributors
      author: transformReferenceArray(data.author, "authorItem"),
      pageOwner: transformReferenceArray(data.pageOwner, "pageOwnerItem"),

      // Content sections (rich text)
      postContentRIch1: data.postContentRIch1 || "",
      postContentRIch2: data.postContentRIch2 || "",
      postContentRIch3: data.postContentRIch3 || "",
      postContentRIch4: data.postContentRIch4 || "",
      postContentRIch5: data.postContentRIch5 || "",
      postContentRIch6: data.postContentRIch6 || "",
      postContentRIch7: data.postContentRIch7 || "",
      postContentRIch8: data.postContentRIch8 || "",
      postContentRIch9: data.postContentRIch9 || "",
      postContentRIch10: data.postContentRIch10 || "",

      // Content images
      postImage1: data.postImage1 || {},
      postImage2: data.postImage2 || {},
      postImage3: data.postImage3 || {},
      postImage4: data.postImage4 || {},
      postImage5: data.postImage5 || {},
      postImage6: data.postImage6 || {},
      postImage7: data.postImage7 || {},
      postImage8: data.postImage8 || {},
      postImage9: data.postImage9 || {},
      postImage10: data.postImage10 || {},

      // Related tags/entities
      people: transformReferenceArray(data.people, "peopleItem"),
      methods: transformReferenceArray(data.methods, "methodsItem"),
      domains: transformReferenceArray(data.domains, "domainsItem"),
      projects: transformReferenceArray(data.projects, "projectsItem"),
      organisations: transformReferenceArray(
        data.organisations,
        "organisationsItem"
      ),

      // Event-specific fields
      speakers: transformReferenceArray(data.speakers, "speakersItem"),
      moderators: transformReferenceArray(data.moderators, "moderatorsItem"),
      eventRegistration: data.eventRegistration,
      eventStartDate: data.eventStartDate,
      eventEndDate: data.eventEndDate,

      // Project result specific
      projectResultAuthor: transformReferenceArray(
        data.projectResultAuthor,
        "projectResultAuthorItem"
      ),
      projectResultMedia: data.projectResultMedia || {},
      projectResultPublicationDate: data.projectResultPublicationDate,

      // Additional fields
      internalLinks: data.internalLinks || [],
      mediaFiles: data.mediaFiles || [],

      // Owner metadata
      _owner: builderPost.createdBy,
    },
  };
}

/**
 * Helper to extract slug from Builder.io slug format
 * Builder.io stores: "/post/my-slug" -> returns "my-slug"
 */
export function extractSlugFromPath(path: string): string {
  if (!path) return "";
  // Remove "/post/" prefix if present
  return path.replace(/^\/post\//, "");
}

/**
 * Helper to format slug for Builder.io query
 * "my-slug" -> "/post/my-slug"
 */
export function formatSlugForBuilder(slug: string): string {
  if (!slug) return "";
  // Add "/post/" prefix if not present
  return slug.startsWith("/post/") ? slug : `/post/${slug}`;
}
