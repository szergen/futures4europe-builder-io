import { useState, useEffect } from 'react';
import { getCollectionItems } from '@app/wixUtils/client-side';

interface UseTagsProps {
  tagType?: string;
  limit?: number;
  offset?: number;
}

const useTags = ({ tagType }: UseTagsProps = {}) => {
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const allTags = await getCollectionItems('Tags');
        const matchedTags = allTags
          .map((tag) => tag.data)
          .filter((tagData) => {
            const normalizedTagType = tagData.tagType?.toLowerCase();
            const normalizedFilterType = tagType?.toLowerCase();
            return (
              !tagType ||
              normalizedTagType === normalizedFilterType ||
              normalizedTagType === normalizedFilterType?.replace(/s$/, '') ||
              normalizedTagType + 's' === normalizedFilterType
            );
          });

        setTags(matchedTags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [tagType]);

  return { tags, loading };
};

export default useTags;
