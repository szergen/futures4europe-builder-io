import { NextRequest, NextResponse } from 'next/server';
import { warmCache } from '@app/services/cacheWarmer';

export async function POST(req: NextRequest) {
  try {
    const success = await warmCache();

    if (success) {
      return NextResponse.json({
        message: 'Cache warming completed successfully',
      });
    } else {
      return NextResponse.json(
        { message: 'Cache warming failed' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in cache warming endpoint:', error);
    return NextResponse.json(
      { message: 'Error warming cache' },
      { status: 500 }
    );
  }
}
