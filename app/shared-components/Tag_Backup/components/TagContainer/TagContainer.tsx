import classNames from 'classnames';
import React from 'react';
import style from '../../Tag.module.css';
import { TagCategories } from '../../Tag.utils';
import TagThumbnail from '../TagThumbnail/TagThumbnail';
import popularity from '../TagCounterContainer/popularity';
import TagCloseButton from '../TagCloseButton/TagCloseButton';
import PopoverComponent from '@app/shared-components/PopoverComponent/PopoverComponent';

export type TagContainerProps = {
  name: string;
  editable?: boolean;
  className?: string;
  tagCategory?: TagCategories;
  picture?: string;
  pictureAlt?: string;
  popularity?: number;
  tagTrend?: number;
  tagPageLink?: string;
  onClick?: () => void;
};

export const TagContainer: React.FC<TagContainerProps> = ({
  name,
  editable,
  className,
  tagCategory,
  popularity,
  tagTrend,
  picture,
  pictureAlt,
  onClick,
  tagPageLink,
}) => {
  const showThumbnail = picture || tagCategory === 'person';

  return (
    <>
      {showThumbnail && (
        <TagThumbnail
          picture={picture || undefined}
          pictureAlt={pictureAlt}
          tagCategory={tagCategory}
        />
      )}
      {/* Tag Body */}
      {name.length > 10 ? (
        <span
          className={classNames(
            //   'relative px-5 py-2 rounded-3xl shadow-md text-ellipsis max-w-64 overflow-hidden inline-block text-nowrap', // wrapping
            'relative px-5 py-2 rounded-3xl shadow-md text-ellipsis',
            style.tagBody,
            showThumbnail && 'pl-9',
            className
          )}
        >
          <PopoverComponent
            trigger="hover"
            popoverContent={name}
            popoverImage={picture}
          >
            <div className="inline-flex">
              {tagPageLink ? (
                <span className={style.name}>
                  <strong>{name}</strong>
                </span>
              ) : (
                <span className={style.name}>{name}</span>
              )}
              {editable && <TagCloseButton onClick={onClick || undefined} />}
            </div>
          </PopoverComponent>
          {/* Tag Counter and Trend */}
          {popularity && (
            <popularity popularity={popularity} tagTrend={tagTrend} />
          )}
        </span>
      ) : (
        <span
          className={classNames(
            //   'relative px-5 py-2 rounded-3xl shadow-md text-ellipsis max-w-64 overflow-hidden inline-block text-nowrap', // wrapping
            'relative px-5 py-2 rounded-3xl shadow-md text-ellipsis',
            style.tagBody,
            showThumbnail && 'pl-9',
            className
          )}
        >
          {tagPageLink ? (
            <span className={style.name}>
              <strong>{name}</strong>
            </span>
          ) : (
            <span className={style.name}>{name}</span>
          )}
          {editable && <TagCloseButton onClick={onClick || undefined} />}
          {/* Tag Counter and Trend */}
          {popularity && (
            <popularity popularity={popularity} tagTrend={tagTrend} />
          )}
        </span>
      )}
    </>
  );
};

export default TagContainer;
