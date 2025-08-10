import { NextRequest, NextResponse } from 'next/server';
import { getWixClientServerData } from '@app/hooks/useWixClientServer';
import { RedisCacheService } from '@app/services/redisCache';

export const revalidate = 0;

export const GET = async (req: NextRequest) => {
  const cacheKey = 'tags.json';

  try {
    const cachedData = await RedisCacheService.getFromCache(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    const wixClient = await getWixClientServerData();

    let allItems = [] as any[];
    let skip = 0;
    const limit = 1000;
    let totalCount = 0;

    do {
      const result = await wixClient.items
        .queryDataItems({
          dataCollectionId: 'Tags',
          // referencedItemOptions: referencedItemOptions,
          returnTotalCount: true,
        })
        .skip(skip)
        .limit(limit)
        .find();
      allItems = [...allItems, ...result.items];
      totalCount = result.totalCount || 0;
      skip = limit + skip;
    } while (skip < totalCount);
    // // console.log('allItems', allItems);

    await RedisCacheService.saveToCache(cacheKey, allItems, 4 * 60 * 60 * 1000);
    return NextResponse.json(allItems);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { message: 'Error fetching tags' },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  const cacheKey = 'tags.json';

  try {
    const wixClient = await getWixClientServerData();

    let allItems = [] as any[];
    let skip = 0;
    const limit = 1000;
    let totalCount = 0;

    do {
      const result = await wixClient.items
        .queryDataItems({
          dataCollectionId: 'Tags',
          // referencedItemOptions: referencedItemOptions,
          returnTotalCount: true,
        })
        .skip(skip)
        .limit(limit)
        .find();
      allItems = [...allItems, ...result.items];
      totalCount = result.totalCount || 0;
      skip = limit + skip;
    } while (skip < totalCount);
    // // console.log('allItems', allItems);

    await RedisCacheService.saveToCache(cacheKey, allItems, 4 * 60 * 60 * 1000);
    return NextResponse.json(
      { message: 'Cache updated successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating cache:', error);
    return NextResponse.json(
      { message: 'Failed to update cache' },
      {
        status: 500,
      }
    );
  }
};
