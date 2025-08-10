import React from 'react';
import classNames from 'classnames';
import style from './MiniPage.module.css';
import Image from 'next/image';

export type MiniPageProps = {
  pageItem: {
    title: string;
    subtitle?: string;
    description?: string;
    external_links?: string;
    logo?: string;
    pageType: string[];
    pictures?: string;
    files?: string[];
    domain?: [];
    publishedDate?: string;
  };
};

export const MiniPage: React.FC<MiniPageProps> = ({ pageItem }) => {
  const {
    pageType,
    title,
    description,
    domain,
    external_links,
    files,
    logo,
    pictures,
    subtitle,
    publishedDate,
  } = pageItem;

  return (
    <li
      className={classNames(
        'rounded-md border-2 mb-4',
        style.miniPageContainer
      )}
    >
      <div
        className={classNames('w-40 h-40 object-cover', style.leftContainer)}
      >
        <Image
          alt={'Tag Image'}
          className={classNames('w-full h-full')}
          src={pictures || 'https://placehold.co/600x400?text=placeholder'}
          width={140}
          height={140}
        />
      </div>
      <div className={classNames('ml-4', style.rightContainer)}>
        <p className={classNames(style.title)}>
          {title
            ?.replace('<span class="bg-amber-300">', '')
            ?.replace('</span>', '')}
        </p>
        <span className={classNames(style.date)}>
          {publishedDate || '2024.01.12'}
        </span>
        <p className={classNames(style.description)}>
          {description ||
            'Tempor aute irure ad adipisicing est velit occaecat aliquip laboris laborum quis. Laborum commodo tempor consequat cupidatat officia. Magna irure cupidatat officia reprehenderit ullamco cillum mollit ut magna ea officia.'}
        </p>
      </div>
    </li>
  );
};

export default MiniPage;
