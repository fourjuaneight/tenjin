/**
 * Checks if the given value is an integer.
 * @function
 *
 * @param {string} val - possible integer
 * @returns {boolean} - true if value is integer
 */
export const isInteger = (val: string): boolean => {
  if (isNaN(val as unknown as number)) {
    return false;
  }

  let x = parseFloat(val);

  return (x | 0) === x;
};
