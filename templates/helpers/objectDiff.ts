import { difference, isEqual, isObject, transform } from "lodash";

/**
 * Deep diff between two object, using lodash.
 */
export const objectDiff = <T>(data: T, base: T): T =>
  transform(data, (result, value, key) => {
    if (!isEqual(value, base[key])) {
      // eslint-disable-next-line no-param-reassign
      result[key] =
        isObject(value) && isObject(base[key])
          ? difference(value, base[key])
          : value;
    }
  });
