/**
 * Utility functions for array operations
 */

/**
 * Checks if two arrays are equal by comparing their elements
 * @param arr1 First array
 * @param arr2 Second array
 * @returns True if arrays are equal, false otherwise
 */
export const arraysEqual = (arr1: any[], arr2: any[]): boolean => {
  if (!arr1 && !arr2) return true;
  if (!arr1 || !arr2) return false;
  if (arr1.length !== arr2.length) return false;

  // Sort arrays by name property if objects
  const sortedArr1 = [...arr1].sort((a, b) =>
    (a.name || '').localeCompare(b.name || '')
  );

  const sortedArr2 = [...arr2].sort((a, b) =>
    (a.name || '').localeCompare(b.name || '')
  );

  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i]._id !== sortedArr2[i]._id) {
      return false;
    }
  }

  return true;
};

/**
 * Checks if an array of tags needs to be updated by comparing with another array
 * @param currentTags Current array of tags
 * @param defaultTags Default array of tags to compare against
 * @returns True if the array needs to be updated, false otherwise
 */
export const checkIfArrayNeedsUpdateForTags = (
  currentTags: any[],
  defaultTags: any[]
): boolean => {
  if (!currentTags && !defaultTags) return false;
  if (!currentTags || !defaultTags) return true;
  if (currentTags.length !== defaultTags.length) return true;

  // Create maps of tag IDs for quick lookup
  const currentTagIds = new Set(currentTags.map((tag) => tag._id));
  const defaultTagIds = new Set(defaultTags.map((tag) => tag._id));

  // Check if any tag is in one set but not the other
  for (const id of currentTagIds) {
    if (!defaultTagIds.has(id)) return true;
  }

  for (const id of defaultTagIds) {
    if (!currentTagIds.has(id)) return true;
  }

  return false;
};

/**
 * Filters out duplicate tags from an array based on name
 * @param tags Array of tags to filter
 * @returns Array with duplicates removed
 */
export const filterDuplicateTags = (tags: any[]): any[] => {
  if (!tags || tags.length === 0) return [];

  return tags.filter(
    (tag, index, self) => index === self.findIndex((t) => t.name === tag.name)
  );
};

/**
 * Filters out duplicate organization tags with the same role
 * @param organizations Array of organization objects with name and role
 * @returns Array with duplicates removed
 */
export const filterDuplicateOrganizations = (organizations: any[]): any[] => {
  if (!organizations || organizations.length === 0) return [];

  return organizations.filter(
    (org, index, self) =>
      index ===
      self.findIndex((o) => o.name === org.name && o.arole === org.arole)
  );
};
