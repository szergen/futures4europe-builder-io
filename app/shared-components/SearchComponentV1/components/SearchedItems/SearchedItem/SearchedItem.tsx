import Tag from '@app/shared-components/Tag/Tag';
import classNames from 'classnames';
import React from 'react';
import style from './SearchedItem.module.css';
import SpriteSvg from '@app/shared-components/SpriteSvg/SpriteSvg';

export type SearchedItemProps = {
  item: {
    searchItem: string;
    searchItemType: 'text' | 'tag' | 'field-tag' | 'sortby';
  };
  index: number;
  handleRemoveSearchedItem: (e: any) => void;
  tags: any[];
  isSelected: boolean;
};

const SearchedItem: React.FC<SearchedItemProps> = ({
  item,
  index,
  handleRemoveSearchedItem,
  tags,
  isSelected,
}) => {
  const itemIncludesField =
    item.searchItem.includes(':') && item.searchItem.split(':').length === 2;
  const tagName = itemIncludesField
    ? item.searchItem.split(':')[1]
    : item.searchItem;
  // const tagData = tags.find((tag) => tag.name === tagName);
  const tagData = tags?.find(
    (tag) => tag?.name?.toLowerCase() === tagName?.toLowerCase()
  );
  // console.log('debug2->', { tags, itemIncludesField, tagName, tagData });
  // console.log('debug3->', { item });

  return (
    <li
      key={`${index}-${item.searchItem}`}
      className={classNames(
        'flex mx-1 items-center px-1',
        isSelected && style.searchTagSelected
      )}
    >
      {/* Field with Tag */}
      {item.searchItemType === 'field-tag' && (
        <span className="flex items-center">
          <span className="" key={index}>
            {item.searchItem.split(':')[0]}
          </span>
          :
          <span className="" key={index}>
            {tagData && <Tag {...tagData} />}
          </span>
        </span>
      )}
      {/* Tag */}
      {item.searchItemType === 'tag' && (
        <span className="" key={index}>
          <Tag {...tagData} />
        </span>
      )}
      {/* Field without Tag */}
      {item.searchItemType !== 'tag' &&
        item.searchItemType !== 'sortby' &&
        item.searchItemType !== 'field-tag' &&
        item.searchItemType !== 'text' && (
          <span
            after={'"'}
            before={'"'}
            className="after:content-[attr(after)] before:content-[attr(before)] flex"
            key={index}
          >
            {item.searchItem}
          </span>
        )}
      {/* Simple Text */}
      {item.searchItemType === 'text' && (
        <span
          after={'"'}
          before={'"'}
          key={index}
          className="after:content-[attr(after)] before:content-[attr(before)] flex"
        >
          {item.searchItem}
        </span>
      )}
      {/* Sort Tag */}
      {item.searchItemType === 'sortby' && (
        <span className="" key={index}>
          <Tag
            name={item.searchItem}
            // popularity={tagData.popularity}
            // tagPageLink={tagData.pageLink}
            // picture={tagData.picture}
          />
        </span>
      )}
      {/* Remove Item */}
      <span className="cursor-pointer ml-1" onClick={handleRemoveSearchedItem}>
        <SpriteSvg.CloseIcon
          viewBox={'0 0 24 24'}
          strokeWidth={1.5}
          className="w-6 h-6 hover:fill-red-600 hover:stroke-white"
        />
      </span>
    </li>
  );
};

export default SearchedItem;
