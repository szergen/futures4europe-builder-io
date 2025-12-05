/**
 * API Route: Update Info-Page in Builder.io
 * PUT /api/builder/info-page/[id]
 *
 * This server-side route handles info-page updates using the private API key
 */

import { NextRequest, NextResponse } from "next/server";

const BUILDER_API_URL = "https://builder.io/api/v1/write";
const BUILDER_PRIVATE_API_KEY = process.env.BUILDER_PRIVATE_API_KEY || "";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if API key is configured
    if (!BUILDER_PRIVATE_API_KEY) {
      console.error("[Builder.io API] BUILDER_PRIVATE_API_KEY not configured");
      return NextResponse.json(
        { error: "Builder.io API key not configured" },
        { status: 500 }
      );
    }

    const pageId = params.id;
    const payload = await request.json();

    console.log("[Builder.io API] Updating info-page:", {
      id: pageId,
      slug: payload.data?.slug,
      title: payload.data?.title,
    });

    // Make request to Builder.io Write API
    const response = await fetch(`${BUILDER_API_URL}/info-page/${pageId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${BUILDER_PRIVATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Builder.io API] Update info-page failed:", {
        id: pageId,
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });

      return NextResponse.json(
        {
          error: `Failed to update info-page: ${response.status} ${response.statusText}`,
          details: errorText,
        },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log("[Builder.io API] Info-page updated successfully:", {
      id: result.id,
      slug: result.data?.slug,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("[Builder.io API] Error updating info-page:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
