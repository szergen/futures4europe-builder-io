import { TagProps } from "@app/shared-components/Tag/Tag";
import {
  translateWixTagIdToBuilderId,
  translateBuilderIdToWixTagId,
} from "./builderTagUtils";

/**
 * Helper function to check if an ID matches, considering both Builder.io and Wix formats
 * Supports direct Builder.io ID comparison (used by affiliations and tags) with fallback
 * to Wix ID translation for legacy data during migration period.
 */
export const idsMatch = (
  id1: string | undefined | null,
  id2: string | undefined | null
): boolean => {
  // Guard against undefined/null values
  if (!id1 || !id2) return false;

  if (id1 === id2) return true;

  // Try translating id2 (potential Wix ID) to Builder.io format
  const translatedId2 = translateWixTagIdToBuilderId(id2);
  if (translatedId2 && id1 === translatedId2) return true;

  // Try translating id1 (potential Wix ID) to Builder.io format
  const translatedId1 = translateWixTagIdToBuilderId(id1);
  if (translatedId1 && translatedId1 === id2) return true;

  return false;
};

export const containsId = (obj: { [x: string]: any } | null, id: any) => {
  if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      if (
        key === "pageOwner" ||
        key === "_owner" ||
        key === "Author" ||
        // key === 'author' ||
        key === "organisationPeople"
      )
        continue;
      if (obj[key] === id) return true;
      if (
        obj[key]?.length > 0 &&
        Array.isArray(obj[key]) &&
        obj[key]?.find((item: any) => item?._id === id)
      ) {
        return true;
      }
      // if (containsId(obj[key], id)) return true;
    }
  }
  return false;
};

/**
 * Calculate popularity (mentions) for tags from Builder.io
 *
 * Counts tag occurrences in infoPages, postPages, and allAffiliations.
 * Both tags and affiliations now use Builder.io IDs directly.
 *
 * @param tags - Array of tags (from Builder.io)
 * @param infoPages - All info pages
 * @param postPages - All post pages
 * @param allAffiliations - All affiliations (using Builder.io tag IDs)
 * @returns Array of tags with mentions count added
 */
export function calculatePopularity(
  tags: Array<TagProps>,
  infoPages: any,
  postPages: any,
  allAffiliations: any
) {
  const popularityResults = [] as Array<TagProps> & { mentions: number }[];

  tags.forEach((tag) => {
    let count = 0;

    infoPages.forEach((infoPage: { [x: string]: any } | null) => {
      if (containsId(infoPage?.data, tag?._id)) {
        count += 1;
      }
      if (tag?.masterTag && containsId(infoPage?.data, tag?.masterTag)) {
        count += 1;
      }
    });

    postPages.forEach((postPage: { [x: string]: any } | null) => {
      if (containsId(postPage?.data, tag?._id)) {
        count += 1;
      }
      if (tag?.masterTag && containsId(postPage?.data, tag?.masterTag)) {
        count += 1;
      }
    });

    // Match affiliations (now using Builder.io IDs directly)
    const allAffilationMentiones = allAffiliations.filter(
      (affiliation: any) =>
        (affiliation.personTag && idsMatch(tag?._id, affiliation.personTag)) ||
        (affiliation.projectTag &&
          idsMatch(tag?._id, affiliation.projectTag)) ||
        (affiliation.organisationTag &&
          idsMatch(tag?._id, affiliation.organisationTag)) ||
        (tag?.masterTag &&
          ((affiliation.personTag &&
            idsMatch(tag?.masterTag, affiliation.personTag)) ||
            (affiliation.projectTag &&
              idsMatch(tag?.masterTag, affiliation.projectTag)) ||
            (affiliation.organisationTag &&
              idsMatch(tag?.masterTag, affiliation.organisationTag))))
    );

    // Match affiliation pages
    const affiliationPages = infoPages
      .filter((page: any) => {
        return allAffilationMentiones.find((affiliation: any) => {
          if (
            (tag.tagType !== "person" &&
              affiliation.personTag &&
              (idsMatch(page?.data?.person?.[0]?._id, affiliation.personTag) ||
                (page?.data?.person?.[0]?.masterTag &&
                  idsMatch(
                    page?.data?.person?.[0]?.masterTag,
                    affiliation.personTag
                  )))) ||
            (tag.tagType !== "organisation" &&
              affiliation.organisationTag &&
              (idsMatch(
                page?.data?.organisation?.[0]?._id,
                affiliation.organisationTag
              ) ||
                (page?.data?.organisation?.[0]?.masterTag &&
                  idsMatch(
                    page?.data?.organisation?.[0]?.masterTag,
                    affiliation.organisationTag
                  )))) ||
            (tag.tagType !== "project" &&
              affiliation.projectTag &&
              (idsMatch(
                page?.data?.Project?.[0]?._id,
                affiliation.projectTag
              ) ||
                (page?.data?.Project?.[0]?.masterTag &&
                  idsMatch(
                    page?.data?.Project?.[0]?.masterTag,
                    affiliation.projectTag
                  ))))
          ) {
            return true;
          }
        });
      })
      ?.filter(
        (post: any, index: number, self: any) =>
          index === self.findIndex((p: any) => p._id === post._id)
      )?.length;

    count += affiliationPages;
    // allAffiliations.forEach((affiliation: { [x: string]: any } | null) => {
    //   if (
    //     affiliation?.personTag === tag?._id ||
    //     affiliation?.projectTag === tag?._id ||
    //     affiliation?.organisationTag === tag?._id
    //   ) {
    //     count += 1;
    //   }
    // });
    if (tag?._id === "ce529656-bacd-4afb-b671-301d464ec908") {
      console.log("tag", tag);
      console.log("count", count);
      // console.log('allAffilationMentiones', allAffilationMentiones);
    }

    popularityResults.push({ ...tag, mentions: count });
  });

  return popularityResults;
}

export const getTagById = (tags: Array<TagProps>, id: string) =>
  tags.find((t) => t._id === id);

export const getTagByName = (tags: Array<TagProps>, name: string) =>
  tags.find((t) => t.name?.toLowerCase() === name?.toLowerCase());
