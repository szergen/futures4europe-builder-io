import {
  getWixClientData,
  getWixClientMember,
  getWixClientServerData,
} from '@app/hooks/useWixClientServer';

const referencedItemOptions = [
  { fieldName: 'countryTag' },
  { fieldName: 'methods' },
  { fieldName: 'domains' },
  { fieldName: 'people' },
  { fieldName: 'projects' },
  { fieldName: 'organisations' },
  { fieldName: 'projectResultAuthor' },
  { fieldName: 'speakers', limit: 100 },
  { fieldName: 'moderators' },
  { fieldName: 'pageTypes' },
  { fieldName: 'author' },
  { fieldName: 'person' },
  { fieldName: 'Project' },
  { fieldName: 'organisation' },
  { fieldName: 'activity' },
  { fieldName: 'personProjectCoordonation' },
  { fieldName: 'personProjectParticipation' },
  { fieldName: 'personOrganisation' },
  { fieldName: 'personOrganisationFormer' },
  // { fieldName: 'InfoPages_projectCoordinator' },
  // { fieldName: 'InfoPages_personOrganisation' },
  { fieldName: 'projectFunded' },
  { fieldName: 'projectCoordinator' },
  { fieldName: 'projectParticipantTeam' },
  { fieldName: 'projectOrganisation' },
  { fieldName: 'organisation' },
  { fieldName: 'organisationProject' },
  { fieldName: 'organisationPeople' },
  { fieldName: 'organisationHasMember' },
  { fieldName: 'organisationMemberOf' },
  { fieldName: 'internalLinks' },
  { fieldName: 'organisationType' },
  { fieldName: 'featuredPosts' },
  { fieldName: 'featuredProjects' },
  { fieldName: 'featuredProjectResults' },
  { fieldName: 'featuredEvents' },
  { fieldName: 'featuredOrganisations' },
  { fieldName: 'featuredPeople' },
  { fieldName: 'pageOwner' },
  { fieldName: 'masterTag' },
];

const getCollection = async (collectionName: string) => {
  try {
    const wixClient = await getWixClientServerData();
    // const { items } = await wixClient.items
    //   .queryDataItems({
    //     dataCollectionId: collectionName,
    //     referencedItemOptions: referencedItemOptions,
    //   })
    //   .find();

    let allTags = [] as any[];
    let skip = 0;
    const limit = 1000;
    let totalCount = 0;

    do {
      const result = await wixClient.items
        .queryDataItems({
          dataCollectionId: collectionName,
          referencedItemOptions: referencedItemOptions,
          returnTotalCount: true,
        })
        .skip(skip)
        .limit(limit)
        .find();
      allTags = [...allTags, ...result?._items];
      totalCount = result?._totalCount;
      skip = limit + skip;
    } while (skip < totalCount);

    return allTags;
  } catch (error) {
    console.error('Error getting collection:', error);
    throw error;
  }
};

const getCollectionItemByTitle = async (
  collectionName: string,
  itemId: string
) => {
  try {
    const wixClient = await getWixClientData();
    const itemToBeFound = itemId.replace(/_/g, ' ');
    console.log('itemToBeFound->', itemToBeFound);
    const { items } = await wixClient.items
      .queryDataItems({
        dataCollectionId: collectionName,
        referencedItemOptions: referencedItemOptions,
      })
      .eq('title', itemToBeFound)
      .find();
    return items[0];
  } catch (error) {
    console.error('Error getting collection item:', error);
    throw error;
  }
};

const getItemById = async (collectionName: string, itemId: string) => {
  try {
    const wixClient = await getWixClientData();
    const respone = await wixClient.items.getDataItem(itemId, {
      dataCollectionId: collectionName,
    });
    return respone;
  } catch (error) {
    console.error('Error getting Item By Id', error);
    throw error;
  }
};

const getCollectionItemBySlug = async (
  collectionName: string,
  slug: string
) => {
  try {
    const wixClient = await getWixClientData();
    // const itemToBeFound = itemId.replace(/_/g, ' ');
    console.log('slug->', slug);
    const { items } = await wixClient.items
      .queryDataItems({
        dataCollectionId: collectionName,
        referencedItemOptions: referencedItemOptions,
      })
      .eq('slug', slug)
      .find();
    return items[0];
  } catch (error) {
    console.error('Error getting collection item:', error);
    throw error;
  }
};

const getAffiliationsCollectionItemsByTag = async (
  tagId: string,
  fieldId: string
) => {
  try {
    const wixClient = await getWixClientData();
    const { items } = await wixClient.items
      .queryDataItems({
        dataCollectionId: 'Affiliations',
        referencedItemOptions: [
          { fieldName: 'personTag' },
          { fieldName: 'organisationTag' },
          { fieldName: 'projectTag' },
        ],
      })
      .in(fieldId, [tagId])
      .find();
    return items;
  } catch (error) {
    console.error('Error getting collection item:', error);
    throw error;
  }
};

const composeReferencedItemTitlesForInfoPages = (
  referencedPagesKeys: Array<string>,
  dataItem: Record<string, any>
) => {
  let referencedPageIds = [];
  for (const [key, value] of Object.entries(dataItem)) {
    referencedPagesKeys.includes(key)
      ? referencedPageIds.push(value.map((valueItem: any) => valueItem?.title))
      : null;
  }

  return referencedPageIds?.flat();
};

const getAllReferencedItemsByTitle = async (
  collectionName: string,
  referencedTitles: Array<string>
) => {
  try {
    const wixClient = await getWixClientData();
    const { items } = await wixClient.items
      .queryDataItems({
        dataCollectionId: collectionName,
        referencedItemOptions: referencedItemOptions,
      })
      .in('title', referencedTitles)
      .find();
    return items;
  } catch (error) {
    console.error('Error getting collection item:', error);
    throw error;
  }
};

const composePageWithReferencedItems = async (
  pageData: Record<string, any>,
  referencedTitleKeys: Array<string>,
  referencesPayload: Array<Record<string, any>>
) => {
  referencedTitleKeys.forEach((element) => {
    pageData[element] = pageData[element]?.map((item: any) => {
      const referencedItem = referencesPayload.find(
        (reference) => reference.data.title === item.title
      );
      return referencedItem?.data;
    });
  });
  return pageData;
};

const getMemberById = async (memberId: string) => {
  const wixClientMember = await getWixClientMember();
  try {
    const member = await wixClientMember.members.getMember(memberId);
    return member;
  } catch (error) {
    console.error('Error getting member:', error);
    throw error;
  }
};

const updateDataItem = async (
  collectionName: string,
  itemId: string,
  data: Record<string, any> | null
) => {
  const wixClientServer = await getWixClientServerData();

  //   const { items } = await wixClientServer.items
  //     .queryDataItems({
  //       dataCollectionId: collectionName,
  //     })
  //     .find();
  //   return items;

  //   console.log('items from client server===>', items);

  try {
    const updatedItem = await wixClientServer.items.updateDataItem(itemId, {
      dataItem: {
        data,
      },
      dataCollectionId: collectionName,
    });
    return updatedItem;
  } catch (error) {
    console.error('Error updating data item', error);
  }
};

export {
  getCollection,
  getCollectionItemByTitle,
  updateDataItem,
  getMemberById,
  composeReferencedItemTitlesForInfoPages,
  getAllReferencedItemsByTitle,
  composePageWithReferencedItems,
  referencedItemOptions,
  getCollectionItemBySlug,
  getItemById,
  getAffiliationsCollectionItemsByTag,
};
