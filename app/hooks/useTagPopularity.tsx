import { useMemo, useCallback } from 'react';
import { useAuth } from '@app/custom-hooks/AuthContext/AuthContext';

export const useTagPopularity = () => {
  const { tags: authTags, tagsFetched } = useAuth();
  const tagsMap = useMemo(() => {
    if (!authTags) return new Map();
    // Also store titles with normalized formatting
    const map = new Map();
    authTags.forEach((tag) => {
      if (tag.name) {
        map.set(tag.name, tag.mentions); // Original
        // Store a trimmed version
        map.set(tag.name.trim(), tag.mentions);
      }
    });
    return map;
  }, [authTags]);

  const getPopularity = useCallback(
    (tagName?: string) => {
      if (!tagName) return undefined;
      // Try to find the tag with exact name first
      const cleanName = tagName.trim();
      return tagsMap.get(cleanName);
    },
    [tagsMap]
  );

  return {
    getPopularity,
    isLoaded: tagsFetched,
    tagsMap,
  };
};
