import { Metadata } from 'next';

/**
 * Helper function to generate metadata for Next.js 13+ App Router pages
 *
 * This function can be used in layout.tsx or page.tsx files to generate
 * the proper metadata for social sharing.
 *
 * @example
 * // In a page.tsx file:
 * export const generateMetadata = async ({ params }): Promise<Metadata> => {
 *   const post = await getPost(params.slug);
 *   return generateOgMetadata({
 *     title: post.title,
 *     description: post.subtitle,
 *     primaryImage: post.contentImages[0],
 *     secondaryImage: post.contentImages[1],
 *   });
 * };
 */
export function generateOgMetadata({
  title = 'Futures4Europe',
  description = 'Exploring European futures through strategic foresight',
  primaryImage,
  secondaryImage,
  url,
  siteName = 'Futures4Europe',
}: {
  title?: string;
  description?: string;
  primaryImage?: string;
  secondaryImage?: string;
  url?: string;
  siteName?: string;
}): Metadata {
  // Fallback image if no primary image is provided
  const defaultImage = 'https://futures4europe.eu/images/placeholder.webp';
  const ogImage = primaryImage || defaultImage;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
        ...(secondaryImage
          ? [
              {
                url: secondaryImage,
                width: 1200,
                height: 630,
                alt: `${title} - Additional image`,
              },
            ]
          : []),
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}
