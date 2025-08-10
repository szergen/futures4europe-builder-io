import style from './HeaderComponent.module.css';
import classNames from 'classnames';
import Typography from '@app/shared-components/Typography/Typography';
import Tag, { TagProps } from '@app/shared-components/Tag/Tag';
import Divider from '@app/shared-components/Divider/Divider';
import Link from 'next/link';
import Button from '@app/shared-components/Button/Button';
import InputText from '@app/shared-components/InputText/InputText';
import TagPicker from '@app/shared-components/TagPicker/TagPicker';
import DatePickerRangeComponentDouble from '@app/shared-components/DatePickerRangeComponentDouble/DatePickerRangeComponentDouble';
import DisplayProjectResultMedia from '@app/page-components/shared-page-components/DisplayProjectResultMedia/DisplayProjectResultMedia';
import ProjectResultHeaderImage from '@app/shared-components/ProjectResultHeaderImage/ProjectResultHeaderImage';
import dayjs from 'dayjs';
import DatePickerComponent from '@app/shared-components/DatePickerComponent/DatePickerComponent';

export type HeaderComponentProps = {
  post: {
    title: string;
    pageType: TagProps[];
    eventStartDate: string;
    eventEndDate: string;
    registrationLink: string;
    subtitle: string;
    countryTag: {
      name: string;
      popularity: number;
    };
    recommendations: {
      number: number;
      images: string[];
    };
    views: number;
    projectResultMedia?: {
      displayName: string;
      fileName: string;
      sizeInBytes: string;
      type: string;
      url: string;
      thumbnail: string;
    };
    projectResultPublicationDate?: string;
    eventRegistration?: string;
  };
  isEditModeOn: boolean;
  updatePostData: (data: any) => void;
  updatePostDataBasedOnKeyValue: (key: string, value: any) => void;
  tags: TagProps[];
  handleTagCreated?: () => void;
  setValidationState?: (data: any) => void;
};

const HeaderComponent: React.FC<HeaderComponentProps> = ({
  post,
  isEditModeOn,
  updatePostData,
  updatePostDataBasedOnKeyValue,
  tags,
  handleTagCreated,
  setValidationState,
}) => {
  const validationFunctionForTitle = (tempTitle: string | undefined) => {
    if (!tempTitle) {
      return 'Title is required';
    }

    const trimmedTitle = tempTitle.trim();
    // Empty after trimming
    if (trimmedTitle.length === 0) {
      return 'Title cannot be only whitespace';
    }
    // Check if title starts or ends with space
    if (trimmedTitle !== tempTitle) {
      return 'This field dose not accept leading and/or trailing whitespace (spaces). Please make sure that you do not have spaces at the start and end of the title.';
    }
    // Check for excessive spaces
    if (/\s{2,}/.test(trimmedTitle)) {
      return 'Title cannot contain multiple consecutive spaces';
    }

    // URL pattern check
    if (/[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/.test(trimmedTitle)) {
      return 'Title cannot contain website addresses';
    }
    // Special characters check
    const specialCharsRegex = /[<>{}[\]\\\/]/;
    if (specialCharsRegex.test(trimmedTitle)) {
      return 'Title cannot contain special characters like < > { } [ ] \\ /';
    }
    if (tempTitle?.length < 5) {
      return 'Title should be at least 5 characters long';
    }
    if (tempTitle?.length > 100) {
      return 'Title should be at most 100 characters long';
    }
    if (tempTitle === 'New Post') {
      return 'Title cannot be "New Post"';
    }
    return '';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div className={classNames(style.postHeader)}>
      {post.pageType?.[0]?.name?.toLowerCase() === 'project result' && (
        // Project Result Image
        <div className={style.imageAndButtons}>
          <div>
            {!isEditModeOn ? (
              post?.projectResultMedia && (
                <a
                  href={post?.projectResultMedia.url || '#'}
                  download={post?.projectResultMedia.displayName + '.pdf'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DisplayProjectResultMedia
                    projectResultMedia={post?.projectResultMedia || {}}
                  />
                </a>
              )
            ) : (
              <ProjectResultHeaderImage
                currentImage={post?.projectResultMedia?.thumbnail}
                resultType={post?.projectResultMedia?.type}
                updatePostData={(value) => {
                  updatePostData({
                    ...post,
                    projectResultMedia: {
                      ...post.projectResultMedia,
                      thumbnail: value.thumbnail,
                      sizeInBytes: value.sizeInBytes,
                      url: value.url,
                      fileName: value.fileName,
                      type: value.type,
                    },
                  });
                }}
                updatePostDataForVideoImage={(value) => {
                  updatePostData({
                    ...post,
                    projectResultMedia: {
                      ...post.projectResultMedia,
                      thumbnail: value.thumbnail,
                      sizeInBytes: '',
                      url: value.url,
                      fileName: '',
                      type: 'video',
                    },
                  });
                }}
              />
            )}
          </div>
          {!isEditModeOn ? (
            <Typography
              tag="h3"
              className="text-gray-800 text-sm mt-2 max-w-[250px] overflow-hidden p-2 h-full"
            >
              {post?.projectResultMedia?.displayName}
            </Typography>
          ) : (
            // <InputText
            //   // label="File Display Name"
            //   placeholder="Enter display name"
            //   value={post?.projectResultMedia?.displayName || ''}
            //   onChange={(e) =>
            //     updatePostData({
            //       ...post,
            //       projectResultMedia: {
            //         ...post.projectResultMedia,
            //         displayName: e.target.value,
            //       },
            //     })
            //   }
            // />
            <InputText
              placeholder="Enter display name"
              value={post?.projectResultMedia?.displayName || ''}
              onChange={(e) => {
                // Limit input to 50 characters
                const displayName = e.target.value.slice(0, 50);
                updatePostData({
                  ...post,
                  projectResultMedia: {
                    ...post.projectResultMedia,
                    displayName: displayName,
                  },
                });
              }}
              validate={(value) => {
                // if (!value) return 'Display name is required';
                if (value.length > 50)
                  return 'Display name must be 50 characters or less';
                return ''; // No error
              }}
              helperText={`${
                (post?.projectResultMedia?.displayName || '').length
              }/50 characters`}
              setValidationState={(error) => {
                setValidationState &&
                  setValidationState({ projectResultMediaDisplayName: error });
              }}
            />
          )}
          {!isEditModeOn && post?.projectResultMedia?.type === 'document' && (
            <div className={style.downloadAndViews}>
              <a
                href={post?.projectResultMedia.url || '#'}
                download={post?.projectResultMedia.displayName + '.pdf'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  Download result (
                  {(Number(post.projectResultMedia.sizeInBytes) / 1024)
                    ?.toString()
                    ?.split('.')?.[0] + 'kb'}
                  ){' '}
                  <span className="rounded-lg bg-white text-blue-500 p-1 font-bold">
                    {post.projectResultMedia?.url
                      ?.split('.')
                      ?.pop()
                      ?.toUpperCase()}
                  </span>
                </Button>
              </a>
            </div>
          )}
        </div>
      )}

      {/* Add Event File Uploader Logic */}
      {post.pageType?.[0]?.name?.toLowerCase() === 'event' && isEditModeOn && (
        <div className={style.imageAndButtons}>
          <div>
            <ProjectResultHeaderImage
              currentImage={post?.projectResultMedia?.thumbnail}
              resultType={post?.projectResultMedia?.type}
              updatePostData={(value) => {
                updatePostData({
                  ...post,
                  projectResultMedia: {
                    ...post.projectResultMedia,
                    thumbnail: value.thumbnail,
                    sizeInBytes: value.sizeInBytes,
                    url: value.url,
                    fileName: value.fileName,
                    type: value.type,
                  },
                });
              }}
              updatePostDataForVideoImage={(value) => {
                updatePostData({
                  ...post,
                  projectResultMedia: {
                    ...post.projectResultMedia,
                    thumbnail: value.thumbnail,
                    sizeInBytes: '',
                    url: value.url,
                    fileName: '',
                    type: 'video',
                  },
                });
              }}
            />
          </div>

          <div
            className={classNames(
              'overflow-hidden p-4 w-full h-full',
              style.displayName
            )}
          >
            <InputText
              placeholder="Enter display name"
              value={post?.projectResultMedia?.displayName || ''}
              onChange={(e) => {
                // Only update if we're under the character limit
                const newValue = e.target.value;

                if (newValue.length <= 50) {
                  updatePostData({
                    ...post,
                    projectResultMedia: {
                      ...post.projectResultMedia,
                      displayName: newValue,
                    },
                  });
                }
              }}
              // validate={(value) => {
              //   if (!value) return 'Display name is required';
              //   return ''; // No error
              // }}
              helperText={`${
                (post?.projectResultMedia?.displayName || '').length
              }/50 characters`}
              setValidationState={(error) => {
                setValidationState &&
                  setValidationState({ projectResultMediaDisplayName: error });
              }}
              className="overflow-hidden"
              onKeyDown={(e) => {
                // Get current length directly from the value that's being used
                const currentLength = (
                  post?.projectResultMedia?.displayName || ''
                ).length;

                // Allow delete, backspace, arrow keys, and modifier combinations regardless of length
                const allowedKeys = [
                  'Backspace',
                  'Delete',
                  'ArrowLeft',
                  'ArrowRight',
                  'ArrowUp',
                  'ArrowDown',
                  'Home',
                  'End',
                ];
                const hasModifier = e.ctrlKey || e.metaKey || e.altKey;

                // Block character input if at max length
                if (
                  currentLength >= 50 &&
                  !allowedKeys.includes(e.key) &&
                  !hasModifier &&
                  e.key.length === 1
                ) {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>
      )}

      {/* Display uploaded file for events when not in edit mode */}
      {post.pageType?.[0]?.name?.toLowerCase() === 'event' &&
        !isEditModeOn &&
        post?.projectResultMedia && (
          <div className={style.imageAndButtons}>
            <div>
              <DisplayProjectResultMedia
                projectResultMedia={post?.projectResultMedia || {}}
              />
            </div>
            <Typography
              tag="h3"
              className="text-gray-800 text-sm mt-2 max-w-[250px] overflow-hidden p-2 h-full"
            >
              {post?.projectResultMedia?.displayName}
            </Typography>
            {post?.projectResultMedia?.type === 'document' && (
              <div className={style.downloadAndViews}>
                <a
                  href={post?.projectResultMedia.url || '#'}
                  download={post?.projectResultMedia.displayName + '.pdf'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button>
                    Download (
                    {(Number(post.projectResultMedia.sizeInBytes) / 1024)
                      ?.toString()
                      ?.split('.')?.[0] + 'kb'}
                    ){' '}
                    <span className="rounded-lg bg-white text-blue-500 p-1 font-bold">
                      {post.projectResultMedia?.url
                        ?.split('.')
                        ?.pop()
                        ?.toUpperCase()}
                    </span>
                  </Button>
                </a>
              </div>
            )}
          </div>
        )}

      <div className={style.detailsColumn}>
        {/* Post Info Name */}
        {!isEditModeOn ? (
          <Typography tag="h1" className=" text-gray-800">
            {post?.title?.replace(/_/g, ' ')}
          </Typography>
        ) : (
          <InputText
            className={classNames(
              style.genericTextArea,
              style.textPostTitleEdit,
              validationFunctionForTitle(post?.title) && style.InputRequired
            )}
            // label=""
            placeholder={
              post?.pageType?.[0]?.name !== 'event'
                ? 'Enter the post title'
                : 'Enter the event title'
            }
            value={post?.title}
            onChange={(e) => updatePostData({ ...post, title: e.target.value })}
            validate={validationFunctionForTitle}
            setValidationState={
              setValidationState
                ? (value) => setValidationState({ title: value })
                : undefined
            }
            shouldUpdateValueState={true}
            onKeyDown={handleKeyDown}
          />
        )}
        {/* Post Subtitle */}
        {!isEditModeOn ? (
          <Typography tag="h3" className="text-gray-800 italic">
            {post.subtitle}
          </Typography>
        ) : (
          <InputText
            label=""
            placeholder={
              post?.pageType?.[0]?.name !== 'event'
                ? 'Enter the post subtitle'
                : 'Enter the event subtitle'
            }
            value={post?.subtitle || ''}
            onChange={(e) =>
              updatePostData({ ...post, subtitle: e.target.value })
            }
            className={classNames(
              style.genericTextArea,
              style.textPostSubtitle
            )}
            onKeyDown={handleKeyDown}
          />
        )}
        {/* Event Date */}
        {post.pageType?.[0]?.name?.toLowerCase() === 'event' && (
          <div>
            {!isEditModeOn ? (
              <Typography
                tag="p"
                className="text-gray-500 text-sm font-bold mt-3"
              >
                {post?.eventStartDate
                  ? dayjs(post?.eventStartDate).format('YYYY-MM-DD HH:mm (CET)')
                  : ''}{' '}
                {post?.eventStartDate && post?.eventEndDate && '-'}{' '}
                {post?.eventStartDate && post?.eventEndDate
                  ? dayjs(post?.eventEndDate).format('YYYY-MM-DD HH:mm (CET)')
                  : ''}
              </Typography>
            ) : (
              <div className="flex items-center mt-4">
                {/* <span className="mr-4">Start Date</span> */}
                <DatePickerRangeComponentDouble
                  dateFormate="YYYY-MM-DD HH:mm"
                  placeholderStartDate="Start Date"
                  placeholderEndDate="End Date"
                  calendarHelperText="Please use the CET timezone when setting the start-end date"
                  dateStart={
                    post?.eventStartDate ? new Date(post.eventStartDate) : null
                  }
                  dateEnd={
                    post?.eventEndDate ? new Date(post.eventEndDate) : null
                  }
                  handleUpdateStartDate={(date) =>
                    updatePostDataBasedOnKeyValue(
                      'eventStartDate',
                      date.toISOString()
                    )
                  }
                  handleUpdateEndDate={(date) =>
                    updatePostDataBasedOnKeyValue(
                      'eventEndDate',
                      date.toISOString()
                    )
                  }
                />
                {/* <span className="ml-4">End Date</span> */}
              </div>
            )}
          </div>
        )}
        {/* Project Result Publication Date */}
        {post.pageType?.[0]?.name?.toLowerCase() === 'project result' && (
          <div>
            {!isEditModeOn ? (
              <Typography
                tag="p"
                className="text-gray-500 text-sm font-bold mt-3"
              >
                Publication Date:
                {post?.projectResultPublicationDate
                  ? dayjs(post?.projectResultPublicationDate).format(
                      'YYYY MMMM'
                    )
                  : ''}{' '}
              </Typography>
            ) : (
              <div className="flex items-center mt-4">
                {/* <span className="mr-4">Start Date</span> */}
                <DatePickerComponent
                  placeholder="Publication Date"
                  dateFormate="YYYY MMMM"
                  date={
                    !post?.projectResultPublicationDate
                      ? null
                      : new Date(post?.projectResultPublicationDate)
                  }
                  onChange={(value) => {
                    console.log('value', value);
                    return updatePostDataBasedOnKeyValue(
                      'projectResultPublicationDate',
                      value
                    );
                  }}
                />
                {/* <span className="ml-4">End Date</span> */}
              </div>
            )}
          </div>
        )}
        {/* Registration Link */}
        {post.pageType?.[0]?.name?.toLowerCase() === 'event' && (
          <>
            <Divider className="mt-2" />
            <Typography
              tag="p"
              className="text-primary-500 text-xs mt-2 text-gray-500"
            >
              {!isEditModeOn ? (
                post?.eventRegistration && (
                  <Link
                    href={post?.eventRegistration}
                    target="_blank"
                    className="bg-secondary-site/80 border-none text-white px-4 py-2 text-center font-semibold no-underline inline-block text-sm my-1 cursor-pointer rounded-lg hover:bg-secondary-site transition-all duration-300 ease-in-out hover:shadow-md hover:text-white-200"
                  >
                    Register Here
                  </Link>
                )
              ) : (
                <InputText
                  isHorizontal
                  type="url"
                  placeholder="Paste link to the registration page"
                  value={post?.eventRegistration || ''}
                  onChange={(e) =>
                    updatePostData({
                      ...post,
                      eventRegistration: e.target.value,
                    })
                  }
                />
              )}
            </Typography>
          </>
        )}
        {/* Post Country */}
        {
          <div className="mt-1">
            {' '}
            {/*//REVIEW REMOVED FLEX */}
            {!isEditModeOn ? (
              post?.countryTag && <Tag {...post.countryTag} />
            ) : (
              <TagPicker
                placeholder={
                  post?.pageType?.[0]?.name !== 'event'
                    ? // ? 'Add one or more country tags relevant to your post'
                      'Add the country tag relevant to your post'
                    : 'Add the country tag relevant to your post'
                }
                tags={tags?.filter(
                  (tag) => tag?.tagType === 'country' && !tag?.masterTag
                )}
                className="mt-1"
                selectedValue={post.countryTag?.name || undefined}
                updatePostData={(value) =>
                  updatePostDataBasedOnKeyValue('countryTag', value)
                }
                tagType="country"
                onTagCreated={handleTagCreated}
                newTagHeader="Create a new country tag"
                newTagType="Country name"
                newTagTagline="Enter a tagline (slogan, acronym, English translation, ...)"
                showTagTagline={false}
                showCreateTagButton={false}
                // tagTypeLabel={
                //   post?.pageType?.name !== 'event' ? 'Country' : 'Location'
                // }
              />
            )}
          </div>
        }
        {/* Recommandations */}
        {/* <div className={classNames(style.recommandations)}>
          <Typography tag="p" className="text-xs text-gray-400">
            Recommended by {post.recommendations?.number ?? 0}{' '}
            {post.recommendations?.number && post.recommendations.number < 1
              ? 'person'
              : 'persons'}
          </Typography>
        </div> */}
        {/* Views */}
        {/* {!isEditModeOn && (
          <Typography
            data-after="2153"
            tag="p"
            className="text-sm text-gray-800 my-2 after:content-[attr(data-after)]]"
          >
            {post.views} views
          </Typography>
        )} */}
      </div>
      {/* {!isEditModeOn && <Button className="h-9">Recommend</Button>} */}
    </div>
  );
};

export default HeaderComponent;
