'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import styles from './OgImage.module.css';

export interface OgImageProps {
  primaryImage?: string;
  secondaryImage?: string;
  title?: string;
  description?: string;
  url?: string;
  siteName?: string;
}

/**
 * OgImage component for handling social media sharing images
 *
 * This component dynamically updates Open Graph meta tags for social media sharing
 * in the document head, using the provided image paths, title, and description.
 */
const OgImage: React.FC<OgImageProps> = ({
  primaryImage,
  secondaryImage,
  title = 'Futures4Europe',
  description = 'Exploring European futures through strategic foresight',
  url,
  siteName = 'Futures4Europe',
}) => {
  // Fallback image if no primary image is provided
  const defaultImage = 'https://futures4europe.eu/images/placeholder.webp';
  const ogImage = primaryImage || defaultImage;

  // Use effect to update meta tags in the document head
  useEffect(() => {
    // Update Open Graph meta tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', ogImage);
    updateMetaTag('og:type', 'website');
    updateMetaTag('og:site_name', siteName);

    if (secondaryImage) {
      updateMetaTag('og:image:alt', secondaryImage);
    } else {
      removeMetaTag('og:image:alt');
    }

    if (url) {
      updateMetaTag('og:url', url);
    } else {
      removeMetaTag('og:url');
    }

    // Update Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    return () => {
      // Cleanup function is optional
    };
  }, [primaryImage, secondaryImage, title, description, url, siteName]);

  // Helper function to update meta tags
  const updateMetaTag = (property: string, content: string) => {
    let metaTag =
      document.querySelector(`meta[property="${property}"]`) ||
      document.querySelector(`meta[name="${property}"]`);

    if (!metaTag) {
      metaTag = document.createElement('meta');
      if (property.startsWith('og:')) {
        metaTag.setAttribute('property', property);
      } else {
        metaTag.setAttribute('name', property);
      }
      document.head.appendChild(metaTag);
    }

    metaTag.setAttribute('content', content);
  };

  // Helper function to remove meta tags
  const removeMetaTag = (property: string) => {
    const metaTag =
      document.querySelector(`meta[property="${property}"]`) ||
      document.querySelector(`meta[name="${property}"]`);
    if (metaTag) {
      document.head.removeChild(metaTag);
    }
  };

  return (
    <>
      {/* Optionally show the images in development mode */}
      {process.env.NODE_ENV === 'development' && (
        <div className={styles.ogImagePreview}>
          <h3>OG Image Preview (Development Only)</h3>
          <div className={styles.previewContainer}>
            {primaryImage && (
              <div className={styles.imageWrapper}>
                <h4>Primary Image</h4>
                <img
                  src={primaryImage}
                  alt="Primary OG Image"
                  className={styles.previewImage}
                />
              </div>
            )}
            {secondaryImage && (
              <div className={styles.imageWrapper}>
                <h4>Secondary Image</h4>
                <img
                  src={secondaryImage}
                  alt="Secondary OG Image"
                  className={styles.previewImage}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OgImage;
