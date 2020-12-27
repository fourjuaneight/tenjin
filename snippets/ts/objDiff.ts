import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import transform from 'lodash/transform';

/**
 * Deep diff between two object, using lodash.
 * @function
 *
 * @param  {any} data object compared
 * @param  {any} base object to compare with
 *
 * @return {any}      data object representing diff
 */
export const difference = (data: any, base: any): any =>
  transform(data, (result, value, key) => {
    if (!isEqual(value, base[key])) {
      // eslint-disable-next-line no-param-reassign
      result[key] =
        isObject(value) && isObject(base[key])
          ? difference(value, base[key])
          : value;
    }
  });

/**
 * Stringify and format compared data for GQL schema mutation.
 * @function
 *
 * @param  {any}    data new data object
 *
 * @return {string}      schema string
 */
export const schema = (data: any): string =>
  JSON.stringify(data).replace(/"([a-zA-Z_]+)":/g, '$1:');
