import { NextRequest, NextResponse } from 'next/server';
import { getWixClientServerData } from '@app/hooks/useWixClientServer';

export const POST = async (req: NextRequest) => {
  const { mimeType, options } = await req.json();
  //   console.log('dataItems->', dataItems);

  try {
    const wixClientServer = await getWixClientServerData();
    const generatedFileUploadUrl =
      await wixClientServer?.files?.generateFileUploadUrl(mimeType, {
        fileName: options?.fileName,
        filePath: options?.filePath,
      });
    console.log('generatedFileUploadUrl', generatedFileUploadUrl);
    return NextResponse.json(generatedFileUploadUrl, { status: 200 });
  } catch (error) {
    console.error('Error generating upload URL', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};

export const GET = () => {
  return NextResponse.json(
    { message: 'Method not allowed for generatedFileUploadUrl' },
    { status: 405 }
  );
};
