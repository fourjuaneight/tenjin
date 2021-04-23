/**
 * Is given value between provided range.
 * @function
 *
 * @param   {number}  num evaluating value
 * @param   {number}  min starting value
 * @param   {number}  max ending value
 *
 * @returns {boolean} is given value in the range
 */
const withinRange = (num: number, min: number, max: number): boolean =>
  num >= min && num <= max;

export default withinRange;
