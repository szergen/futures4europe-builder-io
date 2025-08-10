// 'use client';
import classNames from 'classnames';
import React from 'react';
import OrganisationPageComponent from '@app/page-components/OrganisationPageComponent/OrganisationPageComponent';
import {
  getCollectionItemBySlug,
  getCollection,
  getAffiliationsCollectionItemsByTag,
} from '@app/wixUtils/server-side';
import { generateOgMetadata } from '@app/shared-components/OgImage';
import { Metadata } from 'next';

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 300;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const organisationPageItem = await getCollectionItemBySlug(
    'InfoPages',
    params.slug
  );

  if (!organisationPageItem) {
    return generateOgMetadata({});
  }
  let primaryImage = organisationPageItem.data?.organisation?.[0]?.picture;
  let secondaryImage =
    organisationPageItem.data?.contentImages?.[0]?.url !== ' '
      ? organisationPageItem.data?.contentImages?.[0]?.url
      : 'https://futures4europe.eu/images/placeholder.webp';

  return generateOgMetadata({
    title: organisationPageItem.data?.title || 'Futures4Europe',
    description: organisationPageItem.data?.subtitle || '',
    primaryImage: primaryImage,
    secondaryImage: secondaryImage,
    url: `https://futures4europe.eu/organisation/${params.slug}`,
  });
}

export async function generateStaticParams() {
  const postCollection = await getCollection('InfoPages');
  const slugs = postCollection
    ?.filter(
      (post: any) =>
        post?.data?.slug !== 'New_Organisation_Page' &&
        post.data?.organisation[0]
    )
    ?.map((post: any) => ({
      params: { slug: post?.data?.slug },
    }));

  // console.log('Generated static slugs for Organisation Info Pages ', slugs);
  return slugs;
}

export default async function OrganisationPage({ params }: any) {
  console.log('Organisation Page Params', params.slug);

  // Grab specific Project by slug
  const infoPageItem = await getCollectionItemBySlug('InfoPages', params.slug);
  const tagIdForOrganisationPage = infoPageItem?.data?.organisation?.[0]?._id;
  const affiliations = await getAffiliationsCollectionItemsByTag(
    tagIdForOrganisationPage,
    'organisationTag'
  );

  // console.log('Affiliations', affiliations);
  const infoPageItemWithAffiliations = {
    ...infoPageItem,
    affiliationsItems: affiliations.map((affiliation: any) => affiliation.data),
  };

  if (!infoPageItem) {
    return <div>Loading...</div>; // You can also add a loading spinner here
  }

  return (
    <div className={classNames('w-full')}>
      <OrganisationPageComponent
        pageTitle={params.slug}
        organisation={infoPageItemWithAffiliations}
      />
    </div>
  );
}
