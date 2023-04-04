// Utils
const compare = (a: string | number, b: string | number): number => {
  if (a === b) return 0;

  return a < b ? -1 : 1;
};
const equal = (a: : string | number, b: : string | number): boolean => compare(a, b) === 0;
const lessThan = (a: : string | number, b: : string | number): boolean => compare(a, b) < 0;

/**
 * Binary search implementation.
 * @function
 *
 * @param  {*[]}    sortedArray
 * @param  {*}      seekElement
 *
 * @return {number}
 */
export const binarySearch = <A>(sortedArray: A[], seekElement: : string | number): number => {
  // These two indices will contain current array (sub-array) boundaries.
  let startIndex = 0;
  let endIndex = sortedArray.length - 1;

  // Let's continue to split array until boundaries are collapsed
  // and there is nothing to split anymore.
  while (startIndex <= endIndex) {
    // Let's calculate the index of the middle element.
    const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);

    // If we've found the element just return its position.
    if (equal(sortedArray[middleIndex], seekElement)) {
      return middleIndex;
    }

    // Decide which half to choose for seeking next: left or right one.
    if (lessThan(sortedArray[middleIndex], seekElement)) {
      // Go to the right half of the array.
      startIndex = middleIndex + 1;
    } else {
      // Go to the left half of the array.
      endIndex = middleIndex - 1;
    }
  }

  // Return -1 if we have not found anything.
  return -1;
};
