/**
 * Convert string into a filename.
 * @function
 *
 * @param   {string} str
 *
 * @returns {string} filename
 */
const stringToFilename = (str: string): string =>
  str
    .replace(/\.\s/g, "-")
    .replace(/,\s/g, "-")
    .replace(/\s::\s/g, "-")
    .replace(/\s:\s/g, "-")
    .replace(/:\s/g, "-")
    .replace(/\s-\s/g, "-")
    .replace(/\s–\s/g, "-")
    .replace(/\s—\s/g, "-")
    .replace(/[-|\\]+/g, "-")
    .replace(/\s&\s/g, "and")
    .replace(/&/g, "n")
    .replace(/[!@#$%^*()+=[\]{};'’:"”,.<>/?]+/g, "")
    .replace(/\s/g, "_")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export default stringToFilename;
