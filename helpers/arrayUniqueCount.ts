interface Aggregate {
  [key: string]: number;
}

/**
 * Aggregates unique values in an array.
 * @function
 *
 * @param {array} iterable array of items to count
 * @returns {object} object with unique items and their count
 */
export const countUnique = (iterable: string[]) =>
  iterable.reduce((acc: Aggregate, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

/**
 * Aggregates unique values in an array.
 * Sorted by count descending.
 * @function
 *
 * @param {array} iterable array of items to count
 * @returns {object} object with unique items and their count
 */
export const countUniqueSorted = (iterable: string[]) =>
  Object.entries(countUnique(iterable))
    .sort((a, b) => b[1] - a[1])
    .reduce((r: Aggregate, [k, v]) => ({ ...r, [k]: v }), {});
