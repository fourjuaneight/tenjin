/**
 * Convert array to object sorted by given key value.
 * @function
 *
 * @param   {array}  array raw data source
 * @param   {string} key   kay-value to re-organize by
 *
 * @returns {object} record by title key
 */
export const arrayToObject = (array: any[], key = 'title'): any => {
  const initialValue = {};

  return array.reduce(
    (obj, item) => ({
      ...obj,
      [item[key]]: item,
    }),
    initialValue
  );
};
