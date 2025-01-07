/**
 * Convert dashed string to camel case.
 */
export const dashToCamelCase = (str: string): string =>
  str
    .toLowerCase()
    .replace(/-(.)/g, (match: string, group1: string) => group1.toUpperCase());
