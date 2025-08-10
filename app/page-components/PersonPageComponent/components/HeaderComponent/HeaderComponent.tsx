import Image from 'next/image';
import style from './HeaderComponent.module.css';
import classNames from 'classnames';
import Typography from '@app/shared-components/Typography/Typography';
import Tag, { TagProps } from '@app/shared-components/Tag/Tag';
import { getImageUrlForMedia } from '../../../PageComponents.utils';
import InputText from '@app/shared-components/InputText/InputText';
import TagPicker from '@app/shared-components/TagPicker/TagPicker';
import InfoPagesImageFileUploader from '@app/shared-components/InfoPagesImageFileUploader/InfoPagesImageFileUploader';

import SocialLinksComponent from '@app/page-components/shared-page-components/SocialLinksComponent/SocialLinksComponent';

export type HeaderComponentProps = {
  person: {
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
    personRoles: Array<TagProps>;
    personTag: TagProps;
    activity: Array<TagProps>;
    linkedinLink: string;
    websiteLink: string;
    researchGateLink: string;
    orcidLink: string;
  };
  isEditModeOn: boolean;
  tags: TagProps[];
  updatePersonData: (data: any) => void;
  updatePersonDataOnKeyValue: (key: string, value: any) => void;
  setValidationState: (data: any) => void;
  handleTagCreated: () => void;
};

const HeaderComponent: React.FC<HeaderComponentProps> = ({
  person,
  isEditModeOn,
  tags,
  updatePersonData,
  updatePersonDataOnKeyValue,
  setValidationState,
  handleTagCreated,
}) => {
  const validationFunctionForName = (
    tempName: string | undefined,
    existingPostPagesTitles?: string[],
    defaultPostTitle?: string
  ): string => {
    if (!tempName) {
      return 'Title is required';
    }

    const trimmedTitle = tempName.trim();
    // Empty after trimming
    if (trimmedTitle.length === 0) {
      return 'Title cannot be only whitespace';
    }
    // Check if title starts or ends with space
    // if (trimmedTitle !== tempName) {
    //   return 'Title cannot start or end with spaces';
    // }
    // Check for excessive spaces
    if (/\s{2,}/.test(trimmedTitle)) {
      return 'Title cannot contain multiple consecutive spaces';
    }
    // Special characters check
    const specialCharsRegex = /[<>{}[\]\\\/]/;
    if (specialCharsRegex.test(trimmedTitle)) {
      return 'Title cannot contain special characters like < > { } [ ] \\ /';
    }

    if (tempName.length < 2) {
      return 'Title should be at least 2 characters long';
    }
    if (tempName.length > 100) {
      return 'Title should be at most 100 characters long';
    }
    if (tempName === 'New Post') {
      return 'Title cannot be "New Post"';
    }
    if (Array.isArray(existingPostPagesTitles) && defaultPostTitle) {
      const isTempTitleExisting = existingPostPagesTitles.some(
        (postPageTitle) =>
          postPageTitle !== defaultPostTitle && postPageTitle === tempName
      );
      if (isTempTitleExisting) {
        return 'Title already exists';
      }
    }

    return '';
  };

  //TODO @ALEX de verificat currentTagPopularity
  // const { getPopularity } = useTagPopularity();
  // const currentTagPopularity = getPopularity(person?.personTag?.name);
  const currentTagPopularity =
    tags.find((item) => item.name === person?.personTag?.name)?.mentions || 1;

  //Debugging
  // useEffect(() => {
  //   console.log({
  //     personTagName: person?.personTag?.name,
  //     popularity: currentTagPopularity
  //   });
  // }, [person?.personTag?.name, currentTagPopularity]);
  // console.log('person', JSON.stringify(person, null, 2));

  return (
    <div className={classNames(style.personHeader)}>
      <div className={style.imageAndSocialColumn}>
        {!isEditModeOn ? (
          <Image
            src={
              getImageUrlForMedia(person?.personTag?.picture)?.url ||
              getImageUrlForMedia(person?.personTag?.picture) ||
              'https://placehold.co/147x147?text=Profile Image'
            }
            width={647}
            height={647}
            className={classNames('rounded-full w-36 h-36 object-cover')}
            alt={`User Avatar - ${person.title}`}
          />
        ) : (
          <div className="w-72">
            <InfoPagesImageFileUploader
              currentImage={person?.personTag?.picture}
              updatePostData={(value) =>
                updatePersonDataOnKeyValue('personTag', {
                  ...person?.personTag,
                  picture: value,
                })
              }
            />
          </div>
        )}
        {/* Social Icons */}
        <SocialLinksComponent
          isEditModeOn={isEditModeOn}
          linkedinLink={person?.linkedinLink}
          websiteLink={person?.websiteLink}
          researchGateLink={person?.researchGateLink}
          orcidLink={person?.orcidLink}
          handleUpdate={updatePersonDataOnKeyValue}
          extended
        />
        {/* Views */}
        {!isEditModeOn && (
          <Typography
            data-after="2153"
            tag="p"
            className="text-sm text-gray-800 my-3 after:content-[attr(data-after)]]"
          >
            {/* {person.views} views */}
          </Typography>
        )}
      </div>
      <div className={style.detailsColumn}>
        {/* Person Info Name */}
        {!isEditModeOn ? (
          <Typography tag="h1" className="text-gray-800">
            {person?.personTag?.name}
            {/* Person Popularity */}
            <span
              data-after={currentTagPopularity || ''}
              className={classNames(
                style.personTagPopularity,
                'after:content-[attr(data-after)] text-lg relative top-[-30px] ml-1 text-gray-500 dark:text-gray-400'
              )}
            ></span>
          </Typography>
        ) : (
          <InputText
            placeholder="Enter your full name (as you want to be seen by others)*"
            value={person?.personTag?.name}
            className={classNames(
              // 'personNameTitle',
              style.genericTextArea,
              style.textPostTitleEdit,
              validationFunctionForName(person?.personTag?.name) &&
                style.InputRequired
            )}
            onChange={(e) =>
              updatePersonData({
                ...person,
                title: e?.target?.value,
                personTag: {
                  ...person?.personTag,
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
        )}
        {/* Person Tagline */}
        {!isEditModeOn ? (
          <Typography tag="h3" className="text-gray-800 italic">
            {person?.personTag?.tagLine}
          </Typography>
        ) : (
          <InputText
            // label="Tagline"
            placeholder="Enter a tagline (motto, slogan, ...)"
            className={classNames(
              // 'personTaglineTitle',
              style.genericTextArea,
              style.textPostSubtitle
            )}
            value={person?.personTag?.tagLine || ''}
            onChange={(e) =>
              updatePersonData({
                ...person,
                personTag: {
                  ...person.personTag,
                  tagLine: e.target.value,
                },
              })
            }
          />
        )}
        {/* Person type - activity */}
        <div className={classNames('flex flex-wrap', style.domains)}>
          {!isEditModeOn ? (
            person.activity?.map((activity) => (
              <Tag key={activity?.name} {...activity} />
            ))
          ) : (
            <TagPicker
              tags={tags?.filter(
                (tag) => tag?.tagType === 'person type' && !tag?.masterTag
              )}
              className="w-full"
              isMulti
              selectedValues={person?.activity?.map(
                (activity) => activity?.name
              )}
              updatePostData={(value) => {
                updatePersonDataOnKeyValue('activity', value);
              }}
              tagType={'person type'}
              onTagCreated={handleTagCreated}
              placeholder="Select one or more member type tags"
              newTagHeader="Create a new activity"
              newTagType="Activity name"
              newTagTagline="Enter a tagline (slogan, acronym, English translation, ...)"
              showCreateTagButton={false}
              disableCreateOption={true}
            />
          )}
        </div>
        {/* Person Country */}
        <div className="mt-1">
          {!isEditModeOn ? (
            <Tag {...person.countryTag} />
          ) : (
            <TagPicker
              placeholder={'Add a country tag (your current residence)'}
              tags={tags?.filter(
                (tag) => tag?.tagType === 'country' && !tag?.masterTag
              )}
              className="relative"
              selectedValue={person?.countryTag?.name || undefined}
              updatePostData={(value) =>
                updatePersonDataOnKeyValue('countryTag', value)
              }
              tagType="country"
              onTagCreated={handleTagCreated}
              newTagHeader="Create a new contry tag"
              newTagType="Country name"
              newTagTagline="Enter a tagline (slogan, acronym, English translation, ...)"
              showTagTagline={false}
              showCreateTagButton={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
