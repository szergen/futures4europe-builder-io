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
import Typography from '@app/shared-components/Typography/Typography';

export default function Dashboard() {
  //   const [ownedPostPages, setOwnedPostPages] = useState<any[]>([]);
  //   const [ownedInfoPages, setOwnedInfoPages] = useState<any[]>([]);
  // const [showLoadingCreatePost, setShowLoadingCreatePost] = useState(false);
  const [isLoadingDeletePostPage, setIsLoadingDeletePostPage] = useState('');
  const [userInfoPage, setUserInfoPage] = useState('');

  const {
    // login,
    isLoggedIn,
    loading,
    userDetails,
    logout,
    // ownedInfoPages,
    // ownedPostPages,
    // ownedPostPagesFetched,
    // ownedInfoPagesFetched,
    // handleUserDataRefresh,
    // tags,
  } = useAuth();

  const router = useRouter();
  const { removeDataItem } = useWixModules(items);

  // #region Check if user info page is ready
  const [isPersonInfoPageReady, setIsPersonInfoPageReady] = useState(false);
  const [personInfoPageLink, setPersonInfoPageLink] = useState('');

  useEffect(() => {
    // console.log('debug1 -> isLoggedIn:', isLoggedIn); // Debugging line
    if (!loading && !isLoggedIn) {
      router.push('/login');
    }

    if (userDetails?.userTag?.name && !isPersonInfoPageReady) {
      setIsPersonInfoPageReady(true);
      setPersonInfoPageLink(userDetails?.userTag?.tagPageLink || '');
    }
  }, [isLoggedIn, router, loading, userDetails]);

  if (!isLoggedIn) {
    //Loading Spinner
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
        activeItem={'/dashboard/settings'}
      />

      <div
        className={classNames(
          style.UserDashboardWrapper,
          'flex flex-col relative m-auto mt-10 mb-6'
        )}
      >
        {/* // TODO: To make component for dashbaordBoxe's */}
        <div
          className={classNames(
            style.dashboardBox,
            style.dashboardBoxAddWrap,
            'mt-14',
            'mb-10',
            'p-8',
            'bg-alertLight-site',
            personInfoPageLink && 'bg-gray-100'
          )}
        >
          <div className={classNames(style.dashboardBoxAlert, 'flex flex-col')}>
            {!personInfoPageLink ? (
              <SpriteSvg.AccountAlertIcon
                className="text-site-black mb-6 text-[var(--color-text-icon-error)]"
                sizeW={24}
                sizeH={24}
                viewBox={'0 0 32 32'}
                fill={'currentColor'}
                strokeWidth={0}
                inline={false}
              />
            ) : (
              <SpriteSvg.AccountAiIcon
                className="text-site-black mb-6 text-[var(--color-text-icon-error)]"
                sizeW={24}
                sizeH={24}
                viewBox={'0 0 32 32'}
                fill={'var(--p-border-radius-800)'}
                strokeWidth={0}
                inline={false}
              />
            )}

            <div className="flex flex-col justify-between">
              <Typography
                tag="h1"
                className={classNames(
                  style.headingDashboardh1,
                  'mt-0 mb-0 flex flex-row items-center'
                )}
              >
                Person Info
              </Typography>

              <Typography
                tag="p"
                className={classNames(
                  style.boxTextDashboard,
                  'text-black-site mb-8'
                )}
              >
                {!personInfoPageLink
                  ? 'Your profile dose not have a Person Info page or you did not claim it. Create now a person page to be visible to all members of futures4europe platform.'
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
                    'block border-0'
                  )}
                  pill
                >
                  <SpriteSvg.AccountHumanIcon
                    sizeH={24}
                    sizeW={24}
                    viewBox={'0 -1 32 32'}
                    strokeWidth={1}
                  />
                  {/* // TODO: Must show claim Person Info Page if it allready exists */}
                  <span className="text-lg">
                    {personInfoPageLink
                      ? 'View Person Info page'
                      : 'Create Person Info page'}
                  </span>
                </Button>
              </Link>
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
                <SpriteSvg.AccountVerifyIcon
                  className="mb-0"
                  sizeW={38}
                  sizeH={38}
                  fill={'currentColor'}
                  strokeWidth={0}
                  inline={true}
                />
              </h3>

              <div className="flex items-center bg-gradient-to-br from-emerald-100 to-emerald-200 border-small border-white/50 shadow-black text-[#2F9461] py-2 px-4 rounded-full h-34 font-medium text-base">
                <SpriteSvg.AccountSmallKeyIcon
                  className="text-color-white"
                  sizeW={28}
                  sizeH={14}
                  viewBox={'0 -3 28 14'}
                  fill={'green'}
                  strokeWidth={0}
                  inline={false}
                />
                <span className="">Person Info page</span>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <h2
                className={classNames(
                  style.headingDashboardh1,
                  'mt-8 mb-0 flex flex-row items-center'
                )}
              >
                Basic info
              </h2>
              <p className={classNames(style.boxTextDashboard, 'mb-8')}>
                Some info may be visible to other people on the platform.
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
                <span className="">Account registration date</span>
                <span className="ml-4">{userDetails?.createdDate}</span>
              </div>

              <div
                className={
                  'pt-2 pb-2 flex flex-row items-center justify-between'
                }
              >
                <span className="">Last profile update</span>
                <span className="ml-4">{userDetails?.updatedDate}</span>
              </div>

              <div
                className={
                  'pt-2 pb-2 flex flex-row items-center justify-between'
                }
              >
                <span className="">Member type</span>
                <span className="ml-4">Person</span>
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
                <SpriteSvg.AccountCardIcon
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
                Profile picture
              </h2>
              <p className={classNames(style.boxTextDashboard, 'mb-8')}>
                Your profile card is visible to all members of this site.
              </p>
            </div>

            <div
              className={classNames(
                style.listDashboard,
                'flex flex-col text-base text-[#606b85]'
              )}
            >
              <div
                className={classNames(
                  style.listItemDashboard,
                  'pt-4 pb-4 flex flex-row items-center justify-between'
                )}
              >
                <span className="flex flex-row items-center">
                  <Avatar
                    alt="User settings"
                    img="https://framerusercontent.com/images/DSOrm9QuNc3pr6AeQanHcDmlc.png?scale-down-to=512"
                    rounded
                    className={classNames(
                      style.avatarUserHeader,
                      'mr-4 border-none'
                    )} // Conditionally add "active" class
                  />
                  <span>A profile picture helps personalize your account</span>
                </span>
                <span className="ml-4">Change </span>
              </div>

              <div className={'pt-2 pb-2 mt-10 flex flex-col'}>
                <span className="text-[#606b85]">
                  Who can see your profile photo?{' '}
                </span>{' '}
                <span>
                  Your visibility setting only applies to your profile photo.
                  Your header image is always visible to anyone.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
