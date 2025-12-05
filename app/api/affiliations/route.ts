import { NextRequest, NextResponse } from "next/server";
import {
  getAllAffiliations,
  refreshAffiliationsCache,
} from "@app/utils/builderAffiliationUtils";

export const revalidate = 0;

export const GET = async (req: NextRequest) => {
  try {
    // Get affiliations (from cache or fetch with refs)
    const affiliations = await getAllAffiliations();
    return NextResponse.json(affiliations);
  } catch (error) {
    console.error("Error fetching affiliations:", error);
    return NextResponse.json(
      { message: "Error fetching affiliations" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    // Refresh cache from Builder.io
    await refreshAffiliationsCache();
    return NextResponse.json(
      { message: "Cache updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating cache:", error);
    return NextResponse.json(
      { message: "Failed to update cache" },
      { status: 500 }
    );
  }
};
