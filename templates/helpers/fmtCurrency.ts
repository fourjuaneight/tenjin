/* eslint-disable sort-keys */
/**
 * Convert float to USD currency.
 */
export const formatCurrency = (
  num: number | null,
  includeCurrency: boolean
): string => {
  const hasCurrency: boolean = includeCurrency || true;

  if (!num) {
    return '0.00';
  }

  const fmtNumb: string = new Intl.NumberFormat(
    'en-US',
    hasCurrency
      ? {
          style: 'currency',
          currency: 'USD',
        }
      : { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  ).format(num);

  return fmtNumb;
};

/**
 * Convert number to comma-separate.
 */
export const numberWithCommas = (num: number): string => {
  if (!num) {
    return '0';
  }

  const fmtNumb: string = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return fmtNumb;
};
