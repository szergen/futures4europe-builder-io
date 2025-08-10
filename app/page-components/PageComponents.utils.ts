import { media as wixMedia } from '@wix/sdk';

export function getImageUrlForMedia(
  media?: string
  // width: number,
  // height: number
): string | any {
  // TODO: @ALEX
  if (typeof media === 'string' && media && media.startsWith('wix:image')) {
    return wixMedia.getImageUrl(media);
    // return wixMedia.getScaledToFillImageUrl(media, width, height, {});
  } else {
    return media;
  }
}

const sanitizeTitleForSlug = (title: string): string => {
  return title
    ?.toLowerCase() // Convert to lowercase
    ?.replace(/ /g, '-') // Replace spaces with hyphens
    ?.replace(/[^a-z0-9-]/g, '') // Remove non-alphanumeric characters except hyphens
    ?.replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
};

function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object' ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

function arraysEqual(arr1: any[], arr2: any[]): boolean {
  if (!arr1 || !arr2) return false;
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1?.length; i++) {
    if (!deepEqual(arr1[i], arr2[i])) {
      return false;
    }
  }

  return true;
}

export { deepEqual, arraysEqual, sanitizeTitleForSlug };
