/**
 * Generates all permutations of an array's elements (contains duplicates).
 */
export const permutations = <T>(arr: T[]): T[][] => {
  if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;

  // combine all permutations in one array
  return arr.reduce(
    (acc, item, i) =>
      acc.concat(
        // combine the element with each partial permutation
        permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map((val) => [
          item,
          ...val,
        ])
      ),
    []
  );
};
