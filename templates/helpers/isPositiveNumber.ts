/**
 * Checks if the given value is a positive number.
 * `!isNaN(parseFloat(val))` is used to filter pure string values.
 * `~~val >= 0` filters negative and large non-number values.
 * `(!isNaN(parseFloat(val)) && ~~val >= 0)` returns true if value is both numeric and positive.
 * `val % (...) === 0` checks if value is non-float.
 */
export const isPositiveNumber = (val: string): boolean =>
  val % (!isNaN(parseFloat(val)) && ~~val >= 0) === 0;
