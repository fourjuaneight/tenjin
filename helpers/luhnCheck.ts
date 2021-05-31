/**
 * Implementation of the Luhn Algorithm used to validate a variety of identification numbers, such as credit card numbers, IMEI numbers, National Provider Identifier numbers etc.
 * @function
 *
 * @param {number | string} num
 * @returns {boolean} true if sum is divisible by 10, false otherwise
 */
const luhnCheck = (num: number | string): boolean => {
  // obtain array of digits
  let arr = (num + "")
    .split("")
    .reverse()
    .map((x) => parseInt(x));
  // obtain last digit
  let lastDigit = arr.splice(0, 1)[0];
  // implement algorith
  let sum = arr.reduce(
    (acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9),
    0
  );

  sum += lastDigit;

  return sum % 10 === 0;
};

export luhnCheck;
