/**
 * Stringify and format compared data for GQL schema mutation.
 */
export const stringifySchema = <D>(data: D): string =>
  JSON.stringify(data).replace(/'([a-zA-Z_]+)':/g, '$1:');
