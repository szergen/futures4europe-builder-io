import { NextRequest, NextResponse } from "next/server";
import { getWixClientData } from "@app/hooks/useWixClientServer";
import {
  getAllBuilderTags,
  batchTransformBuilderTagsToWixFormat,
} from "@app/utils/builderTagUtils";

export const POST = async (req: NextRequest) => {
  const { collectionName } = await req.json();

  try {
    // Route Tags collection to Builder.io
    if (collectionName === "Tags") {
      console.log("Fetching Tags from Builder.io via getCollectionItems");

      const builderTags = await getAllBuilderTags({ skipCache: false });
      const wixFormattedTags =
        batchTransformBuilderTagsToWixFormat(builderTags);

      // Wrap in same format as Wix items (with data property)
      const formattedItems = wixFormattedTags.map((tag) => ({
        data: tag,
        _id: tag._id,
      }));

      console.log(`✓ Returned ${formattedItems.length} tags from Builder.io`);
      return NextResponse.json(formattedItems, { status: 200 });
    }

    // For all other collections, use Wix
    const wixClient = await getWixClientData();

    let allItems = [] as any[];
    let skip = 0;
    const limit = 1000;
    let totalCount = 0;

    do {
      const result = await wixClient.items
        .queryDataItems({
          dataCollectionId: collectionName,
          returnTotalCount: true,
        })
        .skip(skip)
        .limit(limit)
        .find();
      allItems = [...allItems, ...result?.items];
      totalCount = result?.totalCount || 0;
      skip = limit + skip;
    } while (skip < totalCount);

    return NextResponse.json(allItems, { status: 200 });
  } catch (error) {
    console.error(
      `Error getting items from collection ${collectionName}`,
      error
    );
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const GET = () => {
  return NextResponse.json(
    { message: "Method not allowed for getCollectionItemByTitle" },
    { status: 405 }
  );
};
