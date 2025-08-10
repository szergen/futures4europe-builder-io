'use client';
import { useAuth } from '@app/custom-hooks/AuthContext/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@app/shared-components/LoadingSpinner/LoadingSpinner';
import Link from 'next/link';
import classNames from 'classnames';
import NavDashboard from '@app/shared-components/Layout/NavDashboard/NavDashboard';
import SubNavDashboard from '@app/shared-components/Layout/NavDashboard/SubNavDashboard';
import style from '../pageDashboard.module.css';
import { Button } from 'flowbite-react';
import Typography from '@app/shared-components/Typography/Typography';
import SpriteSvg from '@app/shared-components/SpriteSvg/SpriteSvg';
import MiniPagePost from '@app/shared-components/MiniPagePost/MiniPagePost';
import { PLACEHOLDER_IMAGE } from '../../constants'; // Adjust the path as needed

export default function DashboardProjects() {
  const [isLoadingDeletePostPage, setIsLoadingDeletePostPage] = useState('');
  const [userInfoPage, setUserInfoPage] = useState('');

  const {
    isLoggedIn,
    loading,
    userDetails,
    logout,
    ownedPostPagesFetched,
    ownedInfoPagesFetched,
    tags,
    allOwnedPages,
  } = useAuth();

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

  if (!isLoggedIn) {
    //Loading Spinner
    return <LoadingSpinner />;
  }

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
      href: '/dashboard/project-results',
      text: 'All Project results',
      isActive: true,
    },
  ];

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
        activeItem="/dashboard/project-results"
      />

      <div
        className={classNames(
          style.UserDashboardWrapper,
          'flex flex-col relative m-auto mt-10 mb-6'
        )}
      >
        {/* <h1 className={classNames(style.headingDashboardh1, 'mt-2 mb-4 p-0')}>
          My project results
        </h1>
        <p className="text-base text-[#606b85]">
          Would you like to showcase your project results and share insights
          from your work? You can upload your project results here and add
          outputs and team members.
        </p> */}

        <div
          className={classNames(
            style.dashboardBox,
            style.dashboardBoxAddWrap,
            'mt-14',
            'mb-10',
            'p-8',
            'bg-primary-site'
          )}
        >
          <div className={classNames(style.dashboardBoxAdd, 'flex flex-col')}>
            <div className="flex items-center mb-4">
              <SpriteSvg.AccountResultsIcon
                className="text-color-white"
                sizeW={24}
                sizeH={24}
                viewBox={'0 -2 20 20'}
                fill={'#fff'}
                strokeWidth={0}
                inline={false}
              />
              <Typography
                tag="h2"
                className={classNames(style.headingDashboardh1, 'ml-2')}
              >
                Project results section
              </Typography>
            </div>

            <div className="flex flex-col justify-between">
              <p className={classNames(style.boxTextDashboard, 'mb-8')}>
                Add a detailed overview of your project result. Include the
                delivrable, description, authors, and any significant
                information of the project result.
              </p>
            </div>

            <div className={classNames(style.listDashboard, 'flex')}>
              <Link href="/post/New_Post?pageType=projectResult">
                <Button
                  size={'md'}
                  color={'light'}
                  className={classNames(
                    style.buttonAddDashboard,
                    'block border-0 mr-4 focus:ring-purple-300'
                  )}
                  pill
                >
                  <SpriteSvg.AccountAddIcon
                    sizeH={24}
                    sizeW={24}
                    viewBox={'0 -1 14 14'}
                    strokeWidth={1}
                  />
                  <span className="text-lg">Add project result</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className={classNames(style.dashboardBox, 'mt-14 mb-10 p-8')}>
          <div className="flex flex-col">
            <div className="flex flex-col justify-between">
              <h2
                className={classNames(
                  style.headingDashboardh1,
                  'mt-0 mb-0 flex flex-row items-center'
                )}
              >
                Project results list
              </h2>
              <p className={classNames(style.boxTextDashboard, 'mb-8')}>
                In this section of your account you can manage your list.
              </p>
            </div>

            <div
              className={classNames(
                style.listDashboard,
                'flex flex-col text-base text-[#606b85]'
              )}
            >
              {allOwnedPages.length || allOwnedPages.length ? (
                <>
                  {allOwnedPages.length > 0 ? (
                    allOwnedPages
                      .filter(
                        (postPage) =>
                          postPage?.data?.pageTypes[0]?.name ===
                          'project result'
                      )
                      .map((postPage, index) => (
                        <div
                          key={postPage?.data?.title + index}
                          className="pt-2 pb-2 flex flex-row items-center justify-between"
                        >
                          <div className="flex flex-wrap flex-start text-left w-full justify-between">
                            <Link
                              className="grow"
                              href={`/post/${postPage.data.slug}`}
                            >
                              <MiniPagePost
                                pageTypeTag={postPage.data.pageTypes?.[0]}
                                key={index}
                                title={postPage?.data?.title}
                                popularity={
                                  postPage?.data?.pageTypes[0]?.popularity
                                }
                                subtitle={postPage?.data?.subtitle}
                                date={
                                  postPage?.data?.postPublicationDate ||
                                  postPage?.data?._createdDate?.['$date']
                                }
                                editDate={postPage?.data?._updatedDate?.$date}
                                image={
                                  postPage?.data?.projectResultMedia
                                    ?.thumbnail ||
                                  postPage?.data?.postImage1?.url ||
                                  PLACEHOLDER_IMAGE
                                }
                                projects={postPage?.data?.projects}
                                projectResultAuthor={
                                  postPage?.data?.projectResultAuthor
                                }
                                text={postPage?.data?.postContentRIch1}
                                domains={[
                                  ...(postPage?.data?.domains ?? []),
                                  ...(postPage?.data?.methods ?? []),
                                ]?.slice(0, 3)}
                              />
                            </Link>
                          </div>

                          {isLoadingDeletePostPage &&
                            isLoadingDeletePostPage === postPage?.data?._id && (
                              <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
                                <LoadingSpinner />
                              </div>
                            )}
                          {/* <pre>{JSON.stringify(infoPage.data, null, 2)}</pre> */}
                        </div>
                      ))
                  ) : (
                    <div>No Info Pages</div>
                  )}
                </>
              ) : (
                <>
                  {ownedPostPagesFetched && ownedInfoPagesFetched ? (
                    <div>No Owned Items</div>
                  ) : (
                    <LoadingSpinner />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
