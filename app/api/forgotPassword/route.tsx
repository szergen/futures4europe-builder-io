import { NextRequest, NextResponse } from 'next/server';
import {
  getWixClientMember,
  // getWixClientServerData,
} from '@app/hooks/useWixClientServer';

export const POST = async (req: NextRequest) => {
  const { email, redirectUrl } = await req.json();
  console.log('itemId->', email);
  //   console.log('data->', data);

  try {
    const wixClientServer = await getWixClientMember();
    const contactData = await wixClientServer.auth.sendPasswordResetEmail(
      email,
      redirectUrl
    );
    return NextResponse.json(
      {
        success: true,
        message: 'Password reset email sent successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error sending password reset to email: ${email}`, error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};

export const GET = () => {
  return NextResponse.json(
    { message: 'Method not allowed for forgotPassword' },
    { status: 405 }
  );
};
