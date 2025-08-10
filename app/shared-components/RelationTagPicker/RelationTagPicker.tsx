import React, { useState } from 'react';
import classNames from 'classnames';
import Tag from '../Tag/Tag';
import TagPicker from '../TagPicker/TagPicker';
import Button from '../Button/Button';

const date = new Date();
const formattedDate = date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
});

const mockedRelationTags = ['John Doe', 'Project Lead'];

export type RelationTagPickerProps = {
  className?: string;
};

export const RelationTagPicker: React.FC<RelationTagPickerProps> = ({
  className,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [personState, setPersonState] = useState(mockedRelationTags[0]);
  const [roleState, setRoleState] = useState(mockedRelationTags[1]);
  const [relationState, setRelationState] = useState(mockedRelationTags);

  const renderedTags = relationState
    .slice(0, 2)
    .map((tag) => <Tag key={tag} name={tag} />);

  return (
    <div
      className={classNames(
        'w-10/12 flex items-center justify-between',
        className
      )}
    >
      <div className="flex">
        {isEditMode ? (
          <>
            <TagPicker
              className="w-36"
              selectedValue={personState}
              onChange={setPersonState}
            />
            <TagPicker
              className="w-36"
              selectedValue={roleState}
              onChange={setRoleState}
            />
          </>
        ) : (
          <>
            <Tag name={personState} />
            <Tag name={roleState} />
          </>
        )}
      </div>
      <Button
        className={classNames('!mx-16 !w-32', isEditMode && '!bg-red-500')}
        onClick={() => setIsEditMode(!isEditMode)}
      >
        {isEditMode ? 'Save' : 'Edit'}
      </Button>
    </div>
  );
};
