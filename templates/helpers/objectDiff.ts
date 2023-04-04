import { difference, isEqual, isObject, transform } from "lodash";

/**
 * Deep diff between two object, using lodash.
 * @function
 *
 * @param  {any} data object compared
 * @param  {any} base object to compare with
 *
 * @return {any} data object representing diff
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
