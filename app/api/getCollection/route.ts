import { NextRequest, NextResponse } from 'next/server';
import { getWixClientData } from '@app/hooks/useWixClientServer';

export const POST = async (req: NextRequest) => {
  const { collectionName } = await req.json();

  try {
    const wixClient = await getWixClientData();
    const { items } = await wixClient.items
      .queryDataItems({
        dataCollectionId: collectionName,
        includeReferencedItems: ['countryTag'],
      })
      .find();
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error(`Error getting collection: ${collectionName}`, error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};

export const GET = () => {
  return NextResponse.json(
    { message: 'Method not allowed for GetCollection' },
    { status: 405 }
  );
};
