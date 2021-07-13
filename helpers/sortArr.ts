/**
 * Sort given array by key in descending/ascending order.
 * @function
 *
 * @param  {any[]}   list array to sort
 * @param  {string}  key  ket to sort by
 * @param  {boolean} asc  should order by asc order
 *
 * @return {any[]}   sorted array
 */
export const sortArr = (list: any[], key: string, asc: boolean = true): any[] => {
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
