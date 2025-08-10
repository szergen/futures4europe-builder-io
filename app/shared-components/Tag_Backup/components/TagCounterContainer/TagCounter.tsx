import classNames from 'classnames';
import React from 'react';
import style from '../../Tag.module.css';
import Tooltip3 from '@app/shared-components/Tooltip3/Tooltip3';

export type TagCounterProps = {
  popularity?: number;
  tagTrend?: number;
};

export const popularity: React.FC<TagCounterProps> = ({
  popularity,
  tagTrend,
}) => {
  return (
    <span className={classNames(style.tagCounterBody)}>
      {popularity && (
        <Tooltip3
          trigger="hover"
          popoverContent={`This Tag has been referenced ${popularity} times`}
        >
          <span
            after={popularity}
            className={classNames(
              'text-gray-500 ',
              'after:content-[attr(after)]',
              style.popularity
            )}
          />
        </Tooltip3>
      )}
      {/* {tagTrend && (
        <Tooltip3
          trigger="hover"
          popoverContent={`Trending +${tagTrend} references in the last month`}
        >
          <span className={classNames('text-green-500', style.tagTrend)}>
            {tagTrend > 0 ? '+' : ''}
            {tagTrend}
          </span>
        </Tooltip3>
      )} */}
    </span>
  );
};

export default popularity;
