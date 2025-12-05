"use client";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import style from "./OrganisationPageComponent.module.css";
import Tag, { TagProps } from "@app/shared-components/Tag/Tag";
import Typography from "@app/shared-components/Typography/Typography";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import TagListComponent from "../shared-page-components/TagListComponent/TagListComponent";
import AffiliationsComponent from "../PersonPageComponent/components/AffiliationsComponent/AffiliationsComponent";
import FilesComponent from "../shared-page-components/FilesComponent/FilesComponent";
import { mockOrganisation } from "../../mocks/pagesMocks";
import { useRouter } from "next/navigation";
import { useAuth } from "@app/custom-hooks/AuthContext/AuthContext";
import OgImage from "@app/shared-components/OgImage";
import {
  arraysEqual,
  deepEqual,
  sanitizeTitleForSlug,
} from "../PageComponents.utils";
import {
  checkIfArrayNeedsUpdateForStrings,
  checkIfArrayNeedsUpdateForTags,
  generateUniqueHash,
} from "../PostPageComponent/PostPageComponent.utils";
import MiniPagesListComponentPost from "../shared-page-components/MiniPagesListComponentPost/MiniPagesListComponentPost";
import { Modal } from "flowbite-react";
import LoadingSpinner from "@app/shared-components/LoadingSpinner/LoadingSpinner";
import ContentComponent from "../PostPageComponent/components/ContentComponent/ContentComponent";
import { invalidateOrganisationPageCache } from "@app/utils/cache-utils";
// Builder.io imports
import {
  createBuilderOrganisationPage,
  updateBuilderOrganisationPage,
} from "@app/utils/builderInfoPageUtils";
import {
  bulkCreateAffiliations,
  bulkDeleteAffiliations,
} from "@app/utils/builderAffiliationUtils";

function OrganisationPageComponent({
  pageTitle,
  organisation,
  isNewPage,
}: any) {
  organisation = { ...mockOrganisation(pageTitle), ...organisation };
  const router = useRouter();

  // #region useAuth hook for grabbing user details and tags needed for editing
  const {
    isLoggedIn,
    userDetails,
    tags,
    tagsFetched,
    handleTagCreated,
    handleUserDataRefresh,
    postPages,
    infoPages,
    updateTag,
    appendAffiliations,
    removeAffiliations,
  } = useAuth();

  const [isPageOwnedByUser, setIsPageOwnedByUser] = useState(false);
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  // #endregion

  // #region check if page is owned by user
  useEffect(() => {
    if (!isLoggedIn || !tagsFetched) return;

    // #region Check PageOwner property from Wix Data, hardcoding ownership
    const permissionCondition =
      organisationData.pageOwner?.length > 0 &&
      !!userDetails?.userTag?.name &&
      !!organisationData.pageOwner?.find(
        (owner: any) => owner?._id === userDetails?.userTag?._id
      );

    // console.log('debug1->permissionCondition', permissionCondition);
    //console.log('debug1->organisationData.pageOwner' + JSON.stringify(organisationData));

    if (permissionCondition) {
      setIsPageOwnedByUser(true);
      return;
    }
    // #endregion

    const userDetailsIds = userDetails?.accountId
      ? [userDetails.contactId, userDetails.accountId]
      : [userDetails.contactId];
    userDetailsIds.find((id) => {
      if (organisation?.data?._owner === id) {
        setIsPageOwnedByUser(true);
      }
    });
    if (isNewPage && isLoggedIn) {
      setIsPageOwnedByUser(true);
      setIsEditModeOn(true);
    }
  }, [isLoggedIn, tagsFetched, userDetails?.userTag]);
  // #endregion

  // #region Handle affiliations
  console.log(
    "debug111->person.affiliationsItems",
    organisation?.affiliationsItems
  );

  const projects = organisation?.affiliationsItems
    ?.filter((item: any) => item?.extraIdentifier === "projectOrganisationRole")
    .map((item: any) => {
      return {
        ...item?.projectTag,
        arole: item?.role,
      };
    })
    .filter(
      (projectTag: any, index: number, self: any[]) =>
        index ===
        self.findIndex(
          (pt) => pt.name === projectTag.name && pt.arole === projectTag.arole
        )
    );

  const people = organisation?.affiliationsItems
    ?.filter((item: any) => item?.extraIdentifier === "current")
    .map((item: any) => {
      return {
        ...item?.personTag,
        arole: item?.role,
      };
    })
    .filter(
      (projectTag: any, index: number, self: any[]) =>
        index ===
        self.findIndex(
          (pt) => pt.name === projectTag.name && pt.arole === projectTag.arole
        )
    );

  // #endregion

  organisation = {
    ...organisation,
    title: organisation?.data?.title, // done
    pageType: organisation?.data?.pageTypes[0],
    registrationDate: organisation?.data?._createdDate["$date"], //done - system field
    organisationTag: organisation?.data?.organisation[0], //done
    organisationEstablishedDate:
      organisation?.data?.organisationEstablishedDate, //done
    // activity: organisation?.data?.activity, //not needed
    organisationType: organisation?.data?.organisationType, //done
    countryTag: organisation?.data?.countryTag[0], //done
    description: organisation?.data?.description, //done
    methods: organisation?.data?.methods, //done
    domains: organisation?.data?.domains, //done
    contentText: [
      organisation?.data?.postContentRIch1 || organisation?.data?.description,
      organisation?.data?.postContentRIch2,
      organisation?.data?.postContentRIch3,
      organisation?.data?.postContentRIch4,
      organisation?.data?.postContentRIch5,
      organisation?.data?.postContentRIch6,
      organisation?.data?.postContentRIch7,
      organisation?.data?.postContentRIch8,
      organisation?.data?.postContentRIch9,
      organisation?.data?.postContentRIch10,
    ],
    contentImages: [
      organisation?.data?.postImage1,
      organisation?.data?.postImage2,
      organisation?.data?.postImage3,
      organisation?.data?.postImage4,
      organisation?.data?.postImage5,
      organisation?.data?.postImage6,
      organisation?.data?.postImage7,
      organisation?.data?.postImage8,
      organisation?.data?.postImage9,
      organisation?.data?.postImage10,
    ],
    // projects: organisation?.data?.organisationProjectRoles?.map((item: any) => {
    //   return {
    //     ...organisation?.data?.organisationProject?.find(
    //       (org: any) => org?.name === item?.project
    //     ),
    //     arole: item?.role,
    //   };
    // }), //done
    projects: projects,
    // people: organisation?.data?.organisationPeopleRoles?.map((item: any) => {
    //   return {
    //     ...organisation?.data?.organisationPeople?.find(
    //       (org: any) => org?.name === item?.person
    //     ),
    //     arole: item?.role,
    //   };
    // }), //done
    people: people,
    memberOrganisations: organisation?.data?.organisationHasMember,
    memberOfOrganisations: organisation?.data?.organisationMemberOf,
    mediaFiles: organisation?.data?.mediaFiles,
    linkedinLink: organisation?.data?.linkedinLink,
    websiteLink: organisation?.data?.websiteLink,
    slug: organisation?.data?.slug,
    pageOwner: organisation?.data?.pageOwner,
  };

  // #region set default post data and data for editing
  const [defaultOrganisationData, setDefaultOrganisationData] =
    useState(organisation);
  const [organisationData, setOrganisationData] = useState(organisation);
  // #endregion

  // #region Methods for updating person data
  const updateOrganisationData = (newData: any) => {
    setOrganisationData((prevData: any) => ({ ...prevData, ...newData }));
  };

  const updateOrganisationDataOnKeyValue = (key: string, value: any) => {
    setOrganisationData((prevData: any) => ({ ...prevData, [key]: value }));
  };
  // #endregion

  // #region validation state
  const [validationState, setValidationState] = useState({
    title: "",
    subtitle: "",
  });

  const updateValidationState = (newData: any) => {
    setValidationState((prevData: any) => ({ ...prevData, ...newData }));
  };

  const checkValidationErrors = () => {
    return Object.values(validationState).some((error) => error);
  };

  // #endregion

  // #region handle updating data to server
  const [isSaveInProgress, setIsSaveInProgress] = useState(false);

  const updateDataToServer = async () => {
    console.log("[Builder.io] Updating Organisation Page:", organisation.id);
    setIsSaveInProgress(true);

    try {
      // #region Update Organisation Tag in Builder.io if changed
      if (
        !deepEqual(
          organisationData.organisationTag,
          defaultOrganisationData.organisationTag
        )
      ) {
        console.log("[Builder.io] Organisation tag has changed, updating...");
        const tagUpdateResponse = await fetch(
          `/api/builder/tag/${organisationData.organisationTag._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: organisationData.organisationTag.name,
              data: {
                name: organisationData.organisationTag.name,
                tagType: organisationData.organisationTag.tagType,
                picture: organisationData.organisationTag.picture,
                tagLine: organisationData.organisationTag.tagLine,
                tagPageLink: organisationData.organisationTag.tagPageLink,
              },
            }),
          }
        );
        if (tagUpdateResponse.ok) {
          const updatedTagData = await tagUpdateResponse.json();
          console.log("[Builder.io] Organisation tag updated:", updatedTagData);
          // Update local state to reflect the change
          updateTag(organisationData.organisationTag);
        } else {
          console.error("[Builder.io] Failed to update organisation tag");
        }
      }
      // #endregion

      // #region Update organisation page in Builder.io
      await updateBuilderOrganisationPage(
        organisation.id,
        organisationData,
        organisationData.contentText,
        organisationData.contentImages
      );
      console.log("[Builder.io] Organisation page updated successfully");
      // #endregion

      // #region Update project affiliations in Builder.io
      if (
        checkIfArrayNeedsUpdateForTags(
          organisationData.projects,
          defaultOrganisationData.projects
        )
      ) {
        console.log("[Builder.io] Updating project affiliations...");

        // Delete old project affiliations
        const oldProjectAffiliations = organisation?.affiliationsItems?.filter(
          (item: any) => item?.extraIdentifier === "projectOrganisationRole"
        );
        if (oldProjectAffiliations && oldProjectAffiliations.length > 0) {
          const deleteResult = await bulkDeleteAffiliations(
            oldProjectAffiliations.map((item: any) => item._id)
          );
          console.log(
            "[Builder.io] Deleted old project affiliations:",
            deleteResult
          );
          // Update React state
          if (deleteResult.deleted?.length > 0) {
            removeAffiliations(deleteResult.deleted);
          }
        }

        // Create new project affiliations
        if (organisationData.projects?.length > 0) {
          const newProjectAffiliations = organisationData.projects
            .filter((item: any) => item?.name && item.name !== "")
            .map((item: any) => ({
              projectTag: { _id: item._id, name: item.name },
              organisationTag: {
                _id: organisationData.organisationTag._id,
                name: organisationData.organisationTag.name,
              },
              role: item.arole || "",
              extraIdentifier: "projectOrganisationRole",
            }));

          if (newProjectAffiliations.length > 0) {
            const createResult = await bulkCreateAffiliations(
              newProjectAffiliations
            );
            console.log(
              "[Builder.io] Created new project affiliations:",
              createResult
            );
            // Update React state
            if (createResult.created?.length > 0) {
              appendAffiliations(createResult.created);
            }
          }
        }
      }
      // #endregion

      // #region Update people affiliations in Builder.io
      if (
        checkIfArrayNeedsUpdateForTags(
          organisationData.people,
          defaultOrganisationData.people
        )
      ) {
        console.log("[Builder.io] Updating people affiliations...");

        // Delete old people affiliations
        const oldPeopleAffiliations = organisation?.affiliationsItems?.filter(
          (item: any) => item?.extraIdentifier === "current"
        );
        if (oldPeopleAffiliations && oldPeopleAffiliations.length > 0) {
          const deleteResult = await bulkDeleteAffiliations(
            oldPeopleAffiliations.map((item: any) => item._id)
          );
          console.log(
            "[Builder.io] Deleted old people affiliations:",
            deleteResult
          );
          // Update React state
          if (deleteResult.deleted?.length > 0) {
            removeAffiliations(deleteResult.deleted);
          }
        }

        // Create new people affiliations
        if (organisationData.people?.length > 0) {
          const newPeopleAffiliations = organisationData.people
            .filter((item: any) => item?.name && item.name !== "")
            .map((item: any) => ({
              projectTag: {
                _id: organisationData.organisationTag._id,
                name: organisationData.organisationTag.name,
              },
              personTag: { _id: item._id, name: item.name },
              organisationTag: {
                _id: organisationData.organisationTag._id,
                name: organisationData.organisationTag.name,
              },
              role: item.arole || "",
              extraIdentifier: "current",
            }));

          if (newPeopleAffiliations.length > 0) {
            const createResult = await bulkCreateAffiliations(
              newPeopleAffiliations
            );
            console.log(
              "[Builder.io] Created new people affiliations:",
              createResult
            );
            // Update React state
            if (createResult.created?.length > 0) {
              appendAffiliations(createResult.created);
            }
          }
        }
      }
      // #endregion

      // Invalidate cache for the organisation page
      await invalidateOrganisationPageCache(organisationData.slug);
      console.log("[Builder.io] Organisation page save completed");
    } catch (error) {
      console.error("[Builder.io] Error updating organisation page:", error);
    }

    setIsSaveInProgress(false);
  };
  // #endregion

  // #region handleProjectInternalLinks
  // console.log('postPages', postPages);
  const internalLinks = postPages
    ?.filter((page) => {
      return page?.data?.organisations?.find(
        (item: TagProps) =>
          item?.name === organisationData?.organisationTag?.name
      );
    })
    ?.map((link) => link?.data);
  console.log("internalLinks", internalLinks);
  // #endregion

  // #region handle save or create new page
  const createNewOrganisationPage = async () => {
    console.log("[Builder.io] Creating New Organisation Info Page");
    setIsSaveInProgress(true);

    try {
      // Generate unique slug
      const newSlug =
        sanitizeTitleForSlug(organisationData?.organisationTag?.name) +
        "-" +
        generateUniqueHash();

      // Get user tag for author/pageOwner
      const userTag = tags.find((tag) => tag.name === userDetails?.userName);

      // Prepare organisation data with all references
      const organisationDataForBuilder = {
        ...organisationData,
        slug: `/organisation/${newSlug}`,
        author: userTag ? [userTag] : [],
        pageOwner: userTag ? [userTag] : [],
      };

      // Create organisation page in Builder.io
      const newOrganisationInfo = await createBuilderOrganisationPage(
        organisationDataForBuilder,
        organisationData.contentText,
        organisationData.contentImages
      );

      const newOrganisationInfoId = newOrganisationInfo?.id;
      const newOrganisationInfoSlug = newSlug;

      console.log("[Builder.io] Organisation page created:", {
        id: newOrganisationInfoId,
        slug: newOrganisationInfoSlug,
      });

      // #region Update Organisation Tag with tagPageLink in Builder.io
      if (organisationData?.organisationTag?._id) {
        console.log(
          "[Builder.io] Updating organisation tag with tagPageLink..."
        );
        const tagUpdateResponse = await fetch(
          `/api/builder/tag/${organisationData.organisationTag._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: organisationData.organisationTag.name,
              data: {
                name: organisationData.organisationTag.name,
                tagType: organisationData.organisationTag.tagType,
                picture: organisationData.organisationTag.picture,
                tagLine: organisationData.organisationTag.tagLine,
                tagPageLink: "/organisation/" + newOrganisationInfoSlug,
              },
            }),
          }
        );
        if (tagUpdateResponse.ok) {
          const updatedTagData = await tagUpdateResponse.json();
          console.log(
            "[Builder.io] Organisation tag updated with tagPageLink:",
            updatedTagData
          );
          // Update local state
          updateTag({
            ...organisationData.organisationTag,
            tagPageLink: "/organisation/" + newOrganisationInfoSlug,
          });
        } else {
          console.error("[Builder.io] Failed to update organisation tag");
        }
      }
      // #endregion

      // #region Create Project Affiliations in Builder.io
      if (organisationData.projects?.length > 0) {
        console.log("[Builder.io] Creating project affiliations...");
        const newProjectAffiliations = organisationData.projects
          .filter((item: any) => item?.name && item.name !== "")
          .map((item: any) => ({
            projectTag: { _id: item._id, name: item.name },
            organisationTag: {
              _id: organisationData.organisationTag._id,
              name: organisationData.organisationTag.name,
            },
            role: item.arole || "",
            extraIdentifier: "projectOrganisationRole",
          }));

        if (newProjectAffiliations.length > 0) {
          const createResult = await bulkCreateAffiliations(
            newProjectAffiliations
          );
          console.log(
            "[Builder.io] Created project affiliations:",
            createResult
          );
          // Update React state
          if (createResult.created?.length > 0) {
            appendAffiliations(createResult.created);
          }
        }
      }
      // #endregion

      // #region Create People Affiliations in Builder.io
      if (organisationData.people?.length > 0) {
        console.log("[Builder.io] Creating people affiliations...");
        const newPeopleAffiliations = organisationData.people
          .filter((item: any) => item?.name && item.name !== "")
          .map((item: any) => ({
            projectTag: {
              _id: organisationData.organisationTag._id,
              name: organisationData.organisationTag.name,
            },
            personTag: { _id: item._id, name: item.name },
            organisationTag: {
              _id: organisationData.organisationTag._id,
              name: organisationData.organisationTag.name,
            },
            role: item.arole || "",
            extraIdentifier: "current",
          }));

        if (newPeopleAffiliations.length > 0) {
          const createResult = await bulkCreateAffiliations(
            newPeopleAffiliations
          );
          console.log(
            "[Builder.io] Created people affiliations:",
            createResult
          );
          // Update React state
          if (createResult.created?.length > 0) {
            appendAffiliations(createResult.created);
          }
        }
      }
      // #endregion

      // #region Refresh and redirect
      handleUserDataRefresh();
      await invalidateOrganisationPageCache(newOrganisationInfoSlug);
      router.push(`/organisation/${newOrganisationInfoSlug}`);
      // #endregion

      console.log("[Builder.io] Organisation page creation completed");
    } catch (error) {
      console.error("[Builder.io] Error creating organisation page:", error);
    }

    setIsSaveInProgress(false);
  };

  const saveOrCreateHandler = isNewPage
    ? createNewOrganisationPage
    : updateDataToServer;
  // #endregion

  // #region handle for when the page is newly created by associatig the pageType tag
  useEffect(() => {
    if (isLoggedIn && organisationData && isNewPage) {
      // const personTag = tags.find((tag) => tag.name === userDetails?.userName);
      // console.log('debug1->personTag', personTag);
      // if (personTag) {
      //   updatePersonDataOnKeyValue('personTag', personTag);
      // }
      const organisationInfoTag = tags.find(
        (tag) => tag.name === "organisation info"
      );
      // console.log('debug1->projectInfoTag', organisationInfoTag);
      if (organisationInfoTag) {
        updateOrganisationDataOnKeyValue("pageType", organisationInfoTag);
      }
    }
  }, [userDetails, tags]);

  // NOTE: Removed handleTagCreated() on mount to prevent full Redis cache invalidation
  // This was causing performance issues - tags should be updated individually via updateTag()

  // Save required fields

  const checkRequiredFields = () => {
    // Check if essential fields are filled
    return (
      !organisationData?.organisationTag?.name ||
      organisationData?.organisationTag?.name.trim().length < 2 ||
      !organisationData?.countryTag ||
      !organisationData?.countryTag?._id
    );
  };

  return (
    <div className={classNames(style.personContainer)}>
      {!isNewPage && (
        <OgImage
          primaryImage={organisationData.organisationTag?.picture}
          secondaryImage={"https://futures4europe.eu/images/placeholder.webp"}
          title={organisationData.title}
          description={organisationData.description}
          url={`https://futures4europe.eu/organisation/${organisationData.slug}`}
        />
      )}

      {/*  Edit buttons */}
      {isPageOwnedByUser && (
        <div className="flex justify-between">
          {/* // Updated save button to be disabled when required fields aren't filled */}
          <button
            onClick={() => {
              isEditModeOn && saveOrCreateHandler();
              setIsEditModeOn(!isEditModeOn);
              setDefaultOrganisationData(organisationData);
            }}
            disabled={
              isEditModeOn && (checkValidationErrors() || checkRequiredFields())
            }
            className={classNames(
              "btn btn-save",
              isEditModeOn &&
                (checkValidationErrors() || checkRequiredFields()) &&
                "bg-gray-400"
            )}
          >
            {!isEditModeOn
              ? "Edit Page"
              : isNewPage
              ? "Publish Page"
              : "Save&Publish Changes"}
          </button>
          {isEditModeOn && (
            <button
              onClick={() => {
                setOrganisationData(defaultOrganisationData);
                setIsEditModeOn(!isEditModeOn);
                isNewPage && router.push(`/dashboard/organisations`);
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
      <div className={classNames("py-3", style.preHeader)}>
        <Tag {...organisationData.pageType} />
        {/* Timestamp */}
        <section className="post-meta">
          <Typography tag="p" className="text-sm text-gray-400">
            {new Date(organisationData.registrationDate).toLocaleString()}
          </Typography>
          {/* Additional meta content */}
        </section>
      </div>
      {/* Organisation Header */}
      <HeaderComponent
        organisation={organisationData}
        isEditModeOn={isEditModeOn}
        tags={tags}
        updateOrganisationData={updateOrganisationData}
        updateOrganisationDataOnKeyValue={updateOrganisationDataOnKeyValue}
        isNewPage={isNewPage}
        handleTagCreated={handleTagCreated}
        setValidationState={updateValidationState}
        requiredFields={["name", "country"]} // Add this new prop
      />
      {/* Organisation Description */}
      {/* <PersonDescriptionComponent
        placeholder="Type or paste a short description"
        description={organisationData.description}
        isEditModeOn={isEditModeOn}
        handleUpdate={(value) =>
          updateOrganisationDataOnKeyValue('description', value)
        }
      /> */}
      <ContentComponent
        contentText={organisationData.contentText}
        contentImages={organisationData.contentImages}
        isEditModeOn={isEditModeOn}
        updatePostDataContent={(value, index) => {
          const newContentText = [...organisationData.contentText];
          newContentText[index] = value;
          return updateOrganisationData({
            contentText: newContentText,
          });
        }}
        updatePostDataContentImages={(value, index) => {
          const newContentImages = [...organisationData.contentImages];
          newContentImages[index] = value;
          return updateOrganisationData({
            contentImages: newContentImages,
          });
        }}
      />
      {/* People */}
      <AffiliationsComponent
        placeholderRole="Role"
        placeholderTag="Add one or more person tags"
        afiliations={organisationData.people}
        tagListTitle="Affiliates"
        isEditModeOn={isEditModeOn}
        updatePersonDataAffiliations={(value) =>
          updateOrganisationDataOnKeyValue("people", value)
        }
        tags={tags?.filter((tag) => tag?.tagType === "person")}
        handleTagCreated={handleTagCreated}
        tagType="person"
      />
      {/* Foresight Methods */}
      <TagListComponent
        placeholder="Add one or more foresight method tags"
        tagList={organisationData.methods}
        tagListTitle="Foresight Methods"
        isEditModeOn={isEditModeOn}
        tags={tags?.filter((tag) => tag?.tagType === "foresight method")}
        selectedValues={organisationData.methods?.map(
          (method: any) => method?.name
        )}
        updatePostData={(value) =>
          updateOrganisationDataOnKeyValue("methods", value)
        }
        tagType="foresight method"
        handleTagCreated={handleTagCreated}
      />
      {/* Domains */}
      <TagListComponent
        placeholder="Add one or more domain tags"
        tagList={organisationData.domains}
        tagListTitle="Domains"
        isEditModeOn={isEditModeOn}
        tags={tags?.filter((tag) => tag?.tagType === "domain")}
        selectedValues={organisationData.domains?.map(
          (domain: any) => domain?.name
        )}
        updatePostData={(value) =>
          updateOrganisationDataOnKeyValue("domains", value)
        }
        tagType="domain"
        handleTagCreated={handleTagCreated}
      />
      {/* Projects */}
      <AffiliationsComponent
        placeholderRole="Role"
        placeholderTag="Add one or more project tags (that the organisation is/was involved into)"
        afiliations={organisationData.projects}
        tagListTitle="Projects"
        isEditModeOn={isEditModeOn}
        updatePersonDataAffiliations={(value) =>
          updateOrganisationDataOnKeyValue("projects", value)
        }
        tags={tags?.filter((tag) => tag?.tagType === "project")}
        handleTagCreated={handleTagCreated}
        tagType="project"
      />
      {/* Member Organisations */}
      <TagListComponent
        placeholder="Add one or more organisation tags (affiliated to this one)"
        tagList={organisationData.memberOrganisations}
        tagListTitle="Members"
        isEditModeOn={isEditModeOn}
        tags={tags?.filter((tag) => tag?.tagType === "organisation")}
        selectedValues={organisationData.memberOrganisations?.map(
          (domain: any) => domain?.name
        )}
        updatePostData={(value) =>
          updateOrganisationDataOnKeyValue("memberOrganisations", value)
        }
        tagType="organisation"
        handleTagCreated={handleTagCreated}
      />
      {/* Member of Organisations */}
      <TagListComponent
        placeholder="Add one or more organisation tags (that this one is affiliated to)"
        tagList={organisationData.memberOfOrganisations}
        tagListTitle="Member of"
        isEditModeOn={isEditModeOn}
        tags={tags?.filter((tag) => tag?.tagType === "organisation")}
        selectedValues={organisationData.memberOfOrganisations?.map(
          (domain: any) => domain?.name
        )}
        updatePostData={(value) =>
          updateOrganisationDataOnKeyValue("memberOfOrganisations", value)
        }
        tagType="organisation"
        handleTagCreated={handleTagCreated}
      />
      {/* Content related to this Info Page */}
      <MiniPagesListComponentPost
        internalLinks={internalLinks}
        isEditModeOn={isEditModeOn}
        title="Content related to this Organisation"
        handleUpdatePostData={(value) =>
          updateOrganisationDataOnKeyValue("internalLinks", value)
        }
      />
      {/* Files */}
      <FilesComponent
        isEditModeOn={isEditModeOn}
        mediaFiles={organisationData.mediaFiles}
        updatePostDataBasedOnKeyValue={updateOrganisationDataOnKeyValue}
      />
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

export default OrganisationPageComponent;
