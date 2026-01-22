import classNames from "classnames";
import React from "react";
import OrganisationPageComponent from "@app/page-components/OrganisationPageComponent/OrganisationPageComponent";
import { generateOgMetadata } from "@app/shared-components/OgImage";
import { Metadata } from "next";
import {
  getBuilderInfoPageBySlug,
  getAllBuilderOrganisationPages,
  transformBuilderInfoPageToWixFormat,
  extractSlugFromPath,
  getBuilderAffiliationsByOrgTag,
} from "@app/utils/builderInfoPageUtils";

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true;
export const dynamic = "force-dynamic";
// Disable caching for this route to ensure fresh Builder.io data
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const builderInfoPage = await getBuilderInfoPageBySlug(params.slug);

  if (!builderInfoPage) {
    return generateOgMetadata({});
  }

  const infoPageItem = transformBuilderInfoPageToWixFormat(builderInfoPage);

  if (!infoPageItem) {
    return generateOgMetadata({});
  }

  // console.log("[Builder.io] Generating metadata for:", params.slug);

  const primaryImage = infoPageItem.data?.organisation?.[0]?.picture;
  const secondaryImage =
    infoPageItem.data?.contentImages?.[0]?.url !== " "
      ? infoPageItem.data?.contentImages?.[0]?.url
      : "https://futures4europe.eu/images/placeholder.webp";

  return generateOgMetadata({
    title: infoPageItem.data?.title || "Futures4Europe",
    description: infoPageItem.data?.subtitle || "",
    primaryImage: primaryImage,
    secondaryImage: secondaryImage,
    url: `https://futures4europe.eu/organisation/${params.slug}`,
  });
}

export async function generateStaticParams() {
  const builderInfoPages = await getAllBuilderOrganisationPages();

  const slugs = builderInfoPages
    .map((page: any) => {
      const slug = extractSlugFromPath(page?.data?.slug);
      // Filter out invalid slugs and test pages
      if (!slug || slug === "New_Organisation_Page") return null;
      // Ensure it has an organisation tag
      if (!page.data?.organisation?.[0]) return null;
      return { slug };
    })
    .filter(Boolean);

  console.log(
    `[Static Paths] Generated ${slugs.length} organisation slug(s) from Builder.io`
  );
  return slugs;
}

export default async function OrganisationPage({ params }: any) {
  const builderInfoPage = await getBuilderInfoPageBySlug(params.slug);

  if (!builderInfoPage) {
    console.log("[Builder.io] ❌ Organisation page not found:", params.slug);
    return (
      <div className="w-full flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Organisation Not Found</h1>
          <p className="text-gray-600">
            The organisation page &quot;{params.slug}&quot; could not be found.
          </p>
        </div>
      </div>
    );
  }

  const infoPageItem = transformBuilderInfoPageToWixFormat(builderInfoPage);
  const tagIdForOrganisationPage = infoPageItem?.data?.organisation?.[0]?._id;

  // Get affiliations (currently returns empty array until affiliations are migrated)
  const affiliations = await getBuilderAffiliationsByOrgTag(
    tagIdForOrganisationPage
  );

  const infoPageItemWithAffiliations = {
    ...infoPageItem,
    affiliationsItems: affiliations,
  };

  console.log("[Builder.io] ✅ Rendering organisation page:", params.slug);

  return (
    <div className={classNames("w-full")}>
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-3 py-1 rounded text-xs z-50 shadow-lg">
          🔷 Builder.io
        </div>
      )}
      <OrganisationPageComponent
        pageTitle={params.slug}
        organisation={infoPageItemWithAffiliations}
      />
    </div>
  );
}
