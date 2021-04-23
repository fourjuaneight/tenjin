// Utils
const equal = (a: any, b: any): boolean => compare(a, b) === 0;

/**
 * Linear search implementation.
 * @function
 *
 * @param  {*[]}      array
 * @param  {*}        seekElement
 *
 * @return {number[]}
 */
const linearSearch = (array: any[], seekElement: object): number[] => {
  const foundIndices: any[] = [];

  array.forEach((element, index) => {
    if (equal(element, seekElement)) {
      foundIndices.push(index);
    }
  });

  return foundIndices;
};

export default linearSearch;
