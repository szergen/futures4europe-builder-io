'use client';
import { useAuth } from '@app/custom-hooks/AuthContext/AuthContext';
import { items } from '@wix/data';
import { useWixModules } from '@wix/sdk-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { extractInfoPageTypeBasedOnTag } from '@app/utils/parse-utils';
import classNames from 'classnames';
import { members } from '@wix/members';
import NavDashboard from '@app/shared-components/Layout/NavDashboard/NavDashboard';
import SubNavDashboard from '@app/shared-components/Layout/NavDashboard/SubNavDashboard';
import Icon from '@app/shared-components/Icon/Icon';
import style from '../pageDashboard.module.css';
import stylefile from './pageDashboardChangePassword.module.css';
import SpriteSvg from '@app/shared-components/SpriteSvg/SpriteSvg';
import { Button, Label, TextInput } from 'flowbite-react';
import { HiLockOpen } from 'react-icons/hi';

export default function DashboardChangePassword() {
  const [userInfoPage, setUserInfoPage] = useState('');

  const { isLoggedIn, loading, userDetails, logout, tags } = useAuth();

  const router = useRouter();

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
      href: '/dashboard/change-password',
      text: 'Account security',
      isActive: true,
    },
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
        activeItem={'/dashboard'}
      />

      <div
        className={classNames(
          style.UserDashboardWrapper,
          'flex flex-col relative m-auto mt-10 mb-6'
        )}
      >
        <h1 className={classNames(style.headingDashboardh1, 'mt-2 mb-4 p-0')}>
          Change Password
        </h1>
        <p className="text-base text-[#606b85]">
          Choose a strong password and dont reuse it for other accounts. You may
          be signed out of your account on some devices. You will be signed out
          of all devices.
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
                Password strength
              </h2>
              <p className={classNames(style.boxTextDashboard, 'mb-8')}>
                Use at least 8 characters. Don’t use a password from another
                site, or something too obvious like your pet’s name.
              </p>
            </div>

            <form
              // onSubmit={handleReset}
              className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
            >
              <Label
                className="mb-2 text-sm text-start text-grey-900"
                htmlFor="passwordNew"
                value="Your new password"
              />

              <TextInput
                className="block relative"
                id="passwordNew"
                type="password"
                sizing="lg"
                shadow
                placeholder="enter new password"
                icon={HiLockOpen}
                required
              />

              <Label
                className="mb-2 text-sm text-start text-grey-900"
                htmlFor="passwordNewRepeat"
                value="Repeat Password*"
              />
              <TextInput
                id="passwordNewRepeat"
                className="block relative"
                sizing="lg"
                shadow
                placeholder="Repeat password"
                icon={HiLockOpen}
                type="password"
                required
              />

              <Button
                color="primary"
                className="w-full btn-main px-2 py-2 mb-6 text-sm font-bold leading-none text-white transition duration-300 rounded-10 hover:bg-purple-600 focus:ring-4 bg-purple-500"
                type="submit"
              >
                Save new password
              </Button>
            </form>
          </div>
        </div>

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

              {/* <div
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
              </div> */}
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
