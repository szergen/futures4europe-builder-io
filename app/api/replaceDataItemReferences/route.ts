import { NextRequest, NextResponse } from 'next/server';
import { getWixClientServerData } from '@app/hooks/useWixClientServer';

export const POST = async (req: NextRequest) => {
  const {
    collectionName,
    newReferencedItemIds,
    referringItemFieldName,
    referringItemId,
  } = await req.json();

  try {
    const wixClientServer = await getWixClientServerData();
    const replacedReferences =
      await wixClientServer.items.replaceDataItemReferences({
        dataCollectionId: collectionName,
        newReferencedItemIds: newReferencedItemIds,
        referringItemFieldName: referringItemFieldName,
        referringItemId: referringItemId,
      });
    return NextResponse.json(replacedReferences, { status: 200 });
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
