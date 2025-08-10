'use client';
import { useAuth } from '@app/custom-hooks/AuthContext/AuthContext';
import { items } from '@wix/data';
import { useWixModules } from '@wix/sdk-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@app/shared-components/LoadingSpinner/LoadingSpinner';
import Link from 'next/link';
import {
  extractInfoPageTypeBasedOnTag,
  filterDuplicateAffiliations,
} from '@app/utils/parse-utils';
import classNames from 'classnames';
import { members } from '@wix/members';
import NavDashboard from '@app/shared-components/Layout/NavDashboard/NavDashboard';
import SubNavDashboard from '@app/shared-components/Layout/NavDashboard/SubNavDashboard';
import style from '../pageDashboard.module.css';
import { Button } from 'flowbite-react';
import Typography from '@app/shared-components/Typography/Typography';
import SpriteSvg from '@app/shared-components/SpriteSvg/SpriteSvg';
import Tag from '../../shared-components/Tag/Tag';
import MiniPagePost from '@app/shared-components/MiniPagePost/MiniPagePost';
import { PLACEHOLDER_IMAGE } from '../../constants'; // Adjust the path as needed
import {
  bulkInsertItems,
  getContactsItem,
  getContactsItemByEmail,
  updateMember,
} from '@app/wixUtils/client-side';

export default function DashboardProjects() {
  const [isLoadingDeletePostPage, setIsLoadingDeletePostPage] = useState('');
  const [userInfoPage, setUserInfoPage] = useState('');

  const {
    login,
    isLoggedIn,
    loading,
    userDetails,
    logout,
    ownedInfoPages,
    ownedPostPages,
    ownedPostPagesFetched,
    ownedInfoPagesFetched,
    handleUserDataRefresh,
    tags,
    allOwnedPages,
    infoPages,
  } = useAuth();

  const wixModules = useWixModules(items);
  const router = useRouter();

  interface UserDetails {
    contactId: string;
    isAdmin: boolean;
  }

  interface InfoPage {
    _id: string;
    _owner: string;
  }

  // Add check for admin status
  const isWixAdmin = userDetails?.isAdmin || false;

  async function handleDeleteInfoPage(infoPageId: InfoPage['_id']) {
    setIsLoadingDeletePostPage(infoPageId);

    try {
      const userId = userDetails?.contactId;

      if (userDetails?.isAdmin !== true && infoPageId?._owner !== userId) {
        console.error('debug2->Unauthorized to delete info page');
        return;
      }

      console.log(
        'debug2->Proceeding with info page delete for ID:',
        infoPageId
      );

      await wixModules.removeDataItem(infoPageId, {
        dataCollectionId: 'InfoPages',
      });

      console.log('debug2->Delete info page successful');
    } catch (error) {
      console.error('debug2->Failed to delete info page:', error);
    } finally {
      setIsLoadingDeletePostPage('');
      handleUserDataRefresh();
    }
  }

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/login');
    }
    // Get the user's tag page link
    if (isLoggedIn && tags) {
      const userTag = tags.find(
        (tag: any) => tag.name === userDetails.userName && tag.tagPageLink
      );
      if (userTag) {
        setUserInfoPage(userTag?.tagPageLink || '');
      }
    }
  }, [isLoggedIn, router, loading]);

  const handleLogOut = async () => {
    logout();
    router.push('/login');
  };

  const handleCreateOrNavigateToPersonInfoPage = () => {
    if (userInfoPage) {
      return `${userInfoPage}`;
    }
    return `/person/New_Info_Page`;
  };

  const subNavItems = [
    { href: '/dashboard/projects', text: 'All Projects', isActive: true },
  ];

  // const handleCreateAffiliations = async () => {
  //   console.log('debug222->infoPages', infoPages);
  //   const projectInfoPages = infoPages
  //     .filter(
  //       (infoPage) =>
  //         infoPage?.data?.pageTypes[0]?.name === 'project info' &&
  //         infoPage?.data?.Project?.[0]?.name === 'CROSSEU'
  //     )
  //     .map((infoPage) => infoPage.data);
  //   console.log('debug222->projectInfoPages', projectInfoPages);

  //   let allProjectOrganisationRolesAffiliations: any[] = [];

  //   for (let i = 0; i < projectInfoPages.length; i++) {
  //     const projectOrganisationRolesAffiliations = projectInfoPages[
  //       i
  //     ]?.projectOrganisationRoles
  //       ?.map((role: any, index: number) => {
  //         return {
  //           data: {
  //             projectTag: projectInfoPages[i]?.Project?.[0],
  //             organisationTag:
  //               projectInfoPages[i]?.projectOrganisation?.[index],
  //             role: role.role,
  //             extraIdentifier: 'projectOrganisationRole',
  //             title: `${projectInfoPages[i]?.Project?.[0]?.name} -to- ${projectInfoPages[i]?.projectOrganisation?.[index]?.name}`,
  //           },
  //         };
  //       })
  //       ?.filter((item: any) => item?.data?.organisationTag?.name);
  //     allProjectOrganisationRolesAffiliations = [
  //       ...allProjectOrganisationRolesAffiliations,
  //       ...projectOrganisationRolesAffiliations,
  //     ];
  //   }

  //   // console.log(
  //   //   'debug222->allProjectOrganisationRolesAffiliations',
  //   //   allProjectOrganisationRolesAffiliations
  //   // );

  //   let allProjectCoordinators: any[] = [];

  //   for (let i = 0; i < projectInfoPages.length; i++) {
  //     const projectCoordinators = projectInfoPages[i]?.projectCoordinator
  //       ?.map((coordinator: any) => {
  //         return {
  //           data: {
  //             projectTag: projectInfoPages[i]?.Project?.[0],
  //             personTag: coordinator,
  //             extraIdentifier: 'coordination',
  //             title: `${projectInfoPages[i]?.Project?.[0]?.name} -to- ${coordinator?.name}`,
  //           },
  //         };
  //       })
  //       ?.filter((item: any) => item?.data?.personTag?.name);
  //     allProjectCoordinators = [
  //       ...allProjectCoordinators,
  //       ...projectCoordinators,
  //     ];
  //   }

  //   console.log('debug222->allProjectCoordinators', allProjectCoordinators);

  //   let allProjectParticipantTeam: any[] = [];

  //   for (let i = 0; i < projectInfoPages.length; i++) {
  //     const projectParticipantTeam = projectInfoPages[i]?.projectParticipantTeam
  //       ?.map((participant: any) => {
  //         return {
  //           data: {
  //             projectTag: projectInfoPages[i]?.Project?.[0],
  //             personTag: participant,
  //             extraIdentifier: 'participation',
  //             title: `${projectInfoPages[i]?.Project?.[0]?.name} -to- ${participant?.name}`,
  //           },
  //         };
  //       })
  //       ?.filter((item: any) => item?.data?.personTag?.name);
  //     allProjectParticipantTeam = [
  //       ...allProjectParticipantTeam,
  //       ...projectParticipantTeam,
  //     ];
  //   }
  //   console.log(
  //     'debug222->allProjectParticipantTeam',
  //     allProjectParticipantTeam
  //   );

  //   const allProjectAffiliations = [
  //     ...allProjectOrganisationRolesAffiliations,
  //     ...allProjectCoordinators,
  //     ...allProjectParticipantTeam,
  //   ];
  //   //console.log('debug222->allProjectAffiliations', allProjectAffiliations);

  //   const allAffiliations = [
  //     ...allProjectAffiliations,
  //     // ...allPersonAffiliations,
  //     // ...allOrganisationAffiliations,
  //   ];

  //   //  console.log('debug222->allAffiliations', allAffiliations);

  //   // const filteredDuplicateAffiliations =
  //   //   filterDuplicateAffiliations(allAffiliations);
  //   // console.log(
  //   //   'debug222->filteredDuplicateAffiliations',
  //   //   filteredDuplicateAffiliations
  //   // );

  //   // #region bulk create affiliations
  //   const allAffiliationsUpload = await bulkInsertItems(
  //     'Affiliations',
  //     allAffiliations
  //   );

  //   console.log('debug222->allAffiliationsUpload', allAffiliationsUpload);

  //   // #endregion

  //   // const projectOrganisationRolesAffiliations =
  //   //   projectInfoPages[0]?.projectOrganisationRoles
  //   //     ?.map((role: any, index: number) => {
  //   //       return {
  //   //         data: {
  //   //           projectTag: projectInfoPages[0]?.Project?.[0],
  //   //           organisationTag:
  //   //             projectInfoPages[0]?.projectOrganisation?.[index],
  //   //           role: role.role,
  //   //           extraIdentifier: 'projectOrganisationRole',
  //   //           title: `${projectInfoPages[0]?.Project?.[0]?.name} -to- ${projectInfoPages[0]?.projectOrganisation?.[index]?.name}`,
  //   //         },
  //   //       };
  //   //     })
  //   //     .filter((item: any) => item?.data?.organisationTag?.name);
  //   // console.log(
  //   //   'debug222->projectOrganisationRolesAffiliations',
  //   //   projectOrganisationRolesAffiliations
  //   // );
  // };

  // const { updateMember } = useWixModules(members);

  // const handleEditContact = async () => {
  //   // console.log('debug222->infoPages', infoPages);
  //   console.log('debug111->editing contact');
  //   const contactsDetails = await getContactsItemByEmail(
  //     'lourdes@teachthefuture.org'
  //   );

  //   console.log('debug111->contactsDetails', contactsDetails);
  //   // const userDetails = await getContactsItem(
  //   //   '109653a5-50a6-4adf-8a12-f2e027152a3b'
  //   // );
  //   // console.log('debug111->userDetails', userDetails);

  //   // const member = await updateMember(
  //   //   '109653a5-50a6-4adf-8a12-f2e027152a3b',
  //   //   'Aaron B. Rosa'
  //   // );

  //   // console.log('debug111->member', member);

  //   // const projectInfoPages = infoPages
  //   //   .filter(
  //   //     (infoPage) =>
  //   //       infoPage?.data?.pageTypes[0]?.name === 'project info' &&
  //   //       infoPage?.data?.Project?.[0]?.name === 'CROSSEU'
  //   //   )
  //   //   .map((infoPage) => infoPage.data);
  //   // console.log('debug222->projectInfoPages', projectInfoPages);

  //   // let allProjectOrganisationRolesAffiliations: any[] = [];

  //   // for (let i = 0; i < projectInfoPages.length; i++) {
  //   //   const projectOrganisationRolesAffiliations = projectInfoPages[
  //   //     i
  //   //   ]?.projectOrganisationRoles
  //   //     ?.map((role: any, index: number) => {
  //   //       return {
  //   //         data: {
  //   //           projectTag: projectInfoPages[i]?.Project?.[0],
  //   //           organisationTag:
  //   //             projectInfoPages[i]?.projectOrganisation?.[index],
  //   //           role: role.role,
  //   //           extraIdentifier: 'projectOrganisationRole',
  //   //           title: `${projectInfoPages[i]?.Project?.[0]?.name} -to- ${projectInfoPages[i]?.projectOrganisation?.[index]?.name}`,
  //   //         },
  //   //       };
  //   //     })
  //   //     ?.filter((item: any) => item?.data?.organisationTag?.name);
  //   //   allProjectOrganisationRolesAffiliations = [
  //   //     ...allProjectOrganisationRolesAffiliations,
  //   //     ...projectOrganisationRolesAffiliations,
  //   //   ];
  //   // }

  //   // console.log(
  //   //   'debug222->allProjectOrganisationRolesAffiliations',
  //   //   allProjectOrganisationRolesAffiliations
  //   // );

  //   // let allProjectCoordinators: any[] = [];

  //   // for (let i = 0; i < projectInfoPages.length; i++) {
  //   //   const projectCoordinators = projectInfoPages[i]?.projectCoordinator
  //   //     ?.map((coordinator: any) => {
  //   //       return {
  //   //         data: {
  //   //           projectTag: projectInfoPages[i]?.Project?.[0],
  //   //           personTag: coordinator,
  //   //           extraIdentifier: 'coordination',
  //   //           title: `${projectInfoPages[i]?.Project?.[0]?.name} -to- ${coordinator?.name}`,
  //   //         },
  //   //       };
  //   //     })
  //   //     ?.filter((item: any) => item?.data?.personTag?.name);
  //   //   allProjectCoordinators = [
  //   //     ...allProjectCoordinators,
  //   //     ...projectCoordinators,
  //   //   ];
  //   // }

  //   // console.log('debug222->allProjectCoordinators', allProjectCoordinators);

  //   // let allProjectParticipantTeam: any[] = [];

  //   // for (let i = 0; i < projectInfoPages.length; i++) {
  //   //   const projectParticipantTeam = projectInfoPages[i]?.projectParticipantTeam
  //   //     ?.map((participant: any) => {
  //   //       return {
  //   //         data: {
  //   //           projectTag: projectInfoPages[i]?.Project?.[0],
  //   //           personTag: participant,
  //   //           extraIdentifier: 'participation',
  //   //           title: `${projectInfoPages[i]?.Project?.[0]?.name} -to- ${participant?.name}`,
  //   //         },
  //   //       };
  //   //     })
  //   //     ?.filter((item: any) => item?.data?.personTag?.name);
  //   //   allProjectParticipantTeam = [
  //   //     ...allProjectParticipantTeam,
  //   //     ...projectParticipantTeam,
  //   //   ];
  //   // }
  //   // console.log(
  //   //   'debug222->allProjectParticipantTeam',
  //   //   allProjectParticipantTeam
  //   // );

  //   // const allProjectAffiliations = [
  //   //   ...allProjectOrganisationRolesAffiliations,
  //   //   ...allProjectCoordinators,
  //   //   ...allProjectParticipantTeam,
  //   // ];
  //   //console.log('debug222->allProjectAffiliations', allProjectAffiliations);

  //   // const allAffiliations = [
  //   //   ...allProjectAffiliations,
  //   //   // ...allPersonAffiliations,
  //   //   // ...allOrganisationAffiliations,
  //   // ];

  //   //  console.log('debug222->allAffiliations', allAffiliations);

  //   // const filteredDuplicateAffiliations =
  //   //   filterDuplicateAffiliations(allAffiliations);
  //   // console.log(
  //   //   'debug222->filteredDuplicateAffiliations',
  //   //   filteredDuplicateAffiliations
  //   // );

  //   // #region bulk create affiliations
  //   // const allAffiliationsUpload = await bulkInsertItems(
  //   //   'Affiliations',
  //   //   allAffiliations
  //   // );

  //   // console.log('debug222->allAffiliationsUpload', allAffiliationsUpload);

  //   // #endregion

  //   // const projectOrganisationRolesAffiliations =
  //   //   projectInfoPages[0]?.projectOrganisationRoles
  //   //     ?.map((role: any, index: number) => {
  //   //       return {
  //   //         data: {
  //   //           projectTag: projectInfoPages[0]?.Project?.[0],
  //   //           organisationTag:
  //   //             projectInfoPages[0]?.projectOrganisation?.[index],
  //   //           role: role.role,
  //   //           extraIdentifier: 'projectOrganisationRole',
  //   //           title: `${projectInfoPages[0]?.Project?.[0]?.name} -to- ${projectInfoPages[0]?.projectOrganisation?.[index]?.name}`,
  //   //         },
  //   //       };
  //   //     })
  //   //     .filter((item: any) => item?.data?.organisationTag?.name);
  //   // console.log(
  //   //   'debug222->projectOrganisationRolesAffiliations',
  //   //   projectOrganisationRolesAffiliations
  //   // );
  // };

  return (
    <div
      className={classNames(
        style.UserDashboard,
        style.UserDashboardProjects,
        'flex flex-col'
      )}
    >
      <NavDashboard
        userInfoPage={true}
        handleCreateOrNavigateToPersonInfoPage={
          handleCreateOrNavigateToPersonInfoPage
        }
        handleLogOut={handleLogOut}
        SubNav={<SubNavDashboard items={subNavItems} style={style} />}
        activeItem="/dashboard/projects"
      />

      <div
        className={classNames(
          style.UserDashboardWrapper,
          'flex flex-col relative m-auto mt-10 mb-6'
        )}
      >
        {/* NOTE: Removed afer 15.10 discussions*/}
        {/* <h1 className={classNames(style.headingDashboardh1, 'mt-2 mb-4 p-0')}>
          My projects
        </h1> */}
        {/* <p className="text-base text-[#606b85]">
          Would you like to showcase your foresight project and share insights
          from your work? You can upload your project here and add outputs and
          team members.
        </p> */}

        <div
          className={classNames(
            style.dashboardBox,
            style.dashboardBoxAddWrap,
            'mt-14',
            'mb-10',
            'p-8',
            'bg-primary-site'
          )}
        >
          <div className={classNames(style.dashboardBoxAdd, 'flex flex-col')}>
            <div className="flex items-center mb-4">
              <SpriteSvg.AccountProjectIcon
                className="text-color-white"
                sizeW={24}
                sizeH={24}
                viewBox={'0 0 32 32'}
                fill={'none'}
                stroke={'#fff'}
                strokeWidth={2}
                inline={false}
              />
              <Typography
                tag="h2"
                className={classNames(style.headingDashboardh1, 'ml-2')}
              >
                Project section
              </Typography>
            </div>
            {/*  */}

            <div className="flex flex-col justify-between">
              <p className={classNames(style.boxTextDashboard, 'mb-8')}>
                Add a detailed overview of your project. Include its objectives,
                scope, key activities, and any significant outcomes or findings.
              </p>
            </div>

            <div className={classNames(style.listDashboard, 'flex')}>
              <Link href="/project/New_Project">
                <Button
                  size={'md'}
                  color={'light'}
                  className={classNames(
                    style.buttonAddDashboard,
                    'block border-0 mr-4 focus:ring-purple-300'
                  )}
                  pill
                >
                  <SpriteSvg.AccountAddIcon
                    sizeH={24}
                    sizeW={24}
                    viewBox={'0 -1 14 14'}
                    strokeWidth={1}
                  />
                  <span className="text-lg">Add project</span>
                </Button>
              </Link>
              {/* <Button
                size={'md'}
                color={'light'}
                className={classNames(
                  style.buttonAddDashboard,
                  'block border-0 mr-4 focus:ring-purple-300'
                )}
                pill
                onClick={handleEditContact}
              >
                Edit Account
              </Button> */}
            </div>
          </div>
        </div>

        <div className={classNames(style.dashboardBox, 'mt-14 mb-10 p-8')}>
          <div className="flex flex-col">
            <div className="flex flex-col justify-between">
              <h2
                className={classNames(
                  style.headingDashboardh1,
                  'mt-0 mb-0 flex flex-row items-center'
                )}
              >
                Project list
              </h2>
              <p className={classNames(style.boxTextDashboard, 'mb-8')}>
                In this section of your account you can manage your list.
              </p>
            </div>

            <div
              className={classNames(
                style.listDashboard,
                'flex flex-col text-base text-[#606b85]'
              )}
            >
              {allOwnedPages.length ? (
                <>
                  {allOwnedPages.length > 0 ? (
                    allOwnedPages
                      .filter(
                        (infoPage) =>
                          infoPage?.data?.pageTypes[0]?.name === 'project info'
                      )
                      .map((infoPage, index) => (
                        <div
                          key={infoPage.data.title + index}
                          className="pt-2 pb-2 flex flex-row items-center justify-between"
                        >
                          <div
                            className={
                              'w-full flex flex-row w-full justify-between'
                            }
                          >
                            <Link
                              className={'w-full grow'}
                              href={`/${extractInfoPageTypeBasedOnTag(
                                infoPage?.data?.pageTypes[0]
                              )}/${infoPage.data.slug}`}
                            >
                              <MiniPagePost
                                pageTypeTag={infoPage.data.pageTypes?.[0]}
                                key={index}
                                title={infoPage?.data?.title}
                                tagLine={infoPage?.data.Project?.[0]?.tagLine}
                                popularity={
                                  infoPage?.data?.pageTypes[0]?.popularity
                                }
                                subtitle={infoPage?.data?.subtitle}
                                countryTags={infoPage?.data?.countryTag ?? []}
                                projectFunded={
                                  infoPage?.data?.projectFunded ?? []
                                }
                                organisationAffiliations={
                                  infoPage?.data?.projectOrganisationRoles?.slice(
                                    0,
                                    3
                                  ) ?? []
                                }
                                date={infoPage.data._createdDate?.$date}
                                editDate={infoPage?.data?._updatedDate?.$date}
                                image={
                                  infoPage.data.Project?.[0]?.picture ||
                                  PLACEHOLDER_IMAGE
                                }
                                text={infoPage.data.postContentRIch1}
                                domains={[
                                  ...(infoPage.data.domains ?? []),
                                  ...(infoPage.data.methods ?? []),
                                ]?.slice(0, 3)}
                                projectStartDate={''}
                                projectEndDate={''}
                              />
                            </Link>
                            {/* Only show delete button for admins */}
                            {/* Admin Delete Button */}
                            {isWixAdmin && (
                              <div className="">
                                <Button
                                  size="sm"
                                  color="failure"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (
                                      window.confirm(
                                        'Are you sure you want to delete this post?'
                                      )
                                    ) {
                                      handleDeleteInfoPage(infoPage?.data?._id);
                                    }
                                  }}
                                  disabled={
                                    isLoadingDeletePostPage ===
                                    infoPage?.data?._id
                                  }
                                  className="rounded-full p-2 h-8 w-8 flex items-center justify-center"
                                >
                                  <SpriteSvg.AccountTrashIcon
                                    sizeH={16}
                                    sizeW={16}
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    strokeWidth={0}
                                  />
                                </Button>
                              </div>
                            )}
                          </div>

                          {isLoadingDeletePostPage &&
                            isLoadingDeletePostPage === infoPage?.data?._id && (
                              <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
                                <LoadingSpinner />
                              </div>
                            )}
                        </div>
                      ))
                  ) : (
                    <div>No Info Pages</div>
                  )}
                </>
              ) : (
                <>
                  {ownedPostPagesFetched && ownedInfoPagesFetched ? (
                    <div>No Items</div>
                  ) : (
                    <LoadingSpinner />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
