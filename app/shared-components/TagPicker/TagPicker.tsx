import React, { use, useEffect, useState } from 'react';
import { items } from '@wix/data';
import CreatableSelect from 'react-select/creatable';
import { components } from 'react-select';
import classNames from 'classnames';
import Tag, { TagProps } from '../Tag/Tag';
import { Modal, Button, TextInput, Label } from 'flowbite-react';
import { useWixModules } from '@wix/sdk-react';
import styles from './TagPicker.module.css';
import { motion } from 'framer-motion';
import { useAuth } from '@app/custom-hooks/AuthContext/AuthContext';
import SpriteSvg from '../SpriteSvg/SpriteSvg';
import { refetchTags } from '@app/utils/refetch-utils';
import { Typography } from '@mui/material';
// import Option from 'react-select/dist/declarations/src/components/Option';

export type TagPickerProps = {
  isMulti?: boolean;
  className?: string;
  selectedValue?: string;
  selectedValues?: Array<string>;
  tags?: TagProps[];
  updatePostData?: (data: any) => void;
  tagType?: string;
  onTagCreated?: () => void;
  tagTypeLabel?: string;
  placeholder?: string;
  extraFilterTags?: (tags: TagProps[], firstTag: string) => TagProps[];
  setIsDisabledSorting?: (value: boolean) => void;
  newTagHeader?: string;
  newTagType?: string;
  newTagTagline?: string;
  showTagTagline?: boolean;
  showCreateTagButton?: boolean; // Added this new prop catalin
  disableCreateOption?: boolean; // Added this new prop catalin
};

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label?.toLowerCase()?.replace(/\W/g, ''),
});

let defaultOptions = [
  createOption('One'),
  createOption('Two'),
  createOption('Three'),
];

// Custom ClearIndicator component for single-value selects
const customClearIndicator = (props) => {
  return props.isMulti ? null : <components.ClearIndicator {...props} />;
};

export const TagPicker: React.FC<TagPickerProps> = ({
  isMulti,
  className,
  selectedValue,
  tags,
  updatePostData,
  selectedValues,
  tagType = 'Unassigned',
  onTagCreated,
  tagTypeLabel,
  placeholder,
  extraFilterTags,
  setIsDisabledSorting,
  newTagHeader,
  newTagType,
  newTagTagline,
  showTagTagline = true,
  showCreateTagButton = true, // Default to true catalin
  disableCreateOption = false, // Default to false catalin
}) => {
  // #region Tag creation form state
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [tagName, setTagName] = useState('');
  const [tagTagline, setTagTagline] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { tags: allTags } = useAuth();
  // #endregion

  // #region Tag picker state
  // const sortedTags = tags?.sort(
  //   (a, b) => b?.mentions || 0 - (a?.mentions || 0)
  // );
  // console.log('sortedTags', sortedTags);
  const tagOptions =
    tags?.map((tag) => createOption(tag.name)) || defaultOptions;
  // console.log('tagOptions', tagOptions);
  const [options, setOptions] = useState(tagOptions);
  const [value, setValue] = useState<Option | Array<Option> | null>();
  // #endregion

  // #region extra filtering logic
  useEffect(() => {
    if (extraFilterTags) {
      console.log('filteredTags 1st value', selectedValues);
      const filteredTags = extraFilterTags(tags, selectedValues?.[0]); // TODO: Check if this is the correct value @ALEX - am adugat ?. (TypeError: Cannot read properties of undefined (reading '0'))
      console.log('filteredTags', filteredTags);
      setOptions(filteredTags?.map((tag) => createOption(tag.name)));
    }
  }, [tags]);
  // #endregion

  // #region Wix upload logic
  const { insertDataItem } = useWixModules(items);
  const uploadTag = async (tagName: string, tagTagline: string) => {
    try {
      const result = await insertDataItem({
        dataCollectionId: 'Tags',
        dataItem: {
          data: {
            name: tagName,
            tagLine: tagTagline,
            tagType: tagType,
          },
        },
      });
      return result;
    } catch (error) {
      console.error('Error uploading tag:', error);
    }
  };
  // #endregion

  // #region Tag creation form handlers
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newOption = createOption(tagName);
    setIsLoading(true);

    try {
      // #region Logic for creating Tag in Wix
      const uploadedTag = await uploadTag(tagName, tagTagline);
      await refetchTags();
      onTagCreated && onTagCreated();

      // #region tags should be refetched here

      // #endregion
      console.log('uploadedTag', uploadedTag);
      // #endregion

      // #region Logic for updating the tag picker options
      setOptions((prev) => [...prev, newOption]);
      if (isMulti) {
        setValue([...(value || []), newOption]);
      } else {
        setValue(newOption);
      }
      // #endregion

      // #region Extra logic to update the post data
      // Single tag picker
      tags?.push(uploadedTag?.dataItem?.data);
      updatePostData &&
        !isMulti &&
        updatePostData(tags?.find((tag) => tag?.name === newOption?.label));
      // Multi tag picker
      updatePostData &&
        isMulti &&
        updatePostData(
          [...(value || []), newOption]?.map((value: any) =>
            tags?.find((tag) => tag?.name === value?.label)
          )
        );
      // #endregion

      // #region Resetting the form state
      setIsLoading(false);
      setShowCreateForm(false);
      setTagName('');
      setTagTagline('');
      // #endregion
    } catch (error) {
      console.error('Error uploading tag in formSubmit:', error);
      setIsLoading(false);
    }
  };

  const handleCreate = (inputValue: string) => {
    if (disableCreateOption) return;
    setTagName(inputValue);
    setShowCreateForm(true);
  };
  // #endregion

  useEffect(() => {
    if (selectedValue) {
      // setOptions([...tagOptions, createOption(selectedValue)]);
      setValue(createOption(selectedValue));
    }
    if (selectedValues) {
      setValue(selectedValues?.map((value) => createOption(value)));
    }
  }, [selectedValue, selectedValues]);

  const handleUpdateData = (newValue: Option) => {
    console.log('value changing');
    updatePostData &&
      !isMulti &&
      updatePostData(tags?.find((tag) => tag?.name === newValue?.label));
    console.log(
      'debug1->tag found',
      tags?.find((tag) => tag?.name === newValue?.label)
    );
    updatePostData &&
      isMulti &&
      updatePostData(
        newValue?.map((value: any) =>
          tags?.find((tag) => tag?.name === value?.label)
        )
      );
    setValue(newValue);
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
      '&:hover': {
        border: 'none',
      },
      minHeight: '5 0px',
      margin: '0px 0px 0px 0px',
    }),
    input: (provided, state) => ({
      ...provided,
      color: 'var(--primary-brand-color)',
      fontSize: 'var(--w-fontSize-tag)',
      paddingLeft: 'var(--w-space-s)',
      height: 'var(--w-space-xxxl)',
      // minHeight: state.isFocused ? null : 'var(--w-space-xxl)',
      transition: '',
      //border: 'none',
      outline: 'none',
      backgroundColor: state.selectProps.inputValue
        ? 'var(--primary-white)'
        : 'var(--color-background-brand-tag)',
      borderRadius: 'var(--p-border-radius-tag)!important',
      // "&:after": {
      //   content: state.hasValue ? '"Add more"' : '""',
      //   position: 'absolute',
      //   opacity: 0.5,
      //   padding: '0px var(--w-space-s)',
      //   margin: '0px 4px',
      //   borderRadius: 'var(--p-border-radius-tag)!important'
      // },
      border: state.selectProps.inputValue
        ? '4px solid var(--color-background-brand-tag)'
        : '4px solid var(--color-background-brand-tag)',
    }),
    menu: (provided) => ({
      ...provided,
      width: '100%',
      position: 'absolute',
      zIndex: 9999,
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: '200px',
      padding: '10px',
    }),
    valueContainer: (provided) => ({
      ...provided,
      // padding: '0px',
    }),
    singleValue: (provided) => ({
      ...provided,
      position: 'relative',
    }),
    option: (provided) => ({
      ...provided,
      margin: '0 4px',
    }),
    placeholder: (provided, state) => ({
      ...provided,
      padding: '0px var(--w-space-s)',
      margin: '0px 4px',
      backgroundColor: 'var(--primary-white)',
      ':hover': {
        // Add this :hover selector
        boxShadow: '0px 0px 0px 4px #cfcfcf;', // Change the background color on hover
      },
      borderRadius: 'var(--p-border-radius-tag)!important',
    }),
    // indicatorSeparator: state => ({
    //   display: 'none',
    // }),
    // indicatorsContainer: (provided, state) => ({
    //   ...provided,
    //   height: '30px',
    // }),
  };

  // components
  // TODO @ALEX - !!!!!! important de verificat noua structura
  const customComponents = {
    ClearIndicator: customClearIndicator,
    Option: (props: any) => {
      const correspondingTag = tags?.find(
        (tag) => tag.name === props.data.label
      );

      if (correspondingTag) {
        return (
          <components.Option {...props}>
            <div
              className={classNames(
                styles.tagPickerTagline,
                'p-1 ml-2 flex flex-row items-center items-left'
              )}
            >
              <Tag
                {...correspondingTag}
                disableTooltip={true}
                disableLink={true}
                disablePopularityHover={true}
              />
              <p>{correspondingTag.tagLine}</p>
            </div>
          </components.Option>
        );
      }

      // Only show create button if showCreateTagButton is true
      if (showCreateTagButton) {
        return (
          <button
            className={classNames(
              styles.tagPickerCreateButton,
              'flex justify-center w-full'
            )}
            onClick={() => {
              console.log('debug1->props', props);
              handleCreate(props.value);
            }}
          >
            <SpriteSvg.AccountAddIcon
              sizeH={24}
              sizeW={24}
              viewBox={'-6 -6 24 24'}
              strokeWidth={1}
            />
            Create
            <span
              className={classNames(
                styles.tagPickerCreateButtonText,
                'font-bold'
              )}
            >
              {props.value}
            </span>
            tag
          </button>
        );
      }

      // If no matching tag and create button is hidden, show empty option
      return <div className="p-1 ml-2">No matching tag found</div>;
    },
    MultiValue: (props: any) => {
      const correspondingTag = tags?.find(
        (tag) => tag.name === props.data.label
      );
      return correspondingTag ? (
        <components.MultiValue {...props}>
          <Tag
            {...correspondingTag}
            disableTooltip={true}
            disableLink={true}
            disablePopularityHover={true}
          />
        </components.MultiValue>
      ) : (
        ''
      );
    },
    // Control: ({ children, ...props }: ControlProps<any>) => {
    //   return (
    //     <components.Control {...props}>
    //       👍 {children}
    //     </components.Control>
    //   );
    // },
    // SingleValue: (props: any) => {
    //   const correspondingTag = tags?.find(
    //     (tag) => tag.name === props.data.label
    //   );
    //   return correspondingTag ? (
    //     <components.SingleValue {...props}>
    //       <Tag {...correspondingTag} disableTooltip={true} disableLink={true} />
    //     </components.SingleValue>
    //   ) : (
    //     ''
    //   );
    // },
  };

  const validationForTagName = (tagName: string) => {
    return allTags?.find(
      (tag) => tag?.name === tagName && tag?.tagType === tagType
    );
  };

  const validationFunctionForTitle = (tagName: string | undefined) => {
    if (!tagName) {
      setIsTagNameValid(false);
      return 'Tag Name is required';
    }
    if (tagName?.length < 2) {
      setIsTagNameValid(false);
      return 'Tag Name should be at least 2 characters long';
    }
    if (tagName?.length > 100) {
      setIsTagNameValid(false);
      return 'Tag Name should be at most 100 characters long';
    }

    if (validationForTagName(tagName)) {
      setIsTagNameValid(false);
      return 'Tag Name already exists in a different tag type';
    }

    // Check for URL patterns
    if (/[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/.test(tagName)) {
      setIsTagNameValid(false);
      return 'Tag Name cannot contain website addresses';
    }

    setIsTagNameValid(true);

    return '';
  };

  const [isTagNameValid, setIsTagNameValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    setValidationMessage(validationFunctionForTitle(tagName));
  }, [tagName]);

  return (
    <>
      <div
        className={classNames(
          styles.tagPickerWrapper,
          'w-full relative cursor-pointer'
        )}
        // onClick={(e: any) => {
        //   console.log('eeeee onClick', e);
        //   // e.preventDefault();
        //   e.stopPropagation();
        // }}
        // onMouseUp={(e: any) => {
        //   console.log('eeeee onMouseUp', e);
        //   // e.preventDefault();
        //   e.stopPropagation();
        // }}
      >
        {tagTypeLabel && (
          <Label htmlFor="tagPicker" className="mb-20">
            {tagTypeLabel}
          </Label>
        )}
        <CreatableSelect
          classNamePrefix="react-select"
          unstyled
          // menuIsOpen={tagType === 'organisation'}
          components={customComponents}
          // onMenuOpen={(e) => console.log('menu open', e)}
          // menuIsOpen={true}
          isClearable={true}
          isDisabled={isLoading}
          isLoading={isLoading}
          onMenuOpen={() => {
            setIsDisabledSorting && setIsDisabledSorting(true);
          }}
          onMenuClose={() => {
            setIsDisabledSorting && setIsDisabledSorting(false);
          }}
          onChange={handleUpdateData}
          onCreateOption={disableCreateOption ? undefined : handleCreate}
          isValidNewOption={disableCreateOption ? () => false : undefined}
          options={options}
          value={value}
          isMulti={isMulti}
          placeholder={placeholder || 'Add one or more post type tags'}
          styles={customStyles}
          className={classNames('', className)}
          classNames={{
            control: (state) =>
              classNames(
                state.isFocused ? styles.TagCursor : 'text-gray-site' // Proper ternary expression
              ),
            multiValue: () =>
              classNames(
                // styles.tagPickerPill,
                'tagPickerPill tagPickerPillRemove cursor-pointer'
                // styles.tagPickerPillMultiModule
              ),
            singleValue: () =>
              classNames(
                'tagPickerPillSingle cursor-pointer',
                styles.tagPickerPillSingleModule
              ),
            menu: () => classNames('', styles.tagPickerMenu),
            menuList: () => classNames('', styles.tagPickerMenuList),
            // option: () => classNames('', styles.option),
            valueContainer: () =>
              classNames(
                'text-gray-400', // bg-slate-100
                styles.tagPickerValueContainer
              ),
          }}
        />
        {showCreateForm && (
          <Modal show={showCreateForm} onClose={() => setShowCreateForm(false)}>
            <Modal.Header>{newTagHeader || 'Add new Tag'}</Modal.Header>
            <Modal.Body>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <Label htmlFor="tagName" className="relative">
                    {newTagType || 'Tag Name'}
                  </Label>
                  <TextInput
                    id="tagName"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    required
                    helperText={
                      !isTagNameValid && (
                        <span className="text-red-600 inline-flex -top-3">
                          <SpriteSvg.AccountAlertIcon
                            className="text-site-black text-[var(--color-text-icon-error)]"
                            sizeW={24}
                            sizeH={24}
                            viewBox={'0 0 32 32'}
                            fill={'currentColor'}
                            strokeWidth={0}
                            inline={false}
                          />
                          <Typography tag="p">{validationMessage}</Typography>
                        </span>
                      )
                    }
                  />
                </div>
                <div className="mb-4">
                  <Label
                    htmlFor="tagTagline"
                    style={{ display: showTagTagline ? 'block' : 'none' }}
                  >
                    {newTagTagline || 'Tagline'}
                  </Label>
                  <TextInput
                    id="tagTagline"
                    value={tagTagline}
                    onChange={(e) => setTagTagline(e.target.value)}
                    style={{ display: showTagTagline ? 'block' : 'none' }}
                  />
                </div>
                <Button
                  disabled={!isTagNameValid || isLoading}
                  type="submit"
                  // disabled={isLoading}
                >
                  Submit
                </Button>
              </form>
            </Modal.Body>
          </Modal>
        )}
      </div>
    </>
  );
};

export default TagPicker;
