import Image from 'next/image';
import style from './AffiliationsComponent.module.css';
import classNames from 'classnames';
import Tag, { TagProps } from '@app/shared-components/Tag/Tag';
import Typography from '@app/shared-components/Typography/Typography';
import InputText from '@app/shared-components/InputText/InputText';
import TagPicker from '@app/shared-components/TagPicker/TagPicker';
import { Button } from 'flowbite-react';
import SpriteSvg from '@app/shared-components/SpriteSvg/SpriteSvg';
import { useEffect, useRef, useState } from 'react';
import { ItemInterface, ReactSortable } from 'react-sortablejs';
// import Sortable, { Swap } from 'sortablejs';

export type AffiliationsComponentProps = {
  afiliations: Array<
    TagProps & {
      arole: string;
    }
  >;
  tagListTitle?: string;
  current?: boolean;
  isEditModeOn?: boolean;
  updatePersonDataAffiliations?: (affiliations: any) => void;
  tags?: TagProps[];
  handleTagCreated?: () => void;
  title?: string;
  placeholderRole?: string;
  placeholderTag?: string;
  tagType?: string;
};

const capitalizeFirstLetter = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const AffiliationsComponent: React.FC<AffiliationsComponentProps> = ({
  afiliations,
  tagListTitle,
  current,
  isEditModeOn,
  updatePersonDataAffiliations,
  tags,
  handleTagCreated,
  title,
  placeholderRole = 'Role',
  placeholderTag = 'Add one or more organisation tags',
  tagType,
}) => {
  const [currentAffiliations, setCurrentAffiliations] = useState(
    afiliations || []
  );
  const inputRefs = useRef([]);
  const [isDisabledSorting, setIsDisabledSorting] = useState(false);

  const shouldAddNewAffiliation = () => {
    if (afiliations?.length === 0) return true;
    const lastMember = afiliations?.[afiliations.length - 1];
    return lastMember?.name;
  };

  useEffect(() => {
    // console.log('debug333->currentAffiliations', currentAffiliations);
    if (isEditModeOn) {
      if (shouldAddNewAffiliation() || !currentAffiliations?.length) {
        handleAddAffiliation(0);
      }
      setCurrentAffiliations(afiliations);
    }
  }, [afiliations, isEditModeOn]);

  const handleAddAffiliation = (index: number) => {
    if (index === 0 && !currentAffiliations && !currentAffiliations?.length) {
      const newAffiliation = { id: '', name: '', arole: '' };
      const updatedAffiliations = [newAffiliation];
      updatePersonDataAffiliations &&
        updatePersonDataAffiliations(updatedAffiliations);
      setCurrentAffiliations(updatedAffiliations);
      return;
    }
    const newAffiliation = { id: '', name: '', arole: '' };

    let newUpdatedAffuliations = currentAffiliations;
    newUpdatedAffuliations.push(newAffiliation);
    // const updatedAffiliations =
    updatePersonDataAffiliations &&
      updatePersonDataAffiliations(newUpdatedAffuliations);
    setCurrentAffiliations(newUpdatedAffuliations);
  };

  const handleRemoveAffiliation = (index: number) => {
    const updatedAffiliations = currentAffiliations.filter(
      (_, i) => i !== index
    );
    updatePersonDataAffiliations &&
      updatePersonDataAffiliations(updatedAffiliations);
    setCurrentAffiliations(updatedAffiliations);
  };

  if (
    (!currentAffiliations ||
      currentAffiliations?.length === 0 ||
      (!currentAffiliations?.[0]?.arole && !currentAffiliations?.[0]?.name)) &&
    !isEditModeOn
  ) {
    return null;
  }

  // Function to determine if tagline should be shown
  const shouldShowTagline = (type: string = '') => {
    const typeToCheck = type?.toLowerCase();
    return !(typeToCheck === 'person');
  };
  return (
    <section className={classNames(style.tagListRootContainer)}>
      {tagListTitle && (
        <div className={classNames('flex items-center', style.tagListTitle)}>
          <Typography
            tag="h2"
            className={classNames(
              'text-gray-800 grow'
              //  style.tagListTitle
            )}
          >
            {tagListTitle}
          </Typography>
        </div>
      )}

      <ReactSortable
        list={currentAffiliations as unknown as ItemInterface[]}
        setList={(newState) => {
          setCurrentAffiliations(newState as any);
          updatePersonDataAffiliations &&
            updatePersonDataAffiliations(newState as any);
        }}
        sort={isEditModeOn || !isDisabledSorting}
        animation={150}
        swapThreshold={0.65}
        direction="horizontal"
        dragClass={style.dragItem}
        ghostClass={style.ghostItem}
        chosenClass={style.chosenItem}
        easing="cubic-bezier(1, 0, 0, 1)"
        delay={50}
        delayOnTouchOnly={true}
        touchStartThreshold={5}
        disabled={!isEditModeOn || isDisabledSorting}
        className={classNames(
          'flex w-fit flex-wrap z-0',
          isEditModeOn && 'z-50'
        )}
        onStart={(evt) => {
          evt.item.classList.add(style.dragShadow);
        }}
        onEnd={(evt) => {
          evt.item.classList.remove(style.dragShadow);
        }}
      >
        {currentAffiliations?.map((affilitiation, index) => (
          <div
            key={`affiliation-${affilitiation.name}-${index}`}
            className={classNames(style.tagListContainer, isEditModeOn && '')}
          >
            {isEditModeOn && (
              <div className="drag-handle p-1 cursor-move opacity-50 hover:opacity-100">
                ⋮⋮
              </div>
            )}
            {!isEditModeOn ? (
              affilitiation.arole &&
              affilitiation.name && (
                <Typography
                  tag="span"
                  className={classNames(
                    'backgroundLabelAffiliation',
                    'pr-4 pl-2'
                  )}
                >
                  {affilitiation.arole}
                </Typography>
              )
            ) : (
              <div className={classNames(style.affiliationInputContainer)}>
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  placeholder={placeholderRole}
                  key={`affiliation-${affilitiation.name}-${index}`}
                  value={affilitiation.arole || ''}
                  onChange={(e) => {
                    const newAffiliations = [...currentAffiliations];
                    newAffiliations[index] = {
                      ...newAffiliations[index],
                      arole: e?.target?.value,
                    };
                    setCurrentAffiliations(newAffiliations);
                    updatePersonDataAffiliations &&
                      updatePersonDataAffiliations(newAffiliations);
                    // console.log('debug12312312', inputRef);

                    // Adjust the width of the input based on its content
                    if (inputRefs.current[index]) {
                      inputRefs.current[
                        index
                      ].style.width = `${inputRefs.current[index].scrollWidth}px`;
                    }
                  }}
                  className={classNames(style.roleInput, style.inputText)}
                  style={{
                    width: `${inputRefs.current?.[index]?.scrollWidth}px`,
                  }}
                  // isHorizontal
                />
              </div>
            )}
            {!isEditModeOn ? (
              affilitiation.name && (
                <>
                  <Tag
                    {...affilitiation}
                    {...tags?.find((item) => item.name === affilitiation.name)}
                  />
                  {/* {JSON.stringify(
                    tags?.find((item) => item.name === affilitiation.name)
                  )} */}
                </>
              )
            ) : (
              <>
                <div
                  className={classNames(style.affiliationTagPickerContainer)}
                >
                  <TagPicker
                    key={`affiliation-${affilitiation.name}-${index}`}
                    placeholder={placeholderTag}
                    tags={tags?.filter((tag) => !tag?.masterTag)}
                    selectedValue={affilitiation?.name || undefined}
                    updatePostData={(value) => {
                      const newAffiliations = [...currentAffiliations];
                      newAffiliations[index] = {
                        ...newAffiliations[index],
                        ...value,
                      };
                      setCurrentAffiliations(newAffiliations);
                      console.log('newAffiliations', newAffiliations);
                      updatePersonDataAffiliations &&
                        updatePersonDataAffiliations(newAffiliations);
                    }}
                    setIsDisabledSorting={setIsDisabledSorting}
                    tagType={tagType || 'organisation'}
                    onTagCreated={handleTagCreated}
                    newTagHeader={`Create a new ${tagType}`}
                    newTagType={`${capitalizeFirstLetter(tagType || '')} name`}
                    newTagTagline="Enter a tagline (slogan, acronym, English translation, ...)"
                    showTagTagline={shouldShowTagline(tagType?.toLowerCase())}
                  />
                  <button
                    onClick={() => handleRemoveAffiliation(index)}
                    className={classNames(style.affiliationRemove, '')}
                    key={`affiliation-remove-${affilitiation.name}-${index}`}
                  >
                    <SpriteSvg.EditCloseIcon
                      className="mb-0"
                      sizeW={20}
                      sizeH={20}
                      viewBox={'0 0 20 20'}
                      fill={'#fff'}
                      strokeWidth={0}
                      inline={true}
                    />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </ReactSortable>
    </section>
  );
};

export default AffiliationsComponent;
