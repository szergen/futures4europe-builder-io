import Image from 'next/image';
import { uploadFileToWix } from '@app/wixUtils/client.utils';
import { Alert, FileInput, Label, Spinner } from 'flowbite-react';
import { useRef, useState } from 'react';
import { HiInformationCircle } from 'react-icons/hi';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.mjs';
import classNames from 'classnames';
import { useAuth } from '@app/custom-hooks/AuthContext/AuthContext';
import style from './ProjectResultFileUploader.module.css';

export type ProjectResultFileUploaderProps = {
  currentImage?: string;
  updatePostData?: (value: any) => void;
  fileIdPrefix?: string;
};

const ProjectResultFileUploader: React.FC<ProjectResultFileUploaderProps> = ({
  currentImage,
  updatePostData,
  fileIdPrefix,
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isValidState, setIsValidState] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [imageURL, setImageURL] = useState(currentImage || '');
  const [isFileLoading, setIsFileLoading] = useState(false);

  const { userDetails, setIsLoadingInProgress } = useAuth();
  const composeFilePath = `/PostPages_Results/${
    userDetails?.contactId || 'visitors'
  }/`;

  // Needed for PDF to image conversion
  const canvasRef = useRef(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    setIsLoadingInProgress(true);
    console.log('debug2->file', file);
    if (file && file.type !== 'application/pdf') {
      setErrorMessage('File is not a PDF. Please try again.');
      setIsValidState(false);
      event.target.value = ''; // clear the selected file
      setIsLoadingInProgress(false);
      return;
    }
    if (file && file.size > 30 * 1024 * 1024) {
      setIsValidState(false);
      event.target.value = ''; // clear the selected file
      setIsLoadingInProgress(false);
      return;
    } else {
      // Upload file to Wix
      setIsValidState(true);
      setUploadedFile(file as File);
      console.log('File selected:', file);
      setIsFileLoading(true);
      const uploadedFileResponse = await uploadFileToWix(file, composeFilePath);
      console.log('uploadedFileResponse', uploadedFileResponse);
      const uploadedFileURL = uploadedFileResponse?.url;

      // #region Convert PDF to image

      pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

      const loadingTask = pdfjsLib.getDocument({
        url: uploadedFileURL,
      });
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 1 / 2, offsetX: -10 });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;

      // Create the image from the canvas
      const testImage = canvas.toDataURL('image/jpeg');
      // Transform the image to a blob
      const byteString = atob(testImage.split(',')[1]);
      const mimeString = testImage.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const fileToUpload = new Blob([ab], { type: mimeString });
      // Create a new file from the blob
      const uploadedFileResponseDisplayName =
        uploadedFileResponse.displayName.split('.')[0] + '.jpeg';
      const newFile = new File(
        [fileToUpload],
        uploadedFileResponseDisplayName,
        {
          type: mimeString,
        }
      );
      // Upload the file to Wix
      console.log('Uploading generated Image from PDF to Wix');
      const composeFilePathForThumbnail = `/PostPages_Images/thumbnails/${
        userDetails?.contactId || 'visitors'
      }/`;
      const uploadedThumbnailResponse = await uploadFileToWix(
        newFile,
        composeFilePathForThumbnail
      );
      console.log('uploadedFileResponse for Image', uploadedThumbnailResponse);

      // #endregion

      setImageURL(uploadedThumbnailResponse?.url);
      setIsFileLoading(false);
      updatePostData &&
        updatePostData({
          thumbnail: uploadedThumbnailResponse?.url,
          sizeInBytes: uploadedFileResponse?.sizeInBytes,
          url: uploadedFileURL,
          fileName: uploadedFileResponse?.displayName,
          type: 'document',
        });
    }
    setIsLoadingInProgress(false);
  };

  return (
    <div className="flex flex-wrap items-center justify-center w-64 mr-6">
      <Label
        htmlFor={`dropzone-file-${fileIdPrefix}`}
        className={classNames(
          'relative flex flex-col h-60 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600',
          imageURL && 'h-12 flex-row'
        )}
      >
        <div
          className={classNames(
            'flex items-center   border-dashed border-gray-300 dark:border-gray-600',
            !imageURL && 'border-b-2 mb-4 p-4',
            imageURL && 'border-r-2 mb-0 mx-1 px-1'
          )}
        >
          {!imageURL || imageURL === ' ' ? 'PDF' : 'Replace'}
        </div>
        <div
          className={classNames(
            'text-sm text-gray-500 dark:text-gray-400 flex items-center ',
            !imageURL && 'flex-col p-4',
            imageURL && 'flex-row p-0'
          )}
        >
          <svg
            className={classNames(
              'h-10 w-10 text-gray-500 dark:text-gray-400  mr-4 p-2 rounded-lg',
              imageURL && 'mr-2 p-0'
            )}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <div>Click to upload or drag and drop</div>
        </div>

        <FileInput
          id={`dropzone-file-${fileIdPrefix}`}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />
      </Label>
      <p className="text-xs w-full text-gray-500 dark:text-gray-400">
        {uploadedFile?.name || 'No file selected'}
      </p>
      <p className="text-xs w-full text-gray-500 dark:text-gray-400">
        PDF (MAX. 30MB)
      </p>
      {!isValidState && (
        <Alert color="failure" icon={HiInformationCircle} className="my-2">
          <span className="font-small">
            {errorMessage || 'File is larger than 30MB. Please try again.'}
          </span>
        </Alert>
      )}
      {imageURL && imageURL !== '' && imageURL !== ' ' && (
        <div className="relative">
          <Image
            src={imageURL}
            width={247}
            height={368}
            className={classNames(style.projectResultImage)}
            alt={`Project Result Preview`}
          />
          {isFileLoading && (
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
      {isFileLoading && (!imageURL || imageURL === ' ') && (
        <div className="flex items-center justify-center w-full h-32">
          <Spinner size="xl" />
        </div>
      )}
      <canvas className={classNames('hidden')} ref={canvasRef}></canvas>
    </div>
  );
};

export default ProjectResultFileUploader;
