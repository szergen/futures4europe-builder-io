'use client';
import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { getWixClientMember } from '@app/hooks/useWixClientServer';
import LoadingSpinner from '@app/shared-components/LoadingSpinner/LoadingSpinner';
import {
  Button,
  Card,
  // Checkbox,
  Label,
  TextInput,
  Alert,
  Modal,
} from 'flowbite-react';
import { HiMail, HiInformationCircle } from 'react-icons/hi';
import ReCAPTCHA from 'react-google-recaptcha';
import Link from 'next/link';
import { triggerForgotPasswordMail } from '@app/wixUtils/client-side';

// import { IOAuthStrategy, useWixAuth } from '@wix/sdk-react';

export default function ForgotPassword() {
  const [error, setError] = useState('');
  // const router = useRouter();
  // const { sendSetPasswordEmail,  } = useWixModules(authentication);
  // const { insertDataItem } = useWixModules(items);

  const [captchaToken, setCaptchaToken] = useState('');
  const [isMailSent, setIsMailSent] = useState(false);
  const [showAccountCreatedModal, setShowAccountCreatedModal] = useState(false);

  const handleCaptchaChange = (token: string) => {
    setCaptchaToken(token);
  };

  const handleRegister = async (event: SubmitEvent) => {
    event.preventDefault();
    try {
      setShowAccountCreatedModal(true);
      const email = event?.target?.email?.value;
      const redirectUrl = window.location.origin + '/login';
      console.log('redirectUrl', redirectUrl);

      console.log('email', email);

      console.log('captchaToken', captchaToken);
      const response = await triggerForgotPasswordMail(email, redirectUrl);
      console.log('response', response);
      setIsMailSent(true);
    } catch (err) {
      setError('Error sending email');
      console.error('Error:', err);
      setShowAccountCreatedModal(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full lg:p-12r min-h-[70vh]">
      <Card className="w-6w-2/3 rounded-xxl shadow-sm	">
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
                    <span className="font-medium">Info alert!</span> {error}
                  </Alert>
                )}
                <form
                  onSubmit={handleRegister}
                  className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
                >
                  <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
                    Forgot Password
                  </h3>
                  <p className="mb-4 text-grey-700">
                    Enter your email to reset your password
                  </p>
                  {/* Google */}
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
                  {/* Email */}
                  <Label
                    className="mb-2 text-sm text-start text-grey-900"
                    htmlFor="email"
                    value="Your email*"
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

                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} // Site key from Google
                    onChange={handleCaptchaChange}
                    className="m-2 ml-4"
                  />

                  <Button
                    color="primary"
                    className="w-full btn-main px-2 py-2 mb-6 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-blue-600 focus:ring-4 bg-blue-500"
                    type="submit"
                    disabled={!captchaToken}
                  >
                    Reset password
                  </Button>
                  <p className="text-sm leading-relaxed text-grey-900">
                    Are you allready a memebr?{' '}
                    <a className="font-bold text-grey-700" href="/login">
                      Log in
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Modal
        show={showAccountCreatedModal}
        onClose={() => setShowAccountCreatedModal(false)}
      >
        <Modal.Header>Resetting password</Modal.Header>
        <Modal.Body>
          {isMailSent ? (
            <div>
              <div className="text-center m-4">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={4}
                    stroke="green"
                    className="w-6 h-6 inline-block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="font-bold">
                  Password reset link successfully sent to your email address
                  {/* Green checkmark */}
                </span>
              </div>
              <div className="flex flex-wrap justify-center">
                <Link href="/login">
                  <Button
                    color="primary"
                    className="w-full btn-main px-2 py-2 mb-6 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-blue-600 focus:ring-4 bg-blue-500"
                    type="submit"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center m-4">Resetting Password</div>
              <LoadingSpinner />
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
