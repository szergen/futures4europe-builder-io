import { NextRequest, NextResponse } from 'next/server';
import { getWixClientServerData } from '@app/hooks/useWixClientServer';

export const POST = async (req: NextRequest) => {
  const { contactId, nickname } = await req.json();
  console.log('itemId and nickname->', contactId, nickname);
  //   console.log('data->', data);

  try {
    const wixClientServer = await getWixClientServerData();
    const contactData = await wixClientServer.members.updateMember(contactId, {
      profile: {
        nickname: nickname,
      },
    });
    return NextResponse.json(contactData, { status: 200 });
  } catch (error) {
    console.error(
      `Error updating contact with contactId: ${contactId} and nickname ${nickname}`,
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
    { message: 'Method not allowed for UpdateMember' },
    { status: 405 }
  );
};
