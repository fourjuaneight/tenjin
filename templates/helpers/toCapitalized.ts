/**
 * Turns first letter of a string to uppercase, capitalizing the string
 */
export const toCapitalized = (str: string): string =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
