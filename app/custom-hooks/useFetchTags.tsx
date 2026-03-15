const fetchTagsWithPopularity = async () => {
  let tags = [] as any[];

  try {
    const response = await fetch('/api/tags-with-popularity');
    const data = await response.json();
    if (Array.isArray(data)) {
      tags = data;
    } else {
      console.warn('Tags API returned non-array:', typeof data);
    }
  } catch (error) {
    console.error('Error fetching tags:', error);
  }

  return tags;
};

export default fetchTagsWithPopularity;
