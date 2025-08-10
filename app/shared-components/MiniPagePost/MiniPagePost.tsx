import React, { useEffect } from 'react';
import classNames from 'classnames';
import style from './MiniPagePost.module.css';
import Image from 'next/image';
import Typography from '../Typography/Typography';
import Tag, { TagProps } from '../Tag/Tag';
import dayjs from 'dayjs';
import { PLACEHOLDER_IMAGE } from '../../constants'; // Adjust the path as needed
import AffiliationsComponent from '@app/page-components/PersonPageComponent/components/AffiliationsComponent/AffiliationsComponent';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useTagPopularity } from '@app/hooks/useTagPopularity';
import { useAuth } from '@app/custom-hooks/AuthContext/AuthContext';
import { getImageUrlForMedia } from '@app/page-components/PageComponents.utils';

export type MiniPagePostProps = {
  title: string;
  subtitle?: string;
  popularity?: number;
  countryTags?: Array<TagProps>;
  tagLine?: string;
  projectFunded?: Array<TagProps>;
  projectStartDate?: string;
  projectEndDate?: string;
  eventStartDate?: string;
  eventEndDate?: string;
  projectResultPublicationDate?: string;
  organisationAffiliations?: Array<{ organisation: string; role: string }>;
  organisationEstablishedDate?: string;
  date?: string;
  editDate?: string;
  projects?: Array<TagProps>;
  projectResultAuthor?: Array<TagProps>;
  image?: string;
  text?: string;
  domains?: Array<TagProps>;
  methods?: Array<TagProps>;
  recommendations?: {
    number: number;
    images: string[];
  };
  pageTypeTag?: TagProps;
  primaryTags?: Array<TagProps>;
};

export const MiniPagePost: React.FC<MiniPagePostProps> = (props) => {
  // Log all props at once
  // console.log('All Props:', props);
  // Or log individual props
  const {
    title,
    subtitle,
    popularity,
    countryTags,
    tagLine,
    projectFunded,
    projectStartDate,
    projectEndDate,
    eventStartDate,
    eventEndDate,
    projectResultPublicationDate,
    organisationAffiliations,
    organisationEstablishedDate,
    date,
    editDate,
    projects,
    projectResultAuthor,
    image,
    text,
    domains,
    recommendations,
    pageTypeTag,
    primaryTags,
    methods,
  } = props;

  // console.log({
  //   title,
  //   subtitle,
  //   popularity,
  //   countryTags,
  //   tagLine,
  //   projectFunded,
  //   projectStartDate,
  //   projectEndDate,
  //   eventStartDate,
  //   eventEndDate,
  //   projectResultPublicationDate,
  //   organisationAffiliations,
  //   organisationEstablishedDate,
  //   date,
  //   editDate,
  //   projects,
  //   projectResultAuthor,
  //   image,
  //   text,
  //   domains,
  //   recommendations,
  //   pageTypeTag,
  //   primaryTags,
  //   methods,
  // });

  const formattedDate = date ? formatDate(date) : '';
  const formattedEditDate = editDate ? formatDate(editDate) : '';
  dayjs.extend(relativeTime);

  const { tags } = useAuth();

  //TODO @ALEX de verificat currentTagPopularity
  // const { getPopularity } = useTagPopularity();
  // Get the correct tag name for popularity based on the type
  const getCorrectTagName = () => {
    // If primaryTags exist and have a first item, use that
    if (primaryTags?.[0]?.name) {
      return primaryTags[0].name;
    }
    // Fallback to title
    return title;
  };

  const tagName = getCorrectTagName();
  const currentTagPopularity = tagName
    ? tags.find((item) => item.name === tagName)?.mentions || 1
    : undefined;

  // Only show popularity if the tag type is NOT 'post'
  const shouldShowPopularity =
    pageTypeTag?.name !== 'post' &&
    pageTypeTag?.name !== 'event' &&
    pageTypeTag?.name !== 'project result';

  //Debugging
  // useEffect(() => {
  //   console.log({
  //     itemName: getCorrectTagName(),
  //     popularity: currentTagPopularity,
  //     primaryTags,
  //     projectResultPublicationDate,
  //     projectResultAuthor,
  //   });
  // }, [currentTagPopularity, primaryTags, projects, projectResultAuthor]);

  return (
    <div className={classNames(style.postItem)}>
      <div
        className={classNames(
          style.postImageAndTagContainer,
          pageTypeTag?.name &&
            style[pageTypeTag.name.replace(/\s+/g, '') + '_TypeTagImage']
        )}
      >
        {pageTypeTag && <Tag {...pageTypeTag} className="ml-1 mb-1" />}
        <Image
          src={
            image && image !== ' '
              ? getImageUrlForMedia(image)?.url || getImageUrlForMedia(image)
              : PLACEHOLDER_IMAGE
          }
          width={650}
          height={650}
          alt="Post Image"
          className={classNames('rounded-md', style.postImage)}
        />
      </div>
      <div className={classNames(style.postContent)}>
        {/* Post Date */}
        <Typography
          tag="p"
          className={classNames(
            style.MiniPagePostEdit,
            'text-gray-500 text-xs mb-1.5'
          )}
        >
          Last Edited: {dayjs(date).fromNow()}
        </Typography>
        {/* MiniPage Title */}
        <Typography
          tag="h3"
          className={classNames(style.MiniPagePostTitle, '')}
        >
          {title}
          {shouldShowPopularity && (
            <span className={classNames(style.popularity)}>
              {/* Popularity */}
              {currentTagPopularity || ''}
            </span>
          )}
          {projectStartDate && projectEndDate && (
            <span className={classNames(style.projectDates)}>
              {dayjs(projectStartDate).format('MMMM YYYY')} -{' '}
              {dayjs(projectEndDate).format('MMMM YYYY')}
            </span>
          )}
          {eventStartDate && (
            <span className={classNames(style.projectDates)}>
              {dayjs(eventStartDate).format('DD MMMM')} -{' '}
              {dayjs(eventEndDate).format('DD MMMM YYYY')}
            </span>
          )}
          {projectResultPublicationDate && (
            <span className={classNames(style.projectDates)}>
              {dayjs(projectResultPublicationDate).format('MMMM YYYY')}
            </span>
          )}
        </Typography>
        {/* Subtitle */}

        <Typography
          tag="h3"
          className={classNames(style.MiniPagePostSubtitle, '')}
        >
          {subtitle}
        </Typography>
        {/* Tagline */}
        <Typography
          tag="h3"
          className={classNames(style.MiniPagePostTagline, '')}
        >
          <span> {tagLine} </span>
        </Typography>
        <div className={classNames('flex flex-wrap', style.postTags)}>
          {primaryTags?.map((tag, index) => (
            <Tag key={tag?.name + '-' + index} {...tag} />
          ))}
        </div>
        {/* organisationEstablishedDate */}
        {/* <Typography tag="h3" className={classNames(style.MiniPagePostTagline, "")}>   
          <span> {organisationEstablishedDate} </span>
        </Typography>*/}
        {/* Country & Funded */}
        <div className={classNames('flex flex-wrap', style.postTagsCountry)}>
          {countryTags?.map((tag, index) => (
            <Tag key={tag.name + '-' + index} {...tag} />
          ))}

          {projectFunded?.map((tag, index) => (
            <Tag key={tag.name + '-' + index} {...tag} />
          ))}
        </div>
        {/* projects */}
        <div className={classNames('flex flex-wrap', style.postTagsProjects)}>
          {projects?.map((tag, index) => (
            <Tag key={tag.name + '-' + index} {...tag} />
          ))}
        </div>
        {/* Post Text */}
        {text ? (
          <Typography
            tag="div"
            className={classNames(
              'mt-2 textTruncate',
              style.MiniPagePostDescription
            )}
            htmlText={text}
          ></Typography>
        ) : (
          ''
        )}
        {/* Domain Tags */}
        <div className={classNames('flex flex-wrap', style.postTags)}>
          {domains?.map((tag, index) => (
            <Tag key={tag?.name + '-' + index} {...tag} />
          ))}
        </div>
        {/* Method Tags */}
        <div className={classNames('flex flex-wrap', style.postTagsMethods)}>
          {methods?.map((tag, index) => (
            <Tag key={tag?.name + '-' + index} {...tag} />
          ))}
        </div>
        {/* Post recommendations */}
        {recommendations?.images && recommendations.images.length > 0 && (
          <div className={classNames(style.postRecommandations)}>
            {recommendations?.images.map((image, index) => (
              <Image
                src={image}
                key={`${index} - ${image} - ${title} - `}
                width={17}
                height={17}
                className={classNames('rounded-full')}
                alt={`Recommended by Person Image ${image}`}
              />
            ))}
            <Typography tag="p" className="text-xs text-gray-400 px-4">
              Recommended by {recommendations?.number ?? 0}{' '}
              {recommendations?.number && recommendations.number < 1
                ? 'person'
                : 'persons'}
            </Typography>
          </div>
        )}

        {/* projectResultAuthor */}
        <div
          className={classNames('flex flex-wrap', style.postTagsResultAuthor)}
        >
          {projectResultAuthor?.map((tag, index) => (
            <Tag key={tag.name + '-' + index} {...tag} />
          ))}
          {recommendations?.number && (
            <Typography tag="p" className="text-xs text-gray-400 px-4">
              Recommended by {recommendations?.number ?? 0}{' '}
              {recommendations?.number && recommendations.number < 1
                ? 'person'
                : 'persons'}
            </Typography>
          )}
        </div>
        {/* Affiliations */}
        <div
          className={classNames('flex flex-wrap', style.postTagsOrganisation)}
        >
          {organisationAffiliations && organisationAffiliations?.length > 0 && (
            <AffiliationsComponent
              afiliations={organisationAffiliations.map((affiliation) => ({
                name: affiliation.organisation,
                arole: affiliation.role,
              }))}
              isEditModeOn={false} // Assuming you don't want to edit this in MiniPagePost
              tagListTitle=""
              tags={tags?.filter((tag) => tag?.tagType === 'organisation')}
              tagType="organisation"
            />
          )}
        </div>
        {/* Post Date */}
        <Typography tag="p" className={classNames(style.MiniPagePostDate, '')}>
          Posted on: {formattedDate}
        </Typography>
      </div>
    </div>
  );
};

export const formatDate = (date: string | Date): string => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const day = String(newDate.getDate()).padStart(2, '0'); // Add leading zero if needed
  const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  return `${day}/${month}/${year}`;
};

export default MiniPagePost;
