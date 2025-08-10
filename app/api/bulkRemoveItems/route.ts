import { NextRequest, NextResponse } from 'next/server';
import { getWixClientServerData } from '@app/hooks/useWixClientServer';

export const POST = async (req: NextRequest) => {
  const { collectionName, dataItems } = await req.json();
  console.log('dataItems->', dataItems);

  try {
    const wixClientServer = await getWixClientServerData();
    const removedItems = await wixClientServer.items.bulkRemoveDataItems({
      dataCollectionId: collectionName,
      dataItemIds: dataItems,
    });
    return NextResponse.json(removedItems, { status: 200 });
  } catch (error) {
    console.error('Error removing bulk dataItems', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};

export const GET = () => {
  return NextResponse.json(
    { message: 'Method not allowed for bulkInsertDataItems' },
    { status: 405 }
  );
};
