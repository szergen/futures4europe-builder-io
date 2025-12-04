import { useState, useEffect } from "react";

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
        // Fetch tags from Builder.io via API endpoint
        const response = await fetch("/api/tags");
        if (!response.ok) {
          throw new Error("Failed to fetch tags");
        }
        const allTags = await response.json();

        // Filter tags by tagType if specified
        const matchedTags = allTags.filter((tag: any) => {
          if (!tagType) return true;

          const normalizedTagType = tag.tagType?.toLowerCase();
          const normalizedFilterType = tagType?.toLowerCase();

          return (
            normalizedTagType === normalizedFilterType ||
            normalizedTagType === normalizedFilterType?.replace(/s$/, "") ||
            normalizedTagType + "s" === normalizedFilterType
          );
        });

        setTags(matchedTags);
      } catch (error) {
        console.error("Error fetching tags from Builder.io:", error);
        setTags([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [tagType]);

  return { tags, loading };
};

export default useTags;
