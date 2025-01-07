import { deepCheck } from './objectsEqual';

/**
 * Determine if object is found in given array.
 */
export const arrayContainsObject = <A, O>(arr: A[], obj: O): boolean =>
  arr.some((elem) => deepCheck(elem, obj));
