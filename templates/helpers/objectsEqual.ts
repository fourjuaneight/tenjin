/**
 * Determines if the given parameter is an object.
 */
export const isObject = <T>(obj: T): boolean =>
  obj != null && typeof obj === "object";

/**
 * Determine if two objects are the same. Shallow check.
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
