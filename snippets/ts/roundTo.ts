/**
 * Safe number trimming. toFixed alternative, which will round up or down for you depending on the values beyond 2 decimals.
 * @function
 *
 * @param   {number} num number to trim
 * @param   {number} dig amount of digits trimmed to
 *
 * @return  {number} trimmed value
 */
const roundTo = (num: number, dig: number): number => {
  let negative: boolean = false;
  let number: number | string = num;
  let digits: number = dig;

  if (dig === undefined) {
    digits = 0;
  }

  if (num < 0) {
    negative = true;
    number *= -1;
  }

  const multiplicator: number = 10 ** digits;
  number = parseFloat((number * multiplicator).toFixed(11));
  number = (Math.round(number) / multiplicator).toFixed(digits);

  if (negative) {
    number = (number * -1).toFixed(digits);
  }

  return parseFloat(number);
};

export default roundTo;
