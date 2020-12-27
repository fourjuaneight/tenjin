const { SiteChecker } = require('broken-link-checker');
const browserSync = require('browser-sync').create();
const process = require('process');
const AsciiTable = require('ascii-table');

// ---------------------------------------------------------------------
// Broken Link Testing
// ---------------------------------------------------------------------
// console colors
const consoleColor = {
  baseColor: '\x1b[37m',
  errorColor: '\x1b[31m',
  infoColor: '\x1b[33m',
  successColor: '\x1b[32m',
};
// SiteChecker config
const bclConfig = {
  excludeExternalLinks: true,
  excludedKeywords: ['https://www.getdrip.com/*', 'http://localhost:8000'],
  filterLevel: 3,
};
// array of broken links found
const resultRows = [];
// table output setup
const brokenLinks = {
  title: 'Broken Links',
  // eslint-disable-next-line sort-keys
  heading: ['Status', 'Page', 'Tag'],
  rows: resultRows,
};

// create new SiteChekcer instance with config
const bcl = new SiteChecker(bclConfig, {
  // on error, log error and close local server
  error(err) {
    console.error(consoleColor.errorColor, err);
    browserSync.exit();
  },
  // with results, formate only broken results
  link(result) {
    if (result.broken) {
      // clean status code
      const code = result.brokenReason.replace('HTTP_', '');
      // formate to relative page page
      const link = result.base.original.replace('http://localhost:1313', '');
      // create tag where broken link is found
      const tag = `${result.html.tag}${
        result.html.text ? result.html.text : ''
      }</${result.html.tagName}>`;
      // push results to table output setup
      const fmtResults = [code, link, tag];
      resultRows.push(fmtResults);
      // pass exit code to fail CI
      process.exitCode = 1;
    }
  },
  // on exit, close local server and log results
  // eslint-disable-next-line sort-keys
  end() {
    const table = new AsciiTable().fromJSON(brokenLinks);

    browserSync.exit();

    if (resultRows.length > 0) {
      console.error(table.render());
    } else {
      // eslint-disable-next-line no-console
      console.info(
        consoleColor.infoColor,
        'No broken links found.',
        consoleColor.baseColor
      );
    }
  },
});

// initiate local server, run broken links check, then close server and log results
const deadLinks = () =>
  browserSync.init({
    callbacks: {
      ready: () => bcl.enqueue('http://localhost:1313'),
    },
    host: '0.0.0.0',
    logLevel: 'silent',
    notify: false,
    open: false,
    port: 1313,
    server: {
      baseDir: './dist',
    },
  });

exports.deadLinks = deadLinks;
