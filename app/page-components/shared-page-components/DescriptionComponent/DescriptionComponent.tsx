import Image from 'next/image';
import classNames from 'classnames';
import { use, useEffect, useState } from 'react';
import RTEComponent from '@app/shared-components/RTEComponent/RTEComponent';

export type DescriptionComponentProps = {
  description: string;
  isEditModeOn?: boolean;
  placeholder?: string; // Added new prop
  handleUpdate?: (value: string) => void;
};

const DescriptionComponent: React.FC<DescriptionComponentProps> = ({
  description: initialDescription,
  isEditModeOn,
  placeholder,
  handleUpdate,
}) => {
  const [contentText, setContentText] = useState(initialDescription);

  const handleUpdateDescription = (value: any) => {
    setContentText(value);
    handleUpdate && handleUpdate(value);
  };

  useEffect(() => {
    setContentText(initialDescription);
  }, [initialDescription]);

  return (
    <div>
      {!isEditModeOn ? (
        <div
          className={classNames('personDescriptionText')}
          dangerouslySetInnerHTML={{
            __html: contentText,
          }}
        ></div>
      ) : (
        <RTEComponent
          placeholder={placeholder}
          content={contentText}
          updatePostData={(value) => handleUpdateDescription(value)}
        />
      )}
    </div>
  );
};

export default DescriptionComponent;
