/**
 * Convert an object to a query string for GQL.
 * @function
 *
 * @param obj any key value pair object
 * @returns {string[]} array of query string parameters
 */
export const objToQueryString = <Type extends unkown>(obj: Type) =>
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
