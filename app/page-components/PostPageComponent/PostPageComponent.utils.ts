// Helper function to format the date
export const formatDate = (dateStr: string) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const daySuffix = ((day) => {
    if (day % 100 >= 11 && day % 100 <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  })(day);

  return `${day}${daySuffix} of ${month} ${year}`;
};

export const checkIfArrayNeedsUpdateForTags = (
  newArray: any[],
  oldArray: any[]
) => {
  if (!newArray || !oldArray) {
    return true;
  }
  if (newArray.length !== oldArray.length) {
    return true;
  }
  for (let i = 0; i < newArray?.length; i++) {
    if (newArray[i]?._id !== oldArray[i]?._id) {
      return true;
    }
  }
  return false;
};

// Compare 2 arrays strings
export const checkIfArrayNeedsUpdateForStrings = (a: any[], b: any[]) => {
  if (a === b) return false;
  if (a == null || b == null) return true;
  if (a.length !== b.length) return true;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return true;
  }

  return false;
};

export const generateUniqueHash = () => {
  return Math.random().toString(36).substring(2, 7);
};

export function areArraysEqualForMediaFiles(arr1: any[], arr2: any[]): boolean {
  if ((!arr1 && arr2) || (!arr2 && arr1)) {
    return false;
  }

  if (arr1?.length !== arr2?.length) {
    return false;
  }

  for (let i = 0; i < arr1?.length; i++) {
    const obj1 = arr1[i];
    const obj2 = arr2[i];

    if (
      obj1?.displayName !== obj2?.displayName ||
      obj1?.url !== obj2?.url ||
      obj1?.fileName !== obj2?.fileName ||
      obj1?.thumbnail !== obj2?.thumbnail ||
      obj1?.sizeInBytes !== obj2?.sizeInBytes ||
      obj1?.type !== obj2?.type
    ) {
      return false;
    }
  }

  return true;
}

export default {
  formatDate,
  checkIfArrayNeedsUpdateForTags,
  generateUniqueHash,
  areArraysEqualForMediaFiles,
};
