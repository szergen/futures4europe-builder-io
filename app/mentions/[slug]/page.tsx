import classNames from 'classnames';
import React from 'react';
// import PostPageComponent from '@app/page-components/PostPageComponent/PostPageComponent';
import {
  getCollection,
  getItemById,
  // getCollectionItemByTitle,
  // getCollectionItemBySlug,
} from '@app/wixUtils/server-side';
import MiniPagesListComponent from '@app/page-components/shared-page-components/MiniPagesListComponent/MiniPagesListComponent';
import MiniPagesListItemPost from '@app/page-components/shared-page-components/MiniPagesListComponentPost/components/MiniPagesListItemPost/MiniPagesListItemPost';
import Hero from '@app/shared-components/Hero/Hero';
import style from './page.module.css';
import { decidePageTypeItems } from '@app/utils/parse-utils';
import { containsId } from '@app/utils/tags.utls';
import Tag from '@app/shared-components/Tag/Tag';
// import { getCollection } from '@app/wixUtils/client-side';

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 300; // Revalidate every 5 minutes

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

export default async function Pages({ params }: any) {
  const tagId = params.slug;

  const postCollection = await getCollection('PostPages');
  const infoPagesCollection = await getCollection('InfoPages');
  const affiliationsCollection = await getCollection('Affiliations');
  const currentTagData = await getItemById('Tags', tagId);

  const postPages = postCollection.map((item) => item.data);
  const infoPages = infoPagesCollection.map((item) => item.data);

  const allAffiliations = affiliationsCollection.map((item) => item.data);

  const allAffilationMentiones = allAffiliations.filter(
    (affiliation) =>
      affiliation.personTag === tagId ||
      affiliation.projectTag === tagId ||
      affiliation.organisationTag === tagId
  );
  // console.log('allAffilationMentiones', allAffilationMentiones);

  const allPages = [...postPages, ...infoPages];

  const affiliationPages = infoPages.filter((page: any) => {
    return allAffilationMentiones.find((affiliation) => {
      if (
        (affiliation.personTag &&
          page?.person?.[0]?._id === affiliation.personTag) ||
        (affiliation.organisationTag &&
          page?.organisation?.[0]?._id === affiliation.organisationTag) ||
        (affiliation.projectTag &&
          page?.Project?.[0]?._id === affiliation.projectTag)
      ) {
        return true;
      }
    });
  });
  console.log('affiliationPages', affiliationPages);

  let items = allPages.filter((page: any) => {
    return containsId(page, tagId);
  });
  items = [...affiliationPages, ...items]?.filter(
    (post, index, self) => index === self.findIndex((p) => p._id === post._id)
  );

  items = items?.sort((a, b) => {
    const dateA = new Date(a._createdDate.$date).getTime();
    const dateB = new Date(b._createdDate.$date).getTime();
    return dateB - dateA;
  });
  console.log('items', items);

  // Get specific Post by slug
  // const postPageItem = await getCollectionItemBySlug('PostPages', params.slug);
  // console.log('postItem Data', postPageItem?.data);

  if (!postCollection || !infoPagesCollection || !currentTagData) {
    return <div>Loading...</div>; // You can also add a loading spinner here
  }

  return (
    <div className={classNames('w-full')}>
      <Hero subtitle={`sorted by publishing date`}>
        <div className="flex justify-center items-center">
          <h1
            className={classNames(
              'text-4xl',
              'font-bold',
              'mb-4',
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
