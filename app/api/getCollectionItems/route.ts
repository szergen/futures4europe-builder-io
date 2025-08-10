import { NextRequest, NextResponse } from 'next/server';
import { getWixClientData } from '@app/hooks/useWixClientServer';

export const POST = async (req: NextRequest) => {
  const { collectionName } = await req.json();

  try {
    const wixClient = await getWixClientData();
    // const { items } = await wixClient.items
    //   .queryDataItems({
    //     dataCollectionId: collectionName,
    //     referencedItemOptions: referencedItemOptions,
    //   })
    //   .find();

    let allTags = [] as any[];
    let skip = 0;
    const limit = 1000;
    let totalCount = 0;

    do {
      const result = await wixClient.items
        .queryDataItems({
          dataCollectionId: collectionName,
          // referencedItemOptions: referencedItemOptions,
          returnTotalCount: true,
        })
        .skip(skip)
        .limit(limit)
        .find();
      allTags = [...allTags, ...result?._items];
      totalCount = result?._totalCount;
      skip = limit + skip;
    } while (skip < totalCount);

    return NextResponse.json(allTags, { status: 200 });
  } catch (error) {
    console.error(
      `Error getting items from collection ${collectionName}`,
      error
    );
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};

export const GET = () => {
  return NextResponse.json(
    { message: 'Method not allowed for getCollectionItemByTitle' },
    { status: 405 }
  );
};
