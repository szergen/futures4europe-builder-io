import style from './FilesComponent.module.css';
import classNames from 'classnames';
import Image from 'next/image';
import Typography from '@app/shared-components/Typography/Typography';
import DisplayProjectResultMedia from '../DisplayProjectResultMedia/DisplayProjectResultMedia';
import ProjectResultHeaderImage from '@app/shared-components/ProjectResultHeaderImage/ProjectResultHeaderImage';
import { useEffect, useState } from 'react';
import InputText from '@app/shared-components/InputText/InputText';
import Button from '@app/shared-components/Button/Button';
import { Button as ButtonFlow, Badge } from 'flowbite-react';
import Link from 'next/link';
import SpriteSvg from '@app/shared-components/SpriteSvg/SpriteSvg';

export type FilesComponentProps = {
  isEditModeOn?: boolean;
  mediaFiles: Array<{
    url: string;
    displayName: string;
    fileName: string;
    sizeInBytes: string;
    type: string;
    thumbnail: string;
  }>;
  updatePostDataBasedOnKeyValue?: (key: string, value: any) => void;
};

const FilesComponent: React.FC<FilesComponentProps> = ({
  isEditModeOn,
  mediaFiles,
  updatePostDataBasedOnKeyValue,
}) => {
  const [currentFiles, setCurrentFiles] = useState(mediaFiles);
  const [deletingFileIndex, setDeletingFileIndex] = useState<number | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  // Local state - sincronizare
  useEffect(() => {
    setCurrentFiles(mediaFiles);
  }, [mediaFiles]);

  useEffect(() => {
    if (isEditModeOn) {
      const emptyImage = {
        thumbnail: '',
        type: '',
        displayName: '',
        url: '',
        fileName: '',
        sizeInBytes: '',
      };

      const files = currentFiles || [];
      const lastFile = files[files.length - 1];
      const isLastFileEmpty = lastFile && !lastFile.url;

      if (!isLastFileEmpty) {
        setCurrentFiles([...files, emptyImage]);
        updatePostDataBasedOnKeyValue &&
          updatePostDataBasedOnKeyValue('mediaFiles', [...files, emptyImage]);
      }
    }
    console.log('debug5->currentFiles', currentFiles);
  }, [isEditModeOn, currentFiles]);

  const handleDeleteFile = async (index: number) => {
    try {
      if (window.confirm('Are you sure you want to delete this file?')) {
        setDeletingFileIndex(index);
        setError(null);

        // Simulate an error for the first file (index 0)
        // if (index === 0) {
        //   throw new Error('Cannot delete the first file - demo error');
        // }

        const newMediaFiles = currentFiles.filter((_, i) => i !== index);
        // If we're deleting the last file and we're in edit mode, add an empty file slot
        if (isEditModeOn && newMediaFiles.length === 0) {
          const emptyImage = {
            thumbnail: '',
            type: '',
            displayName: '',
            url: '',
            fileName: '',
            sizeInBytes: '',
          };
          newMediaFiles.push(emptyImage);
        }
        setCurrentFiles(newMediaFiles);
        updatePostDataBasedOnKeyValue &&
          updatePostDataBasedOnKeyValue('mediaFiles', newMediaFiles);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to delete file. Please try again.'
      );
      console.error('Error deleting file:', err);
    } finally {
      setDeletingFileIndex(null);
    }
  };

  return (
    <section>
      {((currentFiles &&
        currentFiles?.length > 0 &&
        currentFiles[0].thumbnail) ||
        isEditModeOn) && (
        <Typography
          tag="h2"
          className={classNames('text-gray-800 w-full my-4', style.filesTitle)}
        >
          Files
        </Typography>
      )}

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex justify-between items-center"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-red-700 hover:text-red-900"
          >
            <span className="text-xl">&times;</span>
          </button>
        </div>
      )}

      <div className="flex flex-col">
        {currentFiles?.map((media, index) => (
          <div
            key={`${media?.thumbnail}-${index}`}
            className="flex flex-row mr-4 mb-10"
          >
            {!isEditModeOn ? (
              media.thumbnail && (
                <>
                  <DisplayProjectResultMedia
                    projectResultMedia={media || {}}
                    key={'files-component-' + index}
                  />
                  {media.type !== 'video' && (
                    <Link href={media.url} target="_blank">
                      <Button>
                        Download File (
                        {(Number(media.sizeInBytes) / 1024)
                          ?.toString()
                          ?.split('.')?.[0] + 'kb'}
                        ){' '}
                        <span className="rounded-lg bg-white text-blue-500 p-1 font-bold">
                          {media?.url?.split('.')?.pop()?.toUpperCase()}
                        </span>
                      </Button>
                    </Link>
                  )}
                </>
              )
            ) : (
              <ProjectResultHeaderImage
                key={'files-component-' + index}
                fileIdPrefix={'files-component-prefix-' + index}
                currentImage={media.thumbnail}
                resultType={media.type}
                updatePostData={(value) => {
                  let newMediaFiles = [...currentFiles];
                  newMediaFiles[index] = {
                    ...newMediaFiles[index],
                    thumbnail: value.thumbnail,
                    sizeInBytes: value.sizeInBytes,
                    url: value.url,
                    fileName: value.fileName,
                    type: value.type,
                  };
                  updatePostDataBasedOnKeyValue &&
                    updatePostDataBasedOnKeyValue('mediaFiles', newMediaFiles);
                  setCurrentFiles(newMediaFiles);
                }}
                updatePostDataForVideoImage={(value) => {
                  let newMediaFiles = [...currentFiles];
                  newMediaFiles[index] = {
                    ...newMediaFiles[index],
                    thumbnail: value.thumbnail,
                    sizeInBytes: '',
                    url: value.url,
                    fileName: '',
                    type: 'video',
                  };
                  updatePostDataBasedOnKeyValue &&
                    updatePostDataBasedOnKeyValue('mediaFiles', newMediaFiles);
                  setCurrentFiles(newMediaFiles);
                }}
              />
            )}
            {!isEditModeOn ? (
              <Typography tag="h3" className="text-gray-800 mt-2">
                {media?.displayName}
              </Typography>
            ) : (
              <>
                <InputText
                  className={style.fileTitle}
                  placeholder="Enter display name"
                  value={media.displayName || ''}
                  onChange={(e) => {
                    let newMediaFiles = [...currentFiles];
                    newMediaFiles[index] = {
                      ...newMediaFiles[index],
                      displayName: e.target.value,
                    };
                    setCurrentFiles(newMediaFiles);
                    updatePostDataBasedOnKeyValue &&
                      updatePostDataBasedOnKeyValue(
                        'mediaFiles',
                        newMediaFiles
                      );
                  }}
                />
                {/* Only show delete button if there's actually a file (has a URL) */}
                {media.url && (
                  <div className="flex items-start pt-4 pl-4">
                    <ButtonFlow
                      size="sm"
                      color="failure"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteFile(index);
                      }}
                      disabled={deletingFileIndex === index}
                      className="rounded-full p-2 h-8 w-8 flex items-center justify-center"
                    >
                      {deletingFileIndex === index ? (
                        <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent" />
                      ) : (
                        <SpriteSvg.AccountTrashIcon
                          sizeH={16}
                          sizeW={16}
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          strokeWidth={0}
                        />
                      )}
                    </ButtonFlow>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FilesComponent;
