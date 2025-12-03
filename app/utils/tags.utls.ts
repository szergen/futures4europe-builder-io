import { TagProps } from "@app/shared-components/Tag/Tag";
import {
  translateWixTagIdToBuilderId,
  translateBuilderIdToWixTagId,
} from "./builderTagUtils";

/**
 * Helper function to check if an ID matches, considering both Builder.io and Wix formats
 * For affiliations (which still use Wix IDs), translates to Builder.io ID for comparison
 */
export const idsMatch = (id1: string, id2: string): boolean => {
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
 * Uses ID translation for affiliations (which still use Wix IDs) via mapping file.
 *
 * @param tags - Array of tags (already transformed from Builder.io to Wix format)
 * @param infoPages - All info pages
 * @param postPages - All post pages
 * @param allAffiliations - All affiliations (still using Wix tag IDs)
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

    // Match affiliations using ID translation (affiliations still use Wix IDs)
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

    // Match affiliation pages using ID translation
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
