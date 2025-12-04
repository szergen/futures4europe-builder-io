/**
 * Builder.io Post Page Utilities
 *
 * Functions to fetch and transform Builder.io post data to match
 * the structure expected by PostPageComponent (originally from Wix)
 */

import { getBuilderContent } from "@app/shared-components/Builder/builderUtils";

// ============================================================================
// WRITE API CONFIGURATION
// ============================================================================

// Use Next.js API routes to handle Builder.io Write API calls server-side
// This prevents exposing the private API key to the client
const BUILDER_API_ROUTE = "/api/builder/post";

// ============================================================================
// WRITE API UTILITIES (FOR CREATING/UPDATING POSTS)
// ============================================================================

/**
 * Transform tag arrays to Builder.io Reference format for CREATE operations
 * Uses WRAPPED reference format with item keys (required by Builder.io list fields)
 * @param tags - Array of tag objects with _id property
 * @param modelName - Target model name (default: "tag")
 * @param wrapperKey - Key to wrap each reference (e.g., "authorItem")
 * @returns Array of wrapped Builder.io Reference objects
 */
export function transformReferencesForBuilderCreate(
  tags: any[] | undefined,
  modelName: string = "tag",
  wrapperKey?: string
): any[] {
  if (!tags || !Array.isArray(tags) || tags.length === 0) {
    return [];
  }

  return tags
    .filter((tag) => tag && tag._id) // Only include tags with valid IDs
    .map((tag) => {
      const reference = {
        "@type": "@builder.io/core:Reference",
        id: tag._id,
        model: modelName,
      };
      // Wrap with key (required for Builder.io list fields)
      return wrapperKey ? { [wrapperKey]: reference } : reference;
    });
}

/**
 * Transform tag arrays to Builder.io Reference format for UPDATE operations
 * Uses wrapped reference format with item keys (e.g., { authorItem: {...} })
 * @param tags - Array of tag objects with _id property
 * @param modelName - Target model name (default: "tag")
 * @param wrapperKey - Key to wrap each reference (e.g., "authorItem")
 * @returns Array of wrapped Builder.io Reference objects
 */
export function transformReferencesForBuilderUpdate(
  tags: any[] | undefined,
  modelName: string = "tag",
  wrapperKey?: string
): any[] {
  if (!tags || !Array.isArray(tags) || tags.length === 0) {
    return [];
  }

  return tags
    .filter((tag) => tag && tag._id) // Only include tags with valid IDs
    .map((tag) => {
      const reference = {
        "@type": "@builder.io/core:Reference",
        id: tag._id,
        model: modelName,
      };
      // Wrap with key if provided (needed for UPDATE)
      return wrapperKey ? { [wrapperKey]: reference } : reference;
    });
}

/**
 * Transform tag arrays to Builder.io Reference format
 * Alias for backwards compatibility - uses CREATE format (simple references)
 */
export function transformReferencesForBuilder(
  tags: any[] | undefined,
  modelName: string = "tag"
): any[] {
  return transformReferencesForBuilderCreate(tags, modelName);
}

/**
 * Transform component state to Builder.io API payload for CREATE operations
 * Uses simple reference format without wrapper keys
 * @param postData - Post data from component state
 * @param contentText - Array of rich text content sections (10 sections)
 * @param contentImages - Array of image objects (10 images)
 * @returns Builder.io API payload
 */
export function transformPostDataForBuilderCreate(
  postData: any,
  contentText: string[],
  contentImages: any[]
): any {
  const data: any = {
    // Basic fields
    title: postData.title || "",
    subtitle: postData.subtitle || "",
    slug: postData.slug || "",

    // Content sections (10 rich text fields)
    postContentRIch1: contentText[0] || "",
    postContentRIch2: contentText[1] || "",
    postContentRIch3: contentText[2] || "",
    postContentRIch4: contentText[3] || "",
    postContentRIch5: contentText[4] || "",
    postContentRIch6: contentText[5] || "",
    postContentRIch7: contentText[6] || "",
    postContentRIch8: contentText[7] || "",
    postContentRIch9: contentText[8] || "",
    postContentRIch10: contentText[9] || "",

    // Images (10 image fields)
    postImage1: contentImages[0] || {},
    postImage2: contentImages[1] || {},
    postImage3: contentImages[2] || {},
    postImage4: contentImages[3] || {},
    postImage5: contentImages[4] || {},
    postImage6: contentImages[5] || {},
    postImage7: contentImages[6] || {},
    postImage8: contentImages[7] || {},
    postImage9: contentImages[8] || {},
    postImage10: contentImages[9] || {},

    // Reference fields - WRAPPED format for CREATE (required by Builder.io list fields)
    author: transformReferencesForBuilderCreate(
      postData.author,
      "tag",
      "authorItem"
    ),
    pageOwner: transformReferencesForBuilderCreate(
      postData.pageOwner,
      "tag",
      "pageOwnerItem"
    ),
    pageTypes: transformReferencesForBuilderCreate(
      postData.pageTypes,
      "tag",
      "pageTypeItem"
    ),
    people: transformReferencesForBuilderCreate(
      postData.people,
      "tag",
      "peopleItem"
    ),
    methods: transformReferencesForBuilderCreate(
      postData.methods,
      "tag",
      "methodsItem"
    ),
    domains: transformReferencesForBuilderCreate(
      postData.domains,
      "tag",
      "domainsItem"
    ),
    projects: transformReferencesForBuilderCreate(
      postData.projects,
      "tag",
      "projectsItem"
    ),
    organisations: transformReferencesForBuilderCreate(
      postData.organisations,
      "tag",
      "organisationsItem"
    ),

    // Single reference field (countryTag)
    countryTag:
      postData.countryTag && postData.countryTag[0]
        ? {
            "@type": "@builder.io/core:Reference",
            id: postData.countryTag[0]._id,
            model: "tag",
          }
        : undefined,

    // Event-specific fields
    speakers: transformReferencesForBuilderCreate(
      postData.speakers,
      "tag",
      "speakersItem"
    ),
    moderators: transformReferencesForBuilderCreate(
      postData.moderators,
      "tag",
      "moderatorsItem"
    ),
    eventStartDate: postData.eventStartDate || undefined,
    eventEndDate: postData.eventEndDate || undefined,
    eventRegistration: postData.eventRegistration || undefined,

    // Project result-specific fields
    projectResultAuthor: transformReferencesForBuilderCreate(
      postData.projectResultAuthor,
      "tag",
      "projectResultAuthorItem"
    ),
    projectResultMedia: postData.projectResultMedia || {},
    projectResultPublicationDate:
      postData.projectResultPublicationDate || undefined,

    // Additional fields
    mediaFiles: postData.mediaFiles || [],
    internalLinks: transformReferencesForBuilderCreate(
      postData.internalLinks,
      "post-page",
      "internalLinksItem"
    ),
    recommendations: postData.recommendations || 0,
  };

  // Remove undefined fields to keep payload clean
  Object.keys(data).forEach((key) => {
    if (data[key] === undefined) {
      delete data[key];
    }
  });

  return data;
}

/**
 * Transform component state to Builder.io API payload for UPDATE operations
 * Keeps existing format (used by updateBuilderPost)
 * @param postData - Post data from component state
 * @param contentText - Array of rich text content sections (10 sections)
 * @param contentImages - Array of image objects (10 images)
 * @returns Builder.io API payload
 */
export function transformPostDataForBuilder(
  postData: any,
  contentText: string[],
  contentImages: any[]
): any {
  // Use the same format as CREATE for now - UPDATE flow handles its own format
  return transformPostDataForBuilderCreate(
    postData,
    contentText,
    contentImages
  );
}

/**
 * Create a new post in Builder.io
 * @param postData - Post data from component state
 * @param contentText - Array of rich text content sections
 * @param contentImages - Array of image objects
 * @returns Builder.io API response with created post data
 */
export async function createBuilderPost(
  postData: any,
  contentText: string[],
  contentImages: any[]
): Promise<any> {
  try {
    // Use CREATE-specific transformation (simple references, no wrapper keys)
    const data = transformPostDataForBuilderCreate(
      postData,
      contentText,
      contentImages
    );

    const payload = {
      name: postData.title || postData.slug || "Untitled Post",
      data,
      published: "published",
    };

    console.log("[Builder.io] Creating new post:", {
      slug: data.slug,
      title: data.title,
    });

    // Call Next.js API route (server-side) instead of Builder.io directly
    const response = await fetch(BUILDER_API_ROUTE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[Builder.io] Create post failed:", {
        status: response.status,
        error: errorData,
      });
      throw new Error(
        errorData.error || `Failed to create post: ${response.status}`
      );
    }

    const result = await response.json();
    console.log("[Builder.io] Post created successfully:", {
      id: result.id,
      slug: result.data?.slug,
    });

    return result;
  } catch (error) {
    console.error("[Builder.io] Error creating post:", error);
    throw error;
  }
}

/**
 * Update an existing post in Builder.io
 * @param postId - Builder.io content ID
 * @param postData - Post data from component state
 * @param contentText - Array of rich text content sections
 * @param contentImages - Array of image objects
 * @returns Builder.io API response with updated post data
 */
export async function updateBuilderPost(
  postId: string,
  postData: any,
  contentText: string[],
  contentImages: any[]
): Promise<any> {
  try {
    const data = transformPostDataForBuilder(
      postData,
      contentText,
      contentImages
    );

    const payload = {
      name: postData.title || postData.slug || "Untitled Post",
      data,
      published: "published",
    };

    console.log("[Builder.io] Updating post:", {
      id: postId,
      slug: data.slug,
      title: data.title,
    });

    // Call Next.js API route (server-side) instead of Builder.io directly
    const response = await fetch(`${BUILDER_API_ROUTE}/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[Builder.io] Update post failed:", {
        id: postId,
        status: response.status,
        error: errorData,
      });
      throw new Error(
        errorData.error || `Failed to update post: ${response.status}`
      );
    }

    const result = await response.json();
    console.log("[Builder.io] Post updated successfully:", {
      id: result.id,
      slug: result.data?.slug,
    });

    return result;
  } catch (error) {
    console.error("[Builder.io] Error updating post:", error);
    throw error;
  }
}

// ============================================================================
// READ API UTILITIES (FOR FETCHING POSTS)
// ============================================================================

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
      cachebust: true,
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

  // Handle Builder.io reference format WITH enriched value
  if (ref["@type"] === "@builder.io/core:Reference" && ref.value) {
    const refData = ref.value.data || {};
    return {
      _id: ref.id,
      name: refData.name || ref.value.name,
      tagType: refData.tagType,
      tagLine: refData.tagLine,
      // Only include tagPageLink if it has a valid value (not empty string or undefined)
      tagPageLink: refData.tagPageLink || undefined,
      picture: refData.picture,
      // Include any other fields from the reference
      ...refData,
    };
  }

  // Handle Builder.io reference format WITHOUT enriched value (not enriched yet)
  // This happens when references are stored but not fetched with enrich: true
  if (ref["@type"] === "@builder.io/core:Reference" && ref.id) {
    return {
      _id: ref.id,
      // Name and other fields will be undefined - the component should handle this
      // or we need to fetch the tag separately
      name: undefined,
      tagType: undefined,
    };
  }

  // If already in simple format (has _id), return as-is
  if (ref._id) {
    return ref;
  }

  // Last resort: try to use id as _id if present
  if (ref.id) {
    return {
      _id: ref.id,
      ...ref,
    };
  }

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

      // Dates - Builder.io timestamps (milliseconds) are compatible with JavaScript Date
      // PostPageComponent uses: new Date(timestamp) and dayjs(timestamp)
      // Both accept millisecond timestamps directly
      _createdDate: { $date: builderPost.createdDate }, // Timestamp for component's postDate
      _updatedDate: { $date: builderPost.lastUpdated }, // Timestamp for component's updatedDate
      postPublicationDate:
        builderPost.createdDate ||
        builderPost.firstPublished ||
        builderPost.lastUpdated, // Timestamp

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
