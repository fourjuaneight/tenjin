import { resolve } from 'path';

import chalk from 'chalk';
import glob from 'glob';
import { replaceInFile, ReplaceInFileConfig } from 'replace-in-file';

const globSync = glob.sync;

const SITE_URL: string = 'https://www.thepancake.house';

// Glob options. Pass directory to search and files to ignore
const cwd = resolve(__dirname, '..', 'dist');
const ignore = ['sw.js'];

// Generate alphanumeric hash
const makeId = (length: number): string => {
  let result = '';
  const characters: string =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

// Find all JS, CSS, and font files in rendered output
(async () => {
  console.info(
    chalk.cyan('[INFO]'),
    'Generating cache list for Service Worker.'
  );

  // create matched files array
  const files = globSync('**/*.{js,css,woff,woff2}', { cwd, ignore });
  const newFiles = files.map(toCache => `'/${toCache}'`).toString();

  // find and replace options; add hash ID, files to cache array, and site base URL
  const replaceOptions: ReplaceInFileConfig = {
    files: resolve(cwd, 'sw.min.js'),
    from: [
      /(const)\s(staticAssets)\s=\s?\[\];/g,
      /const\sversion\s=\s'';/g,
      /baseURL/g,
    ],
    to: [
      `const staticAssets = [${newFiles}];`,
      `const version = '${makeId(6)}';`,
      `${SITE_URL}`,
    ],
  };

  try {
    await replaceInFile(replaceOptions);

    console.info(chalk.green('[SUCCESS]'), 'Service Worker updated.');
  } catch (error) {
    throw new Error(`${chalk.red('[ERROR]')} ${error}`);
  }
})();
