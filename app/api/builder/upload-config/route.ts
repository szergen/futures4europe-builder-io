import { NextRequest, NextResponse } from "next/server";

const BUILDER_PRIVATE_API_KEY = process.env.BUILDER_PRIVATE_API_KEY || "";

// Configure route segment for larger file uploads
export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * This endpoint returns a signed URL that allows direct upload to Builder.io
 * This bypasses Vercel's body size limits by having the client upload directly
 */
export const POST = async (req: NextRequest) => {
  try {
    if (!BUILDER_PRIVATE_API_KEY) {
      console.error(
        "[Builder.io Upload API] BUILDER_PRIVATE_API_KEY not configured",
      );
      return NextResponse.json(
        { message: "Builder.io API key not configured" },
        { status: 500 },
      );
    }

    const body = await req.json();
    const { fileName, folder, altText } = body;

    // Return the Builder.io upload configuration for direct client upload
    return NextResponse.json(
      {
        uploadUrl: "https://builder.io/api/v1/upload",
        apiKey: BUILDER_PRIVATE_API_KEY,
        fileName,
        folder,
        altText,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[Builder.io Upload API] Error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: String(error) },
      { status: 500 },
    );
  }
};

export const GET = () => {
  return NextResponse.json(
    { message: "Method not allowed for Builder.io upload" },
    { status: 405 },
  );
};
