'use client';
import Link from 'next/link';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import style from './Tag.module.css';
import { TagCategories } from './Tag.utils';
import TagContainer from './components/TagContainer/TagContainer';
import { useAuth } from '@app/custom-hooks/AuthContext/AuthContext';
import { getTagById } from '@app/utils/tags.utls';

export type TagProps = {
  name: string;
  className?: string;
  tagCategory?: TagCategories;
  tagPageLink?: string;
  picture?: string;
  pictureAlt?: string;
  // popularity?: number;
  tagTrend?: number;
  enableLabel?: boolean;
  // New changes
  tagType?: string;
  tagLine?: string;
  disableTooltip?: boolean;
  disableLink?: boolean;
  disablePopularityHover?: boolean;
  _id?: string;
  mentions?: number;
  hardcodedMentions?: number;
  disableUnderline?: boolean;
  masterTag?: string;
};

export const Tag: React.FC<TagProps> = ({
  name,
  className,
  tagCategory,
  tagPageLink,
  mentions: popularity,
  tagTrend,
  picture,
  pictureAlt,
  enableLabel,
  disableTooltip,
  disableLink,
  tagLine,
  disablePopularityHover = false,
  hardcodedMentions,
  tagType,
  _id,
  disableUnderline,
  masterTag,
}) => {
  if (!name) return null;

  const { tags, tagsFetched } = useAuth();
  const [masterTagState, setMasterTagState] = useState<TagProps | undefined>({
    name,
    tagLine,
    picture,
  });
  const [currentPopularity, setCurrentPopularity] = useState<
    number | undefined
  >(undefined);
  const tagPageLinkOrMentionsLink = tagPageLink
    ? tagPageLink
    : _id
    ? `/mentions/${_id}`
    : null;

  const shouldDisableUnderLine =
    !['person', 'organisation', 'project'].includes(tagType) || !tagPageLink;

  useEffect(() => {
    if (!tagsFetched || currentPopularity) return;
    const tag = tags?.find(
      (tag) => tag?.name?.toLowerCase() === name?.toLowerCase()
    );
    if (tag) {
      setCurrentPopularity(tag?.mentions);
      if (masterTag) {
        const foundMasterTag = getTagById(tags, masterTag);
        foundMasterTag &&
          setMasterTagState({
            name: foundMasterTag.name,
            tagLine: foundMasterTag.tagLine,
            picture: foundMasterTag.picture,
          });
      }
    }
    // console.log(`tag ${tag} has been referenced ${popularity} times`);
  }, [tags, tagsFetched]);

  return (
    <>
      {enableLabel && tagCategory && (
        <span className={style.tagLabel}>{TagCategories?.[tagCategory]}: </span>
      )}
      <div className={classNames('my-1', style.tagContainer, className)}>
        {tagPageLinkOrMentionsLink && !disableLink ? (
          <Link
            href={tagPageLinkOrMentionsLink}
            className={classNames(
              style.tagLink,
              (disableUnderline || shouldDisableUnderLine) &&
                style.disableUnderline
            )}
          >
            <TagContainer
              name={masterTagState?.name || name}
              className={className}
              tagCategory={tagCategory}
              popularity={
                hardcodedMentions ? hardcodedMentions : currentPopularity
              }
              tagTrend={tagTrend}
              picture={masterTagState?.picture || picture}
              pictureAlt={pictureAlt}
              disableTooltip={disableTooltip}
              disablePopularityHover={disablePopularityHover}
              tagLine={masterTagState?.tagLine || tagLine}
              _id={_id}
              tagType={tagType}
            />
          </Link>
        ) : (
          <TagContainer
            name={masterTagState?.name || name}
            className={classNames(
              disableLink && tagPageLink && style.tagLink,
              className
            )}
            tagCategory={tagCategory}
            popularity={
              hardcodedMentions ? hardcodedMentions : currentPopularity
            }
            tagTrend={tagTrend}
            picture={masterTagState?.picture || picture}
            pictureAlt={pictureAlt}
            disableTooltip={disableTooltip}
            disablePopularityHover={disablePopularityHover}
            tagLine={masterTagState?.tagLine || tagLine}
            _id={_id}
            tagType={tagType}
          />
        )}
      </div>
    </>
  );
};

export default Tag;
