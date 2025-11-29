import classNames from "classnames";
import React from "react";
import PersonPageComponent from "@app/page-components/PersonPageComponent/PersonPageComponent";
import { generateOgMetadata } from "@app/shared-components/OgImage";
import { Metadata } from "next";
import {
  getBuilderPersonPageBySlug,
  getAllBuilderPersonPages,
  transformBuilderInfoPageToWixFormat,
  extractSlugFromPath,
  getBuilderAffiliationsByPersonTag,
} from "@app/utils/builderInfoPageUtils";

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const builderInfoPage = await getBuilderPersonPageBySlug(params.slug);

  if (!builderInfoPage) {
    return generateOgMetadata({});
  }

  const personPageItem = transformBuilderInfoPageToWixFormat(builderInfoPage);

  if (!personPageItem) {
    return generateOgMetadata({});
  }

  console.log("[Builder.io] Generating metadata for person:", params.slug);

  const primaryImage = personPageItem.data?.person?.[0]?.picture;
  const secondaryImage =
    personPageItem.data?.contentImages?.[0]?.url !== " "
      ? personPageItem.data?.contentImages?.[0]?.url
      : "https://futures4europe.eu/images/placeholder.webp";

  return generateOgMetadata({
    title: personPageItem.data?.title || "Futures4Europe",
    description: personPageItem.data?.subtitle || "",
    primaryImage: primaryImage,
    secondaryImage: secondaryImage,
    url: `https://futures4europe.eu/person/${params.slug}`,
  });
}

export async function generateStaticParams() {
  const builderInfoPages = await getAllBuilderPersonPages();

  const slugs = builderInfoPages
    .map((page: any) => {
      const slug = extractSlugFromPath(page?.data?.slug);
      // Filter out invalid slugs and test pages
      if (!slug || slug === "New_Info_Page") return null;
      // Ensure it has a person tag
      if (!page.data?.person?.[0]) return null;
      return { slug };
    })
    .filter(Boolean);

  console.log(
    `[Static Paths] Generated ${slugs.length} person slug(s) from Builder.io`
  );
  return slugs;
}

export default async function PersonPage({ params }: any) {
  const builderInfoPage = await getBuilderPersonPageBySlug(params.slug);

  if (!builderInfoPage) {
    console.log("[Builder.io] ❌ Person page not found:", params.slug);
    return (
      <div className="w-full flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Person Not Found</h1>
          <p className="text-gray-600">
            The person page &quot;{params.slug}&quot; could not be found.
          </p>
        </div>
      </div>
    );
  }

  const infoPageItem = transformBuilderInfoPageToWixFormat(builderInfoPage);
  const tagIdForPersonPage = infoPageItem?.data?.person?.[0]?._id;

  // Get affiliations (currently returns empty array until affiliations are migrated)
  let affiliations = [] as any[];
  if (tagIdForPersonPage) {
    affiliations = await getBuilderAffiliationsByPersonTag(tagIdForPersonPage);
  }

  const infoPageItemWithAffiliations = {
    ...infoPageItem,
    affiliationsItems: affiliations.map((affiliation: any) => affiliation.data),
  };

  console.log("[Builder.io] ✅ Rendering person page:", params.slug);

  return (
    <div className={classNames("w-full")}>
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-3 py-1 rounded text-xs z-50 shadow-lg">
          🔷 Builder.io
        </div>
      )}
      <PersonPageComponent
        pageTitle={params.slug}
        person={infoPageItemWithAffiliations}
      />
    </div>
  );
}
