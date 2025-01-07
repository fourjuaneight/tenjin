/**
 * Determines if the given value between provided range.
 */
export const withinRange = (num: number, min: number, max: number): boolean =>
  num >= min && num <= max;
