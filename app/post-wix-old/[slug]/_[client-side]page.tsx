'use client';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import PostPageComponent from '@app/page-components/PostPageComponent/PostPageComponent';
import {
  // getCollection,
  getCollectionItemByTitle,
  // getMemberById,
  // updateDataItem,
} from '@app/wixUtils/server-side';

// Function to generate static paths
// export async function generateStaticParams() {
//   const postCollection = await getCollection('PostPages');
//   const slugs = postCollection?.map((post: any) => ({
//     params: { slug: post.data.title.replace(/\s+/g, '_') },
//   }));
//   return slugs;
// }

export default function PostPage({ params }: any) {
  console.log('Post Page Params', params.slug);
  const [postPageItem, setPostPageItem] = useState<any>(null);
  const slug = params?.slug;

  // TEST Get entire Post collection
  // const postCollection = await getCollection('PostPages');
  // console.log('postCollection', postCollection);

  useEffect(() => {
    const fetchPostData = async () => {
      if (slug) {
        try {
          console.log('Fetching post for slug:', slug);
          const postData = await getCollectionItemByTitle('PostPages', slug);
          console.log('Fetched post data:', postData);
          setPostPageItem(postData);
        } catch (error) {
          console.error('Error fetching post data:', error);
        }
      }
    };

    fetchPostData();
  }, [slug]);

  //Get specific Post by slug
  // const postPageItem = await getCollectionItemByTitle('PostPages', params.slug);
  console.log('postItem Data', postPageItem?.data);

  // const updatedItem = await updateDataItem(
  //   postItem.dataCollectionId,
  //   postItem._id,
  //   {
  //     _id: postItem._id,
  //     subtitle: 'This is a new subtitle',
  //   }
  // );
  // console.log('Updated Item', updatedItem);

  if (!postPageItem) {
    return <div>Loading...</div>; // You can also add a loading spinner here
  }

  return (
    <div className={classNames('w-full')}>
      <PostPageComponent pageTitle={params.slug} post={postPageItem} />
    </div>
  );
}
