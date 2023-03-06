/**
 * Get the powerset of a given array of numbers.
 * @function
 *
 * @param {number[]} arr dataset
 * @returns {number[]][] | any[][]}
 */
export const powerset = (arr: number[]): number[][] | any[][] =>
  // iterate over elements and combine into an array containing all combinations
  arr.reduce((a, v) => a.concat(a.map((r) => [v].concat(r))), [[]]);
