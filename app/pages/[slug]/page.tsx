import classNames from 'classnames';
import React from 'react';
import { getCollection } from '@app/wixUtils/server-side';
import MiniPagesListItemPost from '@app/page-components/shared-page-components/MiniPagesListComponentPost/components/MiniPagesListItemPost/MiniPagesListItemPost';
import Hero from '@app/shared-components/Hero/Hero';
import style from './page.module.css';
import { decidePageTypeItems } from '@app/utils/parse-utils';

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 0;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = false; // or false, to 404 on unknown paths

const validParams = [
  { id: 'post' },
  { id: 'project' },
  { id: 'person' },
  { id: 'organisation' },
  { id: 'event' },
  { id: 'project-result' },
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

  const postCollection = await getCollection('PostPages');
  const infoPagesCollection = await getCollection('InfoPages');

  const postPages = postCollection?.map((item) => item.data);
  const infoPages = infoPagesCollection?.map((item) => item.data);

  //Get specific Post by slug
  // const postPageItem = await getCollectionItemBySlug('PostPages', params.slug);
  // console.log('postItem Data', postPageItem?.data);

  if (!postCollection || !infoPagesCollection) {
    return <div>Loading...</div>; // You can also add a loading spinner here
  }

  return (
    <div className={classNames('w-full')}>
      <Hero title={`${pageType.toUpperCase()} Pages`} pageType={pageType} />
      <div className={classNames(style.listContainer)}>
        <MiniPagesListItemPost
          items={decidePageTypeItems(pageType, postPages, infoPages)}
          title={pageType}
          pageTypePath={
            ['event', 'project-result', 'post'].find(
              (type) => type === pageType
            )
              ? 'post'
              : pageType
          }
          hideTitle
        />
      </div>
    </div>
  );
}
