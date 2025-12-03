import { NextRequest, NextResponse } from "next/server";
import {
  createBuilderTag,
  ValidationError,
  DuplicateError,
  BuilderApiError,
} from "@app/utils/builderTagUtils";

export const revalidate = 0;

/**
 * POST /api/builder/tag
 * Create a new tag in Builder.io
 */
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { name, tagType, tagLine, picture, tagPageLink, masterTag } = body;

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json(
        {
          error: "Tag name is required",
          action: "Please provide a tag name",
          code: "VALIDATION_ERROR",
          field: "name",
        },
        { status: 400 }
      );
    }

    if (!tagType || !tagType.trim()) {
      return NextResponse.json(
        {
          error: "Tag type is required",
          action: "Please select a tag type",
          code: "VALIDATION_ERROR",
          field: "tagType",
        },
        { status: 400 }
      );
    }

    // Create tag in Builder.io
    const createdTag = await createBuilderTag({
      name,
      tagType,
      tagLine,
      picture,
      tagPageLink,
      masterTag,
    });

    return NextResponse.json(
      {
        success: true,
        tag: createdTag,
        message: `Tag "${name}" created successfully`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating tag:", error);

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

    if (error instanceof DuplicateError) {
      // Fetch and return the existing tag instead of error
      try {
        const { getBuilderTagById } = await import(
          "@app/utils/builderTagUtils"
        );
        const existingTag = await getBuilderTagById(error.existingId);

        if (existingTag) {
          console.log(
            `✓ Returning existing tag "${name}" with ID ${error.existingId}`
          );
          return NextResponse.json(
            {
              success: true,
              tag: existingTag,
              message: `Tag "${name}" already exists, returning existing tag`,
              isExisting: true,
            },
            { status: 200 } // 200 instead of 409 - success with existing tag
          );
        }
      } catch (fetchError) {
        console.error("Failed to fetch existing tag:", fetchError);
      }

      // Fallback to error response if we can't fetch the existing tag
      return NextResponse.json(
        {
          error: "Tag with this name already exists",
          action: "Please choose a different name or use the existing tag",
          code: "TAG_DUPLICATE",
          existingId: error.existingId,
        },
        { status: 409 }
      );
    }

    if (error instanceof BuilderApiError) {
      return NextResponse.json(
        {
          error: "Unable to create tag at this time",
          action: "Please try again in a few moments",
          code: "TAG_CREATE_FAILED",
          details: error.message,
        },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to create tag",
        action: "Please contact support if this persists",
        code: "TAG_CREATE_ERROR",
      },
      { status: 500 }
    );
  }
};
