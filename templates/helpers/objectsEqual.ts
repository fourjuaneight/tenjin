/**
 * Determine param is an object.
 * @function
 *
 * @param   {object}  obj param to check against
 *
 * @returns {boolean} is param an object
 */
export const isObject = <T>(obj: T): boolean =>
  obj != null && typeof obj === "object";

/**
 * Determine if two objects are the same. Shallow check.
 * @function
 *
 * @param   {object}  obj1 main object to compare
 * @param   {object}  obj2 secondary object to compare
 *
 * @returns {boolean} are objects equal
 */
export const shallowCheck = <Obj1, Obj2>(obj1: Obj1, obj2: Obj2): boolean => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
};

/**
 * Determine if two objects are the same. Deep check.
 * @function
 *
 * @param   {object}  obj1 main object to compare
 * @param   {object}  obj2 secondary object to compare
 *
 * @returns {boolean} are objects equal
 */
export const deepCheck = <Obj1, Obj2>(obj1: Obj1, obj2: Obj2): boolean => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];
    const areObjs = isObj(val1) && isObj(val2);

    if ((areObjs && !deep(val1, val2)) || (!areObjs && val1 !== val2)) {
      return false;
    }
  }

  return true;
};
