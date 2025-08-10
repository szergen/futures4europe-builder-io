'use client';
import { useAuth } from '@app/custom-hooks/AuthContext/AuthContext';
// import { items } from '@wix/data';
// import { useWixModules } from '@wix/sdk-react';
// import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MiniPagesListItemPost from './page-components/shared-page-components/MiniPagesListComponentPost/components/MiniPagesListItemPost/MiniPagesListItemPost';
import { getCollectionItemByTitle } from './wixUtils/client-side';
import TagsList from './page-components/shared-page-components/TagList/TagsList';
import SpriteSvg from '@app/shared-components/SpriteSvg/SpriteSvg';
import style from './page.module.css';
import TagsCarousel from './shared-components/Carousel/TagsCarousel';
import SearchComponentV1 from '@app/shared-components/SearchComponentV1/SearchComponentV1';
import classNames from 'classnames';

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
    tagsFetched,
  } = useAuth();

  const getFeaturedPages = (
    homepageConfig: any,
    pages: any,
    featuredKey: string
  ) => {
    const featuredIds = homepageConfig.data?.[featuredKey]?.map(
      (project: any) => project._id
    );
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

  const [loadingStates, setLoadingStates] = useState({
    projects: true,
    organisations: true,
    persons: true,
    domains: true,
    methods: true,
  });

  useEffect(() => {
    // console.log('debug8->Data status:', {
    //   hasInfoPages: !!infoPages,
    //   infoPagesLength: infoPages?.length,
    //   isTagsFetched: tagsFetched,
    // });

    if (infoPages && Array.isArray(infoPages)) {
      // Update all info page related loading states
      setLoadingStates((prev) => ({
        ...prev,
        projects: false,
        organisations: false,
        persons: false,
      }));
    }

    if (tagsFetched) {
      setLoadingStates((prev) => ({
        ...prev,
        domains: false,
        methods: false,
      }));
    }
  }, [infoPages, tagsFetched]);

  // Modified useEffect to handle loading states
  useEffect(() => {
    // console.log('debug8->Data status:', {
    //   hasInfoPages: !!infoPages,
    //   infoPagesLength: infoPages?.length,
    //   isTagsFetched: tagsFetched,
    // });

    if (infoPages && Array.isArray(infoPages)) {
      // Update all info page related loading states
      setLoadingStates((prev) => ({
        ...prev,
        projects: false,
        organisations: false,
        persons: false,
      }));
    }

    if (tagsFetched) {
      setLoadingStates((prev) => ({
        ...prev,
        domains: false,
        methods: false,
      }));
    }
  }, [infoPages, tagsFetched]);

  // Modified useEffect to handle loading states
  useEffect(() => {
    // console.log('debug8->Data status:', {
    //   hasInfoPages: !!infoPages,
    //   infoPagesLength: infoPages?.length,
    //   isTagsFetched: tagsFetched,
    // });

    if (infoPages && Array.isArray(infoPages)) {
      // Update all info page related loading states
      setLoadingStates((prev) => ({
        ...prev,
        projects: false,
        organisations: false,
        persons: false,
      }));
    }

    if (tagsFetched) {
      setLoadingStates((prev) => ({
        ...prev,
        domains: false,
        methods: false,
      }));
    }
  }, [infoPages, tagsFetched]);

  return (
    <>
      <div className={classNames('', style.homeHeroContainer)}>
        <div className={classNames('', style.homeHeroWrapper)}>
          <div
            className={classNames(
              'flex mx-auto justify-center relative sm:px-0 py-5 z-1',
              style.homeHero
            )}
          >
            <div
              className={classNames(
                'flex flex-col mt-10 mr-0 max-w-[520px] flex-wrap items-start z-90 md:mr-10',
                style.homeHeroTitle
              )}
            >
              <h1 className="homeTitleh1">The online home of the European</h1>
              <h2 className="homeTitleh2">foresight community</h2>
              <p className="homeSubtitle text-xs max-w-[420px]">
                Explore a rich collection of foresight projects, showcase your
                own work, and participate in upcoming events.
              </p>
              {/* Search */}
              <div className={classNames('relative')}>
                <SearchComponentV1 />
              </div>
            </div>
            <TagsCarousel loadingStates={loadingStates} />
          </div>
        </div>
      </div>

      <div className="homeFeatured z-40">
        {featuredPages.featuredEvents.length > 0 && (
          <MiniPagesListItemPost
            items={featuredPages.featuredEvents.map(
              (infoPage: any) => infoPage.data
            )}
            title="Featured Events"
          />
        )}

        {featuredPages.featuredProjects.length > 0 && (
          <MiniPagesListItemPost
            items={featuredPages.featuredProjects.map(
              (infoPage: any) => infoPage.data
            )}
            title="Featured Projects"
            pageTypePath="project"
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
      <a
        href="https://legacy.futures4europe.eu/ourfutures"
        target="_blank"
        className="relative block mt-40 bg-sky-500 isolate overflow-hidden py-16 sm:py-14 lg:py-8 hover:bg-sky-400 transition ease hover:underline text-white"
      >
        <div className="flex flex-row items-end justify-start mx-auto max-w-7xl px-6 lg:px-8">
          <div className="w-24">
            <SpriteSvg.Bird
              viewBox="0 0 47.5 47.5"
              className={classNames('flex')}
              sizeW={68}
              sizeH={68}
              fill={'#e9e9e9'}
              strokeWidth={0}
              inline={false}
            />
          </div>

          <div className="relative">
            <h2 className="text-4xl font-bold tracking-tight text-white">
              Citizen engagement corner
            </h2>
            <p className="mt-8 text-2xl font-normal text-white">
              Share your visions on{' '}
              <span className="underline">#OurFutures </span>
            </p>
            <p className="text-xl text-white">
              An initiative of the EU Policy Lab
            </p>
          </div>
        </div>
      </a>
    </>
  );
};

export default Home;
