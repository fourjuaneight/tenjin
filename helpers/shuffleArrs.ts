/**
 * Randomizes the order of the values of an array, returning a new array.
 * Uses Fisher-Yates algorithm.
 * @function
 *
 * @param {any[]} array
 * @returns {any[]} shuffled array
 */
export const shuffleArrs = ([...arr]: any[]) => {
  let match = arr.length;

  while (match) {
    const index = Math.floor(Math.random() * match--);

    [arr[match], arr[index]] = [arr[index], arr[match]];
  }

  return arr;
};
