/**
 * Utility functions for data operations
 */
import {
  bulkInsertItems,
  bulkRemoveItems,
  replaceDataItemReferences,
  updateDataItem,
} from '@app/wixUtils/client-side';
import { deepEqual } from '../page-components/PageComponents.utils';

/**
 * Creates affiliation items between a person and organizations
 * @param personTag The person tag
 * @param organizations Array of organization objects with name and role
 * @param extraIdentifier Identifier for the affiliation type (e.g., 'current', 'former')
 * @returns The result of the bulk insert operation
 */
export const createAffiliations = async (
  personTag: any,
  organizations: any[],
  extraIdentifier: string
): Promise<any> => {
  if (!organizations || organizations.length === 0) {
    return null;
  }

  const affiliationsObjects = organizations
    .map((item: any) => ({
      data: {
        personTag,
        organisationTag: item,
        role: item.arole,
        extraIdentifier,
        title: `${personTag?.name} -to- ${item.name}`,
      },
    }))
    .filter((item: any) => item?.data?.organisationTag?.name !== '');

  if (affiliationsObjects.length === 0) {
    return null;
  }

  return await bulkInsertItems('Affiliations', affiliationsObjects);
};

/**
 * Creates project affiliations between a person and projects
 * @param personTag The person tag
 * @param projects Array of project objects
 * @param extraIdentifier Identifier for the affiliation type (e.g., 'coordination', 'participation')
 * @returns The result of the bulk insert operation
 */
export const createProjectAffiliations = async (
  personTag: any,
  projects: any[],
  extraIdentifier: string
): Promise<any> => {
  if (!projects || projects.length === 0) {
    return null;
  }

  const affiliationsObjects = projects
    .map((item: any) => ({
      data: {
        personTag,
        projectTag: item,
        extraIdentifier,
        title: `${personTag?.name} -to- ${item.name}`,
      },
    }))
    .filter((item: any) => item?.data?.projectTag?.name !== '');

  if (affiliationsObjects.length === 0) {
    return null;
  }

  return await bulkInsertItems('Affiliations', affiliationsObjects);
};

/**
 * Removes existing affiliations and creates new ones
 * @param existingAffiliations Existing affiliation items
 * @param personTag The person tag
 * @param newItems New items to create affiliations with
 * @param extraIdentifier Identifier for the affiliation type
 * @param isProject Whether the items are projects or organizations
 * @returns Object containing the results of remove and create operations
 */
export const updateAffiliations = async (
  existingAffiliations: any[],
  personTag: any,
  newItems: any[],
  extraIdentifier: string,
  isProject: boolean = false
): Promise<{ removed: any; created: any }> => {
  const filteredAffiliations = existingAffiliations?.filter(
    (item: any) => item?.extraIdentifier === extraIdentifier
  );

  let removed = null;
  if (filteredAffiliations && filteredAffiliations.length > 0) {
    removed = await bulkRemoveItems(
      'Affiliations',
      filteredAffiliations.map((item: any) => item._id)
    );
  }

  let created = null;
  if (newItems && newItems.length > 0) {
    created = isProject
      ? await createProjectAffiliations(personTag, newItems, extraIdentifier)
      : await createAffiliations(personTag, newItems, extraIdentifier);
  }

  return { removed, created };
};

/**
 * Checks if a person tag needs to be updated and updates it if necessary
 * @param currentPersonTag Current person tag
 * @param defaultPersonTag Default person tag to compare against
 * @param newTagPageLink Optional new tag page link
 * @returns The updated person tag or null if no update was needed
 */
export const updatePersonTagIfChanged = async (
  currentPersonTag: any,
  defaultPersonTag: any,
  newTagPageLink?: string
): Promise<any | null> => {
  if (!deepEqual(currentPersonTag, defaultPersonTag) || newTagPageLink) {
    const updateData = {
      _id: currentPersonTag._id,
      ...currentPersonTag,
    };

    if (newTagPageLink) {
      updateData.tagPageLink = newTagPageLink;
    }

    return await updateDataItem('Tags', currentPersonTag._id, updateData);
  }
  return null;
};

/**
 * Updates references to tags in a collection
 * @param collectionName Collection name
 * @param tags Array of tags
 * @param fieldName Field name for the references
 * @param itemId Item ID to update
 * @returns The result of the replace operation
 */
export const updateTagReferences = async (
  collectionName: string,
  tags: any[],
  fieldName: string,
  itemId: string
): Promise<any> => {
  const validTags = tags?.filter((tag: any) => tag && tag._id);

  if (!validTags || validTags.length === 0) {
    return null;
  }

  return await replaceDataItemReferences(
    collectionName,
    validTags.map((tag: any) => tag._id),
    fieldName,
    itemId
  );
};
