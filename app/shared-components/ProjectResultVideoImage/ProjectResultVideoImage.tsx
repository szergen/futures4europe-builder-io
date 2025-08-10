import classNames from 'classnames';
import { Button, Label, Modal, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { getYouTubeThumbnail } from '@app/utils/page.utils';
import style from './ProjectResultVideoImage.module.css';

type ProjectResultVideoImageProps = {
  currentImage?: string;
  updatePostDataForVideoImage?: (value: any) => void;
};

const ProjectResultVideoImage: React.FC<ProjectResultVideoImageProps> = ({
  currentImage,
  updatePostDataForVideoImage,
}) => {
  const [imageURL, setImageURL] = useState<string | null>(currentImage || '');
  const [errorMessage, setErrorMessage] = useState('');

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleLabelClick = () => {
    setIsPopupVisible(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setErrorMessage('');
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Do something with the input value
    console.log(inputValue);
    const ytbImage = getYouTubeThumbnail(inputValue);
    if (ytbImage) {
      setImageURL(ytbImage);
      updatePostDataForVideoImage &&
        updatePostDataForVideoImage({
          thumbnail: ytbImage,
          url: inputValue,
        });
      setIsPopupVisible(false);
    } else {
      setErrorMessage('Invalid youtube link');
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center w-64">
      <Label
        className={classNames(
          'relative flex flex-col h-60 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600',
          imageURL && 'h-12 flex-row'
        )}
        onClick={handleLabelClick}
      >
        <div
          className={classNames(
            'flex items-center   border-dashed border-gray-300 dark:border-gray-600',
            !imageURL && 'border-b-2 mb-4 p-4',
            imageURL && 'border-r-2 mb-0 mx-1 px-1'
          )}
        >
          {!imageURL || imageURL === ' ' ? 'Add URL' : 'Replace URL'}
        </div>
        <div
          className={classNames(
            'text-sm text-gray-500 dark:text-gray-400 flex items-center ',
            !imageURL && 'flex-col p-4',
            imageURL && 'flex-row p-0'
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
            />
          </svg>

          <div>Click to add a video url</div>
        </div>
      </Label>
      {imageURL && imageURL !== '' && imageURL !== ' ' && (
        <div className="relative">
          <Image
            src={imageURL}
            width={247}
            height={368}
            alt={`Project Result Preview`}
            className={classNames(style.videoImage)}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <FaPlay size={48} className="text-white shadow-md" />
          </div>
        </div>
      )}
      {isPopupVisible && (
        <Modal show={isPopupVisible} onClose={() => setIsPopupVisible(false)}>
          <Modal.Header>Enter a youtube link</Modal.Header>
          <Modal.Body>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <Label htmlFor="videoUrl">Youtube URL</Label>
                <TextInput
                  id="videoUrl"
                  value={inputValue}
                  onChange={handleInputChange}
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                {errorMessage && (
                  <div className="text-red-500 mt-2">{errorMessage}</div>
                )}
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default ProjectResultVideoImage;
