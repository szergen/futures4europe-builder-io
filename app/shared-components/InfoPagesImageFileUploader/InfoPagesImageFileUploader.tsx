import Image from 'next/image';
import { uploadFileToWix } from '@app/wixUtils/client.utils';
import { Alert, FileInput, Label, Spinner, Toast } from 'flowbite-react';
import { useState, useRef, useEffect } from 'react';
import { getImageUrlForMedia } from '@app/page-components/PageComponents.utils';
import classNames from 'classnames';
import { useAuth } from '@app/custom-hooks/AuthContext/AuthContext';
import SpriteSvg from '@app/shared-components/SpriteSvg/SpriteSvg';
import style from './InfoPagesImageFileUploader.module.css';
import {
  Cropper,
  CircleStencil,
  ImageRestriction,
} from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';

export type FileUploaderProps = {
  currentImage?: string;
  updatePostData?: (value: string) => void;
};

const InfoPagesImageFileUploader: React.FC<FileUploaderProps> = ({
  currentImage,
  updatePostData,
}) => {
  const [isValidState, setIsValidState] = useState(true);
  const [imageURL, setImageURL] = useState(currentImage || '');
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [cropperImage, setCropperImage] = useState<string | null>(null);
  const [cropperRef, setCropperRef] = useState<any>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const errorTimeoutRef = useRef<NodeJS.Timeout>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastFileRef = useRef<string | null>(null);
  const { userDetails, updateUserDetails } = useAuth();

  const composeFilePath = `/InfoPages_Images/${
    userDetails?.contactId || 'visitors'
  }/`;

  // Reset file input when cropper is closed
  useEffect(() => {
    if (!showCropper && fileInputRef.current) {
      fileInputRef.current.value = '';
      lastFileRef.current = null;
    }
  }, [showCropper]);

  // Handle error auto-dismiss
  useEffect(() => {
    if (error) {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
      errorTimeoutRef.current = setTimeout(() => {
        setError(null);
      }, 4000);
    }
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, [error]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file) return;

    // Create a unique identifier for the file
    const fileIdentifier = `${file.name}-${file.size}-${file.lastModified}`;

    // Check if this is the same file
    if (fileIdentifier === lastFileRef.current) {
      // Reset the input and update the lastFileRef
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      lastFileRef.current = null;
      return;
    }

    // Update lastFileRef with current file
    lastFileRef.current = fileIdentifier;
    if (file.size > 5 * 1024 * 1024) {
      setIsValidState(false);
      setError('File size exceeds the limit of 5MB.');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      lastFileRef.current = null;
      return;
    }

    setIsValidState(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = () => {
      setCropperImage(reader.result as string);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    setShowCropper(false);
    setCropperImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    lastFileRef.current = null;
  };

  const handleCrop = async () => {
    if (cropperRef) {
      const canvas = cropperRef.getCanvas();
      if (canvas) {
        setIsCropping(true);
        setIsImageLoading(true);

        canvas.toBlob(async (blob: Blob) => {
          const fileName = `profile-image-${Date.now()}.jpg`;
          const croppedFile = new File([blob], fileName, {
            type: 'image/jpeg',
          });

          try {
            const uploadedFileResponse = await uploadFileToWix(
              croppedFile,
              composeFilePath
            );
            const uploadedUrl = uploadedFileResponse?.url;

            // Update the local state
            setImageURL(uploadedUrl);
            updatePostData && updatePostData(uploadedUrl);

            // Update the user context with the new image URL
            if (userDetails && updateUserDetails) {
              const updatedUserDetails = {
                ...userDetails,
                userTag: {
                  ...userDetails.userTag,
                  picture: uploadedUrl,
                },
              };
              updateUserDetails(updatedUserDetails);
            }
          } catch (error) {
            console.error('Error uploading cropped image:', error);
            setError('Failed to upload the cropped image.');
            setIsValidState(false);
          }

          setIsImageLoading(false);
          setShowCropper(false);
          setCropperImage(null);
          setIsCropping(false);
          lastFileRef.current = null;
        }, 'image/jpeg');
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center relative">
      <Label
        htmlFor="dropzone-file-avatar"
        className={classNames(
          style.avatarUpload,
          !imageURL && style.avatarUploadEpty
        )}
      >
        <div className="w-full h-full">
          <span className="top-10 relative">
            {!imageURL || imageURL === ' ' ? '' : ''}
          </span>
          {!imageURL ? (
            <SpriteSvg.AccountImageThumb
              className="text-site-black mb-6"
              sizeW={42}
              sizeH={42}
              fill={'var(--color-background-offline)'}
              viewBox={'0 0 19 19'}
              strokeWidth={0}
              inline={false}
            />
          ) : (
            <SpriteSvg.AccountEdit
              className="text-site-black mb-6 text-[var(--color-text-icon-error)]"
              sizeW={42}
              sizeH={42}
              viewBox={'0 0 24 24'}
              stroke={'var(--color-text-brand-tag)'}
              strokeWidth={2}
              inline={false}
            />
          )}
        </div>

        <FileInput
          id="dropzone-file-avatar"
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </Label>

      {/* {!isValidState && (
        <Alert color="failure" icon={HiInformationCircle} className="my-2">
          <span className="font-small">
            File is larger than 5MB. Please try again.
          </span>
        </Alert>
      )} */}

      {showCropper && cropperImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[99] flex items-center justify-center p-4">
          <div className="bg-white rounded-xxl px-8 py-4 w-full max-w-md">
            <div className="mb-6 mt-2">
              <h2 className="text-xl font-semibold">Crop profile image</h2>
              <p>Upload a good quality image for best results</p>
            </div>

            <div className="h-[400px] rounded-xxl mb-4">
              <Cropper
                src={cropperImage}
                className="h-full rounded-xl"
                backgroundClassName=""
                stencilComponent={CircleStencil}
                imageRestriction={ImageRestriction.fillArea}
                stencilProps={{
                  aspectRatio: 1,
                  grid: true,
                  movable: true,
                  resizable: true,
                  lines: {
                    color: 'rgba(255, 255, 255, 0.8)',
                    width: 1,
                    dashSegments: [5, 5],
                  },
                }}
                onUpdate={(cropper) => setCropperRef(cropper)}
              />
            </div>

            <div className="my-4 border-b border-gray-200"> </div>
            <div className="flex justify-between gap-2 mt-2 mb-4">
              <button onClick={handleCancel} className="btn btn-edit">
                Cancel
              </button>
              <button
                onClick={handleCrop}
                className={classNames(
                  'btn btn-save',
                  isCropping && 'hover:bg-purple-200'
                )}
                disabled={isCropping}
              >
                Save image
              </button>
            </div>
          </div>
        </div>
      )}

      {imageURL && imageURL !== ' ' && (
        <div
          className={classNames(
            style.AvatarImagine,
            'relative w-[147px] h-[147px]'
          )}
        >
          <Image
            src={
              getImageUrlForMedia(imageURL)?.url ||
              getImageUrlForMedia(imageURL) ||
              ''
            }
            width={147}
            height={147}
            className={classNames(
              'rounded-full block object-cover',
              isImageLoading && 'opacity-30'
            )}
            alt="Post Image"
          />
          {isImageLoading && (
            <div
              className={classNames(
                'absolute inset-0 flex items-center justify-center bg-opacity-50 rounded-md',
                style.existingImageSpinner
              )}
            >
              <Spinner size="xl" />
            </div>
          )}
        </div>
      )}

      {isImageLoading && (!imageURL || imageURL === ' ') && (
        <div className="flex items-center justify-center w-full h-32">
          <Spinner size="xl" />
        </div>
      )}

      {error && (
        <Toast
          className={classNames('fixed top-4 right-4 z-50', style.fadeInLeft)}
        >
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500">
            <SpriteSvg.AlertIcon
              viewBox="0 0 20 20"
              className={classNames(style.website)}
              sizeW={16}
              sizeH={16}
              fill={'red'}
              strokeWidth={0}
              inline={false}
            />
          </div>
          <div className="ml-3 text-sm font-normal">{error}</div>
          <Toast.Toggle onClick={() => setError(null)} />
        </Toast>
      )}
    </div>
  );
};

export default InfoPagesImageFileUploader;
