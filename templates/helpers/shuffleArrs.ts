/**
 * Randomizes the order of the values of an array, returning a new array.
 * Uses Fisher-Yates algorithm: https://w.wiki/8Zj
 */
export const shuffleArrs = <Type>([...arr]: T[]) => {
  let match = arr.length;

  while (match) {
    const index = Math.floor(Math.random() * match--);

    [arr[match], arr[index]] = [arr[index], arr[match]];
  }

  return arr;
};
