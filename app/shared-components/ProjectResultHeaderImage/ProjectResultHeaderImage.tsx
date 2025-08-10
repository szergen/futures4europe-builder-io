import React, { useEffect, useState } from 'react';
import ProjectResultFileUploader from '../ProjectResultFileUploader/ProjectResultFileUploader';
import ProjectResultVideoImage from '../ProjectResultVideoImage/ProjectResultVideoImage';
import style from '@app/page-components/shared-page-components/FilesComponent/FilesComponent.module.css';
import classNames from 'classnames';

type ProjectResultHeaderImageProps = {
  currentImage?: string;
  resultType?: string;
  updatePostData?: (value: any) => void;
  updatePostDataForVideoImage?: (value: any) => void;
  fileIdPrefix?: string;
};

const ProjectResultHeaderImage: React.FC<ProjectResultHeaderImageProps> = ({
  currentImage,
  resultType,
  updatePostData,
  updatePostDataForVideoImage,
  fileIdPrefix,
}) => {
  const [selectedOption, setSelectedOption] = useState('file');
  const findActiveOption = (image: string) => {
    image?.includes('youtube')
      ? setSelectedOption('video')
      : setSelectedOption('file');
  };

  useEffect(() => {
    if (currentImage) {
      findActiveOption(currentImage);
    }
  }, [currentImage]);

  return (
    <div key={'ProjectResultHeaderImage' + fileIdPrefix}>
      <div className="flex mb-2">
        <div
          className={classNames(
            style.checkboxes__item,
            'flex items-center justify-center mr-4'
          )}
        >
          <label
            className={classNames(style.checkbox, style.style_c)}
            htmlFor={'file-option' + fileIdPrefix}
          >
            <input
              id={'file-option' + fileIdPrefix}
              name={'file-option' + fileIdPrefix}
              type="radio"
              value="file"
              checked={selectedOption === 'file'}
              onChange={() => setSelectedOption('file')}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />

            <div className={classNames(style.checkbox__checkmark)}></div>
            <div className={classNames(style.checkbox__body)}>PDF</div>
          </label>
        </div>
        <div className={classNames(style.checkboxes__item)}>
          <label
            className={classNames(style.checkbox, style.style_c)}
            htmlFor={'video-option' + fileIdPrefix}
          >
            <input
              id={'video-option' + fileIdPrefix}
              name={'video-option' + fileIdPrefix}
              type="radio"
              value="video"
              checked={selectedOption === 'video'}
              onChange={() => setSelectedOption('video')}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <div className={classNames(style.checkbox__checkmark)}></div>
            <div className={classNames(style.checkbox__body)}>Video</div>
          </label>
        </div>
      </div>
      {selectedOption === 'file' ? (
        <ProjectResultFileUploader
          currentImage={resultType === 'document' ? currentImage : undefined}
          updatePostData={updatePostData ? updatePostData : undefined}
          fileIdPrefix={fileIdPrefix}
        />
      ) : (
        <ProjectResultVideoImage
          currentImage={resultType !== 'document' ? currentImage : undefined}
          updatePostDataForVideoImage={
            updatePostDataForVideoImage
              ? updatePostDataForVideoImage
              : undefined
          }
        />
      )}
    </div>
  );
};

export default ProjectResultHeaderImage;
