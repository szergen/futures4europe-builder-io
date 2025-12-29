import {
  getBuilderContent,
  getAllBuilderContent,
} from "@app/shared-components/Builder";
import { transformReferencesForBuilderCreate } from "@app/utils/builderPostUtils";
import { RedisCacheService } from "@app/services/redisCache";

// ============================================================================
// CACHE CONFIGURATION
// ============================================================================

const INFO_PAGES_CACHE_KEY = "builder_info_pages_all.json";
// Cache TTL: 1 day
const CACHE_TTL = 24 * 60 * 60 * 1000;

// ============================================================================
// WRITE API CONFIGURATION
// ============================================================================

// Use Next.js API routes to handle Builder.io Write API calls server-side
// This prevents exposing the private API key to the client
const INFO_PAGE_API_ROUTE = "/api/builder/info-page";

/**
 * Transform a Builder.io reference to a flat object
 * Handles the nested reference structure from Builder.io
 */
function transformReference(ref: any, itemKey: string = "item"): any {
  if (!ref?.[itemKey]) return null;

  const value = ref[itemKey].value || ref[itemKey];
  return {
    _id: value.id,
    name: value.name || value.data?.name,
    tagType: value.data?.tagType,
    tagLine: value.data?.tagLine,
    picture: value.data?.picture,
    tagPageLink: value.data?.tagPageLink,
    wixId: value.data?.wixId,
    // Include masterTag if it exists
    masterTag: value.data?.masterTag
      ? transformReference({ item: value.data.masterTag }, "item")
      : undefined,
  };
}

/**
 * Transform an array of Builder.io references
 */
function transformReferenceArray(refs: any[], itemKey: string = "item"): any[] {
  if (!refs || !Array.isArray(refs)) return [];
  return refs
    .map((ref) => transformReference(ref, itemKey))
    .filter((item) => item !== null);
}

/**
 * Transform Builder.io info-page data to the format expected by OrganisationPageComponent
 */
export function transformBuilderInfoPageToWixFormat(builderInfoPage: any) {
  const data = builderInfoPage.data;

  return {
    id: builderInfoPage.id,
    createdDate: builderInfoPage.createdDate,
    lastUpdated: builderInfoPage.lastUpdated,
    published: builderInfoPage.published,
    data: {
      title: data.title,
      subtitle: data.subtitle,
      slug: data.slug,
      _createdDate: { $date: builderInfoPage.createdDate },
      _updatedDate: { $date: builderInfoPage.lastUpdated },

      // Rich text content
      postContentRIch1: data.postContentRIch1 || "",
      postContentRIch2: data.postContentRIch2 || "",
      postContentRIch3: data.postContentRIch3 || "",
      postContentRIch4: data.postContentRIch4 || "",
      postContentRIch5: data.postContentRIch5 || "",
      postContentRIch6: data.postContentRIch6 || "",
      postContentRIch7: data.postContentRIch7 || "",
      postContentRIch8: data.postContentRIch8 || "",
      postContentRIch9: data.postContentRIch9 || "",
      postImage1: data.postImage1 || "",
      postImage2: data.postImage2 || "",
      postImage3: data.postImage3 || "",
      postImage4: data.postImage4 || "",
      postImage5: data.postImage5 || "",
      postImage6: data.postImage6 || "",
      postImage7: data.postImage7 || "",
      postImage8: data.postImage8 || "",
      postImage9: data.postImage9 || "",

      // Links
      linkedinLink: data.linkedinLink || "",
      orcidLink: data.orcidLink || "",
      researchGateLink: data.researchGateLink || "",
      websiteLink: data.websiteLink || "",
      organisationEstablishedDate: data.organisationEstablishedDate || "",

      // Reference arrays - transform nested structure to flat
      activity: transformReferenceArray(data.activity, "activityItem"),
      author: transformReferenceArray(data.author, "authorItem"),
      countryTag: transformReferenceArray(data.countryTag, "countryTagItem"),
      domains: transformReferenceArray(data.domains, "domainsItem"),
      methods: transformReferenceArray(data.methods, "methodsItem"),
      projectStartDate: data.projectStartDate || "",
      projectEndDate: data.projectEndDate || "",
      organisation: transformReferenceArray(
        data.organisation,
        "organisationItem"
      ),
      organisationProject: transformReferenceArray(
        data.organisationProject,
        "organisationProjectItem"
      ),
      organisationType: transformReferenceArray(
        data.organisationType,
        "organisationTypeItem"
      ),
      organisationMemberOf: transformReferenceArray(
        data.organisationMemberOf,
        "organisationMemberOfItem"
      ),
      organisationHasMember: transformReferenceArray(
        data.organisationHasMember,
        "organisationHasMemberItem"
      ),
      mediaFiles: data.mediaFiles || [],
      organisationPeopleRoles: data.organisationPeopleRoles || [],
      organisationProjectRoles: data.organisationProjectRoles || [],
      description: data.description || "",
      pageOwner: transformReferenceArray(data.pageOwner, "pageOwnerItem"),
      pageTypes: transformReferenceArray(data.pageTypes, "pageTypeItem"),
      person: transformReferenceArray(data.person, "personItem"),
      Project: transformReferenceArray(data.project, "projectItem"),
      projectFunded: transformReferenceArray(
        data.projectFunded,
        "projectFundedItem"
      ),
      projectParticipantTeam: transformReferenceArray(
        data.projectParticipantTeam,
        "projectParticipantTeamItem"
      ),
      projectCoordinator: transformReferenceArray(
        data.projectCoordinator,
        "projectCoordinatorItem"
      ),
      projectOrganisation: transformReferenceArray(
        data.projectOrganisation,
        "projectOrganisationItem"
      ),
      // projectOrganisationRoles: data.projectOrganisationRoles || [],

      // Content images (if any)
      contentImages: data.contentImages || [],
    },
  };
}

/**
 * Get a single info-page by slug from Builder.io
 */
export async function getBuilderInfoPageBySlug(slug: string) {
  // The slug in Builder.io includes the path prefix (e.g., "/organisation/slug")
  // Try with the full path first
  let content = await getBuilderContent("info-page", {
    query: { "data.slug": `/organisation/${slug}` },
    limit: 1,
  });

  // If not found, try with just the slug
  if (!content) {
    content = await getBuilderContent("info-page", {
      query: { "data.slug": slug },
      limit: 1,
    });
  }

  return content;
}

/**
 * Get all info-pages from Builder.io (Organisations, People, Projects)
 * Uses pagination to ensure ALL pages are retrieved
 * Caches results in Redis
 */
export async function getAllBuilderInfoPages(options?: {
  cachebust?: boolean;
}) {
  try {
    // Check cache first
    if (!options?.cachebust) {
      const cached = await RedisCacheService.getFromCache(INFO_PAGES_CACHE_KEY);
      if (cached && Array.isArray(cached) && cached.length > 0) {
        console.log(
          `[Builder.io] Returning ${cached.length} cached info pages`
        );
        return cached;
      }
    }

    console.log("[Builder.io] Fetching all info pages from API...");

    // Fetch all info pages with pagination
    const allPages: any[] = [];
    const limit = 100;
    let offset = 0;
    let hasMore = true;

    while (hasMore) {
      const results = await getAllBuilderContent("info-page", {
        limit,
        offset,
      });

      if (results && results.length > 0) {
        allPages.push(...results);
        offset += limit;
        console.log(
          `[Builder.io] Fetched ${results.length} info pages (total: ${allPages.length})`
        );

        if (results.length < limit) {
          hasMore = false;
        }
      } else {
        hasMore = false;
      }
    }

    // Cache the results
    if (allPages.length > 0) {
      await RedisCacheService.saveToCache(
        INFO_PAGES_CACHE_KEY,
        allPages,
        CACHE_TTL
      );
      console.log(`[Builder.io] Cached ${allPages.length} info pages`);
    }

    return allPages;
  } catch (error) {
    console.error("[Builder.io] Error fetching all info pages:", error);
    // Fallback to cache
    const cached = await RedisCacheService.getFromCache(INFO_PAGES_CACHE_KEY);
    return cached || [];
  }
}

/**
 * Get all organisation info-pages from Builder.io
 * Filters for pages that have an organisation tag
 */
export async function getAllBuilderOrganisationPages() {
  const allContent = await getAllBuilderInfoPages();
  return allContent.filter(
    (item: any) => item.data?.slug && item.data?.organisation
  );
}

/**
 * Extract slug from a Builder.io path
 * Handles paths like "/organisation/slug" or just "slug"
 */
export function extractSlugFromPath(path: string): string | null {
  if (!path) return null;

  // If it starts with /organisation/, extract the slug
  const match = path.match(/\/organisation\/(.*)/);
  if (match) return match[1];

  // If it starts with /, remove it
  if (path.startsWith("/")) return path.substring(1);

  // Otherwise return as-is
  return path;
}

/**
 * Get affiliations by organisation tag ID from Builder.io
 * Uses cached affiliations with full tag objects
 */
export async function getBuilderAffiliationsByOrgTag(
  organisationTagId: string
) {
  try {
    const { getAffiliationsByOrgTag } = await import(
      "@app/utils/builderAffiliationUtils"
    );
    return getAffiliationsByOrgTag(organisationTagId);
  } catch (error) {
    console.error(
      "[Builder.io] Error fetching affiliations for org:",
      organisationTagId,
      error
    );
    return [];
  }
}

/**
 * Get a single person info-page by slug from Builder.io
 */
export async function getBuilderPersonPageBySlug(slug: string) {
  // The slug in Builder.io includes the path prefix (e.g., "/person/slug")
  // Try with the full path first
  let content = await getBuilderContent("info-page", {
    query: { "data.slug": `/person/${slug}` },
    limit: 1,
  });

  // If not found, try with just the slug
  if (!content) {
    content = await getBuilderContent("info-page", {
      query: { "data.slug": slug },
      limit: 1,
    });
  }

  return content;
}

/**
 * Get all person info-pages from Builder.io
 * Filters for pages that have a person tag
 */
export async function getAllBuilderPersonPages() {
  const allContent = await getAllBuilderInfoPages();
  return allContent.filter((item: any) => item.data?.slug && item.data?.person);
}

/**
 * Get affiliations by person tag ID from Builder.io
 * Uses cached affiliations with full tag objects
 */
export async function getBuilderAffiliationsByPersonTag(personTagId: string) {
  try {
    const { getAffiliationsByPersonTag } = await import(
      "@app/utils/builderAffiliationUtils"
    );
    return getAffiliationsByPersonTag(personTagId);
  } catch (error) {
    console.error(
      "[Builder.io] Error fetching affiliations for person:",
      personTagId,
      error
    );
    return [];
  }
}

/**
 * Get a single project info-page by slug from Builder.io
 */
export async function getBuilderProjectPageBySlug(slug: string) {
  // The slug in Builder.io includes the path prefix (e.g., "/project/slug")
  // Try with the full path first
  let content = await getBuilderContent("info-page", {
    query: { "data.slug": `/project/${slug}` },
    limit: 1,
  });

  // If not found, try with just the slug
  if (!content) {
    content = await getBuilderContent("info-page", {
      query: { "data.slug": slug },
      limit: 1,
    });
  }

  return content;
}

/**
 * Get all project info-pages from Builder.io
 * Filters for pages that have a project tag
 */
export async function getAllBuilderProjectPages() {
  const allContent = await getAllBuilderInfoPages();
  return allContent.filter(
    (item: any) => item.data?.slug && item.data?.project
  );
}

/**
 * Get affiliations by project tag ID from Builder.io
 * Uses cached affiliations with full tag objects
 */
export async function getBuilderAffiliationsByProjectTag(projectTagId: string) {
  try {
    const { getAffiliationsByProjectTag } = await import(
      "@app/utils/builderAffiliationUtils"
    );
    return getAffiliationsByProjectTag(projectTagId);
  } catch (error) {
    console.error(
      "[Builder.io] Error fetching affiliations for project:",
      projectTagId,
      error
    );
    return [];
  }
}

// ============================================================================
// WRITE API UTILITIES (FOR CREATING/UPDATING PROJECT PAGES)
// ============================================================================

/**
 * Transform component state to Builder.io API payload for project pages
 * Uses wrapper keys for reference fields as required by Builder.io list fields
 *
 * @param projectData - Project data from component state
 * @param contentText - Array of rich text content sections (10 sections)
 * @param contentImages - Array of image objects (10 images)
 * @returns Builder.io API data payload
 */
export function transformProjectDataForBuilder(
  projectData: any,
  contentText: string[],
  contentImages: any[]
): any {
  const data: any = {
    // Basic fields
    title: projectData.projectTag?.name || "",
    description: projectData.description || "",
    slug: projectData.slug || "",

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

    // Project-specific metadata
    projectStartDate: projectData.projectStartDate || undefined,
    projectEndDate: projectData.projectEndDate || undefined,
    linkedinLink: projectData.linkedinLink || "",
    websiteLink: projectData.websiteLink || "",
    mediaFiles: projectData.mediaFiles || [],

    // Reference fields - WRAPPED format for Builder.io list fields
    project: transformReferencesForBuilderCreate(
      projectData.projectTag ? [projectData.projectTag] : [],
      "tag",
      "projectItem"
    ),
    pageOwner: transformReferencesForBuilderCreate(
      projectData.pageOwner,
      "tag",
      "pageOwnerItem"
    ),
    author: transformReferencesForBuilderCreate(
      projectData.author,
      "tag",
      "authorItem"
    ),
    pageTypes: transformReferencesForBuilderCreate(
      projectData.pageType ? [projectData.pageType] : [],
      "tag",
      "pageTypeItem"
    ),
    methods: transformReferencesForBuilderCreate(
      projectData.methods,
      "tag",
      "methodsItem"
    ),
    domains: transformReferencesForBuilderCreate(
      projectData.domains,
      "tag",
      "domainsItem"
    ),
    projectFunded: transformReferencesForBuilderCreate(
      projectData.projectFunded ? [projectData.projectFunded] : [],
      "tag",
      "projectFundedItem"
    ),

    // countryTag - array with wrapper key (same format as other reference fields)
    countryTag: transformReferencesForBuilderCreate(
      projectData.countryTag ? [projectData.countryTag] : [],
      "tag",
      "countryTagItem"
    ),
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
 * Create a new project info-page in Builder.io
 *
 * @param projectData - Project data from component state
 * @param contentText - Array of rich text content sections
 * @param contentImages - Array of image objects
 * @returns Builder.io API response with created page data
 */
export async function createBuilderProjectPage(
  projectData: any,
  contentText: string[],
  contentImages: any[]
): Promise<any> {
  try {
    const data = transformProjectDataForBuilder(
      projectData,
      contentText,
      contentImages
    );

    const payload = {
      name: projectData.projectTag?.name || "Untitled Project",
      data,
      published: "published",
    };

    console.log("[Builder.io] Creating new project page:", {
      slug: data.slug,
      title: data.title,
    });

    // Call Next.js API route (server-side) instead of Builder.io directly
    const response = await fetch(INFO_PAGE_API_ROUTE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[Builder.io] Create project page failed:", {
        status: response.status,
        error: errorData,
      });
      throw new Error(
        errorData.error || `Failed to create project page: ${response.status}`
      );
    }

    const result = await response.json();
    console.log("[Builder.io] Project page created successfully:", {
      id: result.id,
      slug: result.data?.slug,
    });

    return result;
  } catch (error) {
    console.error("[Builder.io] Error creating project page:", error);
    throw error;
  }
}

/**
 * Update an existing project info-page in Builder.io
 *
 * @param pageId - Builder.io content ID
 * @param projectData - Project data from component state
 * @param contentText - Array of rich text content sections
 * @param contentImages - Array of image objects
 * @returns Builder.io API response with updated page data
 */
export async function updateBuilderProjectPage(
  pageId: string,
  projectData: any,
  contentText: string[],
  contentImages: any[]
): Promise<any> {
  try {
    const data = transformProjectDataForBuilder(
      projectData,
      contentText,
      contentImages
    );

    const payload = {
      name: projectData.projectTag?.name || "Untitled Project",
      data,
      published: "published",
    };

    console.log("[Builder.io] Updating project page:", {
      id: pageId,
      slug: data.slug,
      title: data.title,
    });

    // Call Next.js API route (server-side) instead of Builder.io directly
    const response = await fetch(`${INFO_PAGE_API_ROUTE}/${pageId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[Builder.io] Update project page failed:", {
        id: pageId,
        status: response.status,
        error: errorData,
      });
      throw new Error(
        errorData.error || `Failed to update project page: ${response.status}`
      );
    }

    const result = await response.json();
    console.log("[Builder.io] Project page updated successfully:", {
      id: result.id,
      slug: result.data?.slug,
    });

    return result;
  } catch (error) {
    console.error("[Builder.io] Error updating project page:", error);
    throw error;
  }
}

// ============================================================================
// WRITE API UTILITIES (FOR CREATING/UPDATING ORGANISATION PAGES)
// ============================================================================

/**
 * Transform component state to Builder.io API payload for organisation pages
 * Uses wrapper keys for reference fields as required by Builder.io list fields
 *
 * @param organisationData - Organisation data from component state
 * @param contentText - Array of rich text content sections (10 sections)
 * @param contentImages - Array of image objects (10 images)
 * @returns Builder.io API data payload
 */
export function transformOrganisationDataForBuilder(
  organisationData: any,
  contentText: string[],
  contentImages: any[]
): any {
  const data: any = {
    // Basic fields
    title: organisationData.organisationTag?.name || "",
    description: organisationData.description || "",
    slug: organisationData.slug || "",

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

    // Organisation-specific metadata
    organisationEstablishedDate:
      organisationData.organisationEstablishedDate || undefined,
    linkedinLink: organisationData.linkedinLink || "",
    websiteLink: organisationData.websiteLink || "",
    mediaFiles: organisationData.mediaFiles || [],

    // Reference fields - WRAPPED format for Builder.io list fields
    // Main organisation tag reference
    organisation: transformReferencesForBuilderCreate(
      organisationData.organisationTag
        ? [organisationData.organisationTag]
        : [],
      "tag",
      "organisationItem"
    ),

    // Page ownership and authorship
    pageOwner: transformReferencesForBuilderCreate(
      organisationData.pageOwner,
      "tag",
      "pageOwnerItem"
    ),
    author: transformReferencesForBuilderCreate(
      organisationData.author,
      "tag",
      "authorItem"
    ),

    // Page type
    pageTypes: transformReferencesForBuilderCreate(
      organisationData.pageType ? [organisationData.pageType] : [],
      "tag",
      "pageTypeItem"
    ),

    // Country tag (REQUIRED field) - array with wrapper key
    countryTag: transformReferencesForBuilderCreate(
      organisationData.countryTag ? [organisationData.countryTag] : [],
      "tag",
      "countryTagItem"
    ),

    // Classification tags
    methods: transformReferencesForBuilderCreate(
      organisationData.methods,
      "tag",
      "methodsItem"
    ),
    domains: transformReferencesForBuilderCreate(
      organisationData.domains,
      "tag",
      "domainsItem"
    ),

    // Organisation type reference (can be multiple)
    organisationType: transformReferencesForBuilderCreate(
      organisationData.organisationType
        ? Array.isArray(organisationData.organisationType)
          ? organisationData.organisationType
          : [organisationData.organisationType]
        : [],
      "tag",
      "organisationTypeItem"
    ),

    // Member relationships
    organisationHasMember: transformReferencesForBuilderCreate(
      organisationData.memberOrganisations,
      "tag",
      "organisationHasMemberItem"
    ),
    organisationMemberOf: transformReferencesForBuilderCreate(
      organisationData.memberOfOrganisations,
      "tag",
      "organisationMemberOfItem"
    ),

    // Activity field
    activity: transformReferencesForBuilderCreate(
      organisationData.activity,
      "tag",
      "activityItem"
    ),
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
 * Create a new organisation info-page in Builder.io
 *
 * @param organisationData - Organisation data from component state
 * @param contentText - Array of rich text content sections
 * @param contentImages - Array of image objects
 * @returns Builder.io API response with created page data
 */
export async function createBuilderOrganisationPage(
  organisationData: any,
  contentText: string[],
  contentImages: any[]
): Promise<any> {
  try {
    const data = transformOrganisationDataForBuilder(
      organisationData,
      contentText,
      contentImages
    );

    const payload = {
      name: organisationData.organisationTag?.name || "Untitled Organisation",
      data,
      published: "published",
    };

    console.log("[Builder.io] Creating new organisation page:", {
      slug: data.slug,
      title: data.title,
    });

    // Call Next.js API route (server-side) instead of Builder.io directly
    const response = await fetch(INFO_PAGE_API_ROUTE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[Builder.io] Create organisation page failed:", {
        status: response.status,
        error: errorData,
      });
      throw new Error(
        errorData.error ||
          `Failed to create organisation page: ${response.status}`
      );
    }

    const result = await response.json();
    console.log("[Builder.io] Organisation page created successfully:", {
      id: result.id,
      slug: result.data?.slug,
    });

    return result;
  } catch (error) {
    console.error("[Builder.io] Error creating organisation page:", error);
    throw error;
  }
}

/**
 * Update an existing organisation info-page in Builder.io
 *
 * @param pageId - Builder.io content ID
 * @param organisationData - Organisation data from component state
 * @param contentText - Array of rich text content sections
 * @param contentImages - Array of image objects
 * @returns Builder.io API response with updated page data
 */
export async function updateBuilderOrganisationPage(
  pageId: string,
  organisationData: any,
  contentText: string[],
  contentImages: any[]
): Promise<any> {
  try {
    const data = transformOrganisationDataForBuilder(
      organisationData,
      contentText,
      contentImages
    );

    const payload = {
      name: organisationData.organisationTag?.name || "Untitled Organisation",
      data,
      published: "published",
    };

    console.log("[Builder.io] Updating organisation page:", {
      id: pageId,
      slug: data.slug,
      title: data.title,
    });

    // Call Next.js API route (server-side) instead of Builder.io directly
    const response = await fetch(`${INFO_PAGE_API_ROUTE}/${pageId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[Builder.io] Update organisation page failed:", {
        id: pageId,
        status: response.status,
        error: errorData,
      });
      throw new Error(
        errorData.error ||
          `Failed to update organisation page: ${response.status}`
      );
    }

    const result = await response.json();
    console.log("[Builder.io] Organisation page updated successfully:", {
      id: result.id,
      slug: result.data?.slug,
    });

    return result;
  } catch (error) {
    console.error("[Builder.io] Error updating organisation page:", error);
    throw error;
  }
}

// ============================================================================
// WRITE API UTILITIES (FOR CREATING/UPDATING PERSON PAGES)
// ============================================================================

/**
 * Transform component state to Builder.io API payload for person pages
 * Uses wrapper keys for reference fields as required by Builder.io list fields
 *
 * @param personData - Person data from component state
 * @param contentText - Array of rich text content sections (10 sections)
 * @param contentImages - Array of image objects (10 images)
 * @returns Builder.io API data payload
 */
export function transformPersonDataForBuilder(
  personData: any,
  contentText: string[],
  contentImages: any[]
): any {
  const data: any = {
    // Basic fields
    title: personData.personTag?.name || "",
    description: personData.description || "",
    slug: personData.slug || "",

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

    // Person-specific link fields
    linkedinLink: personData.linkedinLink || "",
    websiteLink: personData.websiteLink || "",
    researchGateLink: personData.researchGateLink || "",
    orcidLink: personData.orcidLink || "",
    mediaFiles: personData.mediaFiles || [],

    // Reference fields - WRAPPED format for Builder.io list fields
    // Main person tag reference
    person: transformReferencesForBuilderCreate(
      personData.personTag ? [personData.personTag] : [],
      "tag",
      "personItem"
    ),

    // Page ownership and authorship
    pageOwner: transformReferencesForBuilderCreate(
      personData.pageOwner,
      "tag",
      "pageOwnerItem"
    ),
    author: transformReferencesForBuilderCreate(
      personData.author,
      "tag",
      "authorItem"
    ),

    // Page type
    pageTypes: transformReferencesForBuilderCreate(
      personData.pageType ? [personData.pageType] : [],
      "tag",
      "pageTypeItem"
    ),

    // Country tag (REQUIRED field) - array with wrapper key
    countryTag: transformReferencesForBuilderCreate(
      personData.countryTag ? [personData.countryTag] : [],
      "tag",
      "countryTagItem"
    ),

    // Classification tags
    methods: transformReferencesForBuilderCreate(
      personData.methods,
      "tag",
      "methodsItem"
    ),
    domains: transformReferencesForBuilderCreate(
      personData.domains,
      "tag",
      "domainsItem"
    ),

    // Activity field
    activity: transformReferencesForBuilderCreate(
      personData.activity,
      "tag",
      "activityItem"
    ),
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
 * Create a new person info-page in Builder.io
 *
 * @param personData - Person data from component state
 * @param contentText - Array of rich text content sections
 * @param contentImages - Array of image objects
 * @returns Builder.io API response with created page data
 */
export async function createBuilderPersonPage(
  personData: any,
  contentText: string[],
  contentImages: any[]
): Promise<any> {
  try {
    const data = transformPersonDataForBuilder(
      personData,
      contentText,
      contentImages
    );

    const payload = {
      name: personData.personTag?.name || "Untitled Person",
      data,
      published: "published",
    };

    console.log("[Builder.io] Creating new person page:", {
      slug: data.slug,
      title: data.title,
    });

    // Call Next.js API route (server-side) instead of Builder.io directly
    const response = await fetch(INFO_PAGE_API_ROUTE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[Builder.io] Create person page failed:", {
        status: response.status,
        error: errorData,
      });
      throw new Error(
        errorData.error || `Failed to create person page: ${response.status}`
      );
    }

    const result = await response.json();
    console.log("[Builder.io] Person page created successfully:", {
      id: result.id,
      slug: result.data?.slug,
    });

    return result;
  } catch (error) {
    console.error("[Builder.io] Error creating person page:", error);
    throw error;
  }
}

/**
 * Update an existing person info-page in Builder.io
 *
 * @param pageId - Builder.io content ID
 * @param personData - Person data from component state
 * @param contentText - Array of rich text content sections
 * @param contentImages - Array of image objects
 * @returns Builder.io API response with updated page data
 */
export async function updateBuilderPersonPage(
  pageId: string,
  personData: any,
  contentText: string[],
  contentImages: any[]
): Promise<any> {
  try {
    const data = transformPersonDataForBuilder(
      personData,
      contentText,
      contentImages
    );

    const payload = {
      name: personData.personTag?.name || "Untitled Person",
      data,
      published: "published",
    };

    console.log("[Builder.io] Updating person page:", {
      id: pageId,
      slug: data.slug,
      title: data.title,
    });

    // Call Next.js API route (server-side) instead of Builder.io directly
    const response = await fetch(`${INFO_PAGE_API_ROUTE}/${pageId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[Builder.io] Update person page failed:", {
        id: pageId,
        status: response.status,
        error: errorData,
      });
      throw new Error(
        errorData.error || `Failed to update person page: ${response.status}`
      );
    }

    const result = await response.json();
    console.log("[Builder.io] Person page updated successfully:", {
      id: result.id,
      slug: result.data?.slug,
    });

    return result;
  } catch (error) {
    console.error("[Builder.io] Error updating person page:", error);
    throw error;
  }
}
