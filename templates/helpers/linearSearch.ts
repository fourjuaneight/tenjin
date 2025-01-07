// Utils
const compare = (a: string | number, b: string | number): number => {
  if (a === b) return 0;

  return a < b ? -1 : 1;
};
const equal = (a: : string | number, b: : string | number): boolean => compare(a, b) === 0;

/**
 * Linear search implementation.
 */
export const linearSearch = <A>(array: A[], seekElement: : string | number): number[] => {
  const foundIndices: any[] = [];

  array.forEach((element, index) => {
    if (equal(element, seekElement)) {
      foundIndices.push(index);
    }
  });

  return foundIndices;
};
