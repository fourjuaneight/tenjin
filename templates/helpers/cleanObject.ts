/**
 * Remove null or undefined values from an object.
 */
export const cleanObject = <O, T>(obj: O): T =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, val]) => val !== null && val !== undefined)
  );
