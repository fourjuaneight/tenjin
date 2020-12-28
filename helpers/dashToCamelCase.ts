/**
 * Dashed string to camel case.
 * @function
 *
 * @param   {string} str dash separate string
 *
 * @returns {string}     camelCased string
 */
const dashToCamelCase = (str: string): string =>
  str
    .toLowerCase()
    .replace(/-(.)/g, (match: string, group1: string) => group1.toUpperCase());

export default dashToCamelCase;
