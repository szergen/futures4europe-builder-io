import { media as wixMedia } from '@wix/sdk';
import Image, { ImageProps } from 'next/image';
import { PLACEHOLDER_IMAGE } from '@app/constants';

function getImageUrlForMedia(media: string, width: number, height: number) {
  if (media.startsWith('wix:image')) {
    return wixMedia.getScaledToFillImageUrl(media, width, height, {});
  } else {
    return media;
  }
}

export type WixMediaImageProps = {
  media: string;
  height?: number;
  width?: number;
  alt?: string;
  className?: string;
  sizes?: string;
  objectFit?: 'cover' | 'contain';
  disableZoom?: boolean;
};

export function WixMediaImage({
  media,
  height = 320,
  width = 640,
  alt = 'no info available for image',
  className,
  sizes = '10vw',
  objectFit,
  disableZoom = false,
}: WixMediaImageProps) {
  const imageUrl = media
    ? getImageUrlForMedia(media || '', width, height)
    : PLACEHOLDER_IMAGE;

  const styleProps: Partial<ImageProps> = {
    ...(objectFit
      ? { style: { objectFit }, fill: true, sizes }
      : { width, height }),
  };

  return (
    <div className={`flex justify-center`}>
      <div className="overflow-hidden relative group">
        <Image
          {...styleProps}
          src={imageUrl}
          alt={alt}
          className={`${
            !disableZoom ? 'group-hover:scale-110' : ''
          } transition duration-300 ease-in-out ${className}`}
        />
      </div>
    </div>
  );
}
export default WixMediaImage;
