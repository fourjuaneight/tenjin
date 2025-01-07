/**
 * Counts the occurrences of a substring in a given string.
 */
export const countSubstrings = (str: string, searchValue: string): number => {
  let count = 0;
  let index = 0;

  while (true) {
    // look for searchValue in str
    const round = str.indexOf(searchValue, index);

    if (round !== -1) {
      // increment if the value is found and update the inde
      [count, index] = [count + 1, round + 1];
    } else {
      return count;
    }
  }
};
