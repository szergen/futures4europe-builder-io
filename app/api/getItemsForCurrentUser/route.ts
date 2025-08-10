import { NextRequest, NextResponse } from 'next/server';
import { getWixClientData } from '@app/hooks/useWixClientServer';
import { referencedItemOptions } from '@app/wixUtils/server-side';

export const POST = async (req: NextRequest) => {
  const { collectionName, ownerId } = await req.json();

  try {
    const wixClient = await getWixClientData();
    // const itemToBeFound = itemId.replace(/_/g, ' ');
    const { items } = await wixClient.items
      .queryDataItems({
        dataCollectionId: collectionName,
        referencedItemOptions: referencedItemOptions,
      })
      .eq('_owner', ownerId)
      .find();
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error(
      `Error getting item: ${ownerId} from collection ${collectionName}`,
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
