/**
 * Convert an object to a query string for GraphQL.
 */
export const objToQueryString = <T>(obj: T) =>
  Object.keys(obj).map((key) => {
    const value = obj[key];
    const fmtValue =
      typeof value === "string"
        ? `"${value
            .replace(/\\/g, "")
            .replace(/"/g, '\\"')
            .replace(/\n/g, "\\n")}"`
        : Array.isArray(value)
        ? `"${value.join(",")}"`
        : value;

    return `${key}: ${fmtValue}`;
  });
