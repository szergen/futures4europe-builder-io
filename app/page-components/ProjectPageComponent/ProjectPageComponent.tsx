"use client";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import style from "./ProjectPageComponent.module.css";
import Tag, { TagProps } from "@app/shared-components/Tag/Tag";
import Typography from "@app/shared-components/Typography/Typography";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import TagListComponent from "../shared-page-components/TagListComponent/TagListComponent";
import AffiliationsComponent from "../PersonPageComponent/components/AffiliationsComponent/AffiliationsComponent";
import FilesComponent from "../shared-page-components/FilesComponent/FilesComponent";
import { mockProject } from "../../mocks/pagesMocks";
import { useRouter } from "next/navigation";
import { useAuth } from "@app/custom-hooks/AuthContext/AuthContext";
import OgImage from "@app/shared-components/OgImage";
import {
  // arraysEqual,
  deepEqual,
  sanitizeTitleForSlug,
} from "../PageComponents.utils";
import {
  // checkIfArrayNeedsUpdateForStrings,
  checkIfArrayNeedsUpdateForTags,
  generateUniqueHash,
} from "../PostPageComponent/PostPageComponent.utils";
import MiniPagesListComponentPost from "../shared-page-components/MiniPagesListComponentPost/MiniPagesListComponentPost";
import { Modal } from "flowbite-react";
import LoadingSpinner from "@app/shared-components/LoadingSpinner/LoadingSpinner";
import ContentComponent from "../PostPageComponent/components/ContentComponent/ContentComponent";
import { invalidateProjectPageCache } from "@app/utils/cache-utils";
import {
  createBuilderProjectPage,
  updateBuilderProjectPage,
} from "@app/utils/builderInfoPageUtils";
import {
  bulkCreateAffiliations,
  bulkDeleteAffiliations,
} from "@app/utils/builderAffiliationUtils";

function ProjectPageComponent({ pageTitle, project, isNewPage }: any) {
  project = { ...mockProject(pageTitle), ...project };
  // console.log("debug2->project", project);

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
      projectData.pageOwner?.length > 0 &&
      !!userDetails?.userTag?.name &&
      !!projectData.pageOwner?.find(
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
      if (project?.data?._owner === id) {
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
  // console.log('debug111->project', project?.data);

  const projectsCoordindation = project?.affiliationsItems
    ?.filter((item: any) => item?.extraIdentifier === "coordination")
    .map((item: any) => item?.personTag)
    .filter(
      (projectTag: any, index: number, self: any[]) =>
        index === self.findIndex((pt) => pt?.name === projectTag?.name)
    );

  const projectsParticipation = project?.affiliationsItems
    ?.filter((item: any) => item?.extraIdentifier === "participation")
    .map((item: any) => item?.personTag)
    .filter(
      (projectTag: any, index: number, self: any[]) =>
        index === self.findIndex((pt) => pt?.name === projectTag?.name)
    );
  // console.log("debug111->projectsParticipation", projectsParticipation);

  const organisations = project?.affiliationsItems
    ?.filter((item: any) => item?.extraIdentifier === "projectOrganisationRole")
    .map((item: any) => {
      return {
        ...item?.organisationTag,
        arole: item?.role,
      };
    })
    .filter(
      (projectTag: any, index: number, self: any[]) =>
        index ===
        self.findIndex(
          (pt) => pt?.name === projectTag?.name && pt?.role === projectTag?.role
        )
    );

  // #endregion

  // #region Overwrite mock data with Wix data
  project = {
    ...project,
    pageType: project?.data?.pageTypes[0],
    pageTypes: project?.data?.pageTypes[0],
    updatedDate: project?.data?._updatedDate, //done - system field
    projectTag: project?.data?.Project[0], //done
    description: project?.data?.description, //done
    contentText: [
      project?.data?.postContentRIch1,
      project?.data?.postContentRIch2,
      project?.data?.postContentRIch3,
      project?.data?.postContentRIch4,
      project?.data?.postContentRIch5,
      project?.data?.postContentRIch6,
      project?.data?.postContentRIch7,
      project?.data?.postContentRIch8,
      project?.data?.postContentRIch9,
      project?.data?.postContentRIch10,
    ],
    contentImages: [
      project?.data?.postImage1,
      project?.data?.postImage2,
      project?.data?.postImage3,
      project?.data?.postImage4,
      project?.data?.postImage5,
      project?.data?.postImage6,
      project?.data?.postImage7,
      project?.data?.postImage8,
      project?.data?.postImage9,
      project?.data?.postImage10,
    ],
    countryTag: project?.data?.countryTag[0], //done
    projectFunded: project?.data?.projectFunded[0], //done
    projectStartDate: project?.data?.projectStartDate, //done
    projectEndDate: project?.data?.projectEndDate, //done
    methods: project?.data?.methods, //done
    domains: project?.data?.domains, //done
    // coordinators: project?.data?.projectCoordinator, //done
    coordinators:
      projectsCoordindation?.length > 0
        ? projectsCoordindation
        : project?.data?.projectCoordinator || [], //done
    // participants: project?.data?.projectParticipantTeam, //done
    participants:
      projectsParticipation?.length > 0
        ? projectsParticipation
        : project?.data?.projectParticipantTeam || [], //done
    // organisations: project?.data?.projectOrganisationRoles?.map((item: any) => {
    //   return {
    //     ...project?.data?.projectOrganisation?.find(
    //       (org: any) => org?.name === item?.organisation
    //     ),
    //     arole: item?.role,
    //   }; //done
    // }), //done
    organisations: organisations,
    registrationDate: project?.data?._createdDate["$date"], //done-system field
    mediaFiles: project?.data?.mediaFiles, //done
    linkedinLink: project?.data?.linkedinLink,
    websiteLink: project?.data?.websiteLink,
    slug: project?.data?.slug, //done
    pageOwner: project?.data?.pageOwner, //done
  };
  // #endregion

  // #region set default post data and data for editing
  const [defaultProjectData, setDefaultProjectData] = useState(project);
  const [projectData, setProjectData] = useState(project);
  // #endregion

  // #region Methods for updating person data
  const updateProjectnData = (newData: any) => {
    setProjectData((prevData: any) => ({ ...prevData, ...newData }));
  };

  const updateProjectDataOnKeyValue = (key: string, value: any) => {
    setProjectData((prevData: any) => ({ ...prevData, [key]: value }));
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
    console.log("[Builder.io] Updating Project Page:", project.id);
    setIsSaveInProgress(true);

    try {
      // Update project tag if name has changed
      if (
        !deepEqual(projectData.projectTag, defaultProjectData.projectTag) &&
        projectData.projectTag?._id
      ) {
        console.log("[Builder.io] Updating project tag");
        try {
          const tagUpdateResponse = await fetch(
            `/api/builder/tag/${projectData.projectTag._id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: projectData.projectTag.name,
                tagLine: projectData.projectTag.tagLine,
                picture: projectData.projectTag.picture,
              }),
            }
          );
          if (tagUpdateResponse.ok) {
            console.log("[Builder.io] Project tag updated in Builder.io");
            // OPTIMIZATION: Update tag in AuthContext state (no full refetch)
            updateTag(projectData.projectTag);
          } else {
            console.warn("[Builder.io] Failed to update project tag");
          }
        } catch (tagError) {
          console.warn("[Builder.io] Tag update failed:", tagError);
        }
      }

      // Update info-page in Builder.io
      const result = await updateBuilderProjectPage(
        project.id,
        projectData,
        projectData.contentText || [],
        projectData.contentImages || []
      );
      console.log("[Builder.io] Project page updated:", result.id);

      // Handle organisation affiliations (delete old, create new)
      if (
        checkIfArrayNeedsUpdateForTags(
          projectData.organisations,
          defaultProjectData.organisations
        )
      ) {
        console.log("[Builder.io] Updating organisation affiliations");
        const oldOrgAffiliations = project?.affiliationsItems?.filter(
          (item: any) => item?.extraIdentifier === "projectOrganisationRole"
        );
        if (oldOrgAffiliations?.length > 0) {
          const deleteResult = await bulkDeleteAffiliations(
            oldOrgAffiliations.map((item: any) => item._id)
          );
          // Update React state
          if (deleteResult.deleted?.length > 0) {
            removeAffiliations(deleteResult.deleted);
          }
        }
        if (projectData.organisations?.length > 0) {
          const orgAffiliations = projectData.organisations
            .filter((item: any) => item?._id && item?.name)
            .map((item: any) => ({
              projectTag: projectData.projectTag,
              organisationTag: item,
              role: item.arole || "",
              extraIdentifier: "projectOrganisationRole",
            }));
          if (orgAffiliations.length > 0) {
            const createResult = await bulkCreateAffiliations(orgAffiliations);
            // Update React state
            if (createResult.created?.length > 0) {
              appendAffiliations(createResult.created);
            }
          }
        }
      }

      // Handle coordinator affiliations (delete old, create new)
      if (
        checkIfArrayNeedsUpdateForTags(
          projectData.coordinators,
          defaultProjectData.coordinators
        )
      ) {
        console.log("[Builder.io] Updating coordinator affiliations");
        const oldCoordAffiliations = project?.affiliationsItems?.filter(
          (item: any) => item?.extraIdentifier === "coordination"
        );
        if (oldCoordAffiliations?.length > 0) {
          const deleteResult = await bulkDeleteAffiliations(
            oldCoordAffiliations.map((item: any) => item._id)
          );
          // Update React state
          if (deleteResult.deleted?.length > 0) {
            removeAffiliations(deleteResult.deleted);
          }
        }
        if (projectData.coordinators?.length > 0) {
          const coordAffiliations = projectData.coordinators
            .filter((item: any) => item?._id && projectData.projectTag?.name)
            .map((item: any) => ({
              projectTag: projectData.projectTag,
              personTag: item,
              extraIdentifier: "coordination",
            }));
          if (coordAffiliations.length > 0) {
            const createResult = await bulkCreateAffiliations(
              coordAffiliations
            );
            // Update React state
            if (createResult.created?.length > 0) {
              appendAffiliations(createResult.created);
            }
          }
        }
      }

      // Handle participant affiliations (delete old, create new)
      if (
        checkIfArrayNeedsUpdateForTags(
          projectData.participants,
          defaultProjectData.participants
        )
      ) {
        console.log("[Builder.io] Updating participant affiliations");
        const oldPartAffiliations = project?.affiliationsItems?.filter(
          (item: any) => item?.extraIdentifier === "participation"
        );
        if (oldPartAffiliations?.length > 0) {
          const deleteResult = await bulkDeleteAffiliations(
            oldPartAffiliations.map((item: any) => item._id)
          );
          // Update React state
          if (deleteResult.deleted?.length > 0) {
            removeAffiliations(deleteResult.deleted);
          }
        }
        if (projectData.participants?.length > 0) {
          const partAffiliations = projectData.participants
            .filter((item: any) => item?._id && projectData.projectTag?.name)
            .map((item: any) => ({
              projectTag: projectData.projectTag,
              personTag: item,
              extraIdentifier: "participation",
            }));
          if (partAffiliations.length > 0) {
            const createResult = await bulkCreateAffiliations(partAffiliations);
            // Update React state
            if (createResult.created?.length > 0) {
              appendAffiliations(createResult.created);
            }
          }
        }
      }

      // Invalidate cache
      const slugWithoutPrefix =
        projectData.slug?.replace("/project/", "") || projectData.slug;
      await invalidateProjectPageCache(slugWithoutPrefix);
      console.log("[Builder.io] Project page save complete");
    } catch (error) {
      console.error("[Builder.io] Error updating project page:", error);
      alert("Failed to save changes. Please try again.");
    } finally {
      setIsSaveInProgress(false);
    }
  };
  // #endregion

  // #region handleProjectInternalLinks
  // console.log('postPages', postPages);
  const internalLinks = postPages
    ?.filter((page) => {
      return page?.data?.projects?.find(
        (item: TagProps) => item?.name === projectData?.projectTag?.name
      );
    })
    ?.map((link) => link?.data);
  console.log("internalLinks", internalLinks);
  // #endregion

  // #region handle save or create new page
  const createNewProjectPage = async () => {
    console.log("[Builder.io] Creating New Project Info Page");
    setIsSaveInProgress(true);

    try {
      // Generate unique slug
      const newSlug =
        "/project/" +
        sanitizeTitleForSlug(projectData?.projectTag?.name) +
        "-" +
        generateUniqueHash();

      // Get user tag for author/pageOwner
      const userTag = tags.find((tag) => tag.name === userDetails?.userName);

      // Prepare project data with all required fields
      const builderProjectData = {
        ...projectData,
        slug: newSlug,
        author: userTag ? [userTag] : [],
        pageOwner: userTag ? [userTag] : [],
      };

      // Create info-page in Builder.io
      const result = await createBuilderProjectPage(
        builderProjectData,
        projectData.contentText || [],
        projectData.contentImages || []
      );

      console.log("[Builder.io] Project page created:", result.id);

      // Update project tag's tagPageLink to point to the new page
      if (projectData.projectTag?._id) {
        try {
          const tagUpdateResponse = await fetch(
            `/api/builder/tag/${projectData.projectTag._id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                tagPageLink: newSlug,
              }),
            }
          );
          if (tagUpdateResponse.ok) {
            console.log("[Builder.io] Project tag updated with tagPageLink");
          } else {
            console.warn("[Builder.io] Failed to update project tag");
          }
        } catch (tagError) {
          console.warn("[Builder.io] Tag update failed:", tagError);
          // Continue - page was created successfully
        }
      }

      // Create affiliations for coordinators
      if (projectData.coordinators?.length > 0) {
        const coordinatorAffiliations = projectData.coordinators
          .filter((item: any) => item?._id && projectData.projectTag?.name)
          .map((item: any) => ({
            projectTag: projectData.projectTag,
            personTag: item,
            extraIdentifier: "coordination",
          }));
        if (coordinatorAffiliations.length > 0) {
          const coordResult = await bulkCreateAffiliations(
            coordinatorAffiliations
          );
          console.log(
            "[Builder.io] Coordinator affiliations created:",
            coordResult.created.length
          );
          // Update React state
          if (coordResult.created?.length > 0) {
            appendAffiliations(coordResult.created);
          }
        }
      }

      // Create affiliations for participants
      if (projectData.participants?.length > 0) {
        const participantAffiliations = projectData.participants
          .filter((item: any) => item?._id && projectData.projectTag?.name)
          .map((item: any) => ({
            projectTag: projectData.projectTag,
            personTag: item,
            extraIdentifier: "participation",
          }));
        if (participantAffiliations.length > 0) {
          const partResult = await bulkCreateAffiliations(
            participantAffiliations
          );
          console.log(
            "[Builder.io] Participant affiliations created:",
            partResult.created.length
          );
          // Update React state
          if (partResult.created?.length > 0) {
            appendAffiliations(partResult.created);
          }
        }
      }

      // Create affiliations for organisations
      if (projectData.organisations?.length > 0) {
        const orgAffiliations = projectData.organisations
          .filter((item: any) => item?._id && projectData.projectTag?.name)
          .map((item: any) => ({
            projectTag: projectData.projectTag,
            organisationTag: item,
            role: item.arole || "",
            extraIdentifier: "projectOrganisationRole",
          }));
        if (orgAffiliations.length > 0) {
          const orgResult = await bulkCreateAffiliations(orgAffiliations);
          console.log(
            "[Builder.io] Organisation affiliations created:",
            orgResult.created.length
          );
          // Update React state
          if (orgResult.created?.length > 0) {
            appendAffiliations(orgResult.created);
          }
        }
      }

      // Invalidate cache and refresh user data
      const slugWithoutPrefix = newSlug.replace("/project/", "");
      handleUserDataRefresh();
      await invalidateProjectPageCache(slugWithoutPrefix);

      // Redirect to new page
      router.push(newSlug);
    } catch (error) {
      console.error("[Builder.io] Error creating project page:", error);
      alert("Failed to create project page. Please try again.");
    } finally {
      setIsSaveInProgress(false);
    }
  };

  const saveOrCreateHandler = isNewPage
    ? createNewProjectPage
    : updateDataToServer;
  // #endregion

  // #region handle for when the page is newly created by associatig the pageType tag
  useEffect(() => {
    if (isLoggedIn && projectData && isNewPage) {
      // const personTag = tags.find((tag) => tag.name === userDetails?.userName);
      // console.log('debug1->personTag', personTag);
      // if (personTag) {
      //   updatePersonDataOnKeyValue('personTag', personTag);
      // }
      const projectInfoTag = tags.find((tag) => tag.name === "project info");
      // console.log('debug1->projectInfoTag', projectInfoTag);
      if (projectInfoTag) {
        updateProjectDataOnKeyValue("pageType", projectInfoTag);
      }
    }
  }, [userDetails, tags]);

  // NOTE: Removed handleTagCreated() call on mount - it was causing full Redis cache invalidation
  // Tags are already available from AuthContext when the component mounts

  return (
    <div className={classNames(style.personContainer)}>
      {!isNewPage && (
        <OgImage
          primaryImage={projectData.projectTag?.picture}
          secondaryImage={
            projectData.contentImages?.[0]?.url !== " "
              ? projectData.contentImages?.[0]?.url
              : "https://futures4europe.eu/images/placeholder.webp"
          }
          title={projectData.title}
          description={projectData.subtitle}
          url={`https://futures4europe.eu/project/${projectData.slug}`}
        />
      )}
      {/*  Edit buttons */}
      {isPageOwnedByUser && (
        <div className="flex justify-between">
          <button
            onClick={() => {
              isEditModeOn && saveOrCreateHandler();
              setIsEditModeOn(!isEditModeOn);
              setDefaultProjectData(projectData);
            }}
            disabled={isEditModeOn && checkValidationErrors()}
            className={classNames(
              "btn btn-save",
              isEditModeOn && checkValidationErrors() && "bg-gray-400"
            )}
          >
            {!isEditModeOn
              ? "Edit"
              : isNewPage
              ? "Publish"
              : "Save & publish changes"}
          </button>
          {isEditModeOn && (
            <button
              onClick={() => {
                setProjectData(defaultProjectData);
                setIsEditModeOn(!isEditModeOn);
                isNewPage && router.push(`/dashboard/projects`);
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
        <Tag {...projectData?.pageType} />
        {/* Timestamp */}
        <section className="post-meta">
          <Typography tag="p" className="text-sm text-gray-400">
            Page creation date:{" "}
            {new Date(project?.registrationDate)?.toLocaleString()}
          </Typography>
        </section>
      </div>
      {/* Project Header */}
      <HeaderComponent
        project={projectData}
        isEditModeOn={isEditModeOn}
        updateProjectData={updateProjectnData}
        updateProjectDataOnKeyValue={updateProjectDataOnKeyValue}
        tags={tags}
        handleTagCreated={handleTagCreated}
        setValidationState={updateValidationState}
        isNewPage={isNewPage}
      />
      {/* Project Description */}
      {/* <DescriptionComponent
        placeholder="Type or paste the description of the project"
        description={projectData.description}
        isEditModeOn={isEditModeOn}
        handleUpdate={(value) =>
          updateProjectDataOnKeyValue('description', value)
        }
      /> */}
      {/* Content Component replaces Description */}
      <ContentComponent
        contentText={projectData.contentText}
        contentImages={projectData.contentImages}
        isEditModeOn={isEditModeOn}
        updatePostDataContent={(value, index) => {
          const newContentText = [...projectData.contentText];
          newContentText[index] = value;
          return updateProjectnData({
            contentText: newContentText,
          });
        }}
        updatePostDataContentImages={(value, index) => {
          const newContentImages = [...projectData.contentImages];
          newContentImages[index] = value;
          return updateProjectnData({
            contentImages: newContentImages,
          });
        }}
      />

      {/* Foresight Methods */}
      <TagListComponent
        placeholder="Add one or more foresight method tags used in the project"
        tagList={projectData.methods}
        tagListTitle="Foresight Methods"
        isEditModeOn={isEditModeOn}
        tags={tags?.filter((tag) => tag?.tagType === "foresight method")}
        selectedValues={projectData.methods?.map((method: any) => method?.name)}
        updatePostData={(value) =>
          updateProjectDataOnKeyValue("methods", value)
        }
        tagType="foresight method"
        handleTagCreated={handleTagCreated}
      />
      {/* Domains */}
      <TagListComponent
        placeholder="Add one or more domain tags relevant to the project"
        tagList={projectData.domains}
        tagListTitle="Domains"
        isEditModeOn={isEditModeOn}
        tags={tags?.filter((tag) => tag?.tagType === "domain")}
        selectedValues={projectData.domains?.map((domain: any) => domain?.name)}
        updatePostData={(value) =>
          updateProjectDataOnKeyValue("domains", value)
        }
        tagType="domain"
        handleTagCreated={handleTagCreated}
      />
      {/* Coordinators */}
      <TagListComponent
        placeholder="Add one or more person tags"
        tagList={projectData.coordinators}
        tagListTitle="Coordinators"
        isEditModeOn={isEditModeOn}
        tags={tags?.filter((tag) => tag?.tagType === "person")}
        selectedValues={projectData.coordinators?.map(
          (coordinator: any) => coordinator?.name
        )}
        updatePostData={(value) =>
          updateProjectDataOnKeyValue("coordinators", value)
        }
        tagType="person"
        handleTagCreated={handleTagCreated}
      />
      {/* Participants */}
      <TagListComponent
        placeholder="Add one or more person tags"
        tagList={projectData.participants}
        tagListTitle="Participants"
        isEditModeOn={isEditModeOn}
        tags={tags?.filter((tag) => tag?.tagType === "person")}
        selectedValues={projectData.participants?.map(
          (participant: any) => participant?.name
        )}
        updatePostData={(value) =>
          updateProjectDataOnKeyValue("participants", value)
        }
        tagType="person"
        handleTagCreated={handleTagCreated}
      />
      {/* Organization Roles */}
      <AffiliationsComponent
        placeholderRole="Role"
        placeholderTag="Add one or more organisation tags"
        afiliations={projectData.organisations}
        tagListTitle="Organisations"
        isEditModeOn={isEditModeOn}
        updatePersonDataAffiliations={(value) =>
          updateProjectDataOnKeyValue("organisations", value)
        }
        tags={tags?.filter((tag) => tag?.tagType === "organisation")}
        handleTagCreated={handleTagCreated}
        tagType="organisation"
      />
      {/* Content related to this Info Page */}
      <MiniPagesListComponentPost
        isEditModeOn={isEditModeOn}
        internalLinks={internalLinks}
        handleUpdatePostData={(value) =>
          updateProjectDataOnKeyValue("internalLinks", value)
        }
        title="Content related to this Project"
      />
      {/* Files */}
      <FilesComponent
        isEditModeOn={isEditModeOn}
        mediaFiles={projectData.mediaFiles}
        updatePostDataBasedOnKeyValue={updateProjectDataOnKeyValue}
      />
      {/* External Links */}
      {/* <ExternalLinksComponent links={project.links} /> */}
      {/* Modal for Saving page */}
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

export default ProjectPageComponent;
