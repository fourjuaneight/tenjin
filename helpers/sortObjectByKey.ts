/**
 * Sort object by key.
 * @function
 *
 * @param   {object} obj object to sort
 * @param   {string} key key to sort by
 *
 * @returns {object} sorted object
 */
export const sortObjectByKey = <Type extends unkown>(
  obj: Type,
  key: string
): Type => {
  const sorted = obj.sort((a, b) => {
    const x = a[key];
    const y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });

  return sorted;
};
