/**
 * Checks if the given value is an integer.
 */
export const isInteger = (val: string): boolean => {
  if (isNaN(val as unknown as number)) {
    return false;
  }

  let x = parseFloat(val);

  return (x | 0) === x;
};
