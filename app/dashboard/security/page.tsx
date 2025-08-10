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
import stylefile from './pageDashboardSecurity.module.css';
import style from '../pageDashboard.module.css';
import SpriteSvg from '@app/shared-components/SpriteSvg/SpriteSvg';

export default function DashboardSecurity() {
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
  } = useAuth();
  console.log('Dashboard isLoggedIn', isLoggedIn);

  const router = useRouter();
  const { removeDataItem } = useWixModules(items);
  // const { updateMember } = useWixModules(members);

  const handleCreatePost = async () => {
    router.push(`/post/New_Post`);
  };

  const handleListProjects = async () => {
    router.push(`/dashboard/projects`);
  };

  const handleCreatePersonInfoPage = async () => {
    if (userInfoPage) {
      router.push(`/person/${userInfoPage}`);
      return;
    }
    router.push(`/person/New_Info_Page`);
  };

  const handleListProfileSettings = async () => {
    router.push(`/dashboard`);
  };

  const handleListPosts = async () => {
    router.push(`/dashboard/post`);
  };

  const handleCreateOrganisation = async () => {
    router.push(`/organisation/New_Organisation`);
  };

  const handleDeletePostPage = async (infoPageId: string) => {
    setIsLoadingDeletePostPage(infoPageId);
    try {
      // Replace with your actual delete logic
      await removeDataItem(infoPageId, {
        dataCollectionId: 'PostPages',
      });
      // TODO: Refresh Owned Pages
    } catch (error) {
      console.error('Failed to delete info page:', error);
    } finally {
      setIsLoadingDeletePostPage('');
      handleUserDataRefresh();
    }
  };

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

  console.log('loading', loading);

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
    { href: '/dashboard', text: 'Account', isActive: true },
    { href: '/dashboard/security', text: 'Security' },
    { href: '/dashboard/change-password', text: 'Password' },
  ];

  return (
    <div className={classNames(style.UserDashboard, 'flex flex-col')}>
      <NavDashboard
        userInfoPage={true}
        handleCreateOrNavigateToPersonInfoPage={
          handleCreateOrNavigateToPersonInfoPage
        }
        handleLogOut={handleLogOut}
        SubNav={<SubNavDashboard items={subNavItems} style={style} />}
        activeItem="/dashboard"
      />

      <div
        className={classNames(
          style.UserDashboardWrapper,
          'flex flex-col relative m-auto mt-10 mb-6'
        )}
      >
        <h1 className={classNames(style.headingDashboardh1, 'mt-2 mb-4 p-0')}>
          Keep account safe
        </h1>
        <p className="text-base text-[#606b85]">
          Info about your security preferences across futures4europe services.
          Manage all your security information and options to help you keep your
          account secure.
        </p>

        <div className={classNames(style.dashboardBox, 'mt-14 mb-10 p-8')}>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h3
                className={classNames(
                  style.headingDashboardh3,
                  'mr-4 flex flex-row items-center'
                )}
              >
                <SpriteSvg.AccountLockIcon
                  className="mb-0"
                  sizeW={38}
                  sizeH={38}
                  fill={'currentColor'}
                  strokeWidth={0}
                  inline={true}
                />
              </h3>
            </div>

            <div className="flex flex-col justify-between">
              <h2
                className={classNames(
                  style.headingDashboardh1,
                  'mt-8 mb-0 flex flex-row items-center'
                )}
              >
                Basic security information
              </h2>
              <p className={classNames(style.boxTextDashboard, 'mb-8')}>
                Make sure you can always access your Account by keeping this
                information up to date.
              </p>
            </div>

            <div
              className={classNames(
                style.listDashboard,
                'flex flex-col text-base text-[#606b85]'
              )}
            >
              {/* // TODO BUTTON CHANGE EMAIL @alex */}
              <div
                className={
                  'pt-2 pb-2 flex flex-row items-center justify-between'
                }
              >
                <Link
                  href={`/change-password`}
                  className={classNames(
                    style.active,
                    'pt-2 pb-2 flex flex-row grow items-center justify-between'
                  )}
                >
                  <span className="">Recovery email</span>
                  <span className="ml-1">
                    <SpriteSvg.AccountLockedIcon
                      strokeWidth={0}
                      viewBox={'0 -4 38 38'}
                    />
                    <span className="ml-1">{userDetails?.email}</span>
                  </span>
                </Link>
              </div>

              <div
                className={
                  'pt-2 pb-2 flex flex-row items-center justify-between'
                }
              >
                <span className="">Last login</span>
                <span className="ml-4">{userDetails?.lastLoginDate}</span>
              </div>

              <div
                className={
                  'pt-2 pb-2 flex flex-row items-center justify-between'
                }
              >
                <span className="">Google login</span>
                <span className="ml-4">
                  <img
                    alt=""
                    className="h-5 mr-2"
                    src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                  />
                </span>
              </div>

              <div className={'flex'}>
                <Link
                  href={`/change-password`}
                  className={classNames(
                    style.active,
                    'pt-2 pb-2 flex flex-row grow items-center justify-between'
                  )}
                >
                  <span className="">Reset password</span>
                  <div className="flex items-center ml-4">
                    <span className="ml-1">
                      <SpriteSvg.AccountPasswordIcon
                        className="text-color-white"
                        sizeW={28}
                        sizeH={28}
                        viewBox={'0 0 28 14'}
                        fill={'none'}
                        strokeWidth={1}
                        inline={false}
                      />
                    </span>
                    <span className="">Change</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={classNames(style.dashboardBox, 'mt-14 mb-10 p-8')}>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h3
                className={classNames(
                  style.headingDashboardh3,
                  'mr-4 flex flex-row items-center'
                )}
              >
                <SpriteSvg.AccountHumanIcon
                  className="mb-0"
                  sizeW={38}
                  sizeH={38}
                  fill={'currentColor'}
                  strokeWidth={0}
                  inline={true}
                />
              </h3>
            </div>

            <div className="flex flex-col justify-between">
              <h2
                className={classNames(
                  style.headingDashboardh1,
                  'mt-8 mb-0 flex flex-row items-center'
                )}
              >
                Contact information
              </h2>
              <p className={classNames(style.boxTextDashboard, 'mb-8')}>
                Your contact information is important for reaching to you. It
                includes details like your email addres and account status.
              </p>
            </div>

            <div
              className={classNames(
                style.listDashboard,
                'flex flex-col text-base text-[#606b85]'
              )}
            >
              <div
                className={
                  'pt-2 pb-2 flex flex-row items-center justify-between'
                }
              >
                <span className="">Contact email</span>
                <span className="ml-4">{userDetails?.email}</span>
              </div>

              <div
                className={
                  'pt-2 pb-2 flex flex-row items-center justify-between'
                }
              >
                <span className="">Account status</span>
                <span className="ml-4">{userDetails?.activityStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
