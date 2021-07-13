/**
 * Convert float to USD.
 * @function
 *
 * @param   {number} value float number value
 *
 * @returns {string} USD formatted string
 */
export const floatToUSD = (value: number): string => {
  const options = {
    style: "currency",
    currency: "USD",
  };
  const numFmt = new Intl.NumberFormat("en-US", options);
  const usd = numFmt.format(value);

  return usd;
};
