import { TagProps } from '@app/shared-components/Tag/Tag';

export const extractInfoPageTypeBasedOnTag = (tag: TagProps) => {
  // case switch
  switch (tag?.name) {
    case 'person info':
      return 'person';
    case 'organisation info':
      return 'organisation';
    case 'project info':
      return 'project';
    default:
      return '';
  }
};

export const extactOwnedPagesIds = (ownedPages: any[]) => {
  return ownedPages.map((page) => page._id);
};

export const decidePageTypeItems = (
  type: string,
  postPages: any,
  infoPages: any
) => {
  switch (type) {
    case 'post':
      return postPages.filter(
        (item: any) =>
          item?.pageTypes?.[0]?.name !== 'event' &&
          item?.pageTypes?.[0]?.name !== 'project result'
      );
    case 'event':
      return filterPagesByType('event', postPages);
    case 'project-result':
      return filterPagesByType('project result', postPages);
    case 'project':
      return filterPagesByType('project info', infoPages);
    case 'person':
      return filterPagesByType('person info', infoPages);
    case 'organisation':
      return filterPagesByType('organisation info', infoPages);
    default:
      return [];
  }
};

export const automaticallyDecidePathPrefixBasedOnPageType = (
  typeName: string = ''
) => {
  //console.log('TYPE ' + typeName);
  switch (typeName) {
    case 'project info':
      return '/project/';
    case 'person info':
      return '/person/';
    case 'organisation info':
      return '/organisation/';
    default:
      return '/post/';
  }
};

export const filterPagesByType = (type: string, pages: any) => {
  return pages.filter((page: any) => page?.pageTypes?.[0]?.name === type);
};

export const filterDuplicateAffiliations = (affiliations: any[]): any[] => {
  const seen = new Map();

  function areTagsSimilar(tags1: string[], tags2: string[]): boolean {
    // Count matching tags (only comparing the 3 tag names)
    let matchCount = 0;
    for (let i = 0; i < 3; i++) {
      if (tags1[i] === tags2[i]) matchCount++;
    }
    return matchCount >= 2;
  }

  return affiliations.filter((affiliation) => {
    const currentTags = [
      affiliation.organisationTag?.name,
      affiliation.projectTag?.name,
      affiliation.personTag?.name,
    ];

    // Check if we've seen similar entries before
    for (const [key, seenEntry] of seen.entries()) {
      const [seenId, seenRole, seenTags] = JSON.parse(key);

      // Check if extraIdentifier AND role match exactly
      // AND at least 2 tags match
      if (
        affiliation.extraIdentifier === seenId &&
        affiliation.role === seenRole &&
        areTagsSimilar(currentTags, seenTags)
      ) {
        return false;
      }
    }

    // Add this combination to our seen map
    const key = JSON.stringify([
      affiliation.extraIdentifier,
      affiliation.role,
      currentTags,
    ]);
    seen.set(key, true);
    return true;
  });
};
