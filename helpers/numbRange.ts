/**
 * Generate array of numbers based on given range.
 * @function
 *
 * @param  {number} length amount of numbers to generate
 * @param  {[number]} start starting point for count
 *
 * @return {number[]} array of numbers
 */
export const numbRange = (length: number, start?: number = 1) =>
  Array(length)
    .fill(start)
    .map((x: number, y: number) => x + y);
