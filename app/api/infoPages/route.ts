import { NextRequest, NextResponse } from 'next/server';
import { getWixClientServerData } from '@app/hooks/useWixClientServer';
import { RedisCacheService } from '@app/services/redisCache';
import { referencedItemOptions } from '@app/wixUtils/server-side';

export const revalidate = 0; // Disable caching

export const GET = async (req: NextRequest) => {
  const cacheKey = 'infoPages.json';

  try {
    const cachedData = await RedisCacheService.getFromCache(cacheKey);
    if (cachedData) {
      console.log('Returning cached data for infoPages');
      return NextResponse.json(cachedData);
    }

    const wixClient = await getWixClientServerData();

    let allItems = [] as any[];
    let skip = 0;
    const limit = 1000; // Maximum allowed by Wix
    let totalCount = 0;
    let hasMore = true;

    while (hasMore) {
      console.log(`Fetching InfoPages: skip=${skip}, limit=${limit}`);
      const result = await wixClient.items
        .queryDataItems({
          dataCollectionId: 'InfoPages',
          referencedItemOptions: referencedItemOptions,
          returnTotalCount: true,
        })
        .skip(skip)
        .limit(limit)
        .find();

      const items = result?._items || [];
      allItems = [...allItems, ...items];
      totalCount = result?._totalCount || 0;

      skip += items.length;
      hasMore = skip < totalCount && items.length > 0;

      console.log(
        `Fetched ${items.length} InfoPages, total so far: ${allItems.length}/${totalCount}`
      );
    }

    console.log(`Completed fetching all ${allItems.length} InfoPages`);

    await RedisCacheService.saveToCache(cacheKey, allItems, 4 * 60 * 60 * 1000);

    // Return all items as an array (original format)
    return NextResponse.json(allItems);
  } catch (error) {
    console.error('Error fetching Info Pages:', error);
    return NextResponse.json(
      { message: 'Error fetching Info Pages', error: String(error) },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  const cacheKey = 'infoPages.json';

  try {
    const wixClient = await getWixClientServerData();

    let allItems = [] as any[];
    let skip = 0;
    const limit = 1000;
    let totalCount = 0;

    do {
      const result = await wixClient.items
        .queryDataItems({
          dataCollectionId: 'InfoPages',
          referencedItemOptions: referencedItemOptions,
          returnTotalCount: true,
        })
        .skip(skip)
        .limit(limit)
        .find();
      allItems = [...allItems, ...result.items];
      totalCount = result.totalCount || 0;
      skip = limit + skip;
    } while (skip < totalCount);
    // console.log('allItems', allItems);

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
