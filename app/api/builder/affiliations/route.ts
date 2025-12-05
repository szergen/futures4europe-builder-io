/**
 * API Route: Create Affiliations in Builder.io (Bulk)
 * POST /api/builder/affiliations
 *
 * This server-side route handles bulk affiliation creation using the private API key
 * Supports creating multiple affiliations in a single request
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

    // Parse request body - expects { affiliations: [...] }
    const { affiliations } = await request.json();

    if (!affiliations || !Array.isArray(affiliations)) {
      return NextResponse.json(
        { error: "Invalid request: affiliations array required" },
        { status: 400 }
      );
    }

    console.log(
      `[Builder.io API] Creating ${affiliations.length} affiliations`
    );

    const created: any[] = [];
    const failed: any[] = [];

    // Create affiliations sequentially to avoid rate limiting
    for (const affiliation of affiliations) {
      try {
        const response = await fetch(`${BUILDER_API_URL}/affiliations`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${BUILDER_PRIVATE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(affiliation),
        });

        if (response.ok) {
          const result = await response.json();
          created.push(result);
          console.log("[Builder.io API] Affiliation created:", {
            id: result.id,
            title: result.data?.title,
          });
        } else {
          const errorText = await response.text();
          failed.push({
            name: affiliation.name,
            error: `${response.status}: ${errorText}`,
          });
          console.error("[Builder.io API] Affiliation create failed:", {
            name: affiliation.name,
            status: response.status,
            error: errorText,
          });
        }
      } catch (error) {
        failed.push({
          name: affiliation.name,
          error: String(error),
        });
        console.error(
          "[Builder.io API] Affiliation create error:",
          affiliation.name,
          error
        );
      }
    }

    console.log(
      `[Builder.io API] Affiliations created: ${created.length}, failed: ${failed.length}`
    );

    return NextResponse.json(
      {
        created,
        failed,
        summary: {
          total: affiliations.length,
          created: created.length,
          failed: failed.length,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Builder.io API] Error creating affiliations:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
