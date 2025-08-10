import { NextRequest, NextResponse } from 'next/server';
import { getWixClientServerData } from '@app/hooks/useWixClientServer';

export async function GET(req: NextRequest) {
  try {
    const contactId = req.nextUrl.searchParams.get('id');

    if (!contactId) {
      return NextResponse.json(
        { message: 'Contact ID is required' },
        { status: 400 }
      );
    }

    const wixClient = await getWixClientServerData();

    // Fetch a single contact with the given ID
    const contact = await wixClient.contacts.getContact(contactId);

    if (!contact) {
      return NextResponse.json(
        { message: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        contact,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching contact:', error);
    return NextResponse.json(
      { message: 'Error fetching contact', error: error.message },
      { status: 500 }
    );
  }
}
