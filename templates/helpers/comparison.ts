/**
 * Default comparison function. It just assumes that "a" and "b" are strings or numbers.
 * @function
 *
 * @param   {(string|number)} a
 * @param   {(string|number)} b
 *
 * @returns {number}
 */
export const compare = (a: string | number, b: string | number): number => {
  if (a === b) {
    return 0;
  }

  return a < b ? -1 : 1;
};

/**
 * Checks if two variables are equal.
 * @function
 *
 * @param  {*} a
 * @param  {*} b
 *
 * @return {boolean}
 */
export const equal = (a: any, b: any): boolean => compare(a, b) === 0;

/**
 * Checks if variable "a" is less than "b".
 * @function
 *
 * @param  {*} a
 * @param  {*} b
 *
 * @return {boolean}
 */
export const lessThan = (a: any, b: any): boolean => compare(a, b) < 0;

/**
 * Checks if variable "a" is less than or equal to "b".
 * @function
 *
 * @param  {*} a
 * @param  {*} b
 *
 * @return {boolean}
 */
export const lessThanOrEqual = (a: any, b: any): boolean =>
  lessThan(a, b) || equal(a, b);

/**
 * Checks if variable "a" is greater than "b".
 * @function
 *
 * @param  {*} a
 * @param  {*} b
 *
 * @return {boolean}
 */
export const greaterThan = (a: any, b: any): boolean => compare(a, b) > 0;

/**
 * Checks if variable "a" is greater than or equal to "b".
 * @function
 *
 * @param  {*} a
 * @param  {*} b
 *
 * @return {boolean}
 */
export const greaterThanOrEqual = (a: any, b: any): boolean =>
  greaterThan(a, b) || equal(a, b);
