import { resolve } from "path";
import glob from "glob";
import replace from "replace-in-file";

import { siteUrl, title } from "./siteConfig";

// Glob options. Pass directory to search and files to ignore
const cwd = resolve(__dirname, "public");
const ignore: string[] = ["sw.js"];

/**
 * Generate alphanumeric hash.
 * @function
 *
 * @param  {number} length hash size
 *
 * @return {string} alphanumeric hash
 */
const makeHash = (length: number): string => {
  let result: string = "";
  const characters: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength: number = characters.length;

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

/**
 * Find all JS, CSS, and font assets and create list of their paths.
 * @function
 *
 * @return {string} assets path list
 */
const getFiles = (): string => {
  const files: string[] = glob.sync("**/*.{js,css,woff,woff2}", {
    cwd,
    ignore,
  });
  const filesList: string = files.map((toCache) => `'/${toCache}'`).toString();

  return filesList;
};

/**
 * String to camel case.
 * @function
 *
 * @param   {string} str space separate string
 *
 * @returns {string} camelCased string
 */
const toCamelCase = (str: string): string =>
  str
    .toLowerCase()
    .replace(/\s(.)/g, (match: string, group1: string) => group1.toUpperCase());

(async () => {
  // find and replace options; add hash ID, files to cache array, and site base URL
  const replaceOptions = {
    files: resolve(cwd, "sw.js"),
    from: [
      /(const)\s(staticAssets)\s=\s?\[\];/g,
      /const\sversion\s=\s'';/g,
      /const\cacheName\s=\s'';/g,
      /baseURL/g,
    ],
    to: [
      `const staticAssets = [${getFiles()}];`,
      `const version = '${makeHash(6)}';`,
      `const cacheName = '${toCamelCase(title)}';`,
      `${siteUrl}`,
    ],
  };

  // update sw.js in _public dir
  try {
    await replace(replaceOptions);
    // eslint-disable-next-line no-console
    console.info("SW updated.");
  } catch (error) {
    throw new Error("Error occurred:", error);
  }
})();
