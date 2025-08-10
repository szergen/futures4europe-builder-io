/**
 * Utility functions for user and member operations
 */
import { updateMember } from '@app/wixUtils/client-side';

/**
 * Updates a member's nickname if it differs from the current one
 * @param contactId The contact ID of the member
 * @param currentNickname The current nickname
 * @param newNickname The new nickname to set
 * @returns The updated member or null if no update was needed
 */
export const updateMemberNicknameIfChanged = async (
  contactId: string,
  currentNickname: string,
  newNickname: string
): Promise<any | null> => {
  if (newNickname !== currentNickname) {
    console.log(`Updating nickname from ${currentNickname} to ${newNickname}`);
    const updatedMember = await updateMember(contactId, newNickname);
    return updatedMember;
  }
  return null;
};

/**
 * Updates user details with a new tag page link
 * @param updateUserDetails Function to update user details
 * @param slug The slug for the person page
 */
export const updateUserTagPageLink = (
  updateUserDetails: (updater: (prevData: any) => any) => void,
  slug: string
): void => {
  updateUserDetails((prevData: any) => ({
    ...prevData,
    userTag: {
      ...prevData.userTag,
      tagPageLink: `/person/${slug}`,
    },
  }));
};
