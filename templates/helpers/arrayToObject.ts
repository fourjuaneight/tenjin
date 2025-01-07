/**
 * Convert array to object sorted by given key value.
 */
export const arrayToObject = <A, T>(array: A[], key = "title"): Type => {
  const initialValue = {};

  return array.reduce(
    (obj, item) => ({
      ...obj,
      [item[key]]: item,
    }),
    initialValue
  );
};
