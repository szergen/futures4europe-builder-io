import classNames from "classnames";
import React from "react";
// import { getCollection } from '@app/wixUtils/server-side';
import MiniPagesListItemPost from "@app/page-components/shared-page-components/MiniPagesListComponentPost/components/MiniPagesListItemPost/MiniPagesListItemPost";
import Hero from "@app/shared-components/Hero/Hero";
import style from "./page.module.css";
import {
  decidePageTypeItems,
  decidePageTypesForMiniPages,
} from "@app/utils/parse-utils";
import {
  getAllBuilderPosts,
  transformBuilderPostToWixFormat,
} from "@app/utils/builderPostUtils";
import { getAllBuilderInfoPages } from "@app/utils/builderInfoPageUtils";
import { generateOgMetadata } from "@app/shared-components/OgImage";
import { Metadata } from "next";

const listingTitles: Record<string, string> = {
  practice: "Practices",
  event: "Events",
  post: "Posts",
  project: "Projects",
  person: "People",
  organisation: "Organisations",
  "project-result": "Results",
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const label = listingTitles[params.slug] || "Pages";
  const placeholder = "https://futures4europe.eu/images/placeholder.webp";
  return generateOgMetadata({
    title: `${label} | Futures4Europe`,
    description: `List of ${label} pages on Futures4Europe`,
    primaryImage: placeholder,
    // Match the post page, which always emits a second Open Graph image.
    // Dropping that tag on navigation makes Next 13.5 unmount a hoisted
    // <meta> whose node is already gone and crashes the page.
    secondaryImage: placeholder,
    url: `https://futures4europe.eu/pages/${params.slug}`,
  });
}

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 0;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = false; // or false, to 404 on unknown paths

const validParams = [
  { id: "post" },
  { id: "project" },
  { id: "person" },
  { id: "organisation" },
  { id: "event" },
  { id: "project-result" },
  { id: "practice" },
];

// Function to generate static paths
export async function generateStaticParams() {
  return validParams;
}

export default async function Pages({ params }: any) {
  const pageType = params.slug;

  if (validParams.findIndex((item) => item.id === pageType) === -1) {
    return <div>Page Type not supported...</div>;
  }

  // const postCollection = await getCollection('PostPages');
  // const infoPagesCollection = await getCollection('InfoPages');

  const [builderPosts, builderInfoPages] = await Promise.all([
    getAllBuilderPosts(),
    getAllBuilderInfoPages(),
  ]);

  const postPages = builderPosts
    ?.map((item: any) => {
      const transformed = transformBuilderPostToWixFormat(item);
      return transformed ? { ...transformed.data, _id: transformed.id } : null;
    })
    .filter((item: any): item is NonNullable<typeof item> => item !== null);

  const infoPages = builderInfoPages
    ?.map((item: any) =>
      item ? { ...item.data, _id: item.id } : null
    )
    .filter((item: any): item is NonNullable<typeof item> => item !== null);

  //Get specific Post by slug
  // const postPageItem = await getCollectionItemBySlug('PostPages', params.slug);
  // console.log('postItem Data', postPageItem?.data);

  if (!builderPosts || !builderInfoPages) {
    return <div>Loading...</div>; // You can also add a loading spinner here
  }
  // console.log("debug111->postPages", postPages[0]);
  // console.log("debug111->infoPages", infoPages[0]);

  return (
    <div className={classNames("w-full")}>
      <Hero title={`${pageType.toUpperCase()} Pages`} pageType={pageType} />
      <div className={classNames(style.listContainer)}>
        <MiniPagesListItemPost
          items={decidePageTypesForMiniPages(pageType, postPages, infoPages)}
          title={pageType}
          pageTypePath={
            ["event", "project-result", "post", "practice"].find(
              (type) => type === pageType,
            )
              ? "post"
              : pageType
          }
          hideTitle
        />
      </div>
    </div>
  );
}
