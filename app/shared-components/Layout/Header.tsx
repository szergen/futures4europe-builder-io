'use client';
import { motion, useMotionValue, animate } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Logo } from '@app/shared-components/Logo/Logo';
import testIds from '@app/utils/test-ids';
import SearchComponentV1 from '../SearchComponentV1/SearchComponentV1';
import style from './Header.module.css';
import Link from 'next/link';
import classNames from 'classnames';
import SpriteSvg from '@app/shared-components/SpriteSvg/SpriteSvg';
import { useAuth } from '@app/custom-hooks/AuthContext/AuthContext';
import { useEffect, useState, useMemo, memo, useRef, useCallback } from 'react';
import { Avatar, Dropdown, Modal } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import {
  HiUserCircle,
  HiPlusSm,
  HiShieldExclamation,
  HiUser,
} from 'react-icons/hi';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Tag from '../Tag/Tag';
import { decidePageTypeItems } from '@app/utils/parse-utils';
import GlowButton from './NavBar/GlowButton';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';
import posthog from 'posthog-js';
import { debounce } from 'lodash';

const Header = () => {
  const {
    isLoggedIn,
    userDetails,
    logout,
    isLoadingInProgress,
    infoPages,
    postPages,
  } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [isClientRendered, setIsClientRendered] = useState(false);

  //console.log(userDetails);
  const router = useRouter();
  const handleLogOut = async () => {
    logout();
    router.push('/login');
  };

  // Add check for admin status
  const isWixAdmin = userDetails?.isAdmin || false;

  // Handle dropdown open/close state
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown state
  };
  //console.log('debug2->userDetails', userDetails);

  // Simplified search bar visibility logic
  function useSearchBarVisibility() {
    const pathname = usePathname();

    // Directly compute value without state or effects
    const hideSearchBarPaths = ['/', '/home'];
    const showSearchBar = !hideSearchBarPaths.includes(pathname);

    // For debugging
    // console.log('Path:', pathname, 'Show search bar:', showSearchBar);

    return showSearchBar;
  }

  // 2. Const
  const showSearchBar = useSearchBarVisibility();

  // Initialize cookie consent
  useEffect(() => {
    // Only initialize if it hasn't been initialized yet
    if (!window.cc) {
      CookieConsent.run({
        cookie: {
          name: 'cc_cookie',
        },
        guiOptions: {
          consentModal: {
            layout: 'cloud inline',
            position: 'bottom center',
            equalWeightButtons: true,
            flipButtons: false,
          },
          preferencesModal: {
            layout: 'box',
            equalWeightButtons: true,
            flipButtons: false,
          },
        },
        categories: {
          necessary: {
            enabled: true,
            readOnly: true,
          },
          analytics: {
            autoClear: {
              cookies: [
                {
                  name: /^_ga/,
                },
                {
                  name: '_gid',
                },
              ],
            },
            services: {
              ga: {
                label: 'Google Analytics',
                onAccept: () => {
                  // Initialize Google Analytics here if needed
                  console.log('Google Analytics accepted');
                },
                onReject: () => {
                  // Clean up Google Analytics here if needed
                  console.log('Google Analytics rejected');
                },
              },
              youtube: {
                label: 'Youtube Embed',
                onAccept: () => {
                  console.log('Youtube embeds accepted');
                },
                onReject: () => {
                  console.log('Youtube embeds rejected');
                },
              },
              posthog: {
                label: 'PostHog Analytics',
                onAccept: () => {
                  if (posthog?.initialized) {
                    posthog?.opt_in_capturing();
                    console.log('PostHog tracking enabled');
                  }
                },
                onReject: () => {
                  if (posthog?.initialized) {
                    posthog?.opt_out_capturing();
                    console.log('PostHog tracking disabled');
                  }
                },
              },
            },
          },
          ads: {},
        },
        language: {
          default: 'en',
          translations: {
            en: {
              consentModal: {
                title: 'We use cookies',
                description:
                  'We use cookies and similar technologies to help personalize content, tailor and measure ads, and provide a better experience.',
                acceptAllBtn: 'Accept all',
                acceptNecessaryBtn: 'Reject all',
                showPreferencesBtn: 'Manage preferences',
                footer: `
                    <a href="/static-pages/privacy-policy" target="_blank">Privacy Policy</a>
                    <a href="/static-pages/terms-of-use" target="_blank">Terms of Use</a>
                  `,
              },
              preferencesModal: {
                title: 'Privacy Preferences',
                acceptAllBtn: 'Accept all',
                acceptNecessaryBtn: 'Reject all',
                savePreferencesBtn: 'Save preferences',
                sections: [
                  {
                    title: 'Necessary cookies',
                    description:
                      'These cookies are essential for the proper functioning of the website.',
                    linkedCategory: 'necessary',
                  },
                  {
                    title: 'Analytics cookies',
                    description:
                      'These cookies help us understand how visitors interact with our website.',
                    linkedCategory: 'analytics',
                  },
                  {
                    title: 'Marketing cookies',
                    description:
                      'These cookies are used to deliver relevant advertisements.',
                    linkedCategory: 'ads',
                  },
                ],
              },
            },
          },
        },
        onFirstConsent: ({ cookie }) => {
          console.log('First consent:', cookie);
        },
        onConsent: ({ cookie }) => {
          console.log('Consent updated:', cookie);
        },
        onChange: ({ changedCategories, changedServices }) => {
          console.log('Settings changed:', changedCategories, changedServices);
          // Handle changes to specific categories
          if (changedCategories.includes('analytics')) {
            // Update analytics settings
          }
        },
      });
    }

    // Cleanup function
    return () => {
      if (window.cc) {
        window.cc.destroy();
      }
    };
  }, []);

  const SignOutUser = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-5 h-5"
    >
      <path d="M9.75 3c-1.243 0-2.25 1.007-2.25 2.25 0 .414.336.75.75.75s.75-.336.75-.75.336-.75.75-.75h3.5c.69 0 1.25.56 1.25 1.25v8.5c0 .69-.56 1.25-1.25 1.25h-3.5c-.414 0-.75-.336-.75-.75s-.336-.75-.75-.75-.75.336-.75.75c0 1.243 1.007 2.25 2.25 2.25h3.5c1.519 0 2.75-1.231 2.75-2.75v-8.5c0-1.519-1.231-2.75-2.75-2.75h-3.5Z" />
      <path d="M4.75 9.25c-.414 0-.75.336-.75.75s.336.75.75.75h5.69l-.97.97c-.293.293-.293.767 0 1.06.293.293.767.293 1.06 0l2.25-2.25c.141-.14.22-.331.22-.53s-.079-.39-.22-.53l-2.25-2.25c-.293-.293-.767-.293-1.06 0-.293.293-.293.767 0 1.06l.97.97h-5.69Z" />
    </svg>
  );

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside, {
        passive: true,
      });
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // #region pageTypeCounts
  const [pageTypeCounts, setPageTypeCounts] = useState({
    post: 0,
    project: 0,
    person: 0,
    organisation: 0,
    event: 0,
    projectResult: 0,
  });

  useEffect(() => {
    if (infoPages && postPages) {
      setPageTypeCounts((prev) => ({
        ...prev,
        post:
          decidePageTypeItems(
            'post',
            postPages.map((item) => item.data),
            infoPages.map((item) => item.data)
          )?.length || 0,
        project:
          decidePageTypeItems(
            'project',
            postPages.map((item) => item.data),
            infoPages.map((item) => item.data)
          )?.length || 0,
        person:
          decidePageTypeItems(
            'person',
            postPages.map((item) => item.data),
            infoPages.map((item) => item.data)
          )?.length || 0,
        organisation:
          decidePageTypeItems(
            'organisation',
            postPages.map((item) => item.data),
            infoPages.map((item) => item.data)
          )?.length || 0,
        event:
          decidePageTypeItems(
            'event',
            postPages.map((item) => item.data),
            infoPages.map((item) => item.data)
          )?.length || 0,
        projectResult:
          decidePageTypeItems(
            'project-result',
            postPages.map((item) => item.data),
            infoPages.map((item) => item.data)
          )?.length || 0,
      }));
    }
  }, [infoPages, postPages]);

  useEffect(() => {
    console.log('pageTypeCounts', pageTypeCounts);
  }, [pageTypeCounts]);

  // #region Check if user info page is ready
  const [isPersonInfoPageReady, setIsPersonInfoPageReady] = useState(false);
  const [personInfoPageLink, setPersonInfoPageLink] = useState('');

  useEffect(() => {
    if (userDetails?.userTag?.name && !isPersonInfoPageReady) {
      setIsPersonInfoPageReady(true);
      setPersonInfoPageLink(userDetails?.userTag?.tagPageLink || '');
    }
  }, [isLoggedIn, router, userDetails?.userTag?.tagPageLink]);

  // SCROLL MENU TAGS

  // Replace your scroll position state with motion values
  const x = useMotionValue(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Function to scroll with buttons
  const scrollTags = useCallback(
    (direction) => {
      const currentX = x.get();
      const scrollAmount = 200;

      // Calculate new position
      const newPosition =
        direction === 'right'
          ? currentX - scrollAmount // Scroll right
          : currentX + scrollAmount; // Scroll left

      // Apply constraints but allow slight overscroll on left
      const minX = -(contentWidth - containerWidth + 80); // Right limit
      const maxX = 40; // Allow slight overscroll to left (40px)

      const constrainedX = Math.max(minX, Math.min(maxX, newPosition));

      // Animate to the new position
      animate(x, constrainedX, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.3,
      });

      // Update arrow visibility
      updateArrowVisibility(constrainedX);
    },
    [x, contentWidth, containerWidth]
  );

  // Function to update arrow visibility
  const updateArrowVisibility = (currentX) => {
    setShowLeftArrow(currentX < -10);
    setShowRightArrow(currentX > -(contentWidth - containerWidth + 40));
  };

  // Update container dimensions
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const updateDimensions = debounce(() => {
      setContainerWidth(scrollContainer.clientWidth);
      setContentWidth(scrollContainer.scrollWidth + 100);
      updateArrowVisibility(x.get());
    }, 100);

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(scrollContainer);

    return () => {
      resizeObserver.disconnect();
      updateDimensions.cancel();
    };
  }, []);

  // Listen for x changes to update arrows
  useEffect(() => {
    const unsubscribe = x.onChange(updateArrowVisibility);
    return () => unsubscribe();
  }, [x, contentWidth, containerWidth]);

  if (typeof useMotionValue().jump !== 'function') {
    Object.defineProperty(MotionValue.prototype, 'jump', {
      value: function (to) {
        animate(this, to, {
          type: 'tween',
          duration: 0.3,
          ease: 'easeOut',
        });
      },
    });
  }

  const accountSection = useMemo(() => {
    return isLoggedIn ? (
      <div
        className={classNames('z-90', style.avatarImageHeader)}
        ref={dropdownRef}
      >
        <Dropdown
          className="rounded-lg shadow-sm"
          label={
            <Avatar
              alt="User settings"
              img={
                userDetails?.userTag?.picture
                  ? userDetails?.userTag?.picture
                  : 'https://framerusercontent.com/images/NVeaM8VrCezyFEd2iOUwfmMuGCI.svg'
              }
              rounded
              className={classNames(style.avatarImage, 'avatarUserHeader', {
                active: isDropdownOpen,
              })}
              onClick={toggleDropdown}
            />
          }
          arrowIcon={false}
          inline
        >
          <Dropdown.Header>
            <span className="block text-sm font-semibold">
              {userDetails?.userName}
            </span>
            <span className="block text-sm">{userDetails?.email}</span>

            {personInfoPageLink ? (
              <Link href={personInfoPageLink}>
                <Dropdown.Item icon={HiUser}>My info page</Dropdown.Item>
              </Link>
            ) : (
              <Dropdown.Item icon={HiUser}>
                <Link href="/person/New_Info_Page">Dashboard</Link>
              </Dropdown.Item>
            )}
          </Dropdown.Header>

          <Link href="/dashboard">
            <Dropdown.Item icon={HiUserCircle}>Dashboard</Dropdown.Item>
          </Link>

          <Link href="/project/New_Project">
            <Dropdown.Item icon={HiPlusSm}>Add Project</Dropdown.Item>
          </Link>

          <Link href="/post/New_Post?pageType=projectResult">
            <Dropdown.Item icon={HiPlusSm}>Add Project result</Dropdown.Item>
          </Link>

          <Link href="/organisation/New_Organisation">
            <Dropdown.Item icon={HiPlusSm}>Add Organisation</Dropdown.Item>
          </Link>

          <Link href="/post/New_Post">
            <Dropdown.Item icon={HiPlusSm}>Add Post</Dropdown.Item>
          </Link>

          <Link href="/post/New_Post?pageType=event">
            <Dropdown.Item icon={HiPlusSm}>Add Event</Dropdown.Item>
          </Link>

          {/* Admin Delete Button */}
          {isWixAdmin && (
            <Link href="/static-pages/admin">
              <Dropdown.Item icon={HiPlusSm}>Admin dashboard</Dropdown.Item>
            </Link>
          )}

          {/* <Dropdown.Item
            icon={HiPlusSm}
            //  onClick={handleCreatePost}
          >
            <Link href=''> Add Foresight method</Link>
          </Dropdown.Item> */}
          <Dropdown.Divider />

          <Link href="/dashboard/change-password">
            <Dropdown.Item icon={HiShieldExclamation}>
              Account security
            </Dropdown.Item>
          </Link>

          <Dropdown.Divider />

          <Dropdown.Item onClick={handleLogOut} icon={SignOutUser}>
            Log out
          </Dropdown.Item>
        </Dropdown>
      </div>
    ) : (
      <div className={classNames(style.buttonsContainer)}>
        <div
          className={classNames(style.topbarLogin, 'flex items-center gap-4')}
        >
          <Link href="/dashboard">
            <p className="font-bold text-white text-base">Login</p>
          </Link>

          <Link href="/register">
            <div>
              <GlowButton>Register</GlowButton>
            </div>
          </Link>
        </div>
      </div>
    );
  }, [
    isLoggedIn,
    userDetails,
    isDropdownOpen,
    isPersonInfoPageReady,
    userDetails?.userTag?.tagPageLink,
  ]);

  // Initialize client rendering state
  useEffect(() => {
    setIsClientRendered(true);
  }, []);

  // 4. Add will-change hints for GPU acceleration
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.style.willChange = 'transform';
      return () => {
        scrollContainer.style.willChange = 'auto';
      };
    }
  }, []);

  return (
    <div
      className={classNames({
        relative: showSearchBar,
        [style.compactHeaderWrapper]: showSearchBar,
        'min-h-[300px]': showSearchBar, // Increased to 300px to match header height
      })}
    >
      {/* Skeleton placeholder - only shows during SSR */}
      {!isClientRendered && (
        <div
          className="absolute top-0 w-full py-6 px-2 flex-col h-[300px]"
          style={{
            backgroundColor: '#1111C9', // Specific color as requested
          }}
        >
          <div className="flex justify-between sm:px-6 sm:px-14 h-header sm:items-center">
            {/* Logo placeholder */}
            <div className="w-32 h-10 bg-white/20 rounded animate-pulse"></div>

            {/* Tags placeholder */}
            <div className="hidden sm:flex space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-24 h-8 bg-white/20 rounded animate-pulse"
                ></div>
              ))}
            </div>

            {/* User/login placeholder */}
            <div className="w-24 h-10 bg-white/20 rounded animate-pulse"></div>
          </div>

          {/* Search bar placeholder for taller header */}
          {showSearchBar && (
            <div className="mt-8 mx-auto w-3/4 h-12 bg-white/20 rounded animate-pulse"></div>
          )}

          {/* Optional subtle pattern overlay */}
          <div
            className="absolute inset-0 overflow-hidden z-[-1] opacity-30"
            style={{
              background:
                'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          ></div>
        </div>
      )}

      <header
        className={classNames(
          showSearchBar ? 'relative' : 'absolute',
          'absolute top-0 flex w-full py-6 px-2 flex-col',
          style.header,
          {
            [style.homeHeaderWrapper]: !showSearchBar,
            'opacity-0': !isClientRendered, // Hide until client rendered
            'opacity-100 transition-opacity duration-300': isClientRendered,
          }
        )}
        data-testid={testIds.LAYOUT.HEADER}
      >
        <div
          className={classNames(
            'flex justify-between sm:px-6 sm:px-14 h-header sm:items-center sm:gap-4 sm:gap-8',
            style.headerContainer
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className={classNames(
              'flex flex-col sm:flex-row items-center gap-2 sm:gap-6',
              style.headerLogo
            )}
          >
            <Logo />
          </Link>

          {/* Page Buttons */}
          <div
            className={classNames('relative', style.headerTagContainerOuter)}
          >
            {/* Right scroll button */}
            {showRightArrow && (
              <button
                onClick={() => scrollTags('right')}
                className={classNames(
                  style.scrollButton,
                  style.scrollButtonRight
                )}
                aria-label="Scroll tags right"
              >
                <SpriteSvg.ArrowIcon
                  sizeH={20}
                  sizeW={20}
                  viewBox={'0 0 20 20'}
                  fill={'#fff'}
                  stroke={'10'}
                  inline={false}
                />
              </button>
            )}

            {/* Left scroll button */}
            {showLeftArrow && (
              <button
                onClick={() => scrollTags('left')}
                className={classNames(
                  style.scrollButton,
                  style.scrollButtonLeft
                )}
                aria-label="Scroll tags left"
              >
                <SpriteSvg.ArrowIcon
                  sizeH={20}
                  sizeW={20}
                  viewBox={'0 0 20 20'}
                  fill={'#fff'}
                  stroke={'10'}
                  inline={false}
                  className={'rotate-180'}
                />
              </button>
            )}

            {/* Container with overflow for horizontal scrolling */}
            <div
              ref={scrollContainerRef}
              className={classNames(
                'flex items-center gap-4',
                style.headerTagContainer,
                { [style.showTagContainer]: showSearchBar }
              )}
            >
              <motion.div
                className="flex items-center gap-4"
                style={{ x }}
                drag="x"
                dragConstraints={{
                  left: -(contentWidth - containerWidth + 80),
                  right: 60,
                }}
                dragElastic={0.05}
                dragMomentum={true}
                dragTransition={{
                  power: 0.4,
                  timeConstant: 200,
                  modifyTarget: (t) => {
                    // If we're past the right boundary, snap back
                    if (t < -(contentWidth - containerWidth + 80)) {
                      return -(contentWidth - containerWidth + 80);
                    }
                    // If we're past the left boundary, let it go a bit but not too far
                    if (t > 60) {
                      return 60;
                    }
                    // Otherwise snap to 50px increments for smooth scrolling
                    return Math.round(t / 50) * 50;
                  },
                }}
                onDragEnd={() => {
                  updateArrowVisibility(x.get());
                }}
              >
                {/* Posts Tag with fade effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{
                    once: false,
                    margin: '-40px', // Trigger fade before fully in view
                    amount: 'some', // Only need some of the element to be visible
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Tag
                    name="Posts"
                    hardcodedMentions={
                      pageTypeCounts.post !== 0
                        ? pageTypeCounts.post
                        : undefined
                    }
                    tagLine="List of Post Pages"
                    tagPageLink="/pages/post"
                    disableTooltip
                    disableUnderline
                    className={classNames(style.headerTag)}
                  />
                </motion.div>

                {/* Projects Tag with fade effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{
                    once: false,
                    margin: '-40px',
                    amount: 'some',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Tag
                    name="Projects"
                    hardcodedMentions={
                      pageTypeCounts.project !== 0
                        ? pageTypeCounts.project
                        : undefined
                    }
                    tagLine="List of Project Info Pages"
                    tagPageLink="/pages/project"
                    disableTooltip
                    disableUnderline
                    className={classNames(style.headerTag)}
                  />
                </motion.div>

                {/* Project Results Tag with fade effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{
                    once: false,
                    margin: '-40px',
                    amount: 'some',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Tag
                    name="Project Results"
                    hardcodedMentions={
                      pageTypeCounts.projectResult !== 0
                        ? pageTypeCounts.projectResult
                        : undefined
                    }
                    tagLine="List of Project Result Pages"
                    tagPageLink="/pages/project-result"
                    disableTooltip
                    disableUnderline
                    className={classNames(style.headerTag)}
                  />
                </motion.div>

                {/* Events Tag with fade effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{
                    once: false,
                    margin: '-40px',
                    amount: 'some',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Tag
                    name="Events"
                    hardcodedMentions={
                      pageTypeCounts.event !== 0
                        ? pageTypeCounts.event
                        : undefined
                    }
                    tagLine="List of Event Pages"
                    tagPageLink="/pages/event"
                    disableTooltip
                    disableUnderline
                    className={classNames(style.headerTag)}
                  />
                </motion.div>

                {/* Organisations Tag with fade effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{
                    once: false,
                    margin: '-40px',
                    amount: 'some',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Tag
                    name="Organisations"
                    hardcodedMentions={
                      pageTypeCounts.organisation !== 0
                        ? pageTypeCounts.organisation
                        : undefined
                    }
                    tagLine="List of Organisation Info Pages"
                    tagPageLink="/pages/organisation"
                    disableTooltip
                    disableUnderline
                    className={classNames(style.headerTag)}
                  />
                </motion.div>

                {/* People Tag with fade effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{
                    once: false,
                    margin: '-40px',
                    amount: 'some',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Tag
                    name="People"
                    hardcodedMentions={
                      pageTypeCounts.person !== 0
                        ? pageTypeCounts.person
                        : undefined
                    }
                    tagLine="List of Person Info Pages"
                    tagPageLink="/pages/person"
                    disableTooltip
                    disableUnderline
                    className={classNames(style.headerTag)}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Account */}
          {accountSection}

          {/* </h2> */}
          {/* <div>
          <NavBar />
        </div> */}
        </div>
        {/* Search */}
        <div
          className={classNames('relative', style.headerWithSearchContainer)}
        >
          {/* <SearchProvider> */}
          {showSearchBar && <SearchComponentV1 />}
          {/* </SearchProvider> */}
        </div>
        <Modal
          show={isLoadingInProgress}
          size="md"
          popup
          dismissible={false}
          className="z-[999]"
        >
          <Modal.Header className="opacity-0" />
          <Modal.Body>
            <div className="flex justify-center items-center gap-2 text-center">
              Loading...
              <LoadingSpinner size="sm" />
            </div>
          </Modal.Body>
        </Modal>
      </header>
    </div>
  );
};

export default memo(Header);
