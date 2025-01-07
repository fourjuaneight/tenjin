/**
 * Sort given array by key in descending/ascending order.
 */
export const sortArr = <T>(
  list: T[],
  key: string,
  asc: boolean = true
): T[] => {
  const arrayCopy: any[] = [...list];

  arrayCopy.sort((a, b) => {
    if (asc) {
      if (a[key] > b[key]) {
        return -1;
      }
      if (a[key] < b[key]) {
        return 1;
      }
    } else {
      if (a[key] > b[key]) {
        return 1;
      }
      if (a[key] < b[key]) {
        return -1;
      }
    }

    return 0;
  });

  return arrayCopy;
};
