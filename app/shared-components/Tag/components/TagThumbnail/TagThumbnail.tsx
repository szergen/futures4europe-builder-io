import classNames from 'classnames';
import React from 'react';
import style from '../../Tag.module.css';
import { TagCategories } from '../../Tag.utils';
import Image from 'next/image';
import { getImageUrlForMedia } from '@app/page-components/PageComponents.utils';

export type TagThumbnailProps = {
  picture?: string;
  pictureAlt?: string;
  tagCategory?: TagCategories;
};

export const TagThumbnail: React.FC<TagThumbnailProps> = ({
  picture,
  pictureAlt,
  tagCategory,
}) => {
  return (
    <div className={classNames(style.tagThumbnail, 'flex')}>
      {!picture && tagCategory === TagCategories.person ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="w-10 h-10 inline-block relative -right-7 z-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ) : (
        <Image
          alt={pictureAlt || 'Avatar Image'}
          className={classNames('inline-block z-10', style.tagPicture)}
          src={
            getImageUrlForMedia(picture)?.url ||
            getImageUrlForMedia(picture) ||
            'https://placehold.co/147x147?text=Profile Image'
          }
          width={147}
          height={147}
        />
      )}
    </div>
  );
};

export default TagThumbnail;
