import { NextRequest, NextResponse } from 'next/server';
import { calculatePopularity } from '@app/utils/tags.utls';
import { RedisCacheService } from '@app/services/redisCache';

// Keep the revalidate setting
export const revalidate = 0; // 5 minutes

export const GET = async (req: NextRequest) => {
  const cacheKey = 'tags-with-popularity.json';

  try {
    const cachedData = await RedisCacheService.getFromCache(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    // Determine the base URL for API calls
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

    // Try to get data from cache first, if not found fetch from API
    let tags = await RedisCacheService.getFromCache('tags.json');
    let infoPages = await RedisCacheService.getFromCache('infoPages.json');
    let postPages = await RedisCacheService.getFromCache('postPages.json');
    let affiliations = await RedisCacheService.getFromCache(
      'affiliations.json'
    );

    // Fetch any missing data from API
    if (!tags) {
      const tagsResponse = await fetch(`${baseUrl}/api/tags`);
      if (!tagsResponse.ok)
        throw new Error(`Failed to fetch tags: ${tagsResponse.status}`);
      tags = await tagsResponse.json();
    }

    if (!infoPages) {
      const infoPagesResponse = await fetch(`${baseUrl}/api/infoPages`);
      if (!infoPagesResponse.ok)
        throw new Error(
          `Failed to fetch infoPages: ${infoPagesResponse.status}`
        );
      infoPages = await infoPagesResponse.json();
    }

    if (!postPages) {
      const postPagesResponse = await fetch(`${baseUrl}/api/postPages`);
      if (!postPagesResponse.ok)
        throw new Error(
          `Failed to fetch postPages: ${postPagesResponse.status}`
        );
      postPages = await postPagesResponse.json();
    }

    if (!affiliations) {
      const affiliationsResponse = await fetch(`${baseUrl}/api/affiliations`);
      if (!affiliationsResponse.ok)
        throw new Error(
          `Failed to fetch affiliations: ${affiliationsResponse.status}`
        );
      affiliations = await affiliationsResponse.json();
    }

    // Calculate popularity
    const tagsWithMentions = await tags.map((tag: any) => tag.data);
    const affiliationsWithMentions = await affiliations.map(
      (affiliation: any) => affiliation.data
    );

    const popularTags = calculatePopularity(
      tagsWithMentions,
      infoPages,
      postPages,
      affiliationsWithMentions
    );

    // Sort by popularity
    const sortedTags = popularTags.sort(
      (a: any, b: any) => b.mentions - a.mentions
    );
    console.log(
      `tags-with-popularity->Calculated popularity for ${sortedTags.length} tags`
    );

    await RedisCacheService.saveToCache(
      cacheKey,
      sortedTags,
      4 * 60 * 60 * 1000
    );

    return NextResponse.json(sortedTags);
  } catch (error) {
    console.error('Error calculating tag popularity:', error);
    return NextResponse.json(
      { message: 'Error calculating tag popularity', error: String(error) },
      { status: 500 }
    );
  }
};
