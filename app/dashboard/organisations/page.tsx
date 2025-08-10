'use client';
import { useAuth } from '@app/custom-hooks/AuthContext/AuthContext';
import { items } from '@wix/data';
import { useWixModules } from '@wix/sdk-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@app/shared-components/LoadingSpinner/LoadingSpinner';
import Link from 'next/link';
import { extractInfoPageTypeBasedOnTag } from '@app/utils/parse-utils';
import classNames from 'classnames';
import { members } from '@wix/members';
import NavDashboard from '@app/shared-components/Layout/NavDashboard/NavDashboard';
import SubNavDashboard from '@app/shared-components/Layout/NavDashboard/SubNavDashboard';
import style from '../pageDashboard.module.css';
import { Avatar, Button } from 'flowbite-react';
import SpriteSvg from '@app/shared-components/SpriteSvg/SpriteSvg';
import Tag from '../../shared-components/Tag/Tag';
import MiniPagePost from '@app/shared-components/MiniPagePost/MiniPagePost';
import Typography from '@app/shared-components/Typography/Typography';
import { PLACEHOLDER_IMAGE } from '../../constants'; // Adjust the path as needed

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
  } = useAuth();

  const router = useRouter();
  const { removeDataItem } = useWixModules(items);
  // const { updateMember } = useWixModules(members);

  const handleDeleteInfoPage = async (infoPageId: string) => {
    setIsLoadingDeletePostPage(infoPageId);
    try {
      // Replace with your actual delete logic
      await removeDataItem(infoPageId, {
        dataCollectionId: 'InfoPages',
      });
      // TODO: Refresh Owned Pages
    } catch (error) {
      console.error('Failed to delete info page:', error);
    } finally {
      setIsLoadingDeletePostPage('');
      handleUserDataRefresh();
    }
  };

  useEffect(() => {
    // console.log('debug1 -> isLoggedIn:', isLoggedIn); // Debugging line
    if (!loading && !isLoggedIn) {
      router.push('/login');
    }
    // Get the user's tag page link
    if (isLoggedIn && tags) {
      const userTag = tags.find(
        (tag: any) => tag.name === userDetails.userName && tag.tagPageLink
      );
      console.log('userTag', userTag);
      if (userTag) {
        setUserInfoPage(userTag?.tagPageLink);
      }
    }
  }, [isLoggedIn, router, loading]);

  if (!isLoggedIn) {
    //Loading Spinner
    return <LoadingSpinner />;
  }

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
    {
      href: '/dashboard/organisations',
      text: 'All Organisations',
      isActive: true,
    },
  ];

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
        activeItem={'/dashboard/organisations'}
      />

      <div
        className={classNames(
          style.UserDashboardWrapper,
          'flex flex-col relative m-auto mt-10 mb-6'
        )}
      >
        {/* <h1 className={classNames(style.headingDashboardh1, 'mt-2 mb-4 p-0')}>
          My organisations
        </h1> */}
        {/* <p className="text-base text-[#606b85]">
          This is your dashboard for managing all the organisations youre
          connected. You can showcase your foresight project and share insights.
          Access your organizations to manage members and much more.
        </p> */}

        <div
          className={classNames(
            style.dashboardBox, // CSS Module class
            style.dashboardBoxAddWrap, // Another CSS Module class
            'mt-14', // Global utility classes (e.g., Tailwind, or other global CSS)
            'mb-10',
            'p-8',
            'bg-primary-site'
          )}
        >
          <div className={classNames(style.dashboardBoxAdd, 'flex flex-col')}>
            <div className="flex items-center mb-4">
              <SpriteSvg.AccountOrg2Icon
                className="text-color-white"
                sizeW={24}
                sizeH={24}
                viewBox={'0 0 18 18'}
                fill={'#fff'}
                stroke={'0'}
                inline={false}
              />
              <Typography
                tag="h2"
                className={classNames(style.headingDashboardh1, 'ml-2')}
              >
                Organisation section
              </Typography>
            </div>

            <div className="flex flex-col justify-between">
              <p className={classNames(style.boxTextDashboard, 'mb-8')}>
                Add a detailed overview of your organisation. Include its
                afilliates, projects, key members, and any significant outcomes
                or findings.
              </p>
            </div>

            <div className={classNames(style.listDashboard, 'flex')}>
              <Link href="/organisation/New_Organisation">
                <Button
                  size={'md'}
                  color={'light'}
                  className={classNames(
                    style.buttonAddDashboard,
                    'block border-0 focus:ring-purple-300'
                  )}
                  pill
                >
                  <SpriteSvg.AccountAddIcon
                    sizeH={24}
                    sizeW={24}
                    viewBox={'0 -1 14 14'}
                    strokeWidth={1}
                  />
                  <span className="text-lg">Add organisation</span>
                </Button>
              </Link>
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
                Organisations list
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
                          infoPage?.data?.pageTypes[0]?.name ===
                          'organisation info'
                      )
                      .map(
                        (infoPage, index) => (
                          console.log('Organ', infoPage),
                          (
                            <div
                              key={infoPage?.data?.title + index}
                              className="pt-2 pb-2 flex flex-row items-center justify-between"
                            >
                              {/* <span>{infoPage.data.title}</span> */}
                              <div
                                className={
                                  'flex flex-row w-full justify-between'
                                }
                              >
                                <Link
                                  className="grow"
                                  href={`/${extractInfoPageTypeBasedOnTag(
                                    infoPage?.data?.pageTypes[0]
                                  )}/${infoPage.data.slug}`}
                                >
                                  <MiniPagePost
                                    key={index}
                                    pageTypeTag={infoPage.data.pageTypes?.[0]}
                                    title={infoPage?.data.title}
                                    tagLine={
                                      infoPage?.data.organisation?.[0]?.tagLine
                                    }
                                    popularity={
                                      infoPage?.data?.pageTypes[0]?.popularity
                                    }
                                    subtitle={infoPage?.data?.subtitle}
                                    countryTags={
                                      infoPage?.data?.countryTag ?? []
                                    }
                                    organisationEstablishedDate={
                                      infoPage?.data
                                        ?.organisationEstablishedDate
                                    }
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
                                    editDate={
                                      infoPage?.data?._updatedDate?.$date
                                    }
                                    image={
                                      infoPage.data.organisation?.[0]
                                        ?.picture || PLACEHOLDER_IMAGE
                                    }
                                    text={infoPage?.data?.description}
                                  />
                                </Link>
                              </div>

                              {isLoadingDeletePostPage &&
                                isLoadingDeletePostPage ===
                                  infoPage?.data?._id && (
                                  <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
                                    <LoadingSpinner />
                                  </div>
                                )}
                              {/* <pre>{JSON.stringify(infoPage.data, null, 2)}</pre> */}
                            </div>
                          )
                        )
                      )
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
