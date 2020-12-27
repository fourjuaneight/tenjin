const { resolve } = require('path');
const glob = require('glob').sync;
const replace = require('replace-in-file');

const config = require('./siteConfig');

// Glob options. Pass directory to search and files to ignore
const cwd = resolve(__dirname, 'public');
const ignore = ['sw.js'];

/**
 * Generate alphanumeric hash.
 * @function
 *
 * @param  {number} length hash size
 *
 * @return {string}        alphanumeric hash
 */
const makeHash = length => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

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
const getFiles = () => {
  const files = glob('**/*.{js,css,woff,woff2}', { cwd, ignore });
  const filesList = files.map(toCache => `'/${toCache}'`).toString();

  return filesList;
};

(async () => {
  // find and replace options; add hash ID, files to cache array, and site base URL
  const replaceOptions = {
    files: resolve(cwd, 'sw.js'),
    from: [
      /(const)\s(staticAssets)\s=\s?\[\];/g,
      /const\sversion\s=\s'';/g,
      /baseURL/g,
    ],
    to: [
      `const staticAssets = [${getFiles()}];`,
      `const version = '${makeHash(6)}';`,
      `${config.siteUrl}`,
    ],
  };

  // update sw.js in _public dir
  try {
    await replace(replaceOptions);
    // eslint-disable-next-line no-console
    console.info('SW updated.');
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();
