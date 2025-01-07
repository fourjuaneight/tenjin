/**
 * Copy array by given number times.
 */
export const multiplyArray = <T>(arr: T[], copies: number): T[] => {
  const array: any[] = Array(copies)
    .fill(0)
    .map(() => Object.assign({}, arr));

  return array;
};
