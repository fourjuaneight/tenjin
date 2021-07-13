/**
 * Counts the occurrences of a substring in a given string.
 * @function
 *
 * @param {string} str string to search
 * @param {string} searchValue value to search for
 * @returns {number} found occurrences
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
