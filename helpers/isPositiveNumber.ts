/**
 * Checks if the given value is a positive number.
 * @summary !isNaN(parseFloat(val)) is used to filter pure string values
 * @summary ~~val >= 0 filters negative and large non-number values
 * @summary (!isNaN(parseFloat(val)) && ~~val >= 0) returns true if value is both numeric and positive
 * @summary val % (...) === 0 checks if value is non-float
 * @function
 *
 * @param val - possible positive number
 * @returns {boolean} - true if value is positive number
 */
export const isPositiveNumber = (val: string): boolean =>
  val % (!isNaN(parseFloat(val)) && ~~val >= 0) === 0;
