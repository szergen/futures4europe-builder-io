/**
 * API Route: Delete Affiliation in Builder.io
 * DELETE /api/builder/affiliations/[id]
 *
 * This server-side route handles single affiliation deletion using the private API key
 */

import { NextRequest, NextResponse } from "next/server";

const BUILDER_API_URL = "https://builder.io/api/v1/write";
const BUILDER_PRIVATE_API_KEY = process.env.BUILDER_PRIVATE_API_KEY || "";

export async function DELETE(
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

    const affiliationId = params.id;

    console.log("[Builder.io API] Deleting affiliation:", {
      id: affiliationId,
    });

    // Make request to Builder.io Write API to delete/unpublish
    // Builder.io uses DELETE endpoint for content removal
    const response = await fetch(
      `${BUILDER_API_URL}/affiliations/${affiliationId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${BUILDER_PRIVATE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Builder.io API] Delete affiliation failed:", {
        id: affiliationId,
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });

      if (response.status === 404) {
        return NextResponse.json(
          {
            error: "Affiliation not found",
            id: affiliationId,
          },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          error: `Failed to delete affiliation: ${response.status} ${response.statusText}`,
          details: errorText,
        },
        { status: response.status }
      );
    }

    console.log("[Builder.io API] Affiliation deleted successfully:", {
      id: affiliationId,
    });

    return NextResponse.json(
      {
        success: true,
        id: affiliationId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Builder.io API] Error deleting affiliation:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
