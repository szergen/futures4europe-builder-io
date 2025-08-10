import React from 'react';
import style from './TagLisInlineComponent.module.css';
import Tag from '@app/shared-components/Tag/Tag';
import PropTypes from 'prop-types';
import { automaticallyDecidePathPrefixBasedOnPageType } from '@app/utils/parse-utils';
import TagSkeleton from '../TagList/TagSkeleton';

const TagLisInlineComponent = ({
  infoPages,
  postPages,
  infoPageType,
  postPageTypes,
  isLoading,
}) => {
  // Add debug logs
  // console.log('debug6->Props received:', {
  //   infoPageType,
  //   isLoading,
  //   infoPageCount: infoPages?.length,
  //   postPagesCount: postPages?.length,
  // });

  const getTagsByType = (postPage) => {
    const firstPageType = postPage.data.pageTypes?.[0];
    if (firstPageType && postPage.data.title) {
      const tag = {
        name: postPage.data.title,
        popularity: firstPageType.popularity,
        _id: postPage._id,
        picture: '/images/default.png',
      };
      return [tag];
    }
    return [];
  };

  const filteredPostPages = postPages
    ? postPages.filter((postPage) => {
        const pageTypeName = postPage.data.pageTypes?.[0]?.name;
        if (postPageTypes && postPageTypes.length > 0) {
          return postPageTypes.includes(pageTypeName);
        }
        return true;
      })
    : [];

  if (isLoading) {
    return (
      <section className={style.tagListContainer}>
        {/* Skeleton for info pages */}
        {infoPageType && (
          <>
            {Array.from({ length: 2 }).map((_, index) => (
              <TagSkeleton key={`info-skeleton-${index}`} count={3} />
            ))}
          </>
        )}

        {/* Skeleton for post pages */}
        {postPageTypes && (
          <>
            {Array.from({ length: 2 }).map((_, index) => (
              <TagSkeleton key={`post-skeleton-${index}`} count={2} />
            ))}
          </>
        )}
      </section>
    );
  }

  // Filter and log info pages
  // const filteredInfoPages =
  //   infoPages?.filter(
  //     (infoPage) => infoPage?.data?.pageTypes?.[0]?.name === infoPageType
  //   ) || [];

  // console.log('debug6->Filtered info pages:', {
  //   infoPageType,
  //   filteredCount: filteredInfoPages.length,
  //   firstPage: filteredInfoPages[0]?.data,
  // });

  return (
    <section className={style.tagListContainer}>
      {/* Info Pages Rendering Logic */}
      {infoPages && infoPageType && (
        <>
          {infoPages
            .filter(
              (infoPage) =>
                infoPage?.data?.pageTypes?.[0]?.name === infoPageType
            )
            .map((infoPage, index) => {
              const tagTypeMap = {
                'person info': infoPage.data.person || [],
                'organisation info': infoPage.data.organisation || [],
                'project info': infoPage.data.Project || [],
              };

              const tagsToRender = tagTypeMap[infoPageType] || [];

              // console.log('debug6->Tags to render:', {
              //   infoPageType,
              //   pageTitle: infoPage.data.title,
              //   tagsCount: tagsToRender.length,
              //   tags: tagsToRender,
              // });

              return (
                <div key={`${infoPage.data.title}-${index}`} className="flex">
                  {tagsToRender.map((item, idx) => {
                    // console.log('debug6->Rendering tag:', { item });
                    return item && item.name && item.picture ? (
                      <Tag
                        key={`${infoPage.data.title}-${item._id || idx}`}
                        name={item.name}
                        picture={item.picture}
                        disableTooltip
                        disablePopularityHover
                        tagPageLink={`${automaticallyDecidePathPrefixBasedOnPageType(
                          infoPage.data.pageTypes?.[0]?.name
                        )}${infoPage.data.slug}`}
                        tagType={item.tagType}
                      />
                    ) : null;
                  })}
                </div>
              );
            })}
        </>
      )}

      {/* Post Pages Rendering Logic */}
      {filteredPostPages && filteredPostPages.length > 0 && (
        <>
          {filteredPostPages?.map((postPage, index) => {
            const tags = getTagsByType(postPage);
            // console.log('debug6->Post tags:', {
            //   postTitle: postPage.data.title,
            //   tags,
            // });

            return (
              <div
                key={`${postPage.data.title}-${postPage._id || index}`}
                className="flex flex-wrap gap-2"
              >
                {tags.length > 0 ? (
                  tags.map((item, idx) =>
                    item && item.name ? (
                      <Tag
                        key={`${postPage.data.title}-${item._id || idx}`}
                        name={item.name}
                        disableTooltip
                        disablePopularityHover
                        tagPageLink={`/post/${postPage.data.slug}`}
                        tagType={item.tagType}
                      />
                    ) : null
                  )
                ) : (
                  <p></p>
                )}
              </div>
            );
          })}
        </>
      )}
    </section>
  );
};

TagLisInlineComponent.propTypes = {
  infoPages: PropTypes.array,
  postPages: PropTypes.array,
  infoPageType: PropTypes.string,
  postPageTypes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  isLoading: PropTypes.bool,
};

export default TagLisInlineComponent;
