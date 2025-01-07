/**
 * Checks if the given value is a float.
 */
export const isFloat = (val: string): boolean => {
  let newVal: any = val;
  newVal = parseFloat(val);

  return !isNaN(newVal);
};
