/**
 * Diff two arrays of objects by key.
 */
export const arrayDiff = <A, B>(arr1: A[], arr2: B[], key: string): : any[] =>
  arr1.filter((item1) => !arr2.some((item2) => item1[key] === item2[key]));
