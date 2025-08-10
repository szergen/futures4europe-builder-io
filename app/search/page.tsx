'use client';
import classNames from 'classnames';
import React, { useEffect } from 'react';
// import PostPageComponent from '@app/page-components/PostPageComponent/PostPageComponent';
import { getCollection, getItemById } from '@app/wixUtils/server-side';
import MiniPagesListItemPost from '@app/page-components/shared-page-components/MiniPagesListComponentPost/components/MiniPagesListItemPost/MiniPagesListItemPost';
import Hero from '@app/shared-components/Hero/Hero';
import style from './page.module.css';
import { useRouter } from 'next/navigation';
import { containsId } from '@app/utils/tags.utls';
import Tag from '@app/shared-components/Tag/Tag';
import { useAuth } from '@app/custom-hooks/AuthContext/AuthContext';
import Results from '@app/shared-components/SearchComponentV1/components/Results/Results';
import {
  SearchProvider,
  useSearch,
} from '@app/custom-hooks/SearchContext/SearchContext';
// import { getCollection } from '@app/wixUtils/client-side';

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
// export const revalidate = 0;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
// export const dynamicParams = true; // or false, to 404 on unknown paths

export default function Pages({ params, searchParams }: any) {
  const tagId = params.slug;
  const { searchState, setSearchState } = useSearch();
  const { filteredData, results, showResults, searchedItems } = searchState;

  // if (tags.length === 0) {
  //   return <div>Loading...</div>; // You can also add a loading spinner here
  // }
  useEffect(() => {
    setSearchState((prevState) => ({
      ...prevState,
      pageSuggestions: results?.map((page) => ({ item: page })),
    }));
  }, [results]);

  return (
    <div className={classNames('w-full')}>
      {/* <SearchProvider> */}
      <Hero
        subtitle={
          showResults && filteredData?.pages?.length > 0
            ? `sorted by published dates`
            : ' '
        }
      >
        <div className="flex justify-center">
          <h1
            className={classNames(
              'text-4xl',
              'font-bold',
              'mb-4',
              style.heroTitle
            )}
          >
            {!showResults
              ? 'No Search Items'
              : `${filteredData?.pages?.length || 0} ${
                  filteredData?.pages?.length === 1 ? 'page' : 'pages'
                } found`}
          </h1>
        </div>
      </Hero>
      {showResults && (
        <div className={classNames(style.resultsContainer)}>
          <Results results={filteredData.pages} searchedItems={searchedItems} />
        </div>
      )}
      {/* </SearchProvider> */}
    </div>
  );
}
