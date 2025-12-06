import classNames from 'classnames';
import React from 'react';
import PostPageComponent from '@app/page-components/PostPageComponent/PostPageComponent';
import {
  getCollection,
  // getCollectionItemByTitle,
  getCollectionItemBySlug,
} from '@app/wixUtils/server-side';
import { generateOgMetadata } from '@app/shared-components/OgImage';
import { Metadata } from 'next';
// import { getCollection } from '@app/wixUtils/client-side';

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 300; // Revalidate every 5 minutes

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const postPageItem = await getCollectionItemBySlug('PostPages', params.slug);

  if (!postPageItem) {
    return generateOgMetadata({});
  }
  // console.log('postPageItem', postPageItem);
  let primaryImage =
    postPageItem.data?.postImage1?.url !== ' '
      ? postPageItem.data?.postImage1?.url
      : 'https://futures4europe.eu/images/placeholder.webp';
  let secondaryImage =
    postPageItem.data?.postImage2?.url !== ' '
      ? postPageItem.data?.postImage2?.url
      : 'https://futures4europe.eu/images/placeholder.webp';

  if (postPageItem.data?.pageTypes?.[0].name === 'project result') {
    primaryImage = postPageItem.data?.projectResultMedia?.thumbnail;
    secondaryImage = 'https://futures4europe.eu/images/placeholder.webp';
  }

  return generateOgMetadata({
    title: postPageItem.data?.title || 'Futures4Europe',
    description: postPageItem.data?.subtitle || '',
    primaryImage: primaryImage,
    secondaryImage: secondaryImage,
    url: `https://futures4europe.eu/post/${params.slug}`,
  });
}

// Function to generate static paths
export async function generateStaticParams() {
  const postCollection = await getCollection('PostPages');
  const slugs = postCollection?.map((post: any) => ({
    params: { slug: post?.data?.slug },
  }));
  // const excludedPaths = ['New_Post'];

  // const filteredSlugs = slugs.filter(
  //   (slug) => !excludedPaths.includes(slug.params.slug)
  // );

  // console.log('Generated static slugs for PostPages ', slugs);
  return slugs;
}

export default async function PostPage({ params }: any) {
  // console.log('Post Page Params', params.slug);

  //Get specific Post by slug
  const postPageItem = await getCollectionItemBySlug('PostPages', params.slug);
  // console.log('postItem Data', postPageItem?.data);

  if (!postPageItem) {
    return <div>Loading...</div>; // You can also add a loading spinner here
  }

  return (
    <div className={classNames('w-full')}>
      <PostPageComponent pageTitle={params.slug} post={postPageItem} />
    </div>
  );
}
