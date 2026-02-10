import { NextRequest, NextResponse } from "next/server";

const BUILDER_UPLOAD_API_URL = "https://builder.io/api/v1/upload";
const BUILDER_PRIVATE_API_KEY = process.env.BUILDER_PRIVATE_API_KEY || "";

// Configure route segment for larger file uploads
export const runtime = "nodejs"; // Ensure we use Node.js runtime, not Edge
export const maxDuration = 120; // Maximum function execution time in seconds

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

    // Get the form data from the request
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const fileName = formData.get("fileName") as string | null;
    const folder = formData.get("folder") as string | null;
    const altText = formData.get("altText") as string | null;

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 },
      );
    }

    // Check file size (Vercel Pro plan supports larger uploads)
    const fileSizeMB = file.size / (1024 * 1024);
    console.log(
      `[Builder.io Upload API] File size: ${fileSizeMB.toFixed(2)}MB`,
    );

    if (fileSizeMB > 40) {
      return NextResponse.json(
        {
          message: "File too large. Maximum file size is 40MB.",
          fileSize: fileSizeMB,
          maxSize: 40,
        },
        { status: 413 },
      );
    }

    // Get file as array buffer for upload
    const fileBuffer = await file.arrayBuffer();
    const fileBytes = new Uint8Array(fileBuffer);

    // Build the upload URL with query parameters
    const uploadParams = new URLSearchParams();
    uploadParams.set("name", fileName || file.name);
    if (altText) {
      uploadParams.set("altText", altText);
    }
    if (folder) {
      uploadParams.set("folder", folder);
    }

    const uploadUrl = `${BUILDER_UPLOAD_API_URL}?${uploadParams.toString()}`;

    console.log("[Builder.io Upload API] Uploading file:", {
      name: fileName || file.name,
      type: file.type,
      size: file.size,
      folder: folder || "root",
    });

    // Upload to Builder.io
    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${BUILDER_PRIVATE_API_KEY}`,
        "Content-Type": file.type || "application/octet-stream",
      },
      body: fileBytes,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Builder.io Upload API] Upload failed:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
      return NextResponse.json(
        { message: `Upload failed: ${response.statusText}`, error: errorText },
        { status: response.status },
      );
    }

    const result = await response.json();
    console.log("[Builder.io Upload API] Upload successful:", result);

    return NextResponse.json(result, { status: 200 });
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
