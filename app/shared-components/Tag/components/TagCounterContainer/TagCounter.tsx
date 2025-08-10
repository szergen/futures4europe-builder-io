import classNames from 'classnames';
import React from 'react';
import style from '../../Tag.module.css';
import Tooltip3 from '@app/shared-components/Tooltip3/Tooltip3';
import Link from 'next/link';

export type TagCounterProps = {
  popularity?: number;
  // tagTrend?: number;
  disablePopularityHover?: boolean;
  _id?: string;
};

export const popularity: React.FC<TagCounterProps> = ({
  popularity,
  // tagTrend,
  disablePopularityHover,
  _id,
}) => {
  return (
    <span className={classNames(style.tagCounterBody)}>
      {popularity && (
        <Tooltip3
          trigger={disablePopularityHover ? 'click' : 'hover'}
          popoverContent={
            <>
              {`this tag is used ${popularity} times`}
              <br />
              {`(click to see where)`}
            </>
          }
        >
          {_id ? (
            <Link href={`/mentions/${_id}`}>
              <span
                after={popularity}
                className={classNames(
                  'text-gray-500 ',
                  'after:content-[attr(after)]',
                  style.popularity
                )}
              />
            </Link>
          ) : (
            <span
              after={popularity}
              className={classNames(
                'text-gray-500 ',
                'after:content-[attr(after)]',
                style.popularity
              )}
            />
          )}
        </Tooltip3>
      )}
    </span>
  );
};

export default popularity;
