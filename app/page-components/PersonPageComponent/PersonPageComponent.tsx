"use client";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import style from "./PersonPageComponent.module.css";
import Tag, { TagProps } from "@app/shared-components/Tag/Tag";
import Typography from "@app/shared-components/Typography/Typography";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import PersonDescriptionComponent from "../shared-page-components/DescriptionComponent/DescriptionComponent";
import AffiliationsComponent from "./components/AffiliationsComponent/AffiliationsComponent";
import TagListComponent from "../shared-page-components/TagListComponent/TagListComponent";
import FilesComponent from "../shared-page-components/FilesComponent/FilesComponent";
import { mockPerson } from "@app/mocks/pagesMocks";
import { useRouter } from "next/navigation";
import { useAuth } from "@app/custom-hooks/AuthContext/AuthContext";
// RETAINED: updateMember for Wix nickname sync (DO NOT REMOVE)
import { updateMember } from "@app/wixUtils/client-side";
import {
  checkIfArrayNeedsUpdateForTags,
  generateUniqueHash,
} from "../PostPageComponent/PostPageComponent.utils";
import MiniPagesListComponentPost from "../shared-page-components/MiniPagesListComponentPost/MiniPagesListComponentPost";
import {
  arraysEqual,
  deepEqual,
  sanitizeTitleForSlug,
} from "../PageComponents.utils";
import { Modal } from "flowbite-react";
import LoadingSpinner from "@app/shared-components/LoadingSpinner/LoadingSpinner";
import { invalidatePersonPageCache } from "@app/utils/cache-utils";
import OgImage from "@app/shared-components/OgImage";
// Builder.io imports for person page create/update
import {
  createBuilderPersonPage,
  updateBuilderPersonPage,
} from "@app/utils/builderInfoPageUtils";
import {
  bulkCreateAffiliations,
  bulkDeleteAffiliations,
} from "@app/utils/builderAffiliationUtils";

function PersonPageComponent({ pageTitle, person, isNewPage }: any) {
  // person = person || mockPerson(pageTitle);
  person = { ...mockPerson(pageTitle), ...person };

  const router = useRouter();

  // #region useAuth hook for grabbing user details and tags needed for editing
  const {
    isLoggedIn,
    userDetails,
    tags,
    tagsFetched,
    handleTagCreated,
    postPages,
    handleUserTagRefresh,
    updateUserDetails,
    // Builder.io state update functions
    updateTag,
    appendAffiliations,
    removeAffiliations,
  } = useAuth();
  // console.log('debug1->tags', tags);
  const [isPageOwnedByUser, setIsPageOwnedByUser] = useState(false);
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  // #endregion

  // #region check if page is owned by user
  useEffect(() => {
    if (!isLoggedIn || !tagsFetched) return;
    // #region Check PageOwner property from Wix Data, hardcoding ownership
    const permissionCondition =
      personData.pageOwner?.length > 0 &&
      !!userDetails?.userTag?.name &&
      !!personData.pageOwner?.find(
        (owner: any) => owner?._id === userDetails?.userTag?._id,
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
      if (person?.data?._owner === id) {
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
  // console.log('debug111->person.affiliationsItems', person?.affiliationsItems);

  const projectsCoordindation = person?.affiliationsItems
    ?.filter((item: any) => item?.extraIdentifier === "coordination")
    .map((item: any) => item?.projectTag)
    .filter(
      (projectTag: any, index: number, self: any[]) =>
        index === self.findIndex((pt) => pt?.name === projectTag?.name),
    );

  const projectsParticipation = person?.affiliationsItems
    ?.filter((item: any) => item?.extraIdentifier === "participation")
    .map((item: any) => item?.projectTag)
    .filter(
      (projectTag: any, index: number, self: any[]) =>
        index === self.findIndex((pt) => pt?.name === projectTag?.name),
    );
  // console.log('debug111->projectsParticipation', projectsParticipation);

  const currentAfiliations = person?.affiliationsItems
    ?.filter((item: any) => item?.extraIdentifier === "current")
    .map((item: any) => {
      return {
        ...item?.organisationTag,
        arole: item?.role,
      };
    })
    .filter(
      (projectTag: any, index: number, self: any[]) =>
        index === self.findIndex((pt) => pt?.name === projectTag?.name),
    );
  // console.log("debug111->currentAfiliations", currentAfiliations);

  const formerAfiliations = person?.affiliationsItems
    ?.filter((item: any) => item?.extraIdentifier === "former")
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
          (pt) =>
            pt?.name === projectTag?.name && pt?.role === projectTag?.role,
        ),
    );

  // #endregion

  // #region Overwrite mock data with Wix data
  person = {
    ...person,
    title: person?.data?.title, // done
    pageType: person?.data?.pageTypes[0], // NON editable
    updatedDate: person?.data?._updatedDate, // NON editable
    personTag: person?.data?.person[0],
    activity: person?.data?.activity, // done
    countryTag: person?.data?.countryTag[0], //done
    description: person?.data?.description, //done
    methods: person?.data?.methods, // done
    domains: person?.data?.domains, // done
    personType: person?.data?.personType, // ???
    // currentAfiliations: person?.data?.personOrganisationRoles?.map(
    //   (item: any) => {
    //     return {
    //       ...person?.data?.personOrganisation?.find(
    //         (org: any) => org.name === item.organisation
    //       ),
    //       arole: item.role,
    //     };
    //   }
    // ), //done
    currentAfiliations: currentAfiliations, //done
    // formerAfiliations: person?.data?.personOrganisationRolesFormer?.map(
    //   (item: any) => {
    //     return {
    //       ...person?.data?.personOrganisationFormer?.find(
    //         (org: any) => org.name === item.organisation
    //       ),
    //       arole: item.role,
    //     };
    //   }
    // ), //done
    formerAfiliations: formerAfiliations, //done
    // projectsCoordindation: person?.data?.personProjectCoordonation, // done
    projectsCoordindation: projectsCoordindation, // done
    // projectsParticipation: person?.data?.personProjectParticipation, // done
    projectsParticipation: projectsParticipation, // done
    mediaFiles: person?.data?.mediaFiles, // done
    linkedinLink: person?.data?.linkedinLink,
    websiteLink: person?.data?.websiteLink,
    researchGateLink: person?.data?.researchGateLink,
    orcidLink: person?.data?.orcidLink,
    slug: person?.data?.slug,
    pageOwner: person?.data?.pageOwner,
  };
  // #endregion

  // #region set default post data and data for editing
  const [defaultPersonData, setDefaultPersonData] = useState(person);
  const [personData, setPersonData] = useState(person);
  // #endregion

  // #region Methods for updating person data
  const updatePersonData = (newData: any) => {
    setPersonData((prevData: any) => ({ ...prevData, ...newData }));
  };

  const updatePersonDataOnKeyValue = (key: string, value: any) => {
    setPersonData((prevData: any) => ({ ...prevData, [key]: value }));
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
  const [saveError, setSaveError] = useState<string | null>(null);

  const updateDataToServer = async () => {
    console.log("[Builder.io] Updating person page:", person?.id);
    setIsSaveInProgress(true);

    try {
      // Track affiliations to add/remove for React state updates
      const affiliationsToRemove: string[] = [];
      const affiliationsToAdd: any[] = [];

      // #region Update Person Tag in Builder.io
      if (!deepEqual(personData.personTag, defaultPersonData.personTag)) {
        console.log("[Builder.io] Person tag has changed, updating...");

        // Update tag in Builder.io
        // Note: API expects fields at top level, not nested under 'data'
        const tagResponse = await fetch(
          `/api/builder/tag/${personData.personTag._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: personData.personTag.name,
              tagLine: personData.personTag.tagLine,
              picture: personData.personTag.picture,
            }),
          },
        );

        if (tagResponse.ok) {
          const tagResult = await tagResponse.json();
          console.log(
            "[Builder.io] Person tag updated successfully:",
            tagResult,
          );
          // Update React state with the updated tag
          updateTag(personData.personTag);
        } else {
          const errorText = await tagResponse.text();
          console.error("[Builder.io] Failed to update person tag:", errorText);
        }

        // RETAINED: Update Wix nickname (DO NOT REMOVE)
        const nickName = personData?.personTag?.name;
        if (
          nickName !== userDetails.userName &&
          nickName !== "Angela Cristina Plescan"
        ) {
          console.log("[Wix] Updating member nickname...");
          try {
            const member = await updateMember(userDetails.contactId, nickName);
            updateUserDetails((prevData: any) => ({
              ...prevData,
              userName: personData?.personTag?.name,
              userTag: {
                ...personData.personTag,
              },
            }));
            console.log("[Wix] Member nickname updated:", member);
          } catch (wixError) {
            console.warn(
              "[Wix] Failed to update nickname (non-blocking):",
              wixError,
            );
          }
        }
      }
      // #endregion

      // #region Update Person Page in Builder.io
      // Prepare author and pageOwner from personTag
      const authorAndOwner = personData.personTag
        ? [personData.personTag]
        : personData.pageOwner || [];

      const pageDataToSave = {
        ...personData,
        author: authorAndOwner,
        pageOwner: authorAndOwner,
      };

      await updateBuilderPersonPage(
        person?.id,
        pageDataToSave,
        [], // contentText - not used for person pages
        [], // contentImages - not used for person pages
      );
      console.log("[Builder.io] Person page updated successfully");
      // #endregion

      // #region Handle Current Affiliations
      if (
        checkIfArrayNeedsUpdateForTags(
          personData.currentAfiliations,
          defaultPersonData.currentAfiliations,
        )
      ) {
        console.log("[Builder.io] Updating current affiliations...");

        // Delete old affiliations
        const oldCurrentAffiliations = person?.affiliationsItems?.filter(
          (item: any) => item?.extraIdentifier === "current",
        );
        if (oldCurrentAffiliations?.length > 0) {
          const oldIds = oldCurrentAffiliations.map((item: any) => item._id);
          await bulkDeleteAffiliations(oldIds);
          affiliationsToRemove.push(...oldIds);
        }

        // Create new affiliations
        if (personData.currentAfiliations?.length > 0) {
          const newAffiliations = personData.currentAfiliations
            .filter((item: any) => item?.name)
            .map((item: any) => ({
              name: `${personData.personTag?.name} -to- ${item.name}`,
              data: {
                title: `${personData.personTag?.name} -to- ${item.name}`,
                personTag: {
                  "@type": "@builder.io/core:Reference",
                  model: "tag",
                  id: personData.personTag?._id,
                },
                organisationTag: {
                  "@type": "@builder.io/core:Reference",
                  model: "tag",
                  id: item._id,
                },
                role: item.arole || "",
                extraIdentifier: "current",
              },
              published: "published",
            }));

          if (newAffiliations.length > 0) {
            const result = await bulkCreateAffiliations(newAffiliations);
            if (result.created) {
              affiliationsToAdd.push(...result.created);
            }
          }
        }
      }
      // #endregion

      // #region Handle Former Affiliations
      if (
        checkIfArrayNeedsUpdateForTags(
          personData.formerAfiliations,
          defaultPersonData.formerAfiliations,
        )
      ) {
        console.log("[Builder.io] Updating former affiliations...");

        // Delete old affiliations
        const oldFormerAffiliations = person?.affiliationsItems?.filter(
          (item: any) => item?.extraIdentifier === "former",
        );
        if (oldFormerAffiliations?.length > 0) {
          const oldIds = oldFormerAffiliations.map((item: any) => item._id);
          await bulkDeleteAffiliations(oldIds);
          affiliationsToRemove.push(...oldIds);
        }

        // Create new affiliations
        if (personData.formerAfiliations?.length > 0) {
          const newAffiliations = personData.formerAfiliations
            .filter((item: any) => item?.name)
            .map((item: any) => ({
              name: `${personData.personTag?.name} -to- ${item.name}`,
              data: {
                title: `${personData.personTag?.name} -to- ${item.name}`,
                personTag: {
                  "@type": "@builder.io/core:Reference",
                  model: "tag",
                  id: personData.personTag?._id,
                },
                organisationTag: {
                  "@type": "@builder.io/core:Reference",
                  model: "tag",
                  id: item._id,
                },
                role: item.arole || "",
                extraIdentifier: "former",
              },
              published: "published",
            }));

          if (newAffiliations.length > 0) {
            const result = await bulkCreateAffiliations(newAffiliations);
            if (result.created) {
              affiliationsToAdd.push(...result.created);
            }
          }
        }
      }
      // #endregion

      // #region Handle Project Coordination Affiliations
      if (
        checkIfArrayNeedsUpdateForTags(
          personData.projectsCoordindation,
          defaultPersonData.projectsCoordindation,
        )
      ) {
        console.log("[Builder.io] Updating coordination affiliations...");

        // Delete old affiliations
        const oldCoordinationAffiliations = person?.affiliationsItems?.filter(
          (item: any) => item?.extraIdentifier === "coordination",
        );
        if (oldCoordinationAffiliations?.length > 0) {
          const oldIds = oldCoordinationAffiliations.map(
            (item: any) => item._id,
          );
          await bulkDeleteAffiliations(oldIds);
          affiliationsToRemove.push(...oldIds);
        }

        // Create new affiliations
        if (personData.projectsCoordindation?.length > 0) {
          const newAffiliations = personData.projectsCoordindation
            .filter((item: any) => item?.name)
            .map((item: any) => ({
              name: `${personData.personTag?.name} -to- ${item.name}`,
              data: {
                title: `${personData.personTag?.name} -to- ${item.name}`,
                personTag: {
                  "@type": "@builder.io/core:Reference",
                  model: "tag",
                  id: personData.personTag?._id,
                },
                projectTag: {
                  "@type": "@builder.io/core:Reference",
                  model: "tag",
                  id: item._id,
                },
                extraIdentifier: "coordination",
              },
              published: "published",
            }));

          if (newAffiliations.length > 0) {
            const result = await bulkCreateAffiliations(newAffiliations);
            if (result.created) {
              affiliationsToAdd.push(...result.created);
            }
          }
        }
      }
      // #endregion

      // #region Handle Project Participation Affiliations
      if (
        checkIfArrayNeedsUpdateForTags(
          personData.projectsParticipation,
          defaultPersonData.projectsParticipation,
        )
      ) {
        console.log("[Builder.io] Updating participation affiliations...");

        // Delete old affiliations
        const oldParticipationAffiliations = person?.affiliationsItems?.filter(
          (item: any) => item?.extraIdentifier === "participation",
        );
        if (oldParticipationAffiliations?.length > 0) {
          const oldIds = oldParticipationAffiliations.map(
            (item: any) => item._id,
          );
          await bulkDeleteAffiliations(oldIds);
          affiliationsToRemove.push(...oldIds);
        }

        // Create new affiliations
        if (personData.projectsParticipation?.length > 0) {
          const newAffiliations = personData.projectsParticipation
            .filter((item: any) => item?.name)
            .map((item: any) => ({
              name: `${personData.personTag?.name} -to- ${item.name}`,
              data: {
                title: `${personData.personTag?.name} -to- ${item.name}`,
                personTag: {
                  "@type": "@builder.io/core:Reference",
                  model: "tag",
                  id: personData.personTag?._id,
                },
                projectTag: {
                  "@type": "@builder.io/core:Reference",
                  model: "tag",
                  id: item._id,
                },
                extraIdentifier: "participation",
              },
              published: "published",
            }));

          if (newAffiliations.length > 0) {
            const result = await bulkCreateAffiliations(newAffiliations);
            if (result.created) {
              affiliationsToAdd.push(...result.created);
            }
          }
        }
      }
      // #endregion

      // Update React state for affiliations
      if (affiliationsToRemove.length > 0) {
        removeAffiliations(affiliationsToRemove);
      }
      if (affiliationsToAdd.length > 0) {
        appendAffiliations(affiliationsToAdd);
      }

      // After successful update, invalidate caches
      await invalidatePersonPageCache(personData.slug);
      handleUserTagRefresh();

      console.log("[Builder.io] Person page save completed successfully");
    } catch (error) {
      console.error("[Builder.io] Error updating person page:", error);
    }

    setIsSaveInProgress(false);
  };
  // #endregion

  // #region handle for when the page is newly created
  // const { insertDataItem } = useWixModules(items);

  // useEffect(() => {
  //   console.log('defaultPersonData', defaultPersonData);
  //   // console.log('personData', personData);
  // }, [defaultPersonData]);

  // #region handlePersonInternalLinks
  // console.log('postPages', postPages);
  const internalLinks = postPages
    ?.filter((page) => {
      return (
        page?.data?.author?.find(
          (item: TagProps) =>
            item?.authorItem?.id === personData?.personTag?._id,
        ) ||
        page?.data?.projectResultAuthor?.find(
          (item: TagProps) =>
            item?.projectResultAuthorItem?.id === personData?.personTag?._id,
        ) ||
        page?.data?.people?.find(
          (item: TagProps) =>
            item?.peopleItem?.id === personData?.personTag?._id,
        )
      );
    })
    ?.map((link) => link?.data);
  // console.log('internalLinks', internalLinks);
  // #endregion

  // #region for when the page is newly created
  const createNewPersonPage = async () => {
    console.log("[Builder.io] Creating new person page...");
    setSaveError(null);
    setIsSaveInProgress(true);

    try {
      // Track affiliations for React state updates
      const affiliationsToAdd: any[] = [];

      // Generate slug for new page
      const newSlug =
        "/person/" +
        sanitizeTitleForSlug(personData?.personTag?.name) +
        "-" +
        generateUniqueHash();

      // Find person tag from tags array
      const personTag = tags.find(
        (tag) => tag._id === personData?.personTag?._id,
      );
      console.log("[Builder.io] Person tag:", personTag);

      // Prepare page data with proper references
      const pageDataToSave = {
        ...personData,
        slug: newSlug,
        author: personTag ? [personTag] : [],
        pageOwner: personTag ? [personTag] : [],
      };

      // #region Create Person Page in Builder.io
      const newPage = await createBuilderPersonPage(
        pageDataToSave,
        [], // contentText - not used for person pages
        [], // contentImages - not used for person pages
      );
      console.log("[Builder.io] Person page created:", newPage);
      // #endregion

      // #region Update Person Tag with tagPageLink
      if (personTag?._id) {
        console.log("[Builder.io] Updating person tag with tagPageLink...");
        // Note: API expects fields at top level, not nested under 'data'
        const tagResponse = await fetch(`/api/builder/tag/${personTag._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: personData.personTag?.name,
            tagLine: personData.personTag?.tagLine,
            picture: personData.personTag?.picture,
            tagPageLink: newSlug,
          }),
        });

        if (tagResponse.ok) {
          const tagResult = await tagResponse.json();
          console.log(
            "[Builder.io] Person tag updated with tagPageLink:",
            tagResult,
          );
          // Update React state
          updateTag({
            ...personTag,
            ...personData.personTag,
            tagPageLink: newSlug,
          });
        }

        // RETAINED: Update Wix nickname (DO NOT REMOVE)
        const nickName = personData?.personTag?.name;
        if (
          nickName !== userDetails.userName &&
          nickName !== "Angela Cristina Plescan"
        ) {
          console.log("[Wix] Updating member nickname...");
          try {
            const member = await updateMember(userDetails.contactId, nickName);
            console.log("[Wix] Member nickname updated:", member);
          } catch (wixError) {
            console.warn(
              "[Wix] Failed to update nickname (non-blocking):",
              wixError,
            );
          }
        }
      }
      // #endregion

      // #region Create Current Affiliations
      if (personData.currentAfiliations?.length > 0) {
        console.log("[Builder.io] Creating current affiliations...");
        const newAffiliations = personData.currentAfiliations
          .filter((item: any) => item?.name)
          .map((item: any) => ({
            name: `${personData.personTag?.name} -to- ${item.name}`,
            data: {
              title: `${personData.personTag?.name} -to- ${item.name}`,
              personTag: {
                "@type": "@builder.io/core:Reference",
                model: "tag",
                id: personData.personTag?._id,
              },
              organisationTag: {
                "@type": "@builder.io/core:Reference",
                model: "tag",
                id: item._id,
              },
              role: item.arole || "",
              extraIdentifier: "current",
            },
            published: "published",
          }));

        if (newAffiliations.length > 0) {
          const result = await bulkCreateAffiliations(newAffiliations);
          if (result.created) {
            affiliationsToAdd.push(...result.created);
          }
        }
      }
      // #endregion

      // #region Create Former Affiliations
      if (personData.formerAfiliations?.length > 0) {
        console.log("[Builder.io] Creating former affiliations...");
        const newAffiliations = personData.formerAfiliations
          .filter((item: any) => item?.name)
          .map((item: any) => ({
            name: `${personData.personTag?.name} -to- ${item.name}`,
            data: {
              title: `${personData.personTag?.name} -to- ${item.name}`,
              personTag: {
                "@type": "@builder.io/core:Reference",
                model: "tag",
                id: personData.personTag?._id,
              },
              organisationTag: {
                "@type": "@builder.io/core:Reference",
                model: "tag",
                id: item._id,
              },
              role: item.arole || "",
              extraIdentifier: "former",
            },
            published: "published",
          }));

        if (newAffiliations.length > 0) {
          const result = await bulkCreateAffiliations(newAffiliations);
          if (result.created) {
            affiliationsToAdd.push(...result.created);
          }
        }
      }
      // #endregion

      // #region Create Coordination Affiliations
      if (personData.projectsCoordindation?.length > 0) {
        console.log("[Builder.io] Creating coordination affiliations...");
        const newAffiliations = personData.projectsCoordindation
          .filter((item: any) => item?.name)
          .map((item: any) => ({
            name: `${personData.personTag?.name} -to- ${item.name}`,
            data: {
              title: `${personData.personTag?.name} -to- ${item.name}`,
              personTag: {
                "@type": "@builder.io/core:Reference",
                model: "tag",
                id: personData.personTag?._id,
              },
              projectTag: {
                "@type": "@builder.io/core:Reference",
                model: "tag",
                id: item._id,
              },
              extraIdentifier: "coordination",
            },
            published: "published",
          }));

        if (newAffiliations.length > 0) {
          const result = await bulkCreateAffiliations(newAffiliations);
          if (result.created) {
            affiliationsToAdd.push(...result.created);
          }
        }
      }
      // #endregion

      // #region Create Participation Affiliations
      if (personData.projectsParticipation?.length > 0) {
        console.log("[Builder.io] Creating participation affiliations...");
        const newAffiliations = personData.projectsParticipation
          .filter((item: any) => item?.name)
          .map((item: any) => ({
            name: `${personData.personTag?.name} -to- ${item.name}`,
            data: {
              title: `${personData.personTag?.name} -to- ${item.name}`,
              personTag: {
                "@type": "@builder.io/core:Reference",
                model: "tag",
                id: personData.personTag?._id,
              },
              projectTag: {
                "@type": "@builder.io/core:Reference",
                model: "tag",
                id: item._id,
              },
              extraIdentifier: "participation",
            },
            published: "published",
          }));

        if (newAffiliations.length > 0) {
          const result = await bulkCreateAffiliations(newAffiliations);
          if (result.created) {
            affiliationsToAdd.push(...result.created);
          }
        }
      }
      // #endregion

      // Update React state for affiliations
      if (affiliationsToAdd.length > 0) {
        appendAffiliations(affiliationsToAdd);
      }

      // Update user details with new tag link
      updateUserDetails((prevData: any) => ({
        ...prevData,
        userName: personData?.personTag?.name,
        userTag: {
          ...personTag,
          tagPageLink: newSlug,
        },
      }));

      // Invalidate caches and redirect
      await invalidatePersonPageCache(newSlug.replace("/person/", ""));
      handleUserTagRefresh();

      console.log("[Builder.io] Person page creation completed successfully");
      router.push(newSlug);
    } catch (error: any) {
      console.error("[Builder.io] Error creating person page:", error);
      setSaveError(error?.message || "An error occurred while creating the page.");
    }

    setIsSaveInProgress(false);
  };

  const saveOrCreateHandler = isNewPage
    ? createNewPersonPage
    : updateDataToServer;

  // #endregion

  // #region handle for when the page is newly created by associatig the user as the owner and the personTag
  useEffect(() => {
    if (isLoggedIn && personData && isNewPage) {
      const personTag = tags.find((tag) => tag.name === userDetails?.userName);
      // console.log('debug1->personTag', personTag);
      if (personTag) {
        updatePersonDataOnKeyValue("personTag", personTag);
      }
      const personInfoTag = tags.find((tag) => tag.name === "person info");
      // console.log('debug1->personInfoTag', personInfoTag);
      if (personInfoTag) {
        updatePersonDataOnKeyValue("pageType", personInfoTag);
      }
    }
  }, [userDetails, tags]);

  // useEffect(() => {
  //   isNewPage && handleTagCreated();
  // }, []);

  return (
    <div className={classNames(style.personContainer)}>
      {/*  Edit buttons */}
      {!isNewPage && (
        <OgImage
          primaryImage={personData.personTag?.picture}
          secondaryImage={"https://futures4europe.eu/images/placeholder.webp"}
          title={personData.title}
          description={personData.description}
          url={`https://futures4europe.eu/person/${personData.slug}`}
        />
      )}
      {isPageOwnedByUser && (
        <div className="flex justify-between">
          <button
            onClick={() => {
              isEditModeOn && saveOrCreateHandler();
              setIsEditModeOn(!isEditModeOn);
              setDefaultPersonData(personData);
            }}
            disabled={isEditModeOn && checkValidationErrors()}
            className={classNames(
              "btn btn-save",
              isEditModeOn && checkValidationErrors() && "bg-gray-400",
            )}
          >
            {!isEditModeOn
              ? "Edit Page"
              : isNewPage
              ? "Publish Page"
              : "Save & publish"}
          </button>
          {isEditModeOn && (
            <button
              onClick={() => {
                setPersonData(defaultPersonData);
                setIsEditModeOn(!isEditModeOn);
                isNewPage && router.push(`/dashboard/projects`);
              }}
              className="btn btn-edit"
            >
              Discard changes
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
      {/* Page Type Tag NON editable*/}
      <div className={classNames("py-3", style.preHeader)}>
        <Tag {...personData.pageType} />
        {/* Timestamp */}
        <section className="post-meta">
          <Typography tag="p" className="text-sm text-gray-400">
            Edited{" "}
            {new Date(personData?.updatedDate?.["$date"]).toLocaleString()}
          </Typography>
          {/* Additional meta content */}
        </section>
      </div>
      {/* Person Header */}
      <HeaderComponent
        person={personData}
        isEditModeOn={isEditModeOn}
        updatePersonData={updatePersonData}
        updatePersonDataOnKeyValue={updatePersonDataOnKeyValue}
        tags={tags}
        handleTagCreated={handleTagCreated}
        setValidationState={updateValidationState}
      />
      {/* Person Description */}
      <PersonDescriptionComponent
        placeholder={"Type or paste a short description of yourself"} // TODO: Placeholder @alex
        description={personData.description}
        isEditModeOn={isEditModeOn}
        handleUpdate={(value) =>
          updatePersonDataOnKeyValue("description", value)
        }
      />

      {/* Person Workplace/Current Affiliations*/}
      <AffiliationsComponent
        afiliations={personData.currentAfiliations}
        tagListTitle="Current Affiliations"
        current
        isEditModeOn={isEditModeOn}
        updatePersonDataAffiliations={(value) =>
          updatePersonDataOnKeyValue("currentAfiliations", value)
        }
        tags={tags?.filter((tag) => tag?.tagType === "organisation")}
        handleTagCreated={handleTagCreated}
        tagType="organisation"
      />
      {/* Former Affiliations */}
      <section className={classNames(style.affiliations)}>
        <AffiliationsComponent
          afiliations={personData.formerAfiliations}
          tagListTitle="Former Affiliations"
          isEditModeOn={isEditModeOn}
          updatePersonDataAffiliations={(value) =>
            updatePersonDataOnKeyValue("formerAfiliations", value)
          }
          tags={tags?.filter((tag) => tag?.tagType === "organisation")}
          handleTagCreated={handleTagCreated}
          tagType="organisation"
        />
      </section>
      {/* Foresight Methods */}
      <TagListComponent
        tagList={personData.methods}
        tagListTitle="Foresight Methods"
        placeholder="Add one or more foresight method tags"
        isEditModeOn={isEditModeOn}
        tags={tags?.filter((tag) => tag?.tagType === "foresight method")}
        selectedValues={personData.methods?.map((method: any) => method?.name)}
        updatePostData={(value) => updatePersonDataOnKeyValue("methods", value)}
        tagType="foresight method"
        handleTagCreated={handleTagCreated}
      />
      {/* Domains */}
      <TagListComponent
        tagList={personData.domains}
        tagListTitle="Domains"
        placeholder="Add one or more domain tags relevant to you"
        isEditModeOn={isEditModeOn}
        tags={tags?.filter((tag) => tag?.tagType === "domain")}
        selectedValues={personData.domains?.map((domain: any) => domain?.name)}
        updatePostData={(value) => updatePersonDataOnKeyValue("domains", value)}
        tagType="domain"
        handleTagCreated={handleTagCreated}
      />
      {/* Projects Coordination */}
      <TagListComponent
        placeholder="Add one or more project tags"
        tagList={personData.projectsCoordindation}
        tagListTitle="Project Coordination"
        isEditModeOn={isEditModeOn}
        tags={tags?.filter((tag) => tag?.tagType === "project")}
        selectedValues={personData.projectsCoordindation?.map(
          (project: any) => project?.name,
        )}
        updatePostData={(value) =>
          updatePersonDataOnKeyValue("projectsCoordindation", value)
        }
        tagType="project"
      />
      {/* Projects Participation */}
      <TagListComponent
        placeholder="Add one or more project tags"
        tagList={personData.projectsParticipation}
        tagListTitle="Project Participation"
        isEditModeOn={isEditModeOn}
        tags={tags?.filter((tag) => tag?.tagType === "project")}
        selectedValues={personData.projectsParticipation?.map(
          (project: any) => project?.name,
        )}
        updatePostData={(value) =>
          updatePersonDataOnKeyValue("projectsParticipation", value)
        }
        tagType="project"
      />
      {/* Content related to this Info Page */}
      <MiniPagesListComponentPost
        internalLinks={internalLinks}
        title="Content related to this Person"
        // projectResults={projectResults}
        // events={events}
      />
      <FilesComponent
        // files={postData.files}
        isEditModeOn={isEditModeOn}
        mediaFiles={personData.mediaFiles}
        updatePostDataBasedOnKeyValue={updatePersonDataOnKeyValue}
      />
      {/* Files */}
      {/* <FilesComponent files={person.files} /> */}
      {/* External Links */}
      {/* <ExternalLinksComponent links={person.links} /> */}
      <Modal
        show={!!saveError}
        size="md"
        popup
        dismissible
        onClose={() => setSaveError(null)}
      >
        <Modal.Header>Unable to create page</Modal.Header>
        <Modal.Body>
          <p className="text-sm text-gray-700">{saveError}</p>
        </Modal.Body>
      </Modal>
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

export default PersonPageComponent;
