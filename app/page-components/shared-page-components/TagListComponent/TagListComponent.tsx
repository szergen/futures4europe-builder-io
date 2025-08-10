import style from './TagListComponent.module.css';
import classNames from 'classnames';
import Typography from '@app/shared-components/Typography/Typography';
import Tag, { TagProps } from '@app/shared-components/Tag/Tag';
import TagPicker from '@app/shared-components/TagPicker/TagPicker';

export type TagListComponentProps = {
  tagList: Array<TagProps>;
  tagListTitle: string;
  isEditModeOn?: boolean;
  tags?: Array<TagProps>;
  selectedValues?: Array<string>;
  updatePostData?: (data: any) => void;
  tagType?: string;
  handleTagCreated?: () => void;
  placeholder?: string; // New
};

const capitalizeFirstLetter = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Define which tag types should show the tagline
const tagTypesWithTagline = [
  'project',
  'organisation',
  'project-result',
  'domain',
  'foresight method',
];

const TagListComponent: React.FC<TagListComponentProps> = ({
  tagList,
  tagListTitle,
  isEditModeOn,
  tags,
  selectedValues,
  updatePostData,
  tagType,
  handleTagCreated,
  placeholder, // New @alex
}) => {
  if ((!tagList || tagList?.length === 0) && !isEditModeOn) {
    return null;
  }

  // Determine if tagline should be shown based on tag type
  const shouldShowTagline = tagType
    ? tagTypesWithTagline.includes(tagType?.toLowerCase())
    : true;

  return (
    <section className={classNames(style.tagListContainer)}>
      <Typography
        tag="h2"
        className={classNames('text-gray-800 w-full my-4', style.tagListTitle)}
      >
        {tagListTitle}
      </Typography>
      {!isEditModeOn ? (
        tagList?.map((tag) => <Tag key={tag?.name} {...tag} />)
      ) : (
        <TagPicker
          tags={tags?.filter((tag) => !tag?.masterTag)}
          className="w-full"
          isMulti
          selectedValues={selectedValues}
          updatePostData={updatePostData}
          tagType={tagType}
          onTagCreated={handleTagCreated}
          placeholder={placeholder} // New @alex
          newTagHeader={`Create a new ${tagType} tag`}
          newTagType={`${capitalizeFirstLetter(tagType || '')} name`}
          newTagTagline={`Enter a tagline (slogan, acronym, english translation, ...)`}
          showTagTagline={shouldShowTagline}
        />
      )}
    </section>
  );
};

export default TagListComponent;
