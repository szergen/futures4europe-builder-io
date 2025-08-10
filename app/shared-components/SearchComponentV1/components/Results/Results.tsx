import { getPropsForMiniPagesListItemPost } from '@app/page-components/shared-page-components/MiniPagesListComponentPost/components/MiniPagesListItemPost/MiniPagesListItemPost.utils';
// import MiniPage from '@app/shared-components/MiniPage/MiniPage';
import MiniPagePost from '@app/shared-components/MiniPagePost/MiniPagePost';
import Tag from '@app/shared-components/Tag/Tag';
import { automaticallyDecidePathPrefixBasedOnPageType } from '@app/utils/parse-utils';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

// export const PageTypes = [
//   'project result',
//   'post',
//   'event',
//   'project',
//   'person',
// ];

export type ResultsProps = {
  results: any[];
  searchedItems: any[];
};

const Results: React.FC<ResultsProps> = ({ results, searchedItems }) => {
  console.log('Results component -> results', results);

  return (
    <div className="style.suggestions ">
      <div className="style.pageSuggestions">
        <ul className="style.pages my-4">
          {results?.map((resultItem: any, index: number) => (
            <>
              {/* #region FOUND IN items */}
              {/* {searchedItems?.map((searchedItem: any) => {
                let allFoundInItems = [];
                // console.log('deb1->searchedItem', searchedItem);
                if (searchedItem.searchItemType === 'tag') {
                  for (const [key, value] of Object.entries(resultItem)) {
                    const excludedFields = ['pageOwner'];
                    const hasValue =
                      excludedFields.includes(key) === false &&
                      Array.isArray(value) &&
                      value.length > 0 &&
                      value?.find(
                        (item: any) => item.name === searchedItem.searchItem
                      );

                    hasValue &&
                      allFoundInItems.push(
                        <p key={JSON.stringify(searchedItem)}>
                          Item {searchedItem.searchItem} found in the following
                          fields: {key}
                        </p>
                      );
                  }
                }
                if (searchedItem.searchItemType === 'text') {
                  let foundIn = [] as string[];
                  Object.entries(resultItem).forEach(([key, value]) => {
                    if (
                      typeof value === 'string' &&
                      value
                        .toLocaleLowerCase()
                        .includes(searchedItem.searchItem)
                    ) {
                      foundIn.push(key);
                    }
                  });
                  allFoundInItems.push(
                    <p key={searchedItem.searchItem}>
                      Item {searchedItem.searchItem} found in the following
                      fields: {JSON.stringify(foundIn)}
                    </p>
                  );
                }
                return allFoundInItems.map((item) => item);
              })} */}
              {/* #endregion FOUND IN items */}
              <Link
                key={`${resultItem?.title}-${resultItem?._id || index}`}
                href={`${automaticallyDecidePathPrefixBasedOnPageType(
                  resultItem?.pageTypes?.[0]?.name
                )}${resultItem.slug}`}
              >
                <MiniPagePost
                  {...getPropsForMiniPagesListItemPost(resultItem)}
                />
              </Link>
              {/* <MiniPage pageItem={resultItem} key={resultItem.title} /> */}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Results;
