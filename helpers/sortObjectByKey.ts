/**
 * Sort object by key.
 * @function
 *
 * @param   {object} obj object to sort
 * @param   {string} key key to sort by
 *
 * @returns {object} sorted object
 */
const sortObjectByKey = (obj: any, key: string): any => {
  const sorted = obj.sort((a, b) => {
    const x = a[key];
    const y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });

  return sorted;
};

export default sortObjectByKey;
