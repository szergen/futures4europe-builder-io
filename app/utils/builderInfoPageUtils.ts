import {
  getBuilderContent,
  getAllBuilderContent,
} from "@app/shared-components/Builder";

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

      // Links
      linkedinLink: data.linkedinLink || "",
      orcidLink: data.orcidLink || "",
      researchGateLink: data.researchGateLink || "",
      websiteLink: data.websiteLink || "",

      // Reference arrays - transform nested structure to flat
      activity: transformReferenceArray(data.activity, "activityItem"),
      author: transformReferenceArray(data.author, "authorItem"),
      countryTag: transformReferenceArray(data.countryTag, "countryTagItem"),
      domains: transformReferenceArray(data.domains, "domainsItem"),
      methods: transformReferenceArray(data.methods, "methodsItem"),
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
      description: data.description || "",
      pageOwner: transformReferenceArray(data.pageOwner, "pageOwnerItem"),
      pageTypes: transformReferenceArray(data.pageTypes, "pageTypeItem"),
      person: transformReferenceArray(data.person, "personItem"),
      project: transformReferenceArray(data.project, "projectItem"),

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
 * Get all organisation info-pages from Builder.io
 * Filters for pages that have an organisation tag
 */
export async function getAllBuilderOrganisationPages() {
  const content = await getAllBuilderContent("info-page", {
    query: {
      "data.slug": { $exists: true },
      "data.organisation": { $exists: true },
    },
  });
  return content;
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
 * Get affiliations by organisation tag ID
 * This would need to query the affiliations model in Builder.io
 */
export async function getBuilderAffiliationsByOrgTag(
  organisationTagId: string
) {
  // TODO: Implement when affiliations are migrated to Builder.io
  // For now, return empty array
  console.log(
    "[Builder.io] Affiliations query not yet implemented for:",
    organisationTagId
  );
  return [];
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
  const content = await getAllBuilderContent("info-page", {
    query: {
      "data.slug": { $exists: true },
      "data.person": { $exists: true },
    },
  });
  return content;
}

/**
 * Get affiliations by person tag ID
 * This would need to query the affiliations model in Builder.io
 */
export async function getBuilderAffiliationsByPersonTag(personTagId: string) {
  // TODO: Implement when affiliations are migrated to Builder.io
  // For now, return empty array
  console.log(
    "[Builder.io] Affiliations query not yet implemented for:",
    personTagId
  );
  return [];
}
