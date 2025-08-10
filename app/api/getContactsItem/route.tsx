import { NextRequest, NextResponse } from 'next/server';
import { getWixClientServerData } from '@app/hooks/useWixClientServer';

export const POST = async (req: NextRequest) => {
  const { itemId } = await req.json();
  console.log('itemId->', itemId);
  //   console.log('data->', data);

  try {
    const wixClientServer = await getWixClientServerData();
    const contactData = await wixClientServer.contacts.getContact(itemId, {
      fieldsets: ['FULL' as any],
    });
    return NextResponse.json(contactData, { status: 200 });
  } catch (error) {
    console.error(`Error getting contact with id: ${itemId}`, error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};

export const GET = () => {
  return NextResponse.json(
    { message: 'Method not allowed for GetContactsItem' },
    { status: 405 }
  );
};
