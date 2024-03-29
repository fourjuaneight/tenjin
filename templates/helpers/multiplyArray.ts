/**
 * Copy array by given n times.
 * @function
 *
 * @param   {array} arr data to multiply
 * @param   {number} copies number of copies
 *
 * @returns {array} array with copies of data
 */
export const multiplyArray = <T>(arr: T[], copies: number): T[] => {
  const array: any[] = Array(copies)
    .fill(0)
    .map(() => Object.assign({}, arr));

  return array;
};
