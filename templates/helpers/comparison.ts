/**
 * Default comparison function. It just assumes that "a" and "b" are strings or numbers.
 */
export const compare = (a: string | number, b: string | number): number => {
  if (a === b) {
    return 0;
  }

  return a < b ? -1 : 1;
};

/**
 * Checks if two variables are equal.
 */
export const equal = <A, B>(a: A, b: B): boolean => compare(a, b) === 0;

/**
 * Checks if variable "a" is less than "b".
 */
export const lessThan = <A, B>(a: A, b: B): boolean => compare(a, b) < 0;

/**
 * Checks if variable "a" is less than or equal to "b".
 */
export const lessThanOrEqual = <A, B>(a: A, b: B): boolean =>
  lessThan(a, b) || equal(a, b);

/**
 * Checks if variable "a" is greater than "b".
 */
export const greaterThan = <A, B>(a: A, b: B): boolean => compare(a, b) > 0;

/**
 * Checks if variable "a" is greater than or equal to "b".
 */
export const greaterThanOrEqual = <A, B>(a: A, b: B): boolean =>
  greaterThan(a, b) || equal(a, b);
