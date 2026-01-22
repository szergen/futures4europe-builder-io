import classNames from "classnames";
import React from "react";
import ProjectPageComponent from "@app/page-components/ProjectPageComponent/ProjectPageComponent";
import { generateOgMetadata } from "@app/shared-components/OgImage";
import { Metadata } from "next";
import {
  getBuilderProjectPageBySlug,
  getAllBuilderProjectPages,
  transformBuilderInfoPageToWixFormat,
  extractSlugFromPath,
  getBuilderAffiliationsByProjectTag,
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
  const builderInfoPage = await getBuilderProjectPageBySlug(params.slug);

  if (!builderInfoPage) {
    return generateOgMetadata({});
  }

  const projectPageItem = transformBuilderInfoPageToWixFormat(builderInfoPage);

  if (!projectPageItem) {
    return generateOgMetadata({});
  }

  // console.log("[Builder.io] Generating metadata for project:", params.slug);

  const primaryImage = projectPageItem.data?.Project?.[0]?.picture;
  const secondaryImage =
    projectPageItem.data?.contentImages?.[0]?.url !== " "
      ? projectPageItem.data?.contentImages?.[0]?.url
      : "https://futures4europe.eu/images/placeholder.webp";

  return generateOgMetadata({
    title: projectPageItem.data?.title || "Futures4Europe",
    description: projectPageItem.data?.subtitle || "",
    primaryImage: primaryImage,
    secondaryImage: secondaryImage,
    url: `https://futures4europe.eu/project/${params.slug}`,
  });
}

export async function generateStaticParams() {
  const builderInfoPages = await getAllBuilderProjectPages();

  const slugs = builderInfoPages
    .map((page: any) => {
      const slug = extractSlugFromPath(page?.data?.slug);
      // Filter out invalid slugs and test pages
      if (!slug || slug === "New_Project_Page") return null;
      // Ensure it has a project tag
      if (!page.data?.project?.[0]) return null;
      return { slug };
    })
    .filter(Boolean);

  console.log(
    `[Static Paths] Generated ${slugs.length} project slug(s) from Builder.io`
  );
  return slugs;
}

export default async function ProjectPage({ params }: any) {
  const builderInfoPage = await getBuilderProjectPageBySlug(params.slug);

  if (!builderInfoPage) {
    console.log("[Builder.io] ❌ Project page not found:", params.slug);
    return (
      <div className="w-full flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-600">
            The project page &quot;{params.slug}&quot; could not be found.
          </p>
        </div>
      </div>
    );
  }

  const infoPageItem = transformBuilderInfoPageToWixFormat(builderInfoPage);
  // console.log("debug111->infoPageItem", infoPageItem);
  const tagIdForProjectPage = infoPageItem?.data?.Project?.[0]?._id;
  // console.log("debug111->tagIdForProjectPage", tagIdForProjectPage);

  // Get affiliations (currently returns empty array until affiliations are migrated)
  const affiliations = await getBuilderAffiliationsByProjectTag(
    tagIdForProjectPage
  );

  // console.log("debug111->affiliations", affiliations);

  const infoPageItemWithAffiliations = {
    ...infoPageItem,
    affiliationsItems: affiliations,
  };

  console.log("[Builder.io] ✅ Rendering project page:", params.slug);

  return (
    <div className={classNames("w-full")}>
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-3 py-1 rounded text-xs z-50 shadow-lg">
          🔷 Builder.io
        </div>
      )}
      <ProjectPageComponent
        pageTitle={params.slug}
        project={infoPageItemWithAffiliations}
      />
    </div>
  );
}
