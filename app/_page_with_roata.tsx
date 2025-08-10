'use client';
import { useAuth } from '@app/custom-hooks/AuthContext/AuthContext';
import { items } from '@wix/data';
import { useWixModules } from '@wix/sdk-react';
// import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
// import InertiaPlugin from 'gsap/InertiaPlugin';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import Draggable from 'gsap/Draggable';
import MiniPagesListItemPost from './page-components/shared-page-components/MiniPagesListComponentPost/components/MiniPagesListItemPost/MiniPagesListItemPost';
import { getCollectionItemByTitle } from './wixUtils/client-side';

// Helper function to get motion path length and spacing
function getPathProperties(pathSelector: any, itemCount: any) {
  const pathLength = MotionPathPlugin.getLength(pathSelector);
  const spacing = pathLength / (itemCount + 1); // Spacing between items
  return { pathLength, spacing };
}

// Function to animate items in along the path with a fade-in effect
function animateListIn(
  listSelector: any,
  pathSelector: any,
  delayStart = 0,
  itemSpacing = 0.2,
  alignOriginX = 1.9
) {
  const items = gsap.utils.toArray(`${listSelector} li`);
  const { pathLength, spacing } = getPathProperties(pathSelector, items.length);

  // Loop through each item and set initial animation state
  items.forEach((item, index) => {
    gsap.set(item, { opacity: 0, x: -item.offsetWidth / 2 }); // Set initial hidden state

    gsap.to(item, {
      duration: 2.5,
      delay: delayStart + index * itemSpacing,
      motionPath: {
        path: pathSelector,
        align: pathSelector,
        autoRotate: false,
        alignOrigin: [alignOriginX, 0.5], // Control positioning along the path
        start: (spacing * index) / pathLength,
        end: (spacing * (index + 1)) / pathLength,
      },
      opacity: 1, // Fade the item in
      ease: 'power2.inOut',
    });
  });
}

// Function to place items along the path and make them draggable
function makeListDraggable(listSelector: any, pathSelector: any) {
  const items = gsap.utils.toArray(`${listSelector} li`);
  const { pathLength, spacing } = getPathProperties(pathSelector, items.length);
  let currentOffset = 0;
  let dragMultiplier = 0.01; // Adjust to control drag speed

  // Initialize each item on the motion path
  items.forEach((item, index) => {
    gsap.set(item, {
      motionPath: {
        path: pathSelector,
        align: pathSelector,
        alignOrigin: [0.5, 0.5],
        start: (spacing * index) / pathLength,
        end: (spacing * (index + 1)) / pathLength,
      },
    });
  });

  // Draggable functionality along the path
  Draggable.create(items, {
    type: 'x', // Drag along the x direction
    onDrag: function () {
      const delta = this.deltaX * dragMultiplier;
      currentOffset += delta;

      // Update each item's position based on drag movement
      items.forEach((item, index) => {
        let newStart = (spacing * index + currentOffset) / pathLength;
        let newEnd = (spacing * (index + 1) + currentOffset) / pathLength;

        if (newStart >= 1) newStart -= 1; // Loop around
        if (newEnd >= 1) newEnd -= 1;

        gsap.to(item, {
          motionPath: {
            path: pathSelector,
            align: pathSelector,
            autoRotate: false,
            start: newStart,
            end: newEnd,
          },
          duration: 0, // Instantly update position
        });
      });
    },
    inertia: true, // Smooth continued motion after release
    onThrowUpdate: function () {
      items.forEach((item, index) => {
        let newStart = (spacing * index + currentOffset) / pathLength;
        let newEnd = (spacing * (index + 1) + currentOffset) / pathLength;

        if (newStart >= 1) newStart -= 1; // Loop around
        if (newEnd >= 1) newEnd -= 1;

        gsap.to(item, {
          motionPath: {
            path: pathSelector,
            align: pathSelector,
            autoRotate: false,
            start: newStart,
            end: newEnd,
          },
          duration: 0, // Instant update during inertia
        });
      });
    },
  });
}

export const Home = () => {
  const [homepageConfig, setHomepageConfig] = useState(null);
  const [featuredPages, setFeaturedPages] = useState({
    featuredPosts: [],
    featuredProjects: [],
    featuredProjectResults: [],
    featuredEvents: [],
    featuredOrganisations: [],
    featuredPeople: [],
  });
  // const [userInfoPage, setUserInfoPage] = useState('');

  const {
    // login,
    // isLoggedIn,
    // loading,
    // userDetails,
    // logout,
    infoPages,
    postPages,
    // ownedInfoPages,
    // ownedPostPages,
    // ownedPostPagesFetched,
    // ownedInfoPagesFetched,
    // handleUserDataRefresh,
    // tags,
  } = useAuth();
  // console.log('ownedInfoPages', ownedInfoPages);

  // const router = useRouter();
  // const { removeDataItem } = useWixModules(items);
  // const { updateMember } = useWixModules(members);

  // useEffect(() => {
  //   // console.log('debug1 -> isLoggedIn:', isLoggedIn); // Debugging line
  //   // if (!loading && !isLoggedIn) {
  //   //   router.push('/login');
  //   // }
  //   // Get the user's tag page link
  //   if (isLoggedIn && tags) {
  //     const userTag = tags.find(
  //       (tag: any) => tag.name === userDetails.userName && tag.tagPageLink
  //     );
  //     console.log('userTag', userTag);
  //     if (userTag) {
  //       setUserInfoPage(userTag?.tagPageLink);
  //     }
  //   }
  // }, [isLoggedIn, router, loading]);

  // useEffect(() => {
  //   // Example usage with outer and inner paths
  //   // First animate them onto the path, then make them draggable
  //   // gsap.registerPlugin(MotionPathPlugin, Draggable, InertiaPlugin);
  //   // animateListIn('#tagsList', '#hidden_outer', 5, 0.1, -1.1); // Animate tags list in along the outer path
  //   // animateListIn('#textList', '#hidden_inner', 2, 0.1, -1.8); // Animate text list in along the inner path
  //   // // After the animation completes, make them draggable
  //   // setTimeout(() => {
  //   //   makeListDraggable('#tagsList', '#hidden_outer');
  //   //   makeListDraggable('#textList', '#hidden_inner');
  //   // }, 3000); // Delay to ensure animation finishes before enabling dragging
  // }, []);

  const getFeaturedPages = (
    homepageConfig: any,
    pages: any,
    featuredKey: string
  ) => {
    const featuredIds = homepageConfig.data?.[featuredKey]?.map(
      (project: any) => project._id
    );
    console.log('featuredIds', featuredIds);
    return pages.filter((page: any) => featuredIds.includes(page.data._id));
  };

  useEffect(() => {
    // #region get homepage config
    const fetchHomepageConfig = async () => {
      const config = await getCollectionItemByTitle(
        'HomePageConfig',
        'Homepage Config'
      );

      setHomepageConfig(config);
    };

    fetchHomepageConfig();
    // #endregion
  }, []);

  useEffect(() => {
    if (
      homepageConfig &&
      postPages &&
      infoPages &&
      infoPages.length > 0 &&
      postPages.length
    ) {
      setFeaturedPages({
        featuredPosts: getFeaturedPages(
          homepageConfig,
          postPages,
          'featuredPosts'
        ),
        featuredProjects: getFeaturedPages(
          homepageConfig,
          infoPages,
          'featuredProjects'
        ),
        featuredProjectResults: getFeaturedPages(
          homepageConfig,
          postPages,
          'featuredProjectResults'
        ),
        featuredEvents: getFeaturedPages(
          homepageConfig,
          postPages,
          'featuredEvents'
        ),
        featuredOrganisations: getFeaturedPages(
          homepageConfig,
          infoPages,
          'featuredOrganisations'
        ),
        featuredPeople: getFeaturedPages(
          homepageConfig,
          infoPages,
          'featuredPeople'
        ),
      });
    }
  }, [homepageConfig, postPages, infoPages]);

  useEffect(() => {
    console.log('homepageConfig', homepageConfig);
    console.log('featuredPages', featuredPages);
  }, [homepageConfig, featuredPages]);

  return (
    <div className="homeHero">
      <div className="flex mx-auto relative sm:px-20 py-5 homeHero">
        <div className="flex flex-col items-center justify-center homeTitleContainer">
          <h2 className="homeTitle">
            The online home of the European foresight community
          </h2>
          <p className="homeSubtitle">
            Join our community to share, discover, and stay up-to-date on all
            the latest foresight activities in and about Europe. We bring
            together futurists and foresight community members with EU
            policy-makers and citizens.
          </p>
        </div>

        <svg
          className="homeRoata"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 141.7 141.7"
        >
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: '#ffff', stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: '#4267f4', stopOpacity: 1 }}
              />
            </linearGradient>

            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: '#ffff', stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: '#4267f4', stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <g>
            <g id="Layer_1">
              <path
                id="tags_x5F_line"
                d="M28.8,2.8s55.8,14.2,55.8,65.7-45.3,72.5-57.3,72.5"
                fill="none"
                stroke="url(#gradient1)"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
              <path
                id="tag_x5F_cat_x5F_line"
                d="M13.4,8.3s54.4,13.1,54.4,60.5S23.6,135.5,11.9,135.5"
                fill="none"
                stroke="url(#gradient2)"
                strokeMiterlimit="10"
                strokeWidth="1"
              />
              <g id="next_x5F_big">
                <path
                  d="M74.1,38.2c-2.5,0-4.5-2-4.5-4.5s2-4.5,4.5-4.5,4.5,2,4.5,4.5-2,4.5-4.5,4.5Z"
                  fill="#8caef6"
                />
                <path
                  d="M74.1,30.2c1.9,0,3.5,1.5,3.5,3.5s-1.5,3.5-3.5,3.5-3.5-1.5-3.5-3.5,1.5-3.5,3.5-3.5M74.1,28.2c-3,0-5.5,2.4-5.5,5.5s2.4,5.5,5.5,5.5,5.5-2.4,5.5-5.5-2.4-5.5-5.5-5.5h0Z"
                  fill="#fff"
                />
              </g>
              <g id="prev_x5F_big">
                <circle cx="65.9" cy="24.1" r="4.5" fill="#8caef6" />
                <path
                  d="M65.9,20.7c1.9,0,3.5,1.5,3.5,3.5s-1.5,3.5-3.5,3.5-3.5-1.5-3.5-3.5,1.5-3.5,3.5-3.5M65.9,18.7c-3,0-5.5,2.4-5.5,5.5s2.4,5.5,5.5,5.5,5.5-2.4,5.5-5.5-2.4-5.5-5.5-5.5h0Z"
                  fill="#fff"
                />
              </g>
              <g id="next_x5F_small">
                <path
                  d="M58.8,41.7c-1.1,0-2.1-.5-2.7-1.4-.5-.7-.7-1.6-.6-2.5.1-.9.6-1.7,1.4-2.2.6-.4,1.3-.6,2-.6,1.1,0,2.1.5,2.7,1.4,1.1,1.5.7,3.6-.8,4.7-.6.4-1.3.6-2,.6Z"
                  fill="#8caef6"
                />
                <path
                  d="M58.8,35.9c.7,0,1.5.3,1.9,1,.8,1.1.5,2.5-.5,3.3-.4.3-.9.4-1.4.4-.7,0-1.5-.3-1.9-1-.8-1.1-.5-2.5.5-3.3.4-.3.9-.4,1.4-.4M58.8,33.9h0c-.9,0-1.8.3-2.5.8-.9.7-1.6,1.7-1.8,2.8-.2,1.2,0,2.3.8,3.3.8,1.1,2.1,1.8,3.6,1.8s1.8-.3,2.5-.8c2-1.4,2.4-4.1,1-6.1-.8-1.1-2.1-1.8-3.6-1.8h0Z"
                  fill="#fff"
                />
              </g>
              <g id="prev_x5F_small">
                <path
                  d="M53.6,35.8c-.9,0-1.7-.5-2.3-1.2-.6-.7-.9-1.5-.8-2.4.1-1.8,1.6-3.1,3.4-3.1s.2,0,.2,0c1.9.1,3.3,1.7,3.1,3.6-.1,1.8-1.6,3.1-3.4,3.1s-.2,0-.2,0Z"
                  fill="#8caef6"
                />
                <path
                  d="M53.8,30c0,0,.1,0,.2,0,1.3,0,2.3,1.2,2.2,2.5,0,1.2-1.1,2.2-2.4,2.2s-.1,0-.2,0c-1.3,0-2.3-1.2-2.2-2.5,0-1.2,1.1-2.2,2.4-2.2M53.8,28h0c-2.3,0-4.2,1.8-4.4,4.1-.2,2.4,1.6,4.5,4.1,4.7.1,0,.2,0,.3,0,2.3,0,4.2-1.8,4.4-4.1,0-1.2-.3-2.3-1.1-3.2-.8-.9-1.8-1.4-3-1.5-.1,0-.2,0-.3,0h0Z"
                  fill="#fff"
                />
              </g>
              <path
                className="arrow"
                d="M73.3,32.5h0c0,0,.2,0,.3,0h0s1.1,1.7,1.1,1.7l.2-.8c0,0,.1-.2.2-.2h0c.1,0,.2.1.2.2h0s-.2,1.3-.2,1.3c0,.1-.1.2-.2.2l-1.3-.3c-.1,0-.2-.1-.2-.3,0,0,0,0,0,0,0-.1.1-.2.2-.2h.8c0,.1-1.1-1.5-1.1-1.5,0,0,0-.2,0-.3h0s0,0,0,0Z"
                fill="#365695"
              />
              <path
                className="arrow"
                d="M58,37.4h0c0,0,.2,0,.2,0h0s.9,1.3.9,1.3v-.6c.1,0,.2-.1.3-.1h0c0,0,.1,0,.1.2h0s-.2,1-.2,1c0,0,0,.2-.2.1l-1-.2c0,0-.1-.1-.1-.2,0,0,0,0,0,0,0,0,0-.1.2-.1h.6c0,.1-.9-1.2-.9-1.2,0,0,0-.2,0-.2h0s0,0,0,0Z"
                fill="#365695"
              />
              <path
                className="arrow"
                d="M67,25.1h0c0,0-.2,0-.3,0h0s-1.4-1.4-1.4-1.4v.8c0,0,0,.2-.2.2h0c-.1,0-.2,0-.2-.2h0s0-1.3,0-1.3c0-.1,0-.2.2-.2h1.3c.1,0,.2.1.2.2,0,0,0,0,0,0,0,.1,0,.2-.2.2h-.8s1.4,1.4,1.4,1.4c0,0,0,.2,0,.3h0s0,0,0,0Z"
                fill="#365695"
              />
              <path
                className="arrow"
                d="M54.7,33.3h0c0,0-.2,0-.2,0h0s-1-1.2-1-1.2v.6c0,0-.1.1-.2.1h0c0,0-.2,0-.2-.1h0s0-1,0-1c0,0,0-.2.2-.2h1c0,.1.2.2.1.3,0,0,0,0,0,0,0,0,0,.1-.2.1h-.6s1,1.1,1,1.1c0,0,0,.2,0,.2h0s0,0,0,0Z"
                fill="#365695"
              />
              <g id="pointer">
                <circle cx="67.7" cy="69.7" r="1.6" fill="#4267f4" />
              </g>
              <text
                transform="translate(27.6 12.7) rotate(23.1) scale(1 1)"
                fill="#7e88b6"
                fontFamily="Inter-Medium, Inter"
                fontSize="4"
                fontWeight="500"
              >
                <span x="0" y="0">
                  T
                </span>
              </text>
              <text
                transform="translate(29.9 13.7) rotate(24.8) scale(1 1)"
                fill="#7e88b6"
                fontFamily="Inter-Medium, Inter"
                fontSize="4"
                fontWeight="500"
              >
                <tspan x="0" y="0">
                  a
                </tspan>
              </text>
              <text
                transform="translate(31.9 14.6) rotate(26.4) scale(1 1)"
                fill="#7e88b6"
                fontFamily="Inter-Medium, Inter"
                fontSize="4"
                fontWeight="500"
              >
                <tspan x="0" y="0">
                  g
                </tspan>
              </text>
              <text
                transform="translate(34.1 15.7) rotate(27.6) scale(1 1)"
                fill="#7e88b6"
                fontFamily="Inter-Medium, Inter"
                fontSize="4"
                fontWeight="500"
              >
                <tspan x="0" y="0">
                  {' '}
                </tspan>
              </text>
              <text
                transform="translate(35 16.1) rotate(28.8) scale(1 1)"
                fill="#7e88b6"
                fontFamily="Inter-Medium, Inter"
                fontSize="4"
                fontWeight="500"
              >
                <tspan x="0" y="0">
                  c
                </tspan>
              </text>
              <text
                transform="translate(37 17.2) rotate(30.4) scale(1 1)"
                fill="#7e88b6"
                fontFamily="Inter-Medium, Inter"
                fontSize="4"
                fontWeight="500"
              >
                <tspan x="0" y="0">
                  a
                </tspan>
              </text>
              <text
                transform="translate(38.9 18.4) rotate(31.9) scale(1 1)"
                fill="#7e88b6"
                fontFamily="Inter-Medium, Inter"
                fontSize="4"
                fontWeight="500"
              >
                <tspan x="0" y="0">
                  t
                </tspan>
              </text>
              <text
                transform="translate(40.1 19.1) rotate(33.4) scale(1 1)"
                fill="#7e88b6"
                fontFamily="Inter-Medium, Inter"
                fontSize="4"
                fontWeight="500"
              >
                <tspan x="0" y="0">
                  e
                </tspan>
              </text>
              <text
                transform="translate(42 20.4) rotate(35.3) scale(1 1)"
                fill="#7e88b6"
                fontFamily="Inter-Medium, Inter"
                fontSize="4"
                fontWeight="500"
              >
                <tspan x="0" y="0">
                  g
                </tspan>
              </text>
              <text
                transform="translate(44 21.8) rotate(37.3) scale(1 1)"
                fill="#7e88b6"
                fontFamily="Inter-Medium, Inter"
                fontSize="4"
                fontWeight="500"
              >
                <tspan x="0" y="0">
                  o
                </tspan>
              </text>
              <text
                transform="translate(45.9 23.2) rotate(39) scale(1 1)"
                fill="#7e88b6"
                fontFamily="Inter-Medium, Inter"
                fontSize="4"
                fontWeight="500"
              >
                <tspan x="0" y="0">
                  r
                </tspan>
              </text>
              <text
                transform="translate(47 24.1) rotate(40.7) scale(1 1)"
                fill="#7e88b6"
                fontFamily="Inter-Medium, Inter"
                fontSize="4"
                fontWeight="500"
              >
                <tspan x="0" y="0">
                  y
                </tspan>
              </text>
              <text
                transform="translate(35.2 4) rotate(20.9)"
                fill="#7e88b6"
                fontFamily="Inter-Medium, Inter"
                fontSize="4"
                fontWeight="500"
              >
                <tspan x="0" y="0">
                  T
                </tspan>
              </text>
              <text
                transform="translate(37.6 4.9) rotate(22.3)"
                fill="#7e88b6"
                fontFamily="Inter-Medium, Inter"
                fontSize="4"
                fontWeight="500"
              >
                <tspan x="0" y="0">
                  a
                </tspan>
              </text>
              <text
                transform="translate(39.7 5.8) rotate(23.7)"
                fill="#7e88b6"
                fontFamily="Inter-Medium, Inter"
                fontSize="4"
                fontWeight="500"
              >
                <tspan x="0" y="0">
                  g
                </tspan>
              </text>
              <text
                transform="translate(41.9 6.8) rotate(25)"
                fill="#7e88b6"
                fontFamily="Inter-Medium, Inter"
                fontSize="4"
                fontWeight="500"
              >
                <tspan x="0" y="0">
                  s
                </tspan>
              </text>
              <path
                id="hidden_outer"
                d="M24-9.5S89.8,7.2,89.8,67.9s-53.4,85.5-67.6,85.5"
                fill="none"
              />
              <path
                id="hidden_inner"
                d="M12.8,14s49.6,11.9,49.6,55.1-40.2,60.8-50.9,60.8"
                fill="none"
              />
            </g>
          </g>
        </svg>

        <ul className="tag_category_list" id="textList">
          <li>Persons</li>
          <li>Organisations</li>
          <li>Projects</li>
          <li>Domains</li>
          <li>Countries</li>
          <li>Person types</li>
          <li>Organisation types</li>
          <li>Page types</li>
        </ul>

        <ul className="tags_list" id="tagsList">
          <li>
            <i>Wind energy </i>
            <span className="count">9</span>
          </li>
          <li>
            <i>Forecasting </i>
            <span className="count">9</span>
          </li>
          <li>
            <i>Civic rights </i>
            <span className="count">21</span>
          </li>
          <li>
            <i>Policy </i>
            <span className="count">23</span>
          </li>
          <li>
            <i>Vision </i>
            <span className="count">34</span>
          </li>
          <li>
            <i>Social justice </i>
            <span className="count">39</span>
          </li>
          <li>
            <i>Fairness </i>
            <span className="count">45</span>
          </li>
          <li>
            <i>Seedbank </i>
            <span className="count">61</span>
          </li>
          <li>
            <i>Delphi </i>
            <span className="count">91</span>
          </li>
          <li>
            <i>AI </i>
            <span className="count">102</span>
          </li>
          <li>
            <i>Renewable</i> <span className="count">191</span>
          </li>
        </ul>

        {/* <ul className="tags_list outerlist2" id="tagsList2">
  <li><i>Medical</i><span className="count">9</span></li>
  <li><i>Delphi </i><span className="count">9</span></li>
  <li><i>Cat rights </i><span className="count">21</span></li>
  <li><i>Policy for renewable </i><span className="count">23</span></li>
  <li><i>Reduce </i><span className="count">34</span></li>
  <li><i>Justice </i><span className="count">39</span></li>
  <li><i>Foodbank </i><span className="count">45</span></li>
  <li><i>Money </i><span className="count">61</span></li>
  <li><i>Cyber security </i><span className="count">91</span></li>
  <li><i>Technology </i><span className="count">102</span></li>
  <li><i>Consortium</i> <span className="count">191</span></li>
</ul> */}
      </div>

      <div className="homeFeatured">
        {/* <h2 className="homeFeaturedTitle text-gray-800 w-full my-4 tagListTitle">
          Featured Organisations
        </h2> */}

        {featuredPages.featuredProjects.length > 0 && (
          <MiniPagesListItemPost
            items={featuredPages.featuredProjects.map(
              (infoPage: any) => infoPage.data
            )}
            title="Featured Projects"
          />
        )}
        {featuredPages.featuredProjectResults.length > 0 && (
          <MiniPagesListItemPost
            items={featuredPages.featuredProjectResults.map(
              (infoPage: any) => infoPage.data
            )}
            title="Featured Project Results"
          />
        )}

        {featuredPages.featuredEvents.length > 0 && (
          <MiniPagesListItemPost
            items={featuredPages.featuredEvents.map(
              (infoPage: any) => infoPage.data
            )}
            title="Featured Events"
          />
        )}

        {featuredPages.featuredPosts.length > 0 && (
          <MiniPagesListItemPost
            items={featuredPages.featuredPosts.map(
              (infoPage: any) => infoPage.data
            )}
            title="Featured Posts"
          />
        )}

        {featuredPages.featuredOrganisations.length > 0 && (
          <MiniPagesListItemPost
            items={featuredPages.featuredOrganisations.map(
              (infoPage: any) => infoPage.data
            )}
            title="Featured Organisations"
          />
        )}
      </div>
    </div>
  );
};

export default Home;
