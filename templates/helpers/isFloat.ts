/**
 * Checks if the given value is a float.
 * @function
 *
 * @param val - possible float
 * @returns {boolean} - true if value is float
 */
export const isFloat = (val: string): boolean => {
  let newVal: any = val;
  newVal = parseFloat(val);

  return !isNaN(newVal);
};
