"use client";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import style from "./PostPageComponent.module.css";
import Tag, { TagProps } from "@app/shared-components/Tag/Tag";
import Typography from "@app/shared-components/Typography/Typography";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import ContentComponent from "./components/ContentComponent/ContentComponent";
import TagListComponent from "../shared-page-components/TagListComponent/TagListComponent";
// import ExternalLinksComponent from '../shared-page-components/ExternalLinksComponent/ExternalLinksComponent';
// import AuthorComponent from './components/AuthorComponent/AuthorComponent';
import FilesComponent from "../shared-page-components/FilesComponent/FilesComponent";
import { mockPost } from "../../mocks/pagesMocks";
import { useAuth } from "@app/custom-hooks/AuthContext/AuthContext";
import OgImage from "@app/shared-components/OgImage";
import TagPicker from "@app/shared-components/TagPicker/TagPicker";
import {
  formatDate,
  checkIfArrayNeedsUpdateForTags,
  generateUniqueHash,
  checkIfArrayNeedsUpdateForStrings,
  areArraysEqualForMediaFiles,
} from "./PostPageComponent.utils";
import MiniPagesListComponentPost from "../shared-page-components/MiniPagesListComponentPost/MiniPagesListComponentPost";
import { useRouter } from "next/navigation";
import { Modal } from "flowbite-react";
import LoadingSpinner from "@app/shared-components/LoadingSpinner/LoadingSpinner";
import { sanitizeTitleForSlug } from "../PageComponents.utils";
import { invalidatePostPageCache } from "@app/utils/cache-utils";
import {
  createBuilderPost,
  updateBuilderPost,
} from "@app/utils/builderPostUtils";

export type PostPageComponentProps = {
  pageTitle: string;
  post: any;
  isNewPost?: boolean;
  pageType?: string;
};

function PostPageComponent({ pageTitle, post, isNewPost, pageType }: any) {
  // Initial mock data
  post = { ...mockPost(pageTitle), ...post };
  const router = useRouter();

  // Get the current URL for OG metadata
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  // #region useAuth hook for grabbing user details and tags needed for editing
  // state for if the page is owned by the user
  // state for if the edit mode is on
  const {
    isLoggedIn,
    userDetails,
    tags,
    tagsFetched,
    handleTagCreated,
    handleUserDataRefresh,
  } = useAuth();
  // console.log('debug1->tags', tags);
  const [isPageOwnedByUser, setIsPageOwnedByUser] = useState(false);
  const [isEditModeOn, setIsEditModeOn] = useState(false);

  // #endregion

  // check if the page is owned by the user
  useEffect(() => {
    if (!isLoggedIn || !tagsFetched) return;
    // #region Check PageOwner property from Wix Data, hardcoding ownership
    const permissionCondition =
      postData.pageOwner?.length > 0 &&
      !!userDetails?.userTag?.name &&
      !!postData.pageOwner?.find(
        (owner: any) => owner?._id === userDetails?.userTag?._id
      );

    // console.log('debug1->permissionCondition', permissionCondition);

    if (permissionCondition) {
      setIsPageOwnedByUser(true);
      return;
    }
    // #endregion
    const userDetailsIds = userDetails?.accountId
      ? [userDetails.contactId, userDetails.accountId]
      : [userDetails.contactId];
    userDetailsIds.find((id) => {
      if (post?.data?._owner === id) {
        setIsPageOwnedByUser(true);
      }
    });
    if (isNewPost && isLoggedIn) {
      setIsPageOwnedByUser(true);
      setIsEditModeOn(true);
    }
  }, [isLoggedIn, tagsFetched, userDetails.userTag]);
  // Overwrite with Wix Data
  post = {
    ...post,
    title: post?.data?.title,
    pageType: post?.data?.pageTypes,
    subtitle: post?.data?.subtitle,
    updatedDate:
      post?.data?.postPublicationDate || post?.data?._updatedDate?.["$date"],
    postDate:
      post?.data?.postPublicationDate || post?.data?._createdDate?.["$date"],
    countryTag: post?.data?.countryTag[0],
    recommendations: {
      number: post?.data?.recomendations,
    },
    authors: post?.data?.author,
    contentText: [
      post?.data?.postContentRIch1,
      post?.data?.postContentRIch2,
      post?.data?.postContentRIch3,
      post?.data?.postContentRIch4,
      post?.data?.postContentRIch5,
      post?.data?.postContentRIch6,
      post?.data?.postContentRIch7,
      post?.data?.postContentRIch8,
      post?.data?.postContentRIch9,
      post?.data?.postContentRIch10,
    ],
    contentImages: [
      post?.data?.postImage1,
      post?.data?.postImage2,
      post?.data?.postImage3,
      post?.data?.postImage4,
      post?.data?.postImage5,
      post?.data?.postImage6,
      post?.data?.postImage7,
      post?.data?.postImage8,
      post?.data?.postImage9,
      post?.data?.postImage10,
    ],
    projectAuthors: post?.data?.projectResultAuthor.length
      ? post?.data?.projectResultAuthor
      : post?.data?.author,
    people: post?.data?.people,
    foreSightMethods: post?.data?.methods,
    domains: post?.data?.domains,
    project: post?.data?.projects,
    organisation: post?.data?.organisations,
    eventSpeakers: post?.data?.speakers,
    eventModerators: post?.data?.moderators,
    eventRegistration: post?.data?.eventRegistration,
    eventStartDate: post?.data?.eventStartDate,
    eventEndDate: post?.data?.eventEndDate,
    internalLinks: post?.data?.internalLinks,
    projectResultMedia: post?.data?.projectResultMedia,
    mediaFiles: post?.data?.mediaFiles,
    projectResultPublicationDate: post?.data?.projectResultPublicationDate,
    pageOwner: post?.data?.pageOwner,
    slug: post?.data?.slug,
  };
  console.log("debug1-post", post);
  // set default post data and data for editing
  const [defaultPostData, setDefaultPostData] = useState(post);
  const [postData, setPostData] = useState(post);

  // Method for updating post data
  const updatePostData = (newData: any) => {
    setPostData((prevData: any) => ({ ...prevData, ...newData }));
  };
  const updatePostDataBasedOnKeyValue = (key: string, value: any) => {
    setPostData((prevData: any) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // #region validationState
  const updateValidationState = (newData: any) => {
    setValidationState((prevData: any) => ({ ...prevData, ...newData }));
  };

  const [validationState, setValidationState] = useState({
    title: "",
    subtitle: "",
  });
  useEffect(() => {
    console.log("validationState", validationState);
  }, [validationState]);
  // Helper function for seeing if any validation errors exist
  const checkValidationErrors = () => {
    return Object.values(validationState).some((error) => error);
  };
  // #endregion

  // Method for updating data to server

  const [isSaveInProgress, setIsSaveInProgress] = useState(false);

  const updateDataToServer = async () => {
    console.log("[Builder.io] Updating post:", post.id, postData.slug);
    setIsSaveInProgress(true);

    try {
      // Get Builder.io post ID from post object
      const builderId = post.id;

      if (!builderId) {
        console.error("[Builder.io] No Builder.io ID found for post");
        alert("Unable to update post. Missing post ID.");
        setIsSaveInProgress(false);
        return;
      }

      // Prepare complete post data with all fields including references
      // Builder.io API accepts full payload (no manual diff needed per FR-028)
      const builderPostData = {
        title: postData?.title,
        subtitle: postData?.subtitle,
        slug: postData.slug, // Keep existing slug

        // Author and page owner
        author: postData.author || [],
        pageOwner: postData.pageOwner || [],

        // Page type
        pageTypes: postData.pageType || [],

        // Country tag
        countryTag: postData.countryTag ? [postData.countryTag] : [],

        // Related tags
        people: postData.people || [],
        methods: postData.foreSightMethods || [],
        domains: postData.domains || [],
        projects: postData.project || [],
        organisations: postData.organisation || [],
        internalLinks: postData.internalLinks || [],

        // Event-specific fields
        speakers: postData.eventSpeakers || [],
        moderators: postData.eventModerators || [],
        eventStartDate: postData.eventStartDate,
        eventEndDate: postData.eventEndDate,
        eventRegistration: postData.eventRegistration,

        // Project result-specific fields
        projectResultAuthor: postData.projectAuthors || [],
        projectResultMedia: postData.projectResultMedia,
        projectResultPublicationDate: postData.projectResultPublicationDate,

        // Additional fields
        mediaFiles: postData.mediaFiles || [],
        recommendations: postData.recommendations || 0,
      };

      // Update post in Builder.io (single API call with all references)
      const result = await updateBuilderPost(
        builderId,
        builderPostData,
        postData.contentText,
        postData.contentImages
      );

      console.log("[Builder.io] Post updated successfully:", result);

      // Invalidate cache for the post page
      await invalidatePostPageCache(postData.slug);

      setIsSaveInProgress(false);
    } catch (error) {
      console.error("[Builder.io] Error updating post:", error);
      alert("Failed to update post. Please try again.");
      setIsSaveInProgress(false);
    }
  };

  // #endregion

  // #region for when the page is newly created

  const createNewPost = async () => {
    console.log("[Builder.io] Creating New Post");
    setIsSaveInProgress(true);

    try {
      // Get user tag for author and pageOwner
      const userTag = tags.find(
        (tag) => tag?.tagType === "person" && tag?.name === userDetails.userName
      );

      // Check if user tag exists - block creation if missing per FR-010
      if (!userTag || !userTag._id) {
        alert("User profile not found. Please contact administrator.");
        setIsSaveInProgress(false);
        return;
      }

      // Generate unique slug
      const slug =
        sanitizeTitleForSlug(postData?.title) + "-" + generateUniqueHash();

      // Prepare post data with all fields including references
      const builderPostData = {
        title: postData?.title,
        subtitle: postData?.subtitle,
        slug: `/post/${slug}`, // Builder.io format with /post/ prefix

        // Author and page owner (set from user tag)
        author: [{ _id: userTag._id }],
        pageOwner: [{ _id: userTag._id }],

        // Page type
        pageTypes: postData.pageType || [],

        // Country tag
        countryTag: postData.countryTag ? [postData.countryTag] : [],

        // Related tags
        people: postData.people || [],
        methods: postData.foreSightMethods || [],
        domains: postData.domains || [],
        projects: postData.project || [],
        organisations: postData.organisation || [],
        internalLinks: postData.internalLinks || [],

        // Event-specific fields
        speakers: postData.eventSpeakers || [],
        moderators: postData.eventModerators || [],
        eventStartDate: postData.eventStartDate,
        eventEndDate: postData.eventEndDate,
        eventRegistration: postData.eventRegistration,

        // Project result-specific fields
        projectResultAuthor: postData.projectAuthors || [],
        projectResultMedia: postData.projectResultMedia,
        projectResultPublicationDate: postData.projectResultPublicationDate,

        // Additional fields
        mediaFiles: postData.mediaFiles || [],
        recommendations: postData.recommendations || 0,
      };

      // Create post in Builder.io (single API call with all references)
      const result = await createBuilderPost(
        builderPostData,
        postData.contentText,
        postData.contentImages
      );

      console.log("[Builder.io] Post created successfully:", result);

      // Refresh user data
      handleUserDataRefresh();

      // Invalidate cache for the new post page
      await invalidatePostPageCache(slug);

      setIsSaveInProgress(false);

      // Redirect to the new post page
      router.push(`/post-page/${slug}`);
    } catch (error) {
      console.error("[Builder.io] Error creating post:", error);
      alert("Failed to create post. Please try again.");
      setIsSaveInProgress(false);
    }
  };
  // #endregion

  // #region Filter pageType Tags based on the first tag
  const extraFilterTags = (tags: Array<TagProps>, firstTagName: string) => {
    if (firstTagName === "project result") {
      return tags?.filter(
        (tag) =>
          tag?.tagType === "page type" &&
          !tag?.name?.includes("info") &&
          tag?.name !== "event" &&
          tag?.name !== "post"
      );
    }
    if (firstTagName === "event") {
      return tags?.filter(
        (tag) =>
          tag?.tagType === "page type" &&
          !tag?.name?.includes("info") &&
          tag?.name !== "project result" &&
          tag?.name !== "post"
      );
    }
    if (firstTagName === "post") {
      return tags?.filter(
        (tag) =>
          tag?.tagType === "page type" &&
          !tag?.name?.includes("info") &&
          tag?.name !== "project result" &&
          tag?.name !== "event"
      );
    }
    // ...rest of conditions
    return tags;
  };

  // #endregion

  // #region for when the page is newly created
  // if (pageTitle === 'New Post') {
  //   setIsEditModeOn(true);
  // }

  // useEffect(() => {
  //   console.log('PostPages -> userDetails', userDetails);
  //   const userTag = tags.find(
  //     (tag) => tag?.tagType === 'person' && tag?.name === userDetails?.userName
  //   );
  //   console.log('userTag', userTag);
  // }, [userDetails]);

  // #region for when the page is newly created to set defaultData
  useEffect(() => {
    if (isLoggedIn && postData && isNewPost && pageType) {
      const postTag = tags.find((tag) => tag.name === pageType);
      // console.log('debug1->personTag', postTag);
      if (postTag) {
        updatePostDataBasedOnKeyValue("pageType", [postTag]);
      }
      const defaultAuthorTag = tags.find(
        (tag) => tag.name === userDetails?.userTag?.name
      );
      if (defaultAuthorTag) {
        updatePostDataBasedOnKeyValue("authors", [defaultAuthorTag]);
        // updatePostDataBasedOnKeyValue('projectAuthors', [defaultAuthorTag]);
      }
      // console.log('debug1->personInfoTag', personInfoTag);
      // if (personInfoTag) {
      //   updatePostDataBasedOnKeyValue('pageType', personInfoTag);
      // }
    }
  }, [userDetails, tags]);

  // Removed automatic cache refresh on New_Post page load
  // No need to invalidate cache just for viewing the new post form
  // useEffect(() => {
  //   isNewPost && handleTagCreated();
  // }, []);

  const saveOrCreateHandler = isNewPost ? createNewPost : updateDataToServer;
  console.log("postdatadata", postData);

  return (
    <div className={classNames("m-auto mb-20", style.postContainer)}>
      {/* Add OG Image component for client-side fallback */}
      {!isNewPost && postData?.pageType?.[0]?.name !== "project result" && (
        <OgImage
          primaryImage={postData.contentImages?.[0]?.url}
          secondaryImage={
            postData.contentImages?.[1]?.url !== " "
              ? postData.contentImages?.[1]?.url
              : "https://futures4europe.eu/images/placeholder.webp"
          }
          title={postData.title}
          description={postData.subtitle}
          url={currentUrl}
        />
      )}
      {!isNewPost && postData?.pageType?.[0]?.name === "project result" && (
        <OgImage
          primaryImage={postData.projectResultMedia?.thumbnail}
          secondaryImage={"https://futures4europe.eu/images/placeholder.webp"}
          title={postData.title}
          description={postData.subtitle}
          url={currentUrl}
        />
      )}

      {/* Edit buttons */}
      {isPageOwnedByUser && (
        <div className="flex justify-between">
          <button
            onClick={() => {
              isEditModeOn && saveOrCreateHandler();
              setIsEditModeOn(!isEditModeOn);
              setDefaultPostData(postData);
            }}
            disabled={isEditModeOn && checkValidationErrors()}
            className={classNames(
              "btn btn-save",
              isEditModeOn && checkValidationErrors() && "bg-gray-400"
            )}
          >
            {!isEditModeOn ? "Edit Page" : "Publish Page"}
          </button>
          {isEditModeOn && (
            <button
              onClick={() => {
                setPostData(defaultPostData);
                setIsEditModeOn(!isEditModeOn);
                isNewPost && router.push(`/dashboard/posts`);
              }}
              className="btn btn-edit"
            >
              Discard Changes
            </button>
          )}

          {!isEditModeOn && (
            <button
              onClick={() => {
                setIsEditModeOn(!isEditModeOn);
                router.push(`/dashboard/projects`);
              }}
              className="btn btn-gray flex-end align-right"
            >
              Go back to dashboard
            </button>
          )}
        </div>
      )}
      {/* Page Type Tag */}
      <div className={classNames("py-3 justify-start", style.preHeader)}>
        <div>
          {!isEditModeOn ? (
            <>{postData.pageType?.[0] && <Tag {...postData.pageType?.[0]} />}</>
          ) : (
            <TagPicker
              tags={tags?.filter(
                (tag) =>
                  tag?.tagType === "page type" &&
                  !tag?.name?.includes("info") &&
                  !tag?.masterTag
              )}
              className="relative"
              selectedValues={postData.pageType?.map(
                (pageType: any) => pageType?.name
              )}
              updatePostData={(value) =>
                updatePostDataBasedOnKeyValue("pageType", value)
              }
              tagType="page type"
              onTagCreated={handleTagCreated}
              isMulti
              extraFilterTags={extraFilterTags}
              newTagHeader="Create a new page type"
              newTagType="Page type name"
              newTagTagline="Enter a tagline (slogan, acronym, English translation, ...)"
              // tagTypeLabel="Page Type"
            />
          )}
        </div>
        {/* Timestamp */}
        {!isEditModeOn && (
          <section className="post-meta">
            <Typography tag="p" className="text-sm text-gray-400">
              Page creation date:{" "}
              {postData?.postDate && formatDate(postData.postDate)}
            </Typography>
          </section>
        )}
      </div>
      {/* Post Header */}
      <HeaderComponent
        post={postData}
        isEditModeOn={isEditModeOn}
        updatePostData={updatePostData}
        updatePostDataBasedOnKeyValue={updatePostDataBasedOnKeyValue}
        tags={tags}
        handleTagCreated={handleTagCreated}
        setValidationState={updateValidationState}
        // defaultPostTitle={defaultPostData.title}
      />
      {/* Author */}
      {/* {postData.pageType?.[0]?.name?.toLowerCase() !== 'project result' &&
        postData.pageType?.[0]?.name?.toLowerCase() !== 'event' && (
          <AuthorComponent authors={postData.authors} />
        )} */}
      {/* Project Result Authors */}
      {/* {postData.pageType?.[0]?.name?.toLowerCase() === 'project result' && ( */}
      {postData?.pageType?.[0]?.name?.toLowerCase() !== "event" ? (
        <TagListComponent
          placeholder="Add one or more person tags"
          tagList={postData.projectAuthors}
          tagListTitle="Authors"
          isEditModeOn={isEditModeOn}
          tags={tags?.filter((tag) => tag?.tagType === "person")}
          selectedValues={postData.projectAuthors?.map(
            (author: any) => author?.name
          )}
          updatePostData={(value) =>
            updatePostDataBasedOnKeyValue("projectAuthors", value)
          }
          tagType="person"
          handleTagCreated={handleTagCreated}
        />
      ) : (
        ""
      )}
      {/* )} */}
      {/* Post Content */}
      <ContentComponent
        contentText={postData.contentText}
        contentImages={postData.contentImages}
        isEditModeOn={isEditModeOn}
        updatePostDataContent={(value, index) => {
          const newContentText = [...postData.contentText];
          newContentText[index] = value;
          return updatePostData({
            contentText: newContentText,
          });
        }}
        updatePostDataContentImages={(value, index) => {
          const newContentImages = [...postData.contentImages];
          newContentImages[index] = value;
          return updatePostData({
            contentImages: newContentImages,
          });
        }}
      />
      {/* <div>{post.data.postContent}</div> */}
      {/* EVENT SPECIFIC*/}
      {postData?.pageType?.[0]?.name?.toLowerCase() === "event" && (
        <>
          {/* Moderators */}
          <TagListComponent
            tagList={postData.eventModerators}
            tagListTitle="Moderators"
            placeholder="Add one or more person tags"
            isEditModeOn={isEditModeOn}
            tags={tags?.filter((tag) => tag?.tagType === "person")}
            selectedValues={postData.eventModerators?.map(
              (speaker: any) => speaker?.name
            )}
            updatePostData={(value) =>
              updatePostDataBasedOnKeyValue("eventModerators", value)
            }
            tagType="person"
            handleTagCreated={handleTagCreated}
          />
          {/* Speakers */}
          <TagListComponent
            tagList={postData.eventSpeakers}
            tagListTitle="Speakers"
            placeholder="Add one or more person tags"
            isEditModeOn={isEditModeOn}
            tags={tags?.filter((tag) => tag?.tagType === "person")}
            selectedValues={postData.eventSpeakers?.map(
              (speaker: any) => speaker?.name
            )}
            updatePostData={(value) =>
              updatePostDataBasedOnKeyValue("eventSpeakers", value)
            }
            tagType="person"
            handleTagCreated={handleTagCreated}
          />
        </>
      )}
      {/* Post People */}
      {postData?.pageType?.[0]?.name?.toLowerCase() !== "post" ? (
        <TagListComponent
          tagList={postData.people}
          tagListTitle={
            postData?.pageType?.[0]?.name?.toLowerCase() !== "event"
              ? "People"
              : "Participants"
          }
          placeholder="Add one or more person tags relevant to your post"
          isEditModeOn={isEditModeOn}
          tags={tags?.filter((tag) => tag?.tagType === "person")}
          selectedValues={postData.people?.map((person: any) => person?.name)}
          updatePostData={(value) =>
            updatePostDataBasedOnKeyValue("people", value)
          }
          tagType="person"
          handleTagCreated={handleTagCreated}
        />
      ) : (
        ""
      )}
      {/* Foresight Methods */}
      <TagListComponent
        tagList={postData.foreSightMethods}
        tagListTitle="Foresight Methods"
        placeholder="Add one or more foresight method tags relevant to your post"
        isEditModeOn={isEditModeOn}
        tags={tags?.filter((tag) => tag?.tagType === "foresight method")}
        selectedValues={postData.foreSightMethods?.map(
          (method: any) => method?.name
        )}
        updatePostData={(value) =>
          updatePostDataBasedOnKeyValue("foreSightMethods", value)
        }
        tagType="foresight method"
        handleTagCreated={handleTagCreated}
      />
      {/* Domains */}
      <TagListComponent
        tagList={postData.domains}
        tagListTitle="Domains"
        placeholder="Add one or more domain tags relevant to your post"
        isEditModeOn={isEditModeOn}
        tags={tags?.filter((tag) => tag?.tagType === "domain")}
        selectedValues={postData.domains?.map((domain: any) => domain?.name)}
        updatePostData={(value) =>
          updatePostDataBasedOnKeyValue("domains", value)
        }
        tagType="domain"
        handleTagCreated={handleTagCreated}
      />
      {/* Project */}
      <TagListComponent
        tagList={postData.project}
        tagListTitle="Project"
        placeholder="Add one or more project tags relevant to your post"
        isEditModeOn={isEditModeOn}
        tags={tags?.filter((tag) => tag?.tagType === "project")}
        selectedValues={postData.project?.map((project: any) => project?.name)}
        updatePostData={(value) =>
          updatePostDataBasedOnKeyValue("project", value)
        }
        tagType="project"
        handleTagCreated={handleTagCreated}
      />
      {/* Organisation */}
      <TagListComponent
        tagList={postData.organisation}
        tagListTitle={
          postData?.pageType?.[0]?.name?.toLowerCase() !== "event"
            ? "Organisation"
            : "Host Organisations"
        }
        placeholder="Add one or more organisation tags relevant to your post"
        isEditModeOn={isEditModeOn}
        tags={tags?.filter((tag) => tag?.tagType === "organisation")}
        selectedValues={postData.organisation?.map(
          (organisation: any) => organisation?.name
        )}
        updatePostData={(value) =>
          updatePostDataBasedOnKeyValue("organisation", value)
        }
        tagType="organisation"
        handleTagCreated={handleTagCreated}
      />
      {/* Content related to this Info Page */}
      <MiniPagesListComponentPost
        isEditModeOn={isEditModeOn}
        internalLinks={postData.internalLinks}
        handleUpdatePostData={(value) =>
          updatePostDataBasedOnKeyValue("internalLinks", value)
        }
        title="Content related to this Page"
      />
      {/* Files */}
      {/* {postData?.pageType?.[0]?.name?.toLowerCase() !== 'project result' && ( */}
      <FilesComponent
        // files={postData.files}
        isEditModeOn={isEditModeOn}
        mediaFiles={postData.mediaFiles}
        updatePostDataBasedOnKeyValue={updatePostDataBasedOnKeyValue}
      />
      {/* )} */}
      {/* External Links */}
      {/* <ExternalLinksComponent links={postData.links} /> */}
      {/* Saving modal */}
      <Modal show={isSaveInProgress} size="md" popup dismissible={false}>
        <Modal.Header className="opacity-0" />
        <Modal.Body>
          <div className="text-center">
            Saving Page...
            <LoadingSpinner />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PostPageComponent;
