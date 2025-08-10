import { NextRequest, NextResponse } from 'next/server';
import { getWixClientServerData } from '@app/hooks/useWixClientServer';

export const POST = async (req: NextRequest) => {
  const { collectionName, itemId, data } = await req.json();
  //   console.log('collectionName->', collectionName);
  console.log('itemId->', itemId);
  //   console.log('data->', data);

  try {
    const wixClientServer = await getWixClientServerData();
    const updatedItem = await wixClientServer.items.updateDataItem(itemId, {
      dataItem: {
        data,
      },
      dataCollectionId: collectionName,
    });
    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    console.error('Error updating data item', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};

export const GET = () => {
  return NextResponse.json(
    { message: 'Method not allowed for UpdateDataItem' },
    { status: 405 }
  );
};
