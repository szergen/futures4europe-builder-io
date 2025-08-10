import './footer.css';
import { Logo } from '@app/shared-components/Logo/Logo';
import testIds from '@app/utils/test-ids';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { subscribeToNewsletter } from '@app/wixUtils/client-side';
import { Tooltip } from 'flowbite-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState('idle');
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const marketingConsent = await subscribeToNewsletter(email);
      console.log('marketingConsent', marketingConsent);
      setSubmitState('success');
    } catch (error) {
      console.error('Error upserting email consent:', error);
      setSubmitState('error');
    }

    // Add your submission logic here
    console.log('Submitting email:', email);
  };
  return (
    <footer className="w-full" data-testid={testIds.LAYOUT.FOOTER}>
      <div className="relative isolate overflow-hidden bg-primary-site py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-4xl font-semibold tracking-tight text-white">
                Subscribe to our newsletter
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Want the latest updates from futures4europe.eu in your inbox?
                Subscribe and receive the latest updates in Foresight.
              </p>
              <div className="mt-6 flex max-w-md gap-x-4">
                <form onSubmit={handleSubmit} className="flex gap-x-4">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <div className="flex-auto w-full ">
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full mb-0 min-w-0 flex-auto rounded-full border-0 bg-white px-3.5 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:min-w-[300px] xs:min-w-[200px] sm:text-sm/6"
                      placeholder="Enter your email"
                    />
                  </div>
                  <Tooltip content="Email field and privacy policy checkbox are required to subscribe">
                    <button
                      type="submit"
                      title="The email and privacy policy checkbox are required to subscribe"
                      disabled={!isPrivacyChecked}
                      className={classNames(
                        'btn-save flex-none rounded-full px-3.5 py-2.5 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
                        isPrivacyChecked
                          ? 'hover:bg-action-site/90'
                          : 'bg-greyShade/50 text-white cursor-not-allowed'
                      )}
                    >
                      Subscribe
                    </button>
                  </Tooltip>
                </form>
              </div>

              <fieldset>
                <legend className="sr-only">Checkboxes</legend>

                <div className="divide-y divide-gray-200">
                  <label
                    htmlFor="Option1"
                    className="flex cursor-pointer items-start gap-4 py-4"
                  >
                    <div className="flex items-center">
                      &#8203;
                      <input
                        type="checkbox"
                        onChange={() => setIsPrivacyChecked(!isPrivacyChecked)}
                        className="size-4 rounded border-gray-300"
                        id="Option1"
                      />
                    </div>

                    <div>
                      <strong className="font-medium text-white relative">
                        I agree that my information will be processed in
                        accordance with the Future4Europe{' '}
                        <a
                          href="/static-pages/privacy-policy"
                          target="_blank"
                          className="text-white underline hover:text-action-site"
                        >
                          Privacy Policy
                        </a>
                        .
                      </strong>

                      {submitState === 'success' && (
                        <span className="inline-flex items-center mt-4 justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700 absolute bottom-20">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="-ms-1 me-1.5 size-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>

                          <p className="whitespace-nowrap text-sm">
                            Thanks for your interest! You will be hearing from
                            us soon.
                          </p>
                        </span>
                      )}

                      {submitState === 'error' && (
                        <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700 absolute  bottom-32">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="-ms-1 me-1.5 size-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                            />
                          </svg>

                          <p className="whitespace-nowrap text-sm">
                            Something went wrong with your subscription.
                          </p>
                        </span>
                      )}
                    </div>
                  </label>
                </div>
              </fieldset>
            </div>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                  </svg>
                </div>
                <dt className="mt-4 text-base font-semibold text-white">
                  Recent newsletters
                </dt>
                <dd className="mt-2 text-base/7 text-white/80">
                  <ul className="text-sm transition-all duration-500">
                    <li className="mb-2">
                      <Link
                        target="_blank"
                        href="https://shoutout.wix.com/so/cdPV0tqSW"
                        className="text-white/80 hover:text-white underline"
                      >
                        July 2025
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link
                        target="_blank"
                        href="https://shoutout.wix.com/so/59PJm0OBB"
                        className="text-white/80 hover:text-white underline"
                      >
                        April 2025
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link
                        target="_blank"
                        href="https://shoutout.wix.com/so/0bPEwQixc"
                        className="text-white/80 hover:text-white underline"
                      >
                        December 2024
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link
                        target="_blank"
                        href="https://shoutout.wix.com/so/09P91vhnQ?languageTag=en&cid=f677c1bb-4334-4039-a211-fdd89e013a3c"
                        className="text-white/80 hover:text-white underline"
                      >
                        October 2024
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link
                        target="_blank"
                        href="https://shoutout.wix.com/so/ffO-UPJK0?languageTag=en"
                        className="text-white/80 hover:text-white underline"
                      >
                        June 2024
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link
                        target="_blank"
                        href={
                          'https://shoutout.wix.com/so/86OraMfaB?languageTag=en'
                        }
                        className="text-white/80 hover:text-white underline"
                      >
                        March 2024
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link
                        target="_blank"
                        href="https://shoutout.wix.com/so/c7OmbGwaG?languageTag=en"
                        className="text-white/80 hover:text-white underline"
                      >
                        December 2023
                      </Link>
                    </li>
                  </ul>
                </dd>
              </div>

              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="#fff"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path d="M7.56 7.51a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm0-3.08a1 1 0 1 0 1 1 1 1 0 0 0-1-1z" />
                    <path d="M7.06 7.01h1v8.42h-1zM5.12 9.09A4.38 4.38 0 0 1 4 3l.82.57A3.38 3.38 0 0 0 5.7 8.3zM10.31 8.87l-.63-.78a3.38 3.38 0 0 0 .65-4.55l.82-.54a4.38 4.38 0 0 1-.84 5.9z" />
                    <path d="m11.8 10.56-.64-.77A5.63 5.63 0 0 0 12 2l.78-.62a6.63 6.63 0 0 1-.94 9.23zM3.33 10.56a6.63 6.63 0 0 1-.88-9.31l.77.64A5.63 5.63 0 0 0 4 9.79z" />
                  </svg>
                </div>
                <dt className="mt-4 text-base font-semibold text-white">
                  Social Links
                </dt>
                <dd className="mt-2 text-base/7 text-white/80">
                  <ul className="text-sm transition-all duration-500">
                    <li className="mb-2">
                      <Link
                        target="_blank"
                        href="https://www.linkedin.com/company/futures4europe/"
                        className="text-white/80 hover:text-white underline"
                      >
                        LinkedIn
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link
                        target="_blank"
                        href="https://www.youtube.com/@futures4europe"
                        className="text-white/80 hover:text-white underline"
                      >
                        Youtube
                      </Link>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div
          className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
          aria-hidden="true"
        ></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
          <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
            <a
              href="https://commission.europa.eu/index_en"
              target="_blank"
              className="flex justify-center lg:justify-start w-64"
            >
              <svg
                id="Layer_2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 938.63 200.28"
              >
                <g id="Layer_1-2">
                  <path d="M0,0v200.28h294.95V0H0ZM289.27,194.56H5.67V5.49h283.6v189.07Z" />
                  <polyline points="141.43 46.69 147.41 42.32 153.4 46.69 151.12 39.62 157.2 35.26 149.71 35.26 147.41 28.11 145.12 35.27 137.63 35.26 143.71 39.62 141.43 46.69" />
                  <polyline points="110.46 55.01 116.44 50.64 122.43 55.01 120.15 47.95 126.23 43.58 118.73 43.58 116.44 36.42 114.15 43.59 106.66 43.58 112.73 47.95 110.46 55.01" />
                  <polyline points="93.79 59.13 91.49 66.3 84 66.29 90.08 70.66 87.8 77.72 93.79 73.35 99.77 77.72 97.49 70.66 103.57 66.29 96.08 66.29 93.79 59.13" />
                  <polyline points="85.47 104.28 91.45 108.65 89.18 101.59 95.25 97.22 87.77 97.22 85.47 90.06 83.18 97.24 75.69 97.22 81.77 101.59 79.49 108.65 85.47 104.28" />
                  <polyline points="96.08 128.24 93.78 121.09 91.49 128.25 84 128.24 90.08 132.61 87.8 139.67 93.78 135.3 99.77 139.67 97.49 132.61 103.57 128.24 96.08 128.24" />
                  <polyline points="118.78 150.94 116.49 143.8 114.2 150.95 106.71 150.94 112.78 155.31 110.51 162.37 116.49 158.01 122.47 162.37 120.2 155.31 126.27 150.94 118.78 150.94" />
                  <polyline points="149.71 159.17 147.42 152.02 145.13 159.18 137.64 159.17 143.71 163.54 141.44 170.6 147.42 166.23 153.4 170.6 151.12 163.54 157.2 159.17 149.71 159.17" />
                  <polyline points="180.64 150.94 178.35 143.8 176.05 150.95 168.57 150.94 174.64 155.31 172.37 162.37 178.35 158.01 184.34 162.37 182.05 155.31 188.13 150.94 180.64 150.94" />
                  <polyline points="203.35 128.24 201.05 121.09 198.76 128.25 191.27 128.24 197.35 132.61 195.07 139.67 201.05 135.3 207.04 139.67 204.76 132.61 210.84 128.24 203.35 128.24" />
                  <polyline points="219.06 97.13 211.57 97.13 209.27 89.98 206.99 97.14 199.49 97.13 205.57 101.5 203.3 108.56 209.27 104.19 215.26 108.56 212.99 101.5 219.06 97.13" />
                  <polyline points="195.07 77.62 201.05 73.26 207.04 77.62 204.76 70.56 210.84 66.2 203.35 66.2 201.05 59.05 198.76 66.21 191.27 66.2 197.35 70.56 195.07 77.62" />
                  <polyline points="178.44 36.43 176.15 43.59 168.66 43.58 174.73 47.95 172.45 55.02 178.45 50.64 184.42 55.02 182.15 47.95 188.23 43.58 180.73 43.58 178.44 36.43" />
                  <path d="M330.3,76.66V30.13h31.9v7.87h-22.5v11.01h19.42v7.87h-19.42v19.77h-9.39Z" />
                  <path d="M392.06,76.66v-5.05c-1.23,1.8-2.84,3.22-4.84,4.25-2,1.04-4.11,1.55-6.33,1.55s-4.3-.5-6.09-1.49c-1.8-.99-3.1-2.39-3.9-4.19-.8-1.8-1.21-4.28-1.21-7.46v-21.33h8.92v15.49c0,4.74.16,7.64.49,8.71.33,1.07.92,1.92,1.79,2.54.87.62,1.97.94,3.3.94,1.52,0,2.89-.42,4.09-1.25,1.21-.83,2.03-1.87,2.47-3.11.45-1.24.67-4.27.67-9.09v-14.22h8.92v33.71h-8.28Z" />
                  <path d="M440.24,76.66h-8.92v-17.2c0-3.64-.19-5.99-.57-7.06s-1-1.9-1.86-2.49c-.86-.59-1.89-.89-3.09-.89-1.54,0-2.93.42-4.16,1.27-1.23.85-2.07,1.97-2.52,3.37-.46,1.4-.68,3.98-.68,7.74v15.27h-8.92v-33.71h8.28v4.95c2.94-3.81,6.64-5.71,11.11-5.71,1.97,0,3.77.35,5.4,1.06,1.63.71,2.86,1.61,3.7,2.71.84,1.1,1.42,2.35,1.75,3.75.33,1.4.49,3.4.49,6v20.95Z" />
                  <path d="M480.2,76.66h-8.28v-4.95c-1.38,1.93-3,3.36-4.87,4.3-1.87.94-3.76,1.41-5.67,1.41-3.87,0-7.19-1.56-9.95-4.68-2.76-3.12-4.14-7.47-4.14-13.06s1.34-10.05,4.03-13.03c2.69-2.97,6.08-4.46,10.19-4.46,3.77,0,7.02,1.57,9.78,4.7v-16.76h8.92v46.53ZM456.4,59.08c0,3.6.5,6.2,1.49,7.81,1.44,2.33,3.45,3.49,6.03,3.49,2.05,0,3.8-.87,5.24-2.62,1.44-1.75,2.16-4.35,2.16-7.82,0-3.87-.7-6.66-2.09-8.36s-3.19-2.56-5.36-2.56-3.89.84-5.32,2.52c-1.43,1.68-2.14,4.2-2.14,7.54Z" />
                  <path d="M508.51,65.93l8.89,1.49c-1.14,3.26-2.95,5.74-5.41,7.44-2.47,1.7-5.55,2.55-9.25,2.55-5.86,0-10.2-1.92-13.01-5.74-2.22-3.07-3.33-6.94-3.33-11.62,0-5.59,1.46-9.96,4.38-13.12s6.61-4.75,11.08-4.75c5.01,0,8.97,1.66,11.87,4.97,2.9,3.31,4.28,8.38,4.16,15.22h-22.34c.06,2.65.78,4.7,2.16,6.17,1.38,1.47,3.09,2.21,5.14,2.21,1.4,0,2.57-.38,3.52-1.14s1.67-1.99,2.16-3.68ZM509.02,56.92c-.06-2.58-.73-4.54-2-5.89-1.27-1.34-2.81-2.02-4.63-2.02-1.95,0-3.55.71-4.82,2.13-1.27,1.42-1.89,3.34-1.87,5.78h13.33Z" />
                  <path d="M556.05,76.66h-8.28v-4.95c-1.38,1.93-3,3.36-4.87,4.3-1.87.94-3.76,1.41-5.67,1.41-3.87,0-7.19-1.56-9.95-4.68-2.76-3.12-4.14-7.47-4.14-13.06s1.34-10.05,4.03-13.03c2.69-2.97,6.08-4.46,10.19-4.46,3.77,0,7.02,1.57,9.78,4.7v-16.76h8.92v46.53ZM532.25,59.08c0,3.6.5,6.2,1.49,7.81,1.44,2.33,3.45,3.49,6.03,3.49,2.05,0,3.8-.87,5.24-2.62,1.44-1.75,2.16-4.35,2.16-7.82,0-3.87-.7-6.66-2.09-8.36s-3.19-2.56-5.36-2.56-3.89.84-5.32,2.52c-1.43,1.68-2.14,4.2-2.14,7.54Z" />
                  <path d="M582.53,76.66V30.13h8.92v16.76c2.75-3.13,6.01-4.7,9.78-4.7,4.1,0,7.5,1.49,10.19,4.46,2.69,2.97,4.03,7.24,4.03,12.81s-1.37,10.19-4.11,13.3c-2.74,3.11-6.07,4.67-9.98,4.67-1.93,0-3.82-.48-5.7-1.44-1.87-.96-3.49-2.38-4.84-4.27v4.95h-8.28ZM591.38,59.08c0,3.49.55,6.07,1.65,7.74,1.54,2.37,3.6,3.55,6.16,3.55,1.97,0,3.64-.84,5.03-2.52,1.39-1.68,2.08-4.33,2.08-7.95,0-3.85-.7-6.63-2.09-8.33s-3.18-2.56-5.36-2.56-3.91.83-5.33,2.49c-1.42,1.66-2.13,4.18-2.13,7.57Z" />
                  <path d="M618.39,42.96h9.49l8.06,23.93,7.87-23.93h9.24l-11.9,32.44-2.13,5.87c-.78,1.97-1.53,3.47-2.24,4.51-.71,1.04-1.52,1.88-2.44,2.52-.92.65-2.05,1.15-3.4,1.51-1.34.36-2.86.54-4.55.54s-3.4-.18-5.05-.54l-.79-6.98c1.4.27,2.66.41,3.78.41,2.07,0,3.61-.61,4.6-1.83.99-1.22,1.76-2.77,2.29-4.65l-12.82-33.8Z" />
                  <path d="M345.63,120.96v7.11h-6.09v13.58c0,2.75.06,4.35.17,4.81.12.46.38.83.79,1.13.41.3.92.45,1.51.45.83,0,2.02-.29,3.59-.86l.76,6.92c-2.07.89-4.42,1.33-7.04,1.33-1.61,0-3.06-.27-4.35-.81-1.29-.54-2.24-1.24-2.84-2.09-.6-.86-1.02-2.02-1.25-3.47-.19-1.04-.29-3.13-.29-6.29v-14.69h-4.09v-7.11h4.09v-6.7l8.95-5.21v11.9h6.09Z" />
                  <path d="M360.71,108.13v17.11c2.88-3.36,6.32-5.05,10.31-5.05,2.05,0,3.9.38,5.55,1.14s2.89,1.74,3.73,2.92c.84,1.19,1.41,2.5,1.71,3.94.31,1.44.46,3.67.46,6.7v19.77h-8.92v-17.8c0-3.53-.17-5.78-.51-6.73-.34-.95-.94-1.71-1.79-2.27-.86-.56-1.93-.84-3.22-.84-1.48,0-2.8.36-3.97,1.08-1.16.72-2.01,1.8-2.55,3.25-.54,1.45-.81,3.59-.81,6.43v16.88h-8.92v-46.53h8.92Z" />
                  <path d="M411.04,143.93l8.89,1.49c-1.14,3.26-2.95,5.74-5.41,7.44-2.47,1.7-5.55,2.55-9.25,2.55-5.86,0-10.2-1.92-13.01-5.74-2.22-3.07-3.33-6.94-3.33-11.62,0-5.59,1.46-9.96,4.38-13.12s6.61-4.75,11.08-4.75c5.01,0,8.97,1.66,11.87,4.97,2.9,3.31,4.28,8.38,4.16,15.22h-22.34c.06,2.65.78,4.7,2.16,6.17,1.38,1.47,3.09,2.21,5.14,2.21,1.4,0,2.57-.38,3.52-1.14s1.67-1.99,2.16-3.68ZM411.55,134.92c-.06-2.58-.73-4.54-2-5.89-1.27-1.34-2.81-2.02-4.63-2.02-1.95,0-3.55.71-4.82,2.13-1.27,1.42-1.89,3.34-1.87,5.78h13.33Z" />
                  <path d="M445.79,154.66v-46.53h34.5v7.87h-25.11v10.32h23.36v7.84h-23.36v12.66h25.99v7.84h-35.39Z" />
                  <path d="M511.27,154.66v-5.05c-1.23,1.8-2.84,3.22-4.84,4.25-2,1.04-4.11,1.55-6.33,1.55s-4.3-.5-6.09-1.49c-1.8-.99-3.1-2.39-3.9-4.19-.8-1.8-1.21-4.28-1.21-7.46v-21.33h8.92v15.49c0,4.74.16,7.64.49,8.71.33,1.07.92,1.92,1.79,2.54.87.62,1.97.94,3.3.94,1.52,0,2.89-.42,4.09-1.25,1.21-.83,2.03-1.87,2.47-3.11.45-1.24.67-4.27.67-9.09v-14.22h8.92v33.71h-8.28Z" />
                  <path d="M537.33,154.66h-8.92v-33.71h8.28v4.79c1.42-2.26,2.69-3.75,3.82-4.47,1.13-.72,2.42-1.08,3.86-1.08,2.03,0,3.99.56,5.87,1.68l-2.76,7.78c-1.5-.97-2.9-1.46-4.19-1.46s-2.31.34-3.17,1.03c-.87.69-1.55,1.93-2.05,3.73-.5,1.8-.75,5.57-.75,11.3v10.41Z" />
                  <path d="M552.02,137.33c0-2.96.73-5.83,2.19-8.6,1.46-2.77,3.53-4.89,6.2-6.35,2.68-1.46,5.67-2.19,8.97-2.19,5.1,0,9.28,1.66,12.54,4.97,3.26,3.31,4.89,7.5,4.89,12.55s-1.65,9.33-4.94,12.68-7.43,5.03-12.42,5.03c-3.09,0-6.04-.7-8.84-2.09s-4.94-3.44-6.39-6.14c-1.46-2.7-2.19-5.98-2.19-9.85ZM561.17,137.81c0,3.34.79,5.9,2.38,7.68,1.59,1.78,3.54,2.67,5.87,2.67s4.28-.89,5.86-2.67,2.36-4.36,2.36-7.74-.79-5.84-2.36-7.62-3.53-2.67-5.86-2.67-4.28.89-5.87,2.67c-1.59,1.78-2.38,4.34-2.38,7.68Z" />
                  <path d="M593.54,120.96h8.31v4.95c1.08-1.69,2.54-3.07,4.38-4.13,1.84-1.06,3.88-1.59,6.12-1.59,3.91,0,7.24,1.53,9.97,4.6,2.73,3.07,4.09,7.34,4.09,12.82s-1.38,10-4.13,13.12c-2.75,3.12-6.08,4.68-10,4.68-1.86,0-3.55-.37-5.06-1.11-1.51-.74-3.11-2.01-4.78-3.81v16.98h-8.92v-46.53ZM602.36,137.24c0,3.79.75,6.58,2.25,8.39,1.5,1.81,3.33,2.71,5.49,2.71s3.8-.83,5.17-2.49c1.38-1.66,2.06-4.38,2.06-8.17,0-3.53-.71-6.16-2.13-7.87-1.42-1.71-3.17-2.57-5.27-2.57s-3.99.84-5.43,2.52c-1.44,1.68-2.16,4.17-2.16,7.47Z" />
                  <path d="M653.01,143.93l8.89,1.49c-1.14,3.26-2.95,5.74-5.41,7.44-2.47,1.7-5.55,2.55-9.25,2.55-5.86,0-10.2-1.92-13.01-5.74-2.22-3.07-3.33-6.94-3.33-11.62,0-5.59,1.46-9.96,4.38-13.12s6.61-4.75,11.08-4.75c5.01,0,8.97,1.66,11.87,4.97,2.9,3.31,4.28,8.38,4.16,15.22h-22.34c.06,2.65.78,4.7,2.16,6.17,1.38,1.47,3.09,2.21,5.14,2.21,1.4,0,2.57-.38,3.52-1.14s1.67-1.99,2.16-3.68ZM653.52,134.92c-.06-2.58-.73-4.54-2-5.89-1.27-1.34-2.81-2.02-4.63-2.02-1.95,0-3.55.71-4.82,2.13-1.27,1.42-1.89,3.34-1.87,5.78h13.33Z" />
                  <path d="M676.31,131.24l-8.09-1.46c.91-3.26,2.48-5.67,4.7-7.24,2.22-1.57,5.52-2.35,9.9-2.35,3.98,0,6.94.47,8.89,1.41,1.95.94,3.32,2.14,4.11,3.59.79,1.45,1.19,4.11,1.19,7.98l-.09,10.41c0,2.96.14,5.15.43,6.55.29,1.41.82,2.92,1.6,4.52h-8.82c-.23-.59-.52-1.47-.86-2.63-.15-.53-.25-.88-.32-1.05-1.52,1.48-3.15,2.59-4.89,3.33-1.73.74-3.59,1.11-5.55,1.11-3.47,0-6.21-.94-8.2-2.82-2-1.88-3-4.26-3-7.14,0-1.9.46-3.6,1.37-5.09.91-1.49,2.18-2.63,3.82-3.43,1.64-.79,4-1.49,7.09-2.08,4.17-.78,7.06-1.51,8.66-2.19v-.89c0-1.71-.42-2.94-1.27-3.67-.85-.73-2.44-1.1-4.79-1.1-1.59,0-2.83.31-3.71.94-.89.62-1.61,1.72-2.16,3.29ZM688.24,138.48c-1.14.38-2.95.84-5.43,1.36-2.48.53-4.09,1.05-4.86,1.56-1.16.83-1.75,1.87-1.75,3.14s.46,2.33,1.4,3.24c.93.91,2.12,1.36,3.55,1.36,1.61,0,3.14-.53,4.6-1.59,1.08-.8,1.79-1.79,2.13-2.95.23-.76.35-2.21.35-4.35v-1.78Z" />
                  <path d="M736.46,154.66h-8.92v-17.2c0-3.64-.19-5.99-.57-7.06s-1-1.9-1.86-2.49c-.86-.59-1.89-.89-3.09-.89-1.54,0-2.93.42-4.16,1.27-1.23.85-2.07,1.97-2.52,3.37-.46,1.4-.68,3.98-.68,7.74v15.27h-8.92v-33.71h8.28v4.95c2.94-3.81,6.64-5.71,11.11-5.71,1.97,0,3.77.35,5.4,1.06,1.63.71,2.86,1.61,3.7,2.71.84,1.1,1.42,2.35,1.75,3.75.33,1.4.49,3.4.49,6v20.95Z" />
                  <path d="M763.56,108.13h9.39v25.2c0,4,.12,6.59.35,7.78.4,1.9,1.36,3.43,2.87,4.59s3.58,1.73,6.21,1.73,4.68-.54,6.03-1.63c1.35-1.09,2.17-2.43,2.44-4.01.27-1.59.41-4.22.41-7.9v-25.74h9.39v24.44c0,5.59-.25,9.53-.76,11.84-.51,2.31-1.44,4.25-2.81,5.84-1.37,1.59-3.19,2.85-5.47,3.79s-5.27,1.41-8.95,1.41c-4.44,0-7.81-.51-10.11-1.54-2.3-1.03-4.11-2.36-5.44-4-1.33-1.64-2.21-3.36-2.63-5.16-.61-2.67-.92-6.6-.92-11.81v-24.82Z" />
                  <path d="M841.16,154.66h-8.92v-17.2c0-3.64-.19-5.99-.57-7.06s-1-1.9-1.86-2.49c-.86-.59-1.89-.89-3.09-.89-1.54,0-2.93.42-4.16,1.27-1.23.85-2.07,1.97-2.52,3.37-.46,1.4-.68,3.98-.68,7.74v15.27h-8.92v-33.71h8.28v4.95c2.94-3.81,6.64-5.71,11.11-5.71,1.97,0,3.77.35,5.4,1.06,1.63.71,2.86,1.61,3.7,2.71.84,1.1,1.42,2.35,1.75,3.75.33,1.4.49,3.4.49,6v20.95Z" />
                  <path d="M850.21,116.39v-8.25h8.92v8.25h-8.92ZM850.21,154.66v-33.71h8.92v33.71h-8.92Z" />
                  <path d="M866.2,137.33c0-2.96.73-5.83,2.19-8.6,1.46-2.77,3.53-4.89,6.2-6.35,2.68-1.46,5.67-2.19,8.97-2.19,5.1,0,9.28,1.66,12.54,4.97,3.26,3.31,4.89,7.5,4.89,12.55s-1.65,9.33-4.94,12.68-7.43,5.03-12.42,5.03c-3.09,0-6.04-.7-8.84-2.09s-4.94-3.44-6.39-6.14c-1.46-2.7-2.19-5.98-2.19-9.85ZM875.34,137.81c0,3.34.79,5.9,2.38,7.68,1.59,1.78,3.54,2.67,5.87,2.67s4.28-.89,5.86-2.67,2.36-4.36,2.36-7.74-.79-5.84-2.36-7.62-3.53-2.67-5.86-2.67-4.28.89-5.87,2.67c-1.59,1.78-2.38,4.34-2.38,7.68Z" />
                  <path d="M938.63,154.66h-8.92v-17.2c0-3.64-.19-5.99-.57-7.06s-1-1.9-1.86-2.49c-.86-.59-1.89-.89-3.09-.89-1.54,0-2.93.42-4.16,1.27-1.23.85-2.07,1.97-2.52,3.37-.46,1.4-.68,3.98-.68,7.74v15.27h-8.92v-33.71h8.28v4.95c2.94-3.81,6.64-5.71,11.11-5.71,1.97,0,3.77.35,5.4,1.06,1.63.71,2.86,1.61,3.7,2.71.84,1.1,1.42,2.35,1.75,3.75.33,1.4.49,3.4.49,6v20.95Z" />
                </g>
              </svg>
            </a>
            <p className="py-8 text-sm text-gray-500 lg:max-w-xs text-center sm:text-left lg:text-left">
              The European Commission support does not constitute endorsement of
              the contents which reflects the views only of the authors, and the
              Commission cannot be held responsible for any use which may be
              made of the information contained.
            </p>
          </div>

          <div className="col-span-full sm:col-span-2 lg:col-span-2 sm:max-w-[320px] flex w-full">
            <div className="flex flex-col items-center lg:items-start">
              <Link
                href="https://european-research-area.ec.europa.eu/"
                className="text-gray-600 hover:text-gray-500 hover:underline"
              >
                <Image
                  src={'/images/ERA_logo.jpg'}
                  height={144}
                  width={735}
                  alt="ERA"
                  className={classNames(
                    'w-full h-auto object-contain rounded-md'
                  )}
                />
              </Link>
              <p className="py-8 text-sm text-gray-500 lg:max-w-xs text-center lg:text-left">
                We support the European Research Area aimed at creating a
                single, borderless market for research, innovation and
                technology in the EU.
              </p>
            </div>
          </div>
          <div className="hidden lg:mx-auto col-span-2"></div>
          <div className="lg:mx-auto text-left">
            <h4 className="text-lg text-gray-900 font-medium mb-7">Info</h4>
            <ul className="text-sm transition-all duration-500">
              <li className="mb-4">
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-500 hover:underline"
                >
                  About us
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="/static-pages/terms-of-use"
                  className="text-gray-600 hover:text-gray-500 hover:underline"
                >
                  Terms of use
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="/static-pages/privacy-policy"
                  className="text-gray-600 hover:text-gray-500 hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="/static-pages/cookie-policy"
                  className="text-gray-600 hover:text-gray-500 hover:underline"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:mx-auto text-left">
            <h4 className="text-lg text-gray-900 font-medium mb-7">
              Contact Us
            </h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-4">
                <a
                  href="mailto:info@futures4europe.eu"
                  className="text-gray-600 hover:text-gray-500 hover:underline"
                >
                  info@futures4europe.eu
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Logo fill={'#fff'} className="mt-4" />

        <div className="py-7 border-t border-gray-200">
          <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
            <span className="text-sm text-gray-500 ">
              ©<a href="https://futures4europe.eu">futures4europe</a> 2025, All
              rights reserved. Designed by{' '}
              <a target="_blank" href="https://www.uefiscdi.ro">
                UEFISCDI
              </a>
            </span>
            <div className="flex mt-4 space-x-4 sm:justify-center lg:mt-0 ">
              <a
                href="https://www.linkedin.com/company/futures4europe/"
                target="_blank"
                className="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-indigo-600"
              >
                <svg
                  className="w-[1rem] h-[1rem] text-white"
                  viewBox="0 0 13 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.8794 11.5527V3.86835H0.318893V11.5527H2.87967H2.8794ZM1.59968 2.81936C2.4924 2.81936 3.04817 2.2293 3.04817 1.49188C3.03146 0.737661 2.4924 0.164062 1.61666 0.164062C0.74032 0.164062 0.167969 0.737661 0.167969 1.49181C0.167969 2.22923 0.723543 2.8193 1.5829 2.8193H1.59948L1.59968 2.81936ZM4.29668 11.5527H6.85698V7.26187C6.85698 7.03251 6.87369 6.80255 6.94134 6.63873C7.12635 6.17968 7.54764 5.70449 8.25514 5.70449C9.18141 5.70449 9.55217 6.4091 9.55217 7.44222V11.5527H12.1124V7.14672C12.1124 4.78652 10.8494 3.68819 9.16483 3.68819C7.78372 3.68819 7.17715 4.45822 6.84014 4.98267H6.85718V3.86862H4.29681C4.33023 4.5895 4.29661 11.553 4.29661 11.553L4.29668 11.5527Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@futures4europe"
                target="_blank"
                className="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-indigo-600"
              >
                <svg
                  className="w-[1rem] h-[1rem] text-white"
                  viewBox="0 0 48 48"
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M 23.857422 8.5 C 17.504717 8.5 11.602344 8.9526234 8.234375 9.65625 A 1.50015 1.50015 0 0 0 8.2128906 9.6621094 C 5.6754768 10.230693 3.2861897 12.048234 2.7832031 14.894531 A 1.50015 1.50015 0 0 0 2.78125 14.90625 C 2.394836 17.200265 2 20.190694 2 24.5 C 2 28.801151 2.3961903 31.712324 2.8847656 34.126953 C 3.4000756 36.889296 5.7342165 38.761817 8.3105469 39.337891 A 1.50015 1.50015 0 0 0 8.3476562 39.347656 C 11.86271 40.040284 17.598467 40.5 23.951172 40.5 C 30.303877 40.5 36.042686 40.04028 39.558594 39.347656 A 1.50015 1.50015 0 0 0 39.595703 39.337891 C 42.133117 38.769306 44.522404 36.951766 45.025391 34.105469 A 1.50015 1.50015 0 0 0 45.029297 34.083984 C 45.409789 31.743169 45.902812 28.755621 46 24.439453 A 1.50015 1.50015 0 0 0 46 24.40625 C 46 20.087697 45.50571 17.078675 45.023438 14.695312 C 44.512192 11.927074 42.175378 10.049478 39.595703 9.4726562 A 1.50015 1.50015 0 0 0 39.476562 9.4511719 C 36.0464 8.9689502 30.211115 8.5 23.857422 8.5 z M 20.15625 17.001953 C 20.526656 16.994297 20.909531 17.081906 21.269531 17.285156 L 29.873047 22.146484 C 31.324047 22.966484 31.324047 25.035469 29.873047 25.855469 L 21.269531 30.716797 C 19.830531 31.528797 18.037109 30.500328 18.037109 28.861328 L 18.037109 19.138672 C 18.037109 17.909422 19.045031 17.024922 20.15625 17.001953 z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
