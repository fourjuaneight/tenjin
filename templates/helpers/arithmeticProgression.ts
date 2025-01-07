/**
 * Creates an array of numbers in the arithmetic progression, starting with the given positive integer and up to the specified limit.
 */
export const arithmeticProgression = (
  number: number,
  limit: number
): number[] =>
  Array.from(
    // create an array of the desired length
    { length: Math.ceil(limit / number) },
    // fill it with the desired values in the given range
    (_, index) => (index + 1) * number
  );
