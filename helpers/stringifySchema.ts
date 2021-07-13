/**
 * Stringify and format compared data for GQL schema mutation.
 * @function
 *
 * @param  {any}    data new data object
 *
 * @return {string} schema string
 */
export const stringifySchema = (data: any): string =>
  JSON.stringify(data).replace(/'([a-zA-Z_]+)':/g, '$1:');
