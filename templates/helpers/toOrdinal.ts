/**
 * Number to ordinal string. It leverages JS's treatment of indices to an array. If you pass an array an index that's outside the range, it returns undefined, which is considered false.
 */
export const toOrdinal = (num: number): string => {
  const string = ['th', 'st', 'nd', 'rd'];
  // returns a negative number when its first operand (the dividend) is negative
  const value = num % 100;
  // returns the value of the first operand if it's true and the value of the second operand otherwise
  const type = string[(value - 20) % 10] || string[value] || string[0];

  return `${num}${type}`;
};
