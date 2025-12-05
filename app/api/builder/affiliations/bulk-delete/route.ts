/**
 * API Route: Bulk Delete Affiliations in Builder.io
 * POST /api/builder/affiliations/bulk-delete
 *
 * This server-side route handles bulk affiliation deletion using the private API key
 * Accepts an array of IDs and deletes each one, returning results
 */

import { NextRequest, NextResponse } from "next/server";

const BUILDER_API_URL = "https://builder.io/api/v1/write";
const BUILDER_PRIVATE_API_KEY = process.env.BUILDER_PRIVATE_API_KEY || "";

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!BUILDER_PRIVATE_API_KEY) {
      console.error("[Builder.io API] BUILDER_PRIVATE_API_KEY not configured");
      return NextResponse.json(
        { error: "Builder.io API key not configured" },
        { status: 500 }
      );
    }

    // Parse request body - expects { ids: [...] }
    const { ids } = await request.json();

    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json(
        { error: "Invalid request: ids array required" },
        { status: 400 }
      );
    }

    console.log(`[Builder.io API] Deleting ${ids.length} affiliations`);

    const deleted: string[] = [];
    const failed: any[] = [];

    // Delete affiliations sequentially to avoid rate limiting
    for (const id of ids) {
      try {
        const response = await fetch(`${BUILDER_API_URL}/affiliations/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${BUILDER_PRIVATE_API_KEY}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          deleted.push(id);
          console.log("[Builder.io API] Affiliation deleted:", { id });
        } else {
          const errorText = await response.text();
          failed.push({
            id,
            error: `${response.status}: ${errorText}`,
          });
          console.error("[Builder.io API] Affiliation delete failed:", {
            id,
            status: response.status,
            error: errorText,
          });
        }
      } catch (error) {
        failed.push({
          id,
          error: String(error),
        });
        console.error("[Builder.io API] Affiliation delete error:", id, error);
      }
    }

    console.log(
      `[Builder.io API] Affiliations deleted: ${deleted.length}, failed: ${failed.length}`
    );

    return NextResponse.json(
      {
        deleted,
        failed,
        summary: {
          total: ids.length,
          deleted: deleted.length,
          failed: failed.length,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Builder.io API] Error deleting affiliations:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
