/**
 * Generate array of numbers based on given range.
 */
export const numbRange = (length: number, startPoint?: number = 1) =>
  Array(length)
    .fill(startPoint)
    .map((x: number, y: number) => x + y);
