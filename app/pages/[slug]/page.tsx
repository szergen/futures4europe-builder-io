import classNames from "classnames";
import React from "react";
// import { getCollection } from '@app/wixUtils/server-side';
import MiniPagesListItemPost from "@app/page-components/shared-page-components/MiniPagesListComponentPost/components/MiniPagesListItemPost/MiniPagesListItemPost";
import Hero from "@app/shared-components/Hero/Hero";
import style from "./page.module.css";
import { decidePageTypeItems, decidePageTypesForMiniPages } from "@app/utils/parse-utils";
import {
  getAllBuilderPosts,
  transformBuilderPostToWixFormat,
} from "@app/utils/builderPostUtils";
import {
  getAllBuilderInfoPages,
  transformBuilderInfoPageToWixFormat,
} from "@app/utils/builderInfoPageUtils";

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
    ?.map((item: any) => {
      const transformed = transformBuilderInfoPageToWixFormat(item);
      return transformed ? { ...transformed.data, _id: transformed.id } : null;
    })
    .filter((item: any): item is NonNullable<typeof item> => item !== null);

  //Get specific Post by slug
  // const postPageItem = await getCollectionItemBySlug('PostPages', params.slug);
  // console.log('postItem Data', postPageItem?.data);

  if (!builderPosts || !builderInfoPages) {
    return <div>Loading...</div>; // You can also add a loading spinner here
  }

  return (
    <div className={classNames("w-full")}>
      <Hero title={`${pageType.toUpperCase()} Pages`} pageType={pageType} />
      <div className={classNames(style.listContainer)}>
        <MiniPagesListItemPost
          items={decidePageTypesForMiniPages(pageType, postPages, infoPages)}
          title={pageType}
          pageTypePath={
            ["event", "project-result", "post"].find(
              (type) => type === pageType
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
