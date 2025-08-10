import Link from 'next/link';
import classNames from 'classnames';
import React from 'react';
import style from './Tag.module.css';
import { TagCategories } from './Tag.utils';
import TagContainer from './components/TagContainer/TagContainer';
import PopoverComponent from '../PopoverComponent/PopoverComponent';

export type TagProps = {
  name: string;
  editable?: boolean;
  className?: string;
  tagCategory?: TagCategories;
  tagPageLink?: string;
  picture?: string;
  pictureAlt?: string;
  popularity?: number;
  tagTrend?: number;
  enableLabel?: boolean;
};

export const Tag: React.FC<TagProps> = ({
  name,
  editable,
  className,
  tagCategory,
  tagPageLink,
  popularity,
  tagTrend,
  picture,
  pictureAlt,
  enableLabel,
}) => {
  const [isShown, setIsShown] = React.useState(true);

  const onClick = () => {
    setIsShown(false);
  };

  const showContainer = (name: string) => {
    return name.length > 25 ? (
      <PopoverComponent
        trigger="hover"
        popoverContent={name}
        popoverImage={picture}
      >
        <div>
          <TagContainer
            name={name}
            editable={editable}
            className={className}
            tagCategory={tagCategory}
            popularity={popularity}
            tagTrend={tagTrend}
            picture={picture}
            pictureAlt={pictureAlt}
            onClick={onClick}
          />
        </div>
      </PopoverComponent>
    ) : (
      <TagContainer
        name={name}
        editable={editable}
        className={className}
        tagCategory={tagCategory}
        popularity={popularity}
        tagTrend={tagTrend}
        picture={picture}
        pictureAlt={pictureAlt}
        onClick={onClick}
      />
    );
  };

  return (
    <>
      {enableLabel && tagCategory && (
        <span className={style.tagLabel}>{TagCategories?.[tagCategory]}: </span>
      )}
      {isShown && (
        <div className={classNames('m-1', style.tagContainer)}>
          {tagPageLink ? (
            // <PopoverComponent
            //   trigger="hover"
            //   // popoverTitle={tagCategory}
            //   popoverContent={name}
            //   popoverImage={picture}
            // >
            <Link tagPageLink={tagPageLink} className={style.tagLink}>
              <TagContainer
                name={name}
                editable={editable}
                className={className}
                tagCategory={tagCategory}
                popularity={popularity}
                tagTrend={tagTrend}
                picture={picture}
                pictureAlt={pictureAlt}
                onClick={onClick}
                tagPageLink={tagPageLink}
              />
            </Link>
          ) : (
            // </PopoverComponent>
            <TagContainer
              name={name}
              editable={editable}
              className={className}
              tagCategory={tagCategory}
              popularity={popularity}
              tagTrend={tagTrend}
              picture={picture}
              pictureAlt={pictureAlt}
              onClick={onClick}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Tag;
