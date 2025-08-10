import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  // Parse the request body
  const { postSlug, secret } = await req.json();

  // Validate the secret token (to secure the API route)
  //   / Access the token from the environment variables
  const REVALIDATION_TOKEN = process.env.REVALIDATION_TOKEN;
  // Validate the token
  if (secret !== REVALIDATION_TOKEN) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    // Revalidate the path for the specific post page
    const pathToRevalidate = `${postSlug}`;
    console.log('Revalidating path:', pathToRevalidate);
    revalidatePath(pathToRevalidate); // No need to await, revalidation happens asynchronously

    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    );
  }
}
