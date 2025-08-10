import { NextRequest, NextResponse } from 'next/server';
import { getWixClientServerData } from '@app/hooks/useWixClientServer';

export const POST = async (req: NextRequest) => {
  const { collectionName, dataItemReferences } = await req.json();
  console.log('dataItems->', dataItemReferences);

  try {
    const wixClientServer = await getWixClientServerData();
    const insertedReferences =
      await wixClientServer.items.bulkInsertDataItemReferences({
        dataCollectionId: collectionName,
        dataItemReferences: dataItemReferences,
      });
    return NextResponse.json(insertedReferences, { status: 200 });
  } catch (error) {
    console.error('Error bulkInsertDataItemReferences', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};

export const GET = () => {
  return NextResponse.json(
    { message: 'Method not allowed for bulkInsertDataItemReferences' },
    { status: 405 }
  );
};
