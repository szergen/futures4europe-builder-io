'use client';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import style from './ProjectPageComponent.module.css';
import Tag, { TagProps } from '@app/shared-components/Tag/Tag';
import Typography from '@app/shared-components/Typography/Typography';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import TagListComponent from '../shared-page-components/TagListComponent/TagListComponent';
import AffiliationsComponent from '../PersonPageComponent/components/AffiliationsComponent/AffiliationsComponent';
import FilesComponent from '../shared-page-components/FilesComponent/FilesComponent';
import { mockProject } from '../../mocks/pagesMocks';
import { useRouter } from 'next/navigation';
import { useAuth } from '@app/custom-hooks/AuthContext/AuthContext';
import OgImage from '@app/shared-components/OgImage';
import {
  arraysEqual,
  deepEqual,
  sanitizeTitleForSlug,
} from '../PageComponents.utils';
import {
  bulkInsertItems,
  bulkRemoveItems,
  replaceDataItemReferences,
  revalidateDataItem,
  updateDataItem,
} from '@app/wixUtils/client-side';
import {
  checkIfArrayNeedsUpdateForStrings,
  checkIfArrayNeedsUpdateForTags,
  generateUniqueHash,
} from '../PostPageComponent/PostPageComponent.utils';
import MiniPagesListComponentPost from '../shared-page-components/MiniPagesListComponentPost/MiniPagesListComponentPost';
import { Modal } from 'flowbite-react';
import LoadingSpinner from '@app/shared-components/LoadingSpinner/LoadingSpinner';
import { useWixModules } from '@wix/sdk-react';
import { items } from '@wix/data';
import ContentComponent from '../PostPageComponent/components/ContentComponent/ContentComponent';
import {
  refetchAffiliations,
  refetchInfoPages,
  refetchTags,
} from '@app/utils/refetch-utils';
import { invalidateProjectPageCache } from '@app/utils/cache-utils';

function ProjectPageComponent({ pageTitle, project, isNewPage }: any) {
  project = { ...mockProject(pageTitle), ...project };

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

    console.log('debug1->permissionCondition', permissionCondition);

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
    ?.filter((item: any) => item?.extraIdentifier === 'coordination')
    .map((item: any) => item?.personTag)
    .filter(
      (projectTag: any, index: number, self: any[]) =>
        index === self.findIndex((pt) => pt.name === projectTag.name)
    );

  const projectsParticipation = project?.affiliationsItems
    ?.filter((item: any) => item?.extraIdentifier === 'participation')
    .map((item: any) => item?.personTag)
    .filter(
      (projectTag: any, index: number, self: any[]) =>
        index === self.findIndex((pt) => pt.name === projectTag.name)
    );
  console.log('debug111->projectsParticipation', projectsParticipation);

  const organisations = project?.affiliationsItems
    ?.filter((item: any) => item?.extraIdentifier === 'projectOrganisationRole')
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
          (pt) => pt.name === projectTag.name && pt.arole === projectTag.arole
        )
    );

  // #endregion

  // #region Overwrite mock data with Wix data
  project = {
    ...project,
    pageType: project?.data?.pageTypes[0],
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
    registrationDate: project?.data?._createdDate['$date'], //done-system field
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
    title: '',
    subtitle: '',
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
    console.log(
      'Updating Page from',
      projectData.dataCollectionId,
      projectData._id
    );
    setIsSaveInProgress(true);

    // #region Update Person Tag
    // Check if object personTag has changed
    if (!deepEqual(projectData.projectTag, defaultProjectData.projectTag)) {
      console.log('personTag has not changed');
      const updatedProjectTag = await updateDataItem(
        'Tags',
        projectData.projectTag._id,
        {
          _id: projectData.projectTag._id,
          ...projectData.projectTag,
        }
      );
      console.log('updatedProjectTag', updatedProjectTag);
    }
    // #endregion

    const hasDifferentMedia = projectData?.mediaFiles?.some(
      (file: any, index: number) =>
        file.url !== defaultProjectData?.mediaFiles?.[index]?.url ||
        file.displayName !==
          defaultProjectData?.mediaFiles?.[index]?.displayName
    );

    // Update page fields
    if (
      projectData.description !== defaultProjectData.description ||
      !arraysEqual(
        projectData.organisations,
        defaultProjectData.organisations
      ) ||
      checkIfArrayNeedsUpdateForStrings(
        projectData.contentText,
        defaultProjectData.contentText
      ) ||
      checkIfArrayNeedsUpdateForTags(
        projectData.contentImages,
        defaultProjectData.contentImages
      ) ||
      checkIfArrayNeedsUpdateForStrings(
        projectData.contentImages,
        defaultProjectData.contentImages
      ) ||
      hasDifferentMedia ||
      projectData.contentText?.[0] ||
      projectData.projectStartDate !== defaultProjectData.projectStartDate ||
      projectData.projectEndDate !== defaultProjectData.projectEndDate ||
      projectData.projectTag?.name !== defaultProjectData.projectTag?.name ||
      projectData?.linkedinLink !== defaultProjectData?.linkedinLink ||
      projectData?.websiteLink !== defaultProjectData?.websiteLink
    ) {
      const updatedItem = await updateDataItem(
        projectData.dataCollectionId,
        projectData._id,
        {
          _id: projectData._id,
          ...projectData.data,
          title: projectData.projectTag?.name,
          description: projectData?.description,
          postContentRIch1: projectData?.contentText[0],
          postContentRIch2: projectData?.contentText[1],
          postContentRIch3: projectData?.contentText[2],
          postContentRIch4: projectData?.contentText[3],
          postContentRIch5: projectData?.contentText[4],
          postContentRIch6: projectData?.contentText[5],
          postContentRIch7: projectData?.contentText[6],
          postContentRIch8: projectData?.contentText[7],
          postContentRIch9: projectData?.contentText[8],
          postContentRIch10: projectData?.contentText[9],
          postImage1: projectData?.contentImages[0],
          postImage2: projectData?.contentImages[1],
          postImage3: projectData?.contentImages[2],
          postImage4: projectData?.contentImages[3],
          postImage5: projectData?.contentImages[4],
          postImage6: projectData?.contentImages[5],
          postImage7: projectData?.contentImages[6],
          postImage8: projectData?.contentImages[7],
          postImage9: projectData?.contentImages[8],
          postImage10: projectData?.contentImages[9],
          projectStartDate: projectData?.projectStartDate,
          projectEndDate: projectData?.projectEndDate,
          // projectOrganisationRoles: projectData?.organisations?.map(
          //   (item: any) => {
          //     return {
          //       organisation: item.name,
          //       role: item.arole,
          //     };
          //   }
          // ),
          mediaFiles: projectData?.mediaFiles,
          linkedinLink: projectData?.linkedinLink,
          websiteLink: projectData?.websiteLink,
        }
      );
      console.log('updatedItem', updatedItem);
    }

    // Update projectOrganisation
    if (
      checkIfArrayNeedsUpdateForTags(
        projectData.organisations,
        defaultProjectData.organisations
      )
    ) {
      // const updatedOrganisations = await replaceDataItemReferences(
      //   'InfoPages',
      //   projectData.organisations
      //     ?.map((org: any) => org._id)
      //     .filter((id: any) => id),
      //   'projectOrganisation',
      //   projectData._id
      // );
      // console.log('updatedOrganisations', updatedOrganisations);
      console.log('debug111-> updating organisations roles');
      const oldAffiliations = project?.affiliationsItems?.filter(
        (item: any) => item?.extraIdentifier === 'projectOrganisationRole'
      );
      console.log('debug111->oldAffiliation', oldAffiliations);
      if (oldAffiliations && oldAffiliations?.length > 0) {
        const removeOldAffiliations = await bulkRemoveItems(
          'Affiliations',
          oldAffiliations?.map((item: any) => item._id)
        );
        console.log('debug111->removeOldAffiliations', removeOldAffiliations);
      }

      if (projectData.organisations?.length > 0) {
        const newAffiliationsObject = projectData.organisations
          ?.map((item: any) => {
            return {
              data: {
                projectTag: projectData.projectTag,
                organisationTag: item,
                role: item.arole,
                extraIdentifier: 'projectOrganisationRole',
                title: `${projectData?.projectTag?.name} -to- ${item?.name}`,
              },
            };
          })
          ?.filter((item: any) => item?.data?.organisationTag?.name !== '');
        console.log('debug111->newAffiliationsObject', newAffiliationsObject);
        if (newAffiliationsObject?.length > 0) {
          const updatedOrganisationsCurrent = await bulkInsertItems(
            'Affiliations',
            newAffiliationsObject
          );

          console.log(
            'debug111->updatedOrganisationsCurrent',
            updatedOrganisationsCurrent
          );
        }
      }
    }

    // Update Project Funded
    if (
      projectData.projectFunded?._id !== defaultProjectData.projectFunded?._id
    ) {
      const updatedProjectFunded = await replaceDataItemReferences(
        'InfoPages',
        projectData.projectFunded?._id ? [projectData.projectFunded?._id] : [],
        'projectFunded',
        projectData._id
      );
      console.log('updatedProjectFunded', updatedProjectFunded);
    }

    // Update Country Tag
    if (projectData.countryTag?._id !== defaultProjectData.countryTag?._id) {
      const updatedCountryTag = await replaceDataItemReferences(
        'InfoPages',
        [projectData.countryTag?._id],
        'countryTag',
        projectData._id
      );
      console.log('updatedCountryTag', updatedCountryTag);
    }

    // Update Foresight Methods
    if (
      checkIfArrayNeedsUpdateForTags(
        projectData.methods,
        defaultProjectData.methods
      )
    ) {
      const validMethods = projectData.methods?.filter(
        (method: any) => method._id
      );
      const updatedMethods = await replaceDataItemReferences(
        'InfoPages',
        validMethods?.map((method: any) => method._id),
        'methods',
        projectData._id
      );
      console.log('updatedMethods', updatedMethods);
    }
    // Update Domains
    if (
      checkIfArrayNeedsUpdateForTags(
        projectData.domains,
        defaultProjectData.domains
      )
    ) {
      const validDomains = projectData.domains?.filter(
        (domain: any) => domain._id
      );
      const updatedDomains = await replaceDataItemReferences(
        'InfoPages',
        validDomains?.map((domain: any) => domain._id),
        'domains',
        projectData._id
      );
      console.log('updatedDomains', updatedDomains);
    }

    // Update Coordinators
    if (
      checkIfArrayNeedsUpdateForTags(
        projectData.coordinators,
        defaultProjectData.coordinators
      )
    ) {
      // const updatedCoordinators = await replaceDataItemReferences(
      //   'InfoPages',
      //   projectData.coordinators?.map((coordinator: any) => coordinator._id),
      //   'projectCoordinator',
      //   projectData._id
      // );
      // console.log('updatedCoordinators', updatedCoordinators);
      console.log('debug111-> updating project Coordination');
      const oldAffiliations = project?.affiliationsItems?.filter(
        (item: any) => item?.extraIdentifier === 'coordination'
      );
      console.log('debug111->oldAffiliation', oldAffiliations);
      if (oldAffiliations && oldAffiliations?.length > 0) {
        const removeOldAffiliations = await bulkRemoveItems(
          'Affiliations',
          oldAffiliations?.map((item: any) => item._id)
        );
        console.log('debug111->removeOldAffiliations', removeOldAffiliations);
      }

      if (projectData.coordinators?.length > 0) {
        const newAffiliationsObject = projectData.coordinators
          ?.map((item: any) => {
            return {
              data: {
                projectTag: projectData.projectTag,
                personTag: item,
                extraIdentifier: 'coordination',
                title: `${projectData?.projectTag?.name} -to- ${item.name}`,
              },
            };
          })
          ?.filter((item: any) => item?.data?.projectTag?.name !== '');
        console.log('debug111->newAffiliationsObject', newAffiliationsObject);
        if (newAffiliationsObject?.length > 0) {
          const updatedProjectsCoordonation = await bulkInsertItems(
            'Affiliations',
            newAffiliationsObject
          );
          console.log(
            'debug111->updatedProjectsCoordonation',
            updatedProjectsCoordonation
          );
        }
      }
    }

    // Update Participants
    if (
      checkIfArrayNeedsUpdateForTags(
        projectData.participants,
        defaultProjectData.participants
      )
    ) {
      // const updatedParticipants = await replaceDataItemReferences(
      //   'InfoPages',
      //   projectData.participants?.map((participant: any) => participant._id),
      //   'projectParticipantTeam',
      //   projectData._id
      // );
      // console.log('updatedParticipants', updatedParticipants);
      console.log('debug111-> updating project participation');
      const oldAffiliations = project?.affiliationsItems?.filter(
        (item: any) => item?.extraIdentifier === 'participation'
      );
      console.log('debug111->oldAffiliation', oldAffiliations);
      if (oldAffiliations && oldAffiliations?.length > 0) {
        const removeOldAffiliations = await bulkRemoveItems(
          'Affiliations',
          oldAffiliations?.map((item: any) => item._id)
        );
        console.log('debug111->removeOldAffiliations', removeOldAffiliations);
      }

      if (projectData.participants?.length > 0) {
        const newAffiliationsObject = projectData.participants
          ?.map((item: any) => {
            return {
              data: {
                projectTag: projectData.projectTag,
                personTag: item,
                extraIdentifier: 'participation',
                title: `${projectData.projectTag?.name} -to- ${item.name}`,
              },
            };
          })
          ?.filter((item: any) => item?.data?.projectTag?.name !== '');
        console.log('debug111->newAffiliationsObject', newAffiliationsObject);
        if (newAffiliationsObject?.length > 0) {
          const updatedProjectsParticipation = await bulkInsertItems(
            'Affiliations',
            newAffiliationsObject
          );

          console.log(
            'debug111->updatedProjectsParticipation',
            updatedProjectsParticipation
          );
        }
      }
    }

    // Revalidate the cache for the page
    // await refetchTags();
    // await refetchInfoPages();
    // await refetchAffiliations();
    // handleTagCreated();
    // await revalidateDataItem(`/project/${projectData.slug}`);

    await invalidateProjectPageCache(projectData.slug);

    setIsSaveInProgress(false);
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
  console.log('internalLinks', internalLinks);
  // #endregion

  // #region handle save or create new page
  const { insertDataItem } = useWixModules(items);

  const createNewProjectPage = async () => {
    console.log('Creating New Person Info Page');
    setIsSaveInProgress(true);

    // Create new project info page
    const newProjectInfo = await insertDataItem({
      dataCollectionId: 'InfoPages',
      dataItem: {
        data: {
          title: projectData?.projectTag?.name,
          description: projectData?.description,
          postContentRIch1: projectData?.contentText[0],
          postContentRIch2: projectData?.contentText[1],
          postContentRIch3: projectData?.contentText[2],
          postContentRIch4: projectData?.contentText[3],
          postContentRIch5: projectData?.contentText[4],
          postContentRIch6: projectData?.contentText[5],
          postContentRIch7: projectData?.contentText[6],
          postContentRIch8: projectData?.contentText[7],
          postContentRIch9: projectData?.contentText[8],
          postContentRIch10: projectData?.contentText[9],
          postImage1: projectData?.contentImages[0],
          postImage2: projectData?.contentImages[1],
          postImage3: projectData?.contentImages[2],
          postImage4: projectData?.contentImages[3],
          postImage5: projectData?.contentImages[4],
          postImage6: projectData?.contentImages[5],
          postImage7: projectData?.contentImages[6],
          postImage8: projectData?.contentImages[7],
          postImage9: projectData?.contentImages[8],
          postImage10: projectData?.contentImages[9],
          projectStartDate: projectData?.projectStartDate,
          projectEndDate: projectData?.projectEndDate,
          // projectOrganisationRoles: projectData?.organisations?.map(
          //   (item: any) => {
          //     return {
          //       organisation: item.name,
          //       role: item.arole,
          //     };
          //   }
          // ),
          mediaFiles: projectData?.mediaFiles,
          linkedinLink: projectData?.linkedinLink,
          websiteLink: projectData?.websiteLink,
          slug:
            sanitizeTitleForSlug(projectData?.projectTag?.name) +
            '-' +
            generateUniqueHash(),
        },
      },
    });

    const newProjectInfoId = newProjectInfo?.dataItem?._id;
    const newProjectInfoSlug = newProjectInfo?.dataItem?.data?.slug;

    // #region Update Author Tag and Project Tag
    const projectTag = projectData?.projectTag;

    const userTag = tags.find((tag) => tag.name === userDetails?.userName);

    if (newProjectInfoId && projectTag && userTag && userTag?._id) {
      const updatedAuthor = await replaceDataItemReferences(
        'InfoPages',
        [userTag._id],
        'Author',
        newProjectInfoId
      );
      console.log('updatedProjectTag', updatedAuthor);

      const updatedProjectTag = await replaceDataItemReferences(
        'InfoPages',
        [projectTag._id],
        'Project',
        newProjectInfoId
      );
      console.log('updatedProjectTag', updatedProjectTag);

      const updatedPageOwner = await replaceDataItemReferences(
        'InfoPages',
        [userTag?._id],
        'pageOwner',
        newProjectInfoId
      );
      console.log('updatedPageOwner', updatedPageOwner);
    }
    // #endregion

    // #region Update Page Type Tag
    if (projectData.pageType?._id && newProjectInfoId) {
      const updatedPageTypes = await replaceDataItemReferences(
        'InfoPages',
        [projectData.pageType?._id],
        'pageTypes',
        newProjectInfoId
      );
      console.log('updatedPageTypes', updatedPageTypes);
    }
    // #endregion

    // #region Update Country Tag
    if (projectData.countryTag?._id && newProjectInfoId) {
      const updatedCountryTag = await replaceDataItemReferences(
        'InfoPages',
        [projectData.countryTag?._id],
        'countryTag',
        newProjectInfoId
      );
      console.log('updatedCountryTag', updatedCountryTag);
    }
    // #endregion

    // #region Update Project Funded
    if (projectData.projectFunded?._id && newProjectInfoId) {
      const updatedProjectFunded = await replaceDataItemReferences(
        'InfoPages',
        [projectData.projectFunded?._id],
        'projectFunded',
        newProjectInfoId
      );
      console.log('updatedProjectFunded', updatedProjectFunded);
    }
    // #endregion

    // #region Update Foresight Methods
    if (projectData.methods && newProjectInfoId) {
      const validMethods = projectData.methods?.filter((method: any) => method);
      const updatedMethods = await replaceDataItemReferences(
        'InfoPages',
        validMethods?.map((method: any) => method._id),
        'methods',
        newProjectInfoId
      );
      console.log('updatedMethods', updatedMethods);
    }
    // #endregion

    // #region Update Domains
    if (projectData.domains && newProjectInfoId) {
      const validDomains = projectData.domains?.filter((domain: any) => domain);

      const updatedDomains = await replaceDataItemReferences(
        'InfoPages',
        validDomains?.map((domain: any) => domain._id),
        'domains',
        newProjectInfoId
      );
      console.log('updatedDomains', updatedDomains);
    }
    // #endregion

    // #region Update Coordinators
    if (projectData.coordinators && newProjectInfoId) {
      // const updatedCoordinators = await replaceDataItemReferences(
      //   'InfoPages',
      //   projectData.coordinators?.map((coordinator: any) => coordinator._id),
      //   'projectCoordinator',
      //   newProjectInfoId
      // );
      // console.log('updatedCoordinators', updatedCoordinators);
      console.log('debug111-> updating project Coordination');
      const oldAffiliations = project?.affiliationsItems?.filter(
        (item: any) => item?.extraIdentifier === 'coordination'
      );
      console.log('debug111->oldAffiliation', oldAffiliations);
      if (oldAffiliations && oldAffiliations?.length > 0) {
        const removeOldAffiliations = await bulkRemoveItems(
          'Affiliations',
          oldAffiliations?.map((item: any) => item._id)
        );
        console.log('debug111->removeOldAffiliations', removeOldAffiliations);
      }

      if (projectData.coordinators?.length > 0) {
        const newAffiliationsObject = projectData.coordinators
          ?.map((item: any) => {
            return {
              data: {
                projectTag: projectData.projectTag,
                personTag: item,
                extraIdentifier: 'coordination',
                title: `${projectData.projectTag?.name} -to- ${item.name}`,
              },
            };
          })
          ?.filter((item: any) => item?.data?.projectTag?.name !== '');
        console.log('debug111->newAffiliationsObject', newAffiliationsObject);
        if (newAffiliationsObject?.length > 0) {
          const updatedProjectsCoordonation = await bulkInsertItems(
            'Affiliations',
            newAffiliationsObject
          );

          console.log(
            'debug111->updatedProjectsCoordonation',
            updatedProjectsCoordonation
          );
        }
      }
    }
    // #endregion

    // #region Update Participants
    if (projectData.participants && newProjectInfoId) {
      // const updatedParticipants = await replaceDataItemReferences(
      //   'InfoPages',
      //   projectData.participants?.map((participant: any) => participant._id),
      //   'projectParticipantTeam',
      //   newProjectInfoId
      // );
      // console.log('updatedParticipants', updatedParticipants);
      console.log('debug111-> updating project participation');
      const oldAffiliations = project?.affiliationsItems?.filter(
        (item: any) => item?.extraIdentifier === 'participation'
      );
      console.log('debug111->oldAffiliation', oldAffiliations);
      if (oldAffiliations && oldAffiliations?.length > 0) {
        const removeOldAffiliations = await bulkRemoveItems(
          'Affiliations',
          oldAffiliations?.map((item: any) => item._id)
        );
        console.log('debug111->removeOldAffiliations', removeOldAffiliations);
      }
      if (projectData.participants?.length > 0) {
        const newAffiliationsObject = projectData.participants
          ?.map((item: any) => {
            return {
              data: {
                projectTag: projectData.projectTag,
                personTag: item,
                extraIdentifier: 'participation',
                title: `${projectData.projectTag?.name} -to- ${item.name}`,
              },
            };
          })
          ?.filter((item: any) => item?.data?.projectTag?.name !== '');
        console.log('debug111->newAffiliationsObject', newAffiliationsObject);
        if (newAffiliationsObject?.length > 0) {
          const updatedProjectsParticipation = await bulkInsertItems(
            'Affiliations',
            newAffiliationsObject
          );

          console.log(
            'debug111->updatedProjectsParticipation',
            updatedProjectsParticipation
          );
        }
      }
    }
    // #endregion

    // #region Update Organisation Roles
    if (projectData.organisations && newProjectInfoId) {
      // const updatedOrganisations = await replaceDataItemReferences(
      //   'InfoPages',
      //   projectData.organisations
      //     ?.map((org: any) => org._id)
      //     .filter((id: any) => id),
      //   'projectOrganisation',
      //   newProjectInfoId
      // );
      // console.log('updatedOrganisations', updatedOrganisations);
      console.log('debug111-> updating organisations roles');
      const oldAffiliations = project?.affiliationsItems?.filter(
        (item: any) => item?.extraIdentifier === 'projectOrganisationRole'
      );
      console.log('debug111->oldAffiliation', oldAffiliations);
      if (oldAffiliations && oldAffiliations?.length > 0) {
        const removeOldAffiliations = await bulkRemoveItems(
          'Affiliations',
          oldAffiliations?.map((item: any) => item._id)
        );
        console.log('debug111->removeOldAffiliations', removeOldAffiliations);
      }

      if (projectData.organisations?.length > 0) {
        const newAffiliationsObject = projectData.organisations
          ?.map((item: any) => {
            return {
              data: {
                projectTag: projectData.projectTag,
                organisationTag: item,
                role: item.arole,
                extraIdentifier: 'projectOrganisationRole',
                title: `${projectData?.projectTag?.name} -to- ${item?.name}`,
              },
            };
          })
          ?.filter((item: any) => item?.data?.organisationTag?.name !== '');
        console.log('debug111->newAffiliationsObject', newAffiliationsObject);
        if (newAffiliationsObject?.length > 0) {
          const updatedOrganisationsCurrent = await bulkInsertItems(
            'Affiliations',
            newAffiliationsObject
          );

          console.log(
            'debug111->updatedOrganisationsCurrent',
            updatedOrganisationsCurrent
          );
        }
      }
    }
    // #endregion

    // #region Update Person Tag
    // Check if object projectTag has changed
    if (!deepEqual(projectData?.projectTag, defaultProjectData?.projectTag)) {
      console.log('projectTag has changed');
      const updatedProjectTag = await updateDataItem(
        'Tags',
        projectData?.projectTag?._id,
        {
          _id: projectData.projectTag._id,
          ...projectData.projectTag,
          tagPageLink: '/project/' + newProjectInfoSlug,
        }
      );
      console.log('updatedProjectTag', updatedProjectTag);
    }
    // #endregion

    // #region Revalidate the cache for the page
    // await refetchTags();
    // await refetchInfoPages();
    // await refetchAffiliations();
    // await revalidateDataItem(`/project/${newProjectInfoSlug}`);
    // handleTagCreated();
    handleUserDataRefresh();
    await invalidateProjectPageCache(newProjectInfoSlug);

    router.push(`/project/${newProjectInfoSlug}`);

    setIsSaveInProgress(false);
    // #endregion
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
      const projectInfoTag = tags.find((tag) => tag.name === 'project info');
      console.log('debug1->projectInfoTag', projectInfoTag);
      if (projectInfoTag) {
        updateProjectDataOnKeyValue('pageType', projectInfoTag);
      }
    }
  }, [userDetails, tags]);

  useEffect(() => {
    isNewPage && handleTagCreated();
  }, []);

  return (
    <div className={classNames(style.personContainer)}>
      {!isNewPage && (
        <OgImage
          primaryImage={projectData.projectTag?.picture}
          secondaryImage={
            projectData.contentImages?.[0]?.url !== ' '
              ? projectData.contentImages?.[0]?.url
              : 'https://futures4europe.eu/images/placeholder.webp'
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
              'btn btn-save',
              isEditModeOn && checkValidationErrors() && 'bg-gray-400'
            )}
          >
            {!isEditModeOn
              ? 'Edit'
              : isNewPage
              ? 'Publish'
              : 'Save & publish changes'}
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
      <div className={classNames('py-3', style.preHeader)}>
        <Tag {...projectData?.pageType} />
        {/* Timestamp */}
        <section className="post-meta">
          <Typography tag="p" className="text-sm text-gray-400">
            Page creation date:{' '}
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
        tags={tags?.filter((tag) => tag?.tagType === 'foresight method')}
        selectedValues={projectData.methods?.map((method: any) => method?.name)}
        updatePostData={(value) =>
          updateProjectDataOnKeyValue('methods', value)
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
        tags={tags?.filter((tag) => tag?.tagType === 'domain')}
        selectedValues={projectData.domains?.map((domain: any) => domain?.name)}
        updatePostData={(value) =>
          updateProjectDataOnKeyValue('domains', value)
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
        tags={tags?.filter((tag) => tag?.tagType === 'person')}
        selectedValues={projectData.coordinators?.map(
          (coordinator: any) => coordinator?.name
        )}
        updatePostData={(value) =>
          updateProjectDataOnKeyValue('coordinators', value)
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
        tags={tags?.filter((tag) => tag?.tagType === 'person')}
        selectedValues={projectData.participants?.map(
          (participant: any) => participant?.name
        )}
        updatePostData={(value) =>
          updateProjectDataOnKeyValue('participants', value)
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
          updateProjectDataOnKeyValue('organisations', value)
        }
        tags={tags?.filter((tag) => tag?.tagType === 'organisation')}
        handleTagCreated={handleTagCreated}
        tagType="organisation"
      />
      {/* Content related to this Info Page */}
      <MiniPagesListComponentPost
        isEditModeOn={isEditModeOn}
        internalLinks={internalLinks}
        handleUpdatePostData={(value) =>
          updateProjectDataOnKeyValue('internalLinks', value)
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
