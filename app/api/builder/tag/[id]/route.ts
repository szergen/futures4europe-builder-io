import { NextRequest, NextResponse } from "next/server";
import {
  getBuilderTagById,
  updateBuilderTag,
  NotFoundError,
  ValidationError,
  BuilderApiError,
} from "@app/utils/builderTagUtils";

export const revalidate = 0;

/**
 * GET /api/builder/tag/[id]
 * Fetch a single tag by ID
 */
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    const tag = await getBuilderTagById(id, { includeRefs: true });

    if (!tag) {
      return NextResponse.json(
        {
          error: "Tag not found",
          id: id,
          code: "TAG_NOT_FOUND",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(tag, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching tag:", error);

    if (error instanceof BuilderApiError) {
      return NextResponse.json(
        {
          error: "Unable to fetch tag",
          action: "Please try again later",
          code: "TAG_FETCH_ERROR",
          details: error.message,
        },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to fetch tag",
        code: "TAG_FETCH_ERROR",
      },
      { status: 500 }
    );
  }
};

/**
 * PUT /api/builder/tag/[id]
 * Update an existing tag
 */
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const updates = await req.json();

    const updatedTag = await updateBuilderTag(id, updates);

    return NextResponse.json(
      {
        success: true,
        tag: updatedTag,
        message: "Tag updated successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating tag:", error);

    if (error instanceof NotFoundError) {
      return NextResponse.json(
        {
          error: "Tag not found",
          id: error.id,
          code: "TAG_NOT_FOUND",
        },
        { status: 404 }
      );
    }

    if (error instanceof ValidationError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          action: "Please check your input",
          code: "VALIDATION_ERROR",
          field: error.field,
          details: error.message,
        },
        { status: 400 }
      );
    }

    if (error instanceof BuilderApiError) {
      return NextResponse.json(
        {
          error: "Unable to update tag",
          action: "Please try again later",
          code: "TAG_UPDATE_FAILED",
          details: error.message,
        },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to update tag",
        code: "TAG_UPDATE_ERROR",
      },
      { status: 500 }
    );
  }
};

/**
 * DELETE /api/builder/tag/[id]
 * Unpublish (soft delete) a tag
 */
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    // For now, we'll just return a not implemented response
    // In the future, this could unpublish the tag in Builder.io
    return NextResponse.json(
      {
        error: "Tag deletion not implemented",
        action: "Please use Builder.io dashboard to unpublish tags",
        code: "NOT_IMPLEMENTED",
      },
      { status: 501 }
    );
  } catch (error: any) {
    console.error("Error deleting tag:", error);

    return NextResponse.json(
      {
        error: "Failed to delete tag",
        code: "TAG_DELETE_ERROR",
      },
      { status: 500 }
    );
  }
};
