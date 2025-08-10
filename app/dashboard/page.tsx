'use client';
import { useAuth } from '@app/custom-hooks/AuthContext/AuthContext';
import { items } from '@wix/data';
import { useWixModules } from '@wix/sdk-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@app/shared-components/LoadingSpinner/LoadingSpinner';
import Link from 'next/link';
import classNames from 'classnames';
import NavDashboard from '@app/shared-components/Layout/NavDashboard/NavDashboard';
import SubNavDashboard from '@app/shared-components/Layout/NavDashboard/SubNavDashboard';
import style from './pageDashboard.module.css';
import { Button } from 'flowbite-react';
import SpriteSvg from '@app/shared-components/SpriteSvg/SpriteSvg';
import Typography from '@app/shared-components/Typography/Typography';

const DashboardSkeleton = () => {
  return (
    <div className="w-full flex flex-col relative m-auto mt-10 mb-6 max-w-[860px]">
      <div className="mt-14 mb-10 p-8 bg-gray-50 rounded-[40px]">
        <div className="flex flex-col">
          {/* Header with icon and title */}
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
            <div className="ml-2 h-7 w-32 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Description text */}
          <div className="flex flex-col justify-between mb-8">
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse mb-2" />
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
          </div>

          {/* Button skeleton */}
          <div className="block">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gray-200 animate-pulse">
              <div className="w-6 h-6 rounded-full bg-gray-300" />
              <div className="ml-2 h-5 w-40 bg-gray-300 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [userInfoPage, setUserInfoPage] = useState('');
  const [isPersonInfoPageReady, setIsPersonInfoPageReady] = useState(false);
  const [personInfoPageLink, setPersonInfoPageLink] = useState('');
  const [isLoadingPersonInfo, setIsLoadingPersonInfo] = useState(true);

  const { isLoggedIn, loading, userDetails, logout } = useAuth();

  const router = useRouter();
  const { removeDataItem } = useWixModules(items);

  // Combine all loading states
  const isFullyLoaded =
    !loading && isLoggedIn && userDetails && 'userTag' in userDetails;

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/login');
      return;
    }

    const initializePersonInfo = async () => {
      try {
        if (userDetails?.userTag?.name) {
          setIsPersonInfoPageReady(true);
          setPersonInfoPageLink(userDetails.userTag.tagPageLink || '');
          setIsLoadingPersonInfo(false);
        }
      } catch (error) {
        console.error('Error initializing person info:', error);
        setIsLoadingPersonInfo(false);
      }
    };

    if (!userDetails?.userTag) {
      setIsLoadingPersonInfo(true);
      console.log('User details:', userDetails?.userTag);
    }

    if (userDetails) {
      initializePersonInfo();
    }
  }, [isLoggedIn, router, loading, userDetails]);

  if (!isLoggedIn) {
    return <LoadingSpinner />;
  }

  const handleCreateOrNavigateToPersonInfoPage = () => {
    if (userInfoPage) {
      return `${userInfoPage}`;
    }
    return `/person/New_Info_Page`;
  };

  const handleLogOut = async () => {
    logout();
    router.push('/login');
  };

  const subNavItems = [{ href: '/dashboard', text: 'Account', isActive: true }];

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
        activeItem="/dashboard"
      />

      {!isFullyLoaded ? (
        <DashboardSkeleton />
      ) : (
        <div
          className={classNames(
            style.UserDashboardWrapper,
            'w-full flex flex-col relative m-auto mt-10 mb-6'
          )}
        >
          <div
            className={classNames(
              style.dashboardBox,
              style.dashboardBoxAddWrap,
              'mt-14',
              'mb-10',
              'p-8',
              'bg-alertLight-site',
              personInfoPageLink && 'bg-gray-200'
            )}
          >
            <div
              className={classNames(style.dashboardBoxAlert, 'flex flex-col')}
            >
              <div className="flex items-center mb-4">
                {!personInfoPageLink ? (
                  <SpriteSvg.AccountAlertIcon
                    className="text-site-black text-[var(--color-text-icon-error)]"
                    sizeW={24}
                    sizeH={24}
                    viewBox={'0 0 32 32'}
                    fill={'currentColor'}
                    strokeWidth={0}
                    inline={false}
                  />
                ) : (
                  <SpriteSvg.AccountAiIcon
                    className="text-site-black text-[var(--color-text-icon-error)]"
                    sizeW={24}
                    sizeH={24}
                    viewBox={'0 0 32 32'}
                    fill={'var(--p-border-radius-800)'}
                    strokeWidth={0}
                    inline={false}
                  />
                )}
                <Typography
                  tag="h2"
                  className={classNames(style.headingDashboardh1, 'ml-2')}
                >
                  Person Info
                </Typography>
              </div>

              <div className="flex flex-col justify-between">
                <Typography
                  tag="p"
                  className={classNames(
                    style.boxTextDashboard,
                    'text-black-site mb-8'
                  )}
                >
                  {!personInfoPageLink
                    ? 'You dont have a Person Info page or you did not claim it. Create now a Person Info page to be visible to all members of futures4europe platform.'
                    : 'Edit your Person Info page to be visible to all members of futures4europe platform.'}
                </Typography>
              </div>

              <div className={classNames(style.listDashboard, 'block')}>
                <Link
                  href={
                    !personInfoPageLink
                      ? '/person/New_Info_Page'
                      : personInfoPageLink
                  }
                >
                  <Button
                    size={'md'}
                    color={'light'}
                    className={classNames(
                      style.buttonAddDashboard,
                      'block border-0 mr-4 hover:bg-gray-300 focus:ring-purple-300'
                    )}
                    pill
                  >
                    <SpriteSvg.AccountHumanIcon
                      sizeH={24}
                      sizeW={24}
                      viewBox={'0 -1 32 32'}
                      strokeWidth={1}
                    />
                    <span className="text-lg">
                      {personInfoPageLink
                        ? 'Edit My Person Info page'
                        : 'Create My Person Info page'}
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
