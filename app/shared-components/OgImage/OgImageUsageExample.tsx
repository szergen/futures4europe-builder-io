'use client';
import React from 'react';
import OgImage from './OgImage';

/**
 * Example implementation of the OgImage component in a page component
 *
 * This example shows how to integrate the OgImage component into a page
 * to set OG meta tags for social media sharing based on post content.
 */
const OgImageUsageExample: React.FC = () => {
  // In a real implementation, you would derive these from your post data
  const post = {
    title: 'Example Post Title',
    subtitle: 'Example subtitle or description',
    contentImages: [
      'https://example.com/primary-image.jpg',
      'https://example.com/secondary-image.jpg',
    ],
    // Other post data...
  };

  // Current page URL
  const currentUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : 'https://futures4europe.eu';

  return (
    <div>
      {/* Include the OgImage component at the top of your page component */}
      <OgImage
        primaryImage={post.contentImages[0]}
        secondaryImage={post.contentImages[1]}
        title={post.title}
        description={post.subtitle}
        url={currentUrl}
        siteName="Futures4Europe"
      />

      {/* Rest of your page content */}
      <h1>{post.title}</h1>
      <p>{post.subtitle}</p>
      {/* More content... */}
    </div>
  );
};

export default OgImageUsageExample;
