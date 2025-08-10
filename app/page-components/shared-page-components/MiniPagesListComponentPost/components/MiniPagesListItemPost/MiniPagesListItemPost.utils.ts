import { PLACEHOLDER_IMAGE } from '@app/constants';
import popularity from '@app/shared-components/Tag/components/TagCounterContainer/TagCounter';

export const getPropsForMiniPagesListItemPost = (item: any) => {
  switch (item?.pageTypes?.[0]?.name) {
    case 'post':
      return {
        title: item?.title,
        subtitle:
          item?.subtitle?.length > 170
            ? item.subtitle.substring(0, 170) + '...'
            : item?.subtitle,
        date: item?.postPublicationDate || item?._createdDate?.['$date'],
        image:
          item?.projectResultMedia?.thumbnail ||
          item?.postImage1?.url ||
          'https://placehold.co/600x400?text=placeholder',
        text: item?.postContentRIch1,
        domains: item?.domains,
        methods: item?.methods,
        pageTypeTag: item.pageTypes[0],
        primaryTags: [
          item.author?.[0] && item.author?.[0],
          item.projects?.[0] && item.projects?.[0],
        ]?.slice(0, 3),
      };
    case 'project info':
      return {
        title: item?.title,
        pageTypeTag: item.pageTypes[0],
        tagLine: item?.Project[0]?.tagLine,
        popularity: item?.Project[0]?.popularity,
        subtitle: item?.Project[0]?.subtitle,
        countryTags: item.countryTag ?? [],
        projectFunded: item?.projectFunded ?? [],
        organisationAffiliations:
          item?.projectOrganisationRoles?.slice(0, 3) ?? [],
        date: item._createdDate?.$date,
        editDate: item?._updatedDate?.$date,
        image: item.Project?.[0]?.picture || PLACEHOLDER_IMAGE,
        projectStartDate: item?.projectStartDate,
        projectEndDate: item?.projectEndDate,
        text:
          item.postContentRIch1 + item.postContentRIch2 + item.postContentRIch3,
        domains: [...(item.domains ?? []), ...(item.methods ?? [])]?.slice(
          0,
          3
        ),
      };
    case 'project result':
      return {
        title: item?.title,
        pageTypeTag: item.pageTypes[0],
        popularity: item?.pageTypes[0]?.popularity,
        subtitle: item?.subtitle,
        date: item?.postPublicationDate || item?._createdDate?.['$date'],
        editDate: item?._updatedDate?.$date,
        image:
          item?.projectResultMedia?.thumbnail ||
          item?.postImage1?.url ||
          PLACEHOLDER_IMAGE,
        projectResultPublicationDate: item?.projectResultPublicationDate,
        projects: item?.projects.slice(0, 3),
        projectResultAuthor: item?.projectResultAuthor?.slice(0, 3),
        text:
          item.postContentRIch1 + item.postContentRIch2 + item.postContentRIch3,
        domains: [...(item?.domains ?? []), ...(item?.methods ?? [])]?.slice(
          0,
          3
        ),
      };

    case 'event':
      return {
        title: item?.title,
        pageTypeTag: item.pageTypes[0],
        popularity: item?.pageTypes[0]?.popularity,
        subtitle: item?.subtitle,
        date: item?.postPublicationDate || item?._createdDate?.['$date'],
        editDate: item?._updatedDate?.$date,
        image:
          item?.projectResultMedia?.thumbnail ||
          item?.postImage1?.url ||
          PLACEHOLDER_IMAGE,
        eventStartDate: item?.eventStartDate,
        eventEndDate: item?.eventEndDate,
        projects: item?.projects,
        projectResultAuthor: item?.projectResultAuthor,
        text:
          item.postContentRIch1 + item.postContentRIch2 + item.postContentRIch3,
        tags: [...(item?.domains ?? []), ...(item?.methods ?? [])]?.slice(0, 3),
      };
    case 'organisation info':
      return {
        title: item.title,
        pageTypeTag: item.pageTypes[0],
        tagLine: item.organisation?.[0]?.tagLine,
        popularity: item?.pageTypes[0]?.popularity,
        subtitle: item?.subtitle,
        countryTags: item?.countryTag ?? [],
        organisationEstablishedDate: item?.organisationEstablishedDate,
        projectFunded: item?.projectFunded ?? [],
        organisationAffiliations:
          item?.projectOrganisationRoles?.slice(0, 3) ?? [],
        date: item._createdDate?.$date,
        editDate: item?._updatedDate?.$date,
        image: item.organisation?.[0]?.picture || PLACEHOLDER_IMAGE,
        text:
          item.postContentRIch1 + item.postContentRIch2 + item.postContentRIch3,
      };
    case 'person info':
      return {
        title: item.title,
        pageTypeTag: item.pageTypes[0],
        tagLine: item.person?.[0]?.tagLine,
        popularity: item?.pageTypes[0]?.popularity,
        subtitle: item?.subtitle,
        countryTags: item?.countryTag ?? [],
        organisationAffiliations:
          item?.personOrganisationRoles?.slice(0, 3) ?? [],
        date: item._createdDate?.$date,
        editDate: item?._updatedDate?.$date,
        image: item.person?.[0]?.picture || PLACEHOLDER_IMAGE,
        text:
          item?.postContentRIch1 +
          item?.postContentRIch2 +
          item?.postContentRIch3,
        domains: [...(item?.domains ?? []), ...(item?.methods ?? [])]?.slice(
          0,
          3
        ),
      };
    default:
      return {
        title: item?.title,
        subtitle: item?.subtitle,
        date: item?.postPublicationDate || item?._createdDate?.['$date'],
        image:
          item?.projectResultMedia?.thumbnail ||
          item?.postImage1?.url ||
          'https://placehold.co/600x400?text=placeholder',
        text:
          item.postContentRIch1 + item.postContentRIch2 + item.postContentRIch3,
        domains: item?.domains,
        methods: item?.methods,
        pageTypeTag: item?.pageTypes?.[0],
        primaryTags: [
          item.author?.[0] && item.author?.[0],
          item.projects?.[0] && item.projects?.[0],
        ]?.slice(0, 3),
      };
  }
};
