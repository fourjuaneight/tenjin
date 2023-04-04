import { deepCheck } from './objectsEqual';

/**
 * Determine if object is found in given array.
 * @function
 *
 * @param   {array}   arr array to lookup against
 * @param   {object}  obj object to search for
 *
 * @returns {boolean} is obj in array
 */
export const arrayContainsObject = <A, O>(arr: A[], obj: O): boolean =>
  arr.some((elem) => deepCheck(elem, obj));
