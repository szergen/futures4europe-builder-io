'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { members } from '@wix/members';
import { useWixModules, useWixAuth, IOAuthStrategy } from '@wix/sdk-react';
import { useAuth } from '@app/custom-hooks/AuthContext/AuthContext';
import {
  getContactsItem,
  getContactsItemByEmail,
} from '@app/wixUtils/client-side';
import LoadingSpinner from '@app/shared-components/LoadingSpinner/LoadingSpinner';
import {
  Button,
  Card,
  Checkbox,
  Label,
  TextInput,
  Alert,
} from 'flowbite-react';
import { HiMail, HiKey, HiInformationCircle } from 'react-icons/hi';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [isLoginProcessing, setIsLoginProcessing] = useState(false);
  const router = useRouter();
  const { login, isLoggedIn, updateUserDetails, handleUserDataRefresh } =
    useAuth();
  // console.log('Login isLoggedIn', isLoggedIn);

  // #region React SDK Hooks
  const {
    login: wixLogin,
    loggedIn: wixLoggedIn,
    setTokens: wixSetTokens,
    getMemberTokensForExternalLogin,
  } = useWixAuth() as unknown as IOAuthStrategy;

  const { getCurrentMember: wixGetCurrentMember } = useWixModules(members);
  // #endregion

  const handleLogin = async (event: SubmitEvent) => {
    event.preventDefault();
    try {
      const email = event?.target?.email?.value || '';
      const password = event.target?.password?.value || '';

      // console.log('wixLogin', await wixLoggedIn());

      const response = await wixLogin({ email, password });
      console.log('response', response);

      if (response?.loginState === 'SUCCESS') {
        setIsLoginProcessing(true);

        const { _items } = await getContactsItemByEmail(email);

        const memberId = _items[0]._id;
        console.log('memberId', memberId);

        const tokens = await getMemberTokensForExternalLogin(
          memberId,
          process.env.NEXT_PUBLIC_WIX_API_KEY as string
        );

        // console.log('tempTokens', tokens);

        await wixSetTokens(tokens);
        const isUserLoggedIn = await wixLoggedIn();

        console.log('isUserLoggedIn from WixProvider?', isUserLoggedIn);
        const currentMember = await wixGetCurrentMember({
          fieldsets: ['FULL'],
        });
        console.log('currentMember', currentMember);

        if (currentMember) {
          const contactData = await getContactsItem(
            currentMember?.member?.contactId as string
          );
          if (contactData) {
            // console.log('contactData', contactData);
          }

          updateUserDetails({
            contactId: currentMember?.member?.contactId,
            accountId:
              contactData?.info?.extendedFields?.items?.['custom.accountid'] ||
              '',
            isAdmin: contactData?.info?.extendedFields?.items?.[
              'custom.accountid'
            ]
              ? true
              : false,
            userName: currentMember?.member?.profile?.nickname,
            slug: currentMember?.member?.profile?.slug,
            email: currentMember?.member?.loginEmail,
            createdDate: currentMember?.member?._createdDate,
            updatedDate: currentMember?.member?._updatedDate,
            privacyStatus: currentMember?.member?.privacyStatus,
            accountStatus: currentMember?.member?.status,
            activityStatus: currentMember?.member?.activityStatus,
          });
        }

        console.log('User is logged in');

        // Save session token to localStorage
        localStorage.setItem(
          'f4e_wix_sessionToken',
          response.data.sessionToken
        );

        // Set accessToken and refreshToken to localStorage
        localStorage.setItem(
          'f4e_wix_accessTokenAndRefreshToken',
          JSON.stringify(tokens)
        );
        handleUserDataRefresh();
        login();
        router.push('/dashboard');
      } else if (response?.loginState === 'FAILURE') {
        setError(
          'Login failed. Please check your credentials. ' // + response.errorCode
        );
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error('Login failed', err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  }, [isLoggedIn, router]);

  // const wixClient = await getWixClientMember();
  // console.log('wixClient', wixClient);

  return (
    <div className="flex items-center justify-center w-full lg:p-12r min-h-[70vh]">
      <Card className="w-6w-2/3 rounded-xxl shadow-sm	">
        {!isLoginProcessing ? (
          <>
            <div className="container flex flex-col mx-auto bg-white pt-2">
              <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
                <div className="flex items-center justify-center w-full">
                  <div className="flex flex-col items-center xl:p-10">
                    {error && (
                      <Alert
                        className="mb-4"
                        color="failure"
                        icon={HiInformationCircle}
                      >
                        {/* <span className="font-medium">Info alert!</span>  */}
                        {error}
                      </Alert>
                    )}
                    <form
                      onSubmit={handleLogin}
                      className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
                    >
                      <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
                        Log In
                      </h3>
                      <p className="mb-4 text-grey-700">
                        Enter your email and password
                      </p>
                      {/* <a className="btn-disabled flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-300 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300">
                        <img
                          alt=""
                          className="h-5 mr-2"
                          src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                        />
                        Sign in with Google
                      </a>
                      <div className="flex items-center mb-3">
                        <hr className="h-0 border-b border-solid border-grey-500 grow" />
                        <p className="mx-4 text-grey-600">or</p>
                        <hr className="h-0 border-b border-solid border-grey-500 grow" />
                      </div> */}

                      <Label
                        className="mb-2 text-sm text-start text-grey-900"
                        htmlFor="email"
                        value="Your email"
                      />

                      <TextInput
                        className="block relative"
                        id="email"
                        type="email"
                        sizing="lg"
                        shadow
                        placeholder="enter email address"
                        icon={HiMail}
                        required
                      />

                      <Label
                        className="mb-2 text-sm text-start text-grey-900"
                        htmlFor="password"
                        value="Password*"
                      />
                      <TextInput
                        id="password"
                        className="block relative"
                        sizing="lg"
                        shadow
                        placeholder="enter a password"
                        icon={HiKey}
                        type="password"
                        required
                      />

                      <div className="flex flex-row justify-between mb-8">
                        <div className="flex max-w-md flex-col gap-4">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="accept"
                              className="mb-4"
                              defaultChecked
                            />
                            <Label htmlFor="accept" className="flex mb-4">
                              Keep me logged in
                            </Label>
                          </div>
                        </div>

                        <a
                          className="mr-4 text-sm font-medium text-purple-blue-500"
                          href="/forgot-password"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <Button
                        color="primary"
                        className="w-full btn-main px-2 py-2 mb-6 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-blue-600 focus:ring-4 bg-blue-500"
                        type="submit"
                      >
                        Login
                      </Button>
                      <p className="text-sm leading-relaxed text-grey-900">
                        Not registered yet?{' '}
                        <a className="font-bold text-grey-700" href="/register">
                          Create an Account
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <LoadingSpinner />
        )}
      </Card>
    </div>
  );
}
