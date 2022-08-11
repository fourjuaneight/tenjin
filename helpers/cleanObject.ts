/**
 * Remove null or undefined values from an object.
 * @function
 *
 * @param {*} obj entry object to cleanup
 * @returns clean object
 */
export const cleanObject = <Type extends unkown>(obj: any): Type =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, val]) => val !== null && val !== undefined)
  );
