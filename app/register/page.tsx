'use client';
import { useState } from 'react';
import classNames from 'classnames';
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
import { HiMail, HiKey, HiInformationCircle } from 'react-icons/hi';
import { useWixModules } from '@wix/sdk-react';
import { authentication } from '@wix/members';
import ReCAPTCHA from 'react-google-recaptcha';
import Link from 'next/link';
import { items } from '@wix/data';

// TODO @alex adaugat consent newsletter
import { subscribeToNewsletter } from '@app/wixUtils/client-side';
import { refetchTags } from '@app/utils/refetch-utils';
import { useAuth } from '@app/custom-hooks/AuthContext/AuthContext';

export default function RegisterPage() {
  const [error, setError] = useState('');
  // const router = useRouter();
  const { register: wixRegister } = useWixModules(authentication);
  const { insertDataItem } = useWixModules(items);

  const [captchaToken, setCaptchaToken] = useState('');
  const [isTagCreated, setIsTagCreated] = useState(false);
  const [showAccountCreatedModal, setShowAccountCreatedModal] = useState(false);

  const handleCaptchaChange = (token: string) => {
    setCaptchaToken(token);
  };

  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState('idle');
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

  const { tags, handleTagCreated } = useAuth();
  const uploadTag = async (tagName: string) => {
    try {
      const result = await insertDataItem({
        dataCollectionId: 'Tags',
        dataItem: {
          data: {
            name: tagName,
            tagType: 'person',
          },
        },
      });
      return result;
    } catch (error) {
      console.error('Error uploading tag:', error);
    }
  };

  // TODO @Alex de verificat, am pus o verificare sa nu poti face cont daca pui whitespace
  // rezolvat un issue cu un cont care avea un saptiu simplu ca nume

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  const validateName = (name, fieldName) => {
    // Check if name is undefined, null, or not a string
    if (!name || typeof name !== 'string') {
      return `${fieldName} is required`;
    }

    // Check if name is at least 2 characters and not just whitespace
    if (name.length < 2 || name.trim() === '') {
      return `${fieldName} must be at least 2 characters and not just whitespace`;
    }

    // Check if name contains numbers
    if (/\d/.test(name)) {
      return `${fieldName} cannot contain numbers`;
    }

    return '';
  };

  const handleRegister = async (event: SubmitEvent) => {
    event.preventDefault();

    const form = event.currentTarget;
    // Access form fields properly using HTMLFormElement methods
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;
    const password = (form.elements.namedItem('password') as HTMLInputElement)
      ?.value;
    const firstName = (form.elements.namedItem('firstName') as HTMLInputElement)
      ?.value;
    const lastName = (form.elements.namedItem('lastName') as HTMLInputElement)
      ?.value;

    // Reset previous errors
    setError('');
    setFirstNameError('');
    setLastNameError('');

    // Validate first name
    const firstNameValidationError = validateName(firstName, 'First name');
    if (firstNameValidationError) {
      setFirstNameError(firstNameValidationError);
      return;
    }

    // Validate last name
    const lastNameValidationError = validateName(lastName, 'Last name');
    if (lastNameValidationError) {
      setLastNameError(lastNameValidationError);
      return;
    }

    try {
      setShowAccountCreatedModal(true);
      const email = event?.target?.email?.value;
      const password = event.target?.password?.value;
      const firstName = event.target?.firstName?.value;
      const lastName = event.target?.lastName?.value;
      // console.log('email', email);
      // console.log('password', password);
      // console.log('captchaToken', captchaToken);

      const response = await wixRegister(email, password, {
        profilePrivacyStatus: 'PUBLIC',
        contactInfo: {
          firstName: firstName,
          lastName: lastName,
        },
      });

      // console.log('response', response);
      const marketingConsent = await subscribeToNewsletter(email);

      //console.log('marketingConsent', marketingConsent);
      setSubmitState('success');

      // #region Wix upload logic
      let tagResult;
      const tagExists = tags.find(
        (tag) => tag.name === firstName + ' ' + lastName
      );

      if (response && !tagExists) {
        console.log('Tag does not exist, uploading tag');
        tagResult = await uploadTag(firstName + ' ' + lastName);
        console.log('tagResult', tagResult);
        // if (tagResult) {
        // await refetchTags();
        handleTagCreated();
        setIsTagCreated(true);
        // }
      }
      setIsTagCreated(true);
      // #endregion

      // const wixClient = await getWixClientMember();
      // await wixClient.authentication.register(email, password);
      // router.push('/login'); // Redirect to login page after registration
    } catch (err: any) {
      switch (err?.details?.applicationError?.code) {
        case '-19995':
          setError(
            'Email already exists. Please try again with a different mail.'
          );
          break;
        case '-19988':
          setError('Password is too short. Please use at least 8 characters.');
          break;
        case '-19989':
          setError(
            'Password is too weak. Please include a mix of letters, numbers, and special characters.'
          );
          break;
        default:
          // If there's a description in the error, use that
          if (err?.details?.applicationError?.description) {
            setError(err.details.applicationError.description);
          } else if (err?.message) {
            setError(err.message);
          } else {
            setError('Registration failed. Please try again.');
          }
          break;
      }
      console.error('Registration failed:', err);
      setShowAccountCreatedModal(false);

      // TODO @alex adaugat consent newsletter
      console.error('Error upserting email consent:', error);
      setSubmitState('error');
    }

    // Add your submission logic here
    // console.log('Submitting email:', email);
  };

  return (
    <div className="flex items-center justify-center w-full lg:p-12r min-h-[70vh]">
      <Card className="w-6w-2/3 rounded-xxl shadow-sm	border-0">
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
                    {error}
                  </Alert>
                )}
                <form
                  onSubmit={handleRegister}
                  className="flex flex-col w-full max-w-[335px] h-full pb-6 text-center bg-white rounded-3xl"
                >
                  <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
                    Register Account
                  </h3>
                  <p className="mb-4 text-grey-700">
                    Enter your email, first name, last name and password
                  </p>
                  {/* Google */}
                  {/* <a className="btn-disabled flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-300 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300">
                    <img
                      alt=""
                      className="h-5 mr-2"
                      src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                    />
                    Sign in with Google
                  </a> */}
                  <div className="flex items-center mb-3">
                    <hr className="h-0 border-b border-solid border-grey-500 grow" />
                    <p className="mx-4 text-grey-600"> </p>
                    <hr className="h-0 border-b border-solid border-grey-500 grow" />
                  </div>
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
                  {/* First Name */}
                  <Label
                    className="mb-2 text-sm text-start text-grey-900"
                    htmlFor="firstName"
                    value="First Name*"
                  />

                  <TextInput
                    className="block relative"
                    id="firstName"
                    type="text"
                    sizing="lg"
                    shadow
                    placeholder="First Name"
                    icon={HiMail}
                    required
                  />
                  {firstNameError && (
                    <p className="mb-10 text-red-500 text-sm mt-1 text-start">
                      {firstNameError}
                    </p>
                  )}
                  {/* Last Name */}
                  <Label
                    className="mb-2 text-sm text-start text-grey-900"
                    htmlFor="lastName"
                    value="Last Name*"
                  />

                  <TextInput
                    className="block relative"
                    id="lastName"
                    type="text"
                    sizing="lg"
                    shadow
                    placeholder="Last Name"
                    icon={HiMail}
                    required
                  />
                  {lastNameError && (
                    <p className="mb-10 text-red-500 text-sm mt-1 text-start">
                      {lastNameError}
                    </p>
                  )}

                  {/* Password */}
                  <Label
                    className="mb-2 text-sm text-start text-grey-900"
                    htmlFor="password"
                    value="Password*"
                  />
                  <TextInput
                    id="password"
                    className="block relative focus:border-2 text-grey-900"
                    sizing="lg"
                    shadow
                    placeholder="create a password"
                    icon={HiKey}
                    type="password"
                    required
                    minLength={6}
                  />
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} // Site key from Google
                    onChange={handleCaptchaChange}
                    className="m-2 ml-4"
                  />

                  <Button
                    color="primary"
                    className="w-full border-0 border-lg btn-main px-2 py-2 mb-6 text-sm font-bold leading-none text-white transition duration-300 md:w-96 hover:bg-blue-600 focus:ring-4 bg-blue-500"
                    type="submit"
                    disabled={
                      process.env.NODE_ENV === 'production' // Check if it's production environment
                        ? !captchaToken || !isPrivacyChecked // Use combined condition in production
                        : !isPrivacyChecked // Use only captchaToken condition in development
                    }
                  >
                    Create account
                  </Button>
                  <p className="text-sm leading-relaxed text-grey-900">
                    Are you already a member?{' '}
                    <a className="font-bold text-grey-700" href="/login">
                      Log in
                    </a>
                  </p>
                </form>

                <div className="flex flex-col justify-items-start w-full h-full pb-6 bg-white rounded-3xl max-w-96">
                  <fieldset>
                    <legend className="sr-only">Checkboxes</legend>
                    <div className="divide-y divide-gray-200">
                      <label
                        htmlFor="Option1"
                        className="flex cursor-pointer items-start gap-2 py-2"
                      >
                        <div className="flex justify-items-start pt-1">
                          &#8203;
                          <input
                            type="checkbox"
                            onChange={() =>
                              setIsPrivacyChecked(!isPrivacyChecked)
                            }
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            id="Option1"
                          />
                        </div>

                        <div>
                          <strong className="font-medium text-black relative">
                            By registering, you agree to the
                            <a
                              href="/static-pages/terms-of-use"
                              target="_blank"
                              className="text-blue-600"
                            >
                              {' '}
                              Terms of use{' '}
                            </a>
                            and
                            <a
                              href="/static-pages/privacy-policy"
                              target="_blank"
                              className="text-blue-600"
                            >
                              {' '}
                              Privacy Policy
                            </a>
                            .
                          </strong>
                        </div>
                      </label>
                    </div>
                  </fieldset>

                  <div className="flex">
                    <div className="flex justify-items-start pt-1">
                      <input
                        id="helper-checkbox"
                        aria-describedby="helper-checkbox-text"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div className="ms-2 text-sm">
                      <label
                        htmlFor="helper-checkbox"
                        className="font-medium cursor-pointer dark:text-gray-300"
                      >
                        Newsletter subscription
                      </label>
                      <p
                        id="helper-checkbox-text"
                        className="font-normal text-gray-500 dark:text-gray-300"
                      >
                        I agree my information will be processed in accordance
                        with the Future4Europe{' '}
                        <a
                          href="/static-pages/privacy-policy"
                          target="_blank"
                          className="text-blue-600"
                        >
                          Privacy Policy
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Modal
        show={showAccountCreatedModal}
        theme={{
          header: {
            close: {
              base: 'hidden',
            },
            base: 'flex items-center justify-between rounded-t border-b p-5 dark:border-gray-600',
            title: 'w-full text-center',
          },
        }}
        onClose={() => setShowAccountCreatedModal(false)}
      >
        <Modal.Header>
          <div className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Account Registration
          </div>
        </Modal.Header>
        <Modal.Body>
          {isTagCreated ? (
            <div>
              <div className="text-center m-4">
                <div className="bg-white p-6  md:mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="text-green-600 w-16 h-16 mx-auto my-6"
                  >
                    <path
                      fill="currentColor"
                      d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                    ></path>
                  </svg>
                  <div className="text-center">
                    <h3 className="text-base text-gray-900 font-semibold text-center">
                      The account has been successfully created
                    </h3>
                    <p className="text-gray-600 mb-10 my-2">
                      Thank you for registering to Futures4europe
                    </p>

                    <div className="flex flex-wrap justify-center">
                      <Link href="/login">
                        <Button
                          color="primary"
                          type="submit"
                          theme={{
                            base: 'rounded-md px-12 bg-green-600 hover:bg-green-500 text-white font-semibold py-3',
                          }}
                        >
                          Login
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center m-4">Creating Account</div>
              <div className="flex flex-wrap justify-center">
                <LoadingSpinner />
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
