import Image from 'next/image';
import style from './HeaderComponent.module.css';
import classNames from 'classnames';
import Typography from '@app/shared-components/Typography/Typography';
import Tag, { TagProps } from '@app/shared-components/Tag/Tag';
import { getImageUrlForMedia } from '@app/page-components/PageComponents.utils';
import { useEffect, useState } from 'react';
import InfoPagesImageFileUploader from '@app/shared-components/InfoPagesImageFileUploader/InfoPagesImageFileUploader';
import InputText from '@app/shared-components/InputText/InputText';
import TagPicker from '@app/shared-components/TagPicker/TagPicker';
import DatePickerComponent from '@app/shared-components/DatePickerComponent/DatePickerComponent';
// import { formatDate } from '@app/page-components/PostPageComponent/PostPageComponent.utils';
import SpriteSvg from '@app/shared-components/SpriteSvg/SpriteSvg';
// import { Modal, Label, TextInput, Button } from 'flowbite-react';
// import dayjs from 'dayjs';
import SocialLinksComponent from '@app/page-components/shared-page-components/SocialLinksComponent/SocialLinksComponent';
import { useTagPopularity } from '@app/hooks/useTagPopularity';

export type HeaderComponentProps = {
  organisation: {
    organisationEstablishedDate: string;
    title: string;
    tagLine: string;
    image: string;
    personPopularity: number;
    pageType: 'Post' | 'Event' | 'Project Result';
    description: string;
    countryTag: {
      name: string;
      popularity: number;
    };
    recommendations: {
      number: number;
      images: string[];
    };
    views: number;
    domains: Array<TagProps>;
    organisationTag: TagProps & { tagLine: string };
    // activity: Array<TagProps>;
    organisationType: Array<TagProps>;
    linkedinLink: string;
    websiteLink: string;
  };
  isEditModeOn?: boolean;
  updateOrganisationData: (data: any) => void;
  updateOrganisationDataOnKeyValue: (key: string, value: any) => void;
  tags?: TagProps[];
  handleTagCreated?: () => void;
  setValidationState: (data: any) => void;
  isNewPage?: boolean;
  requiredFields?: string[]; // new prop
};

const HeaderComponent: React.FC<HeaderComponentProps> = ({
  organisation,
  isEditModeOn,
  updateOrganisationData,
  updateOrganisationDataOnKeyValue,
  tags,
  handleTagCreated,
  setValidationState,
  isNewPage,
  requiredFields = [],
}) => {
  const validationFunctionForName = (tempName: string) => {
    if (tempName?.length < 2) {
      return 'Title should be at least 2 characters long';
    }
    if (tempName?.length > 100) {
      return 'Title should be at most 100 characters long';
    }
    if (tempName === 'New Post') {
      return 'Title cannot be "New Post"';
    }

    const trimmedTitle = tempName.trim();
    // Empty after trimming
    if (trimmedTitle.length === 0) {
      return 'Title cannot be only whitespace';
    }
    // Check if title starts or ends with space
    if (trimmedTitle !== tempName) {
      return 'This field dose not accept leading and/or trailing whitespace (spaces). Please make sure that you do not have spaces at the start and end of the title.';
    }
    // Check for excessive spaces
    if (/\s{2,}/.test(trimmedTitle)) {
      return 'Title cannot contain multiple consecutive spaces';
    }
    // Special characters check
    const specialCharsRegex = /[<>{}[\]\\\/]/;
    if (specialCharsRegex.test(trimmedTitle)) {
      return 'Title cannot contain special characters like < > { } [ ] \\ /';
    }
    return '';
  };

  // if is newPage, update the projectTag with the new tag created or selected
  // const [projectTag, setProjectTag] = useState(project?.projectTag);
  const [tagLine, setTagLine] = useState(
    organisation?.organisationTag?.tagLine || ''
  );

  useEffect(() => {
    // console.log('project?.projectTag?.name', organisation?.organisationTag);
    // setProjectTag(project?.projectTag);
    setTagLine(organisation?.organisationTag?.tagLine || '');
  }, [organisation?.organisationTag]);

  useEffect(() => {
    console.log('tagLine', tagLine);
  }, [tagLine]);

  const currentTagPopularity =
    tags?.find((item) => item.name === organisation?.organisationTag?.name)
      ?.mentions || 1;

  return (
    <div className={classNames(style.personHeader)}>
      <div className={style.imageAndSocialColumn}>
        {!isEditModeOn ? (
          <Image
            src={
              getImageUrlForMedia(organisation?.organisationTag?.picture)
                ?.url ||
              getImageUrlForMedia(organisation?.organisationTag?.picture) ||
              'https://placehold.co/147x147?text=Profile Image'
            }
            width={147}
            height={147}
            className={classNames('rounded-full')}
            alt={`Organisation Image - ${organisation?.organisationTag?.name}`}
          />
        ) : (
          <div className="w-72">
            <InfoPagesImageFileUploader
              currentImage={organisation?.organisationTag?.picture}
              updatePostData={(value) =>
                updateOrganisationDataOnKeyValue('organisationTag', {
                  ...organisation?.organisationTag,
                  picture: value,
                })
              }
            />
          </div>
        )}
        {/* Social Icons */}
        <SocialLinksComponent
          isEditModeOn={isEditModeOn}
          linkedinLink={organisation?.linkedinLink}
          websiteLink={organisation?.websiteLink}
          handleUpdate={updateOrganisationDataOnKeyValue}
        />
        {/* Views */}
        {!isEditModeOn && (
          <Typography
            data-after="2153"
            tag="p"
            className="text-sm text-gray-800 my-3 after:content-[attr(data-after)]]"
          >
            {/* {organisation.views} views */}
          </Typography>
        )}
      </div>
      <div className={style.detailsColumn}>
        {/* Organisation Info Name */}
        {!isEditModeOn ? (
          <Typography tag="h1" className=" font-bold text-greyShade">
            {organisation?.organisationTag?.name}
            {/* Organisation Popularity */}
            <span
              data-after={currentTagPopularity || ''}
              className="after:content-[attr(data-after)] text-lg relative top-[-30px] ml-1 text-gray-500 dark:text-gray-400"
            ></span>
          </Typography>
        ) : !isNewPage ? (
          <div>
            <InputText
              // label="Title"
              placeholder="Enter title"
              value={organisation?.organisationTag?.name}
              className={classNames(
                style.genericTextArea,
                style.textPostTitleEdit,
                validationFunctionForName(organisation.organisationTag?.name) &&
                  style.InputRequired
              )}
              onChange={(e) =>
                updateOrganisationData({
                  ...organisation,
                  title: e?.target?.value,
                  organisationTag: {
                    ...organisation?.organisationTag,
                    name: e?.target?.value,
                  },
                })
              }
              validate={validationFunctionForName}
              setValidationState={
                setValidationState
                  ? (value) => setValidationState({ title: value })
                  : undefined
              }
              shouldUpdateValueState={true}
            />
            {requiredFields?.includes('name') &&
              (!organisation?.organisationTag?.name ||
                organisation?.organisationTag?.name.trim().length < 2) && (
                <span className="text-red-500 text-xs">* Required</span>
              )}
          </div>
        ) : (
          <div>
            <TagPicker
              placeholder="Enter the organisation name"
              tags={tags?.filter(
                (tag) =>
                  tag.tagType === 'organisation' &&
                  !tag?.tagPageLink &&
                  !tag?.masterTag
              )}
              className="relative"
              updatePostData={(value) =>
                updateOrganisationDataOnKeyValue('organisationTag', value)
              }
              tagType="organisation"
              onTagCreated={handleTagCreated}
              newTagHeader="Create a new organisation"
              newTagType="Organisation name"
              newTagTagline="Enter a tagline (slogan, acronym, English translation, ...)"
            />
            {requiredFields?.includes('name') &&
              (!organisation?.organisationTag?.name ||
                organisation?.organisationTag?.name.trim().length < 2) && (
                <span className="text-red-500 text-xs">* Required</span>
              )}
          </div>
        )}
        {/* Tagline */}
        {!isEditModeOn ? (
          <Typography tag="h3" className="text-gray-800 italic">
            {tagLine}
          </Typography>
        ) : (
          <>
            <InputText
              placeholder="Enter a tagline (slogan, acronym, English translation, ...)"
              value={tagLine}
              onChange={(e) => {
                updateOrganisationData({
                  ...organisation,
                  organisationTag: {
                    ...organisation.organisationTag,
                    tagLine: e.target.value,
                  },
                });
                setTagLine(e.target.value);
              }}
              shouldUpdateValueState={isNewPage}
              className={classNames(
                '',
                style.genericTextArea,
                style.textPostSubtitle
              )}
            />
          </>
        )}
        {/* Founded */}
        <div className="flex items-center my-2">
          {organisation?.organisationEstablishedDate && isEditModeOn && (
            <SpriteSvg.AccountOrg2Icon
              className="mb-4 mr-2"
              sizeW={24}
              sizeH={24}
              viewBox={'0 0 18 18'}
              fill={'#000'}
              stroke={'0'}
              inline={false}
            />
          )}
          {!isEditModeOn ? (
            organisation?.organisationEstablishedDate ? (
              <Typography
                tag="span"
                className="flex align-center text-greyShade text-stroke-gray text-14 ml-2"
              >
                <SpriteSvg.AccountOrg2Icon
                  className="mb-4 mr-2"
                  sizeW={24}
                  sizeH={24}
                  viewBox={'0 0 18 18'}
                  fill={'#000'}
                  stroke={'0'}
                  inline={false}
                />
                Founded in&nbsp;
                {/* {dayjs(organisation?.organisationEstablishedDate).format(
                  'YYYY'
                )} */}
                {new Date(
                  organisation.organisationEstablishedDate
                ).getFullYear()}
              </Typography>
            ) : (
              ''
            )
          ) : (
            <>
              <DatePickerComponent
                placeholder="Founded in"
                dateFormate="YYYY"
                date={
                  !organisation?.organisationEstablishedDate
                    ? null
                    : new Date(organisation?.organisationEstablishedDate)
                }
                onChange={(value) =>
                  updateOrganisationDataOnKeyValue(
                    'organisationEstablishedDate',
                    value.getFullYear().toString()
                  )
                }
              />
            </>
          )}
        </div>
        {/* Organisation domains */}
        <div className={classNames('flex flex-wrap', style.domains)}>
          {!isEditModeOn ? (
            organisation?.organisationType?.map((orgType) => (
              <Tag key={orgType.name} {...orgType} />
            ))
          ) : (
            <TagPicker
              placeholder="Add one or more organisation type tags"
              tags={tags?.filter(
                (tag) => tag?.tagType === 'organisation type' && !tag?.masterTag
              )}
              className="w-full mb-2"
              isMulti
              selectedValues={organisation?.organisationType?.map(
                (orgType) => orgType?.name
              )}
              updatePostData={(value) => {
                updateOrganisationDataOnKeyValue('organisationType', value);
              }}
              tagType={'person type'}
              onTagCreated={handleTagCreated}
              newTagHeader="Create a new organisation type"
              newTagType="Organisation type name"
              newTagTagline="Enter a tagline (slogan, acronym, English translation, ...)"
            />
          )}
        </div>
        {/* Organisation Country */}
        {!isEditModeOn ? (
          <Tag {...organisation.countryTag} />
        ) : (
          <div>
            <TagPicker
              placeholder={
                // 'Add one or more country tags (where the organisation is based in)'
                'Add the country tag (where the organisation is based in)'
              }
              tags={tags?.filter(
                (tag) => tag?.tagType === 'country' && !tag?.masterTag
              )}
              className="relative"
              selectedValue={organisation?.countryTag?.name || undefined}
              updatePostData={(value) =>
                updateOrganisationDataOnKeyValue('countryTag', value)
              }
              tagType="country"
              showCreateTagButton={false}
              onTagCreated={handleTagCreated}
              newTagHeader="Create a new country tag"
              newTagType="Country name"
              newTagTagline="Enter a tagline (slogan, acronym, English translation, ...)"
              showTagTagline={false}
            />
            {requiredFields?.includes('country') &&
              (!organisation?.countryTag || !organisation?.countryTag?._id) && (
                <span className="text-red-500 text-xs">* Required</span>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;
