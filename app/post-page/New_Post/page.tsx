'use client';
import classNames from 'classnames';
import React from 'react';
import PostPageComponent from '@app/page-components/PostPageComponent/PostPageComponent';
import { useSearchParams } from 'next/navigation';

const decidePageType = (pageType: string) => {
  switch (pageType) {
    case 'post':
      return 'post';
    case 'event':
      return 'event';
    case 'projectResult':
      return 'project result';
    default:
      return 'post';
  }
};

export default function PostPage({ params }: any) {
  const searchParams = useSearchParams();
  // const { queryParam } = router.query;
  console.log('router', searchParams.get('pageType'));
  const pageType = decidePageType(searchParams.get('pageType') || 'new');

  return (
    <div className={classNames('w-full')}>
      <PostPageComponent
        pageTitle={'New_Post'}
        post={{}}
        isNewPost
        pageType={pageType}
      />
    </div>
  );
}
