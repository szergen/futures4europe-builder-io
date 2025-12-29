import classNames from "classnames";
import React from "react";
// import PostPageComponent from '@app/page-components/PostPageComponent/PostPageComponent';
// import {
//   getCollection,
//   getItemById,
//   // getCollectionItemByTitle,
//   // getCollectionItemBySlug,
// } from "@app/wixUtils/server-side";
// import MiniPagesListComponent from "@app/page-components/shared-page-components/MiniPagesListComponent/MiniPagesListComponent";
import MiniPagesListItemPost from "@app/page-components/shared-page-components/MiniPagesListComponentPost/components/MiniPagesListItemPost/MiniPagesListItemPost";
import Hero from "@app/shared-components/Hero/Hero";
import style from "./page.module.css";
// import { decidePageTypeItems } from "@app/utils/parse-utils";
import { containsId } from "@app/utils/tags.utls";
import Tag from "@app/shared-components/Tag/Tag";
// import { getCollection } from '@app/wixUtils/client-side';
import {
  getAllBuilderPosts,
  transformBuilderPostToWixFormat,
} from "@app/utils/builderPostUtils";
import { getAllBuilderInfoPages } from "@app/utils/builderInfoPageUtils";
import { transformBuilderInfoPageToWixFormat } from "@app/utils/builderInfoPageUtils";
import { getAllAffiliations } from "@app/utils/builderAffiliationUtils";
import {
  getBuilderTagById,
  transformBuilderTagToWixFormat,
} from "@app/utils/builderTagUtils";

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 300; // Revalidate every 5 minutes

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

export default async function Pages({ params }: any) {
  const tagId = params.slug;

  // const postCollection = await getCollection("PostPages");
  // const infoPagesCollection = await getCollection("InfoPages");
  // const affiliationsCollection = await getCollection("Affiliations");
  // const currentTagData = await getItemById("Tags", tagId);

  const [builderPosts, builderInfoPages, affiliations, builderTag] =
    await Promise.all([
      getAllBuilderPosts(),
      getAllBuilderInfoPages(),
      getAllAffiliations(),
      getBuilderTagById(tagId),
    ]);

  const postPages = builderPosts
    ?.map((item: any) => {
      const transformed = transformBuilderPostToWixFormat(item);
      return transformed ? { ...transformed.data, _id: transformed.id } : null;
    })
    .filter((item: any): item is NonNullable<typeof item> => item !== null);
  console.log("debug111->postPages", postPages.length);

  const infoPages = builderInfoPages
    ?.map((item: any) => {
      const transformed = transformBuilderInfoPageToWixFormat(item);
      return transformed ? { ...transformed.data, _id: transformed.id } : null;
    })
    .filter((item: any): item is NonNullable<typeof item> => item !== null);
  console.log("debug111->infoPages", infoPages.length);
  const currentTagData = builderTag
    ? { data: transformBuilderTagToWixFormat(builderTag) }
    : null;

  // const postPages = postCollection.map((item) => item.data);
  // const infoPages = infoPagesCollection.map((item) => item.data);

  // const allAffiliations = affiliationsCollection.map((item) => item.data);
  const allAffiliations = affiliations; // getAllAffiliations returns already mapped data

  const allAffilationMentiones = allAffiliations.filter(
    (affiliation) =>
      affiliation.personTag?._id === tagId ||
      affiliation.projectTag?._id === tagId ||
      affiliation.organisationTag?._id === tagId
  );
  // console.log('allAffilationMentiones', allAffilationMentiones);

  const allPages = [...postPages, ...infoPages];

  const affiliationPages = infoPages.filter((page: any) => {
    return allAffilationMentiones.find((affiliation) => {
      if (
        (affiliation.personTag &&
          page?.person?.[0]?._id === affiliation.personTag?._id) ||
        (affiliation.organisationTag &&
          page?.organisation?.[0]?._id === affiliation.organisationTag?._id) ||
        (affiliation.projectTag &&
          page?.Project?.[0]?._id === affiliation.projectTag?._id)
      ) {
        return true;
      }
    });
  });
  // console.log("affiliationPages", affiliationPages);
  console.log("debug111->allItems before filter", allPages.length);

  let items = allPages.filter((page: any) => {
    return containsId(page, tagId);
  });
  console.log("debug111->items before filter", items.length);
  items = [...affiliationPages, ...items]?.filter(
    (post, index, self) => index === self.findIndex((p) => p._id === post._id)
  );

  items = items?.sort((a, b) => {
    const dateA = new Date(a._createdDate?.$date).getTime();
    const dateB = new Date(b._createdDate?.$date).getTime();
    return dateB - dateA;
  });
  console.log("debug111->items", items[0]);

  // Get specific Post by slug
  // const postPageItem = await getCollectionItemBySlug('PostPages', params.slug);
  // console.log('postItem Data', postPageItem?.data);

  if (!builderPosts || !builderInfoPages || !currentTagData) {
    return <div>Loading...</div>; // You can also add a loading spinner here
  }

  return (
    <div className={classNames("w-full")}>
      <Hero title="" subtitle={`sorted by publishing date`}>
        <div className="flex justify-center items-center">
          <h1
            className={classNames(
              "text-4xl",
              "font-bold",
              "mb-4",
              style.heroTitle
            )}
          >
            Mentions of
          </h1>
          <Tag {...currentTagData?.data} className="ml-2" />
        </div>
      </Hero>
      <div className={classNames(style.listContainer)}>
        <MiniPagesListItemPost
          // postCollection={postCollection}
          items={items}
          automaticallyCalculatePath
          hideTitle
          manualSort
        />
      </div>
    </div>
  );
}
