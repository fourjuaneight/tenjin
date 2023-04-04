/**
 * Stringify and format compared data for GQL schema mutation.
 * @function
 *
 * @param  {any}    data new data object
 *
 * @return {string} schema string
 */
export const stringifySchema = <D>(data: D): string =>
  JSON.stringify(data).replace(/'([a-zA-Z_]+)':/g, '$1:');
