import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';
import style from './DisplayProjectResultMedia.module.css';
import { FaPlay } from 'react-icons/fa';
import Link from 'next/link';
// import * as pdfjsLib from 'pdfjs-dist';
// import 'pdfjs-dist/build/pdf.worker.mjs';

interface DisplayProjectResultMediaProps {
  projectResultMedia: {
    url: string;
    displayName: string;
    fileName: string;
    sizeInBytes: string;
    type: string;
    thumbnail: string;
  };
}

const DisplayProjectResultMedia: React.FC<DisplayProjectResultMediaProps> = ({
  projectResultMedia,
}) => {
  // const canvasRef = useRef(null);

  // useEffect(() => {
  //   const loadPdf = async () => {
  //     pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.js'; // Ensure this path is correct

  //     const loadingTask = pdfjsLib.getDocument({
  //       url: projectResultMedia.url,
  //     });
  //     const pdf = await loadingTask.promise;
  //     const page = await pdf.getPage(1);
  //     const test = page.view;
  //     console.log('test', test);
  //     console.log('debug2->page', page);
  //     console.log('debug2->pdf', pdf);

  //     const viewport = page.getViewport({ scale: 1 / 2, offsetX: -10 });
  //     const canvas = canvasRef.current;
  //     const context = canvas.getContext('2d');
  //     canvas.height = viewport.height;
  //     canvas.width = viewport.width;

  //     const renderContext = {
  //       canvasContext: context,
  //       viewport: viewport,
  //     };

  //     await page.render(renderContext).promise;

  //     // Create the image from the canvas
  //     const testImage = canvas.toDataURL('image/jpeg');
  //     // Transform the image to a blob
  //     const byteString = atob(testImage.split(',')[1]);
  //     const mimeString = testImage.split(',')[0].split(':')[1].split(';')[0];
  //     const ab = new ArrayBuffer(byteString.length);
  //     const ia = new Uint8Array(ab);
  //     for (let i = 0; i < byteString.length; i++) {
  //       ia[i] = byteString.charCodeAt(i);
  //     }
  //     const fileToUpload = new Blob([ab], { type: mimeString });
  //     // Create a new file from the blob
  //     const newFile = new File([fileToUpload], 'thumbnail.jpeg', {
  //       type: mimeString,
  //     });
  //     // Upload the file to Wix
  //     const composeFilePath = `/PostPages_Images/thumbnails/`;
  //     // const uploadedFileResponse = await uploadFileToWix(
  //     //   newFile,
  //     //   composeFilePath
  //     // );
  //     // console.log('uploadedFileResponse', uploadedFileResponse);
  //   };

  //   loadPdf();
  // }, []);

  return (
    <div className="relative group">
      {projectResultMedia.type === 'document' ? (
        <Image
          src={projectResultMedia.thumbnail}
          width={247}
          height={368}
          className={classNames(style.projectResultImage)}
          alt={`Project Result Preview - ${projectResultMedia.displayName}`}
        />
      ) : (
        <Link href={projectResultMedia.url} target="_blank">
          <div className="relative rounded-xl overflow-hidden">
            <Image
              src={projectResultMedia.thumbnail}
              width={247}
              height={368}
              className={classNames(
                style.projectResultImage,
                style.videoImage,
                'blur-[2px] transition-all duration-300 ease-in-out group-hover:blur-none group-hover:scale-110'
              )}
              alt={`Project Result Preview - ${projectResultMedia.displayName}`}
            />
            {/* Dark overlay with 80% opacity that disappears on hover */}
            <div className="absolute inset-0 bg-black/80 z-10 transition-opacity duration-300 ease-in-out group-hover:opacity-0"></div>

            {/* Play button with hover animation */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <FaPlay
                size={48}
                className="text-secondary-site/80 transform transition duration-300 ease-in-out group-hover:scale-110 group-hover:text-secondary-site"
              />
            </div>
          </div>
        </Link>
      )}
      {/* <canvas className={classNames('hidden')} ref={canvasRef}></canvas> */}
    </div>
  );
};

export default DisplayProjectResultMedia;
