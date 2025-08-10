import classNames from 'classnames';
import React from 'react';
import style from '../../Tag.module.css';
import { TagCategories } from '../../Tag.utils';
import TagThumbnail from '../TagThumbnail/TagThumbnail';
import TagCounter from '../TagCounterContainer/TagCounter';
import PopoverComponent from '@app/shared-components/PopoverComponent/PopoverComponent';

export type TagContainerProps = {
  name: string;
  className?: string;
  tagCategory?: TagCategories;
  picture?: string;
  pictureAlt?: string;
  popularity?: number;
  tagTrend?: number;
  disableTooltip?: boolean;
  tagLine?: string;
  disablePopularityHover?: boolean;
  _id?: string;
  tagType?: string;
};

export const TagContainer: React.FC<TagContainerProps> = ({
  name,
  className,
  tagCategory,
  popularity,
  tagTrend,
  picture,
  pictureAlt,
  disableTooltip,
  tagLine,
  disablePopularityHover,
  _id,
  tagType,
}) => {
  const showThumbnail = Boolean(picture);
  // const showThumbnail = Boolean(
  //   picture ||
  //     tagType === 'person' ||
  //     tagType === 'organisation' ||
  //     tagType === 'project'
  // );
  const thumbnailClass = showThumbnail ? style.hasThumbnail : '';

  const TagContent = (
    <span className={style.name}>
      {showThumbnail ? (
        <span className={style.name}>
          {showThumbnail && (
            <TagThumbnail
              picture={picture || undefined}
              pictureAlt={pictureAlt}
              tagCategory={tagCategory}
            />
          )}
          <span className={style.tagNameBody}>{name}</span>
        </span>
      ) : (
        <span className={style.name}>
          {showThumbnail && (
            <TagThumbnail
              picture={picture || undefined}
              pictureAlt={pictureAlt}
              tagCategory={tagCategory}
            />
          )}
          <span className={style.tagNameBody}>{name}</span>
        </span>
      )}
    </span>
  );

  return (
    <>
      {/* Tag Body */}
      {/* {name?.length > 12 ? ( */}
      <span className={classNames(style.tagBody, thumbnailClass, className)}>
        <span className={style.tagBodyText}>
          {disableTooltip ? (
            TagContent
          ) : (
            <PopoverComponent
              alwaysVisible={false} // Set the new prop to true
              trigger="hover"
              popoverTitle={name}
              popoverSubtitle={tagLine}
              popoverImage={picture}
            >
              {TagContent}
            </PopoverComponent>
          )}
        </span>
      </span>
      {/* Tag Counter and Trend */}
      {popularity > 0 && ( // Add the condition here
        <TagCounter
          popularity={popularity}
          disablePopularityHover={disablePopularityHover}
          _id={_id}
        />
      )}
      {/* )  */}
      {/* : */}
      {/* ( */}
      {/* <span className={classNames(style.tagBody, thumbnailClass, className)}> */}
      {/* <span className={style.tagBodyText}>
            {tagPageLink ? (
              <span className={style.name}>
                {showThumbnail && (
                  <TagThumbnail
                    picture={picture || undefined}
                    pictureAlt={pictureAlt}
                    tagCategory={tagCategory}
                  />
                )}
                {name}
              </span>
            ) : (
              <span className={style.name}>
                {showThumbnail && (
                  <TagThumbnail
                    picture={picture || undefined}
                    pictureAlt={pictureAlt}
                    tagCategory={tagCategory}
                  />
                )}
                {name}
              </span>
            )} */}
      {/* Tag Counter and Trend */}
      {/* {popularity && (
              <TagCounter popularity={popularity} tagTrend={tagTrend} />
            )} */}
      {/* </span> */}
      {/* </span> */}
      {/* )} */}
    </>
  );
};

export default TagContainer;
