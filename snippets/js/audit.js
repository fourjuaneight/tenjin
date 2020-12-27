/* eslint-disable sort-keys */
const AsciiTable = require('ascii-table');
const { existsSync, mkdirSync, writeFile } = require('fs');
const browserSync = require('browser-sync').create();
const chromeLauncher = require('chrome-launcher');
const lighthouse = require('lighthouse');
const process = require('process');

// ---------------------------------------------------------------------
// Performance Testing
// ---------------------------------------------------------------------
// table output setup
const auditResults = res => {
  const print = {
    title: 'Audit',
    // eslint-disable-next-line sort-keys
    heading: ['Performance', 'Accessibility', 'Best Practice', 'SEO'],
    // format scores; more decimal point a couple steps down
    rows: [
      [
        res.categories.performance.score * 100,
        res.categories.accessibility.score * 100,
        res.categories['best-practices'].score * 100,
        res.categories.seo.score * 100,
      ],
    ],
  };

  return print;
};
// open chrome and run audit
const launchChromeAndRunLighthouse = url => {
  // run chrome headless
  const launchOptions = {
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox', '--no-zygote'],
  };
  return chromeLauncher.launch(launchOptions).then(chrome => {
    const opts = {
      port: chrome.port,
    };
    // run lighthouse, kill chrome, pass results
    const lhConfig = {
      extends: 'lighthouse:default',
      settings: {
        onlyCategories: [
          'performance',
          'accessibility',
          'best-practices',
          'seo',
        ],
        skipAudits: ['is-on-https', 'uses-http2'],
      },
    };
    return lighthouse(url, opts, lhConfig).then(results =>
      chrome.kill().then(() => ({
        js: results.lhr,
        json: results.report,
      }))
    );
  });
};

// initiate local server, run audit, then close server and log results
const runAudit = () =>
  browserSync.init({
    host: '0.0.0.0',
    logLevel: 'silent',
    notify: false,
    open: false,
    port: 1313,
    server: {
      baseDir: './dist',
    },
    callbacks: {
      ready: () =>
        launchChromeAndRunLighthouse('http://localhost:1313')
          .then(({ json }) => {
            const dirName = 'audits';
            const results = JSON.parse(json);
            // generate clean JSON results
            const printResults = {
              userAgent: results.userAgent,
              lighthouseVersion: results.lighthouseVersion,
              fetchTime: results.fetchTime,
              requestedUrl: results.requestedUrl,
              categories: {
                performance: results.categories.performance.score * 100,
                accessibility: results.categories.accessibility.score * 100,
                'best-practices':
                  results.categories['best-practices'].score * 100,
                seo: results.categories.seo.score * 100,
              },
            };
            const table = new AsciiTable().fromJSON(auditResults(results));
            // check is score is above 90
            const passing = {
              category: null,
              value: true,
            };
            switch (true) {
              case printResults.categories.performance < 90:
                passing.category = 'Performance';
                passing.value = false;
                break;
              case printResults.categories.accessibility < 90:
                passing.category = 'Accessibility';
                passing.value = false;
                break;
              case printResults.categories['best-practices'] < 90:
                passing.category = 'Best Practices';
                passing.value = false;
                break;
              case printResults.categories.seo < 90:
                passing.category = 'SEO';
                passing.value = false;
                break;
              default:
                break;
            }

            // log table with scrores
            console.error(table.render());
            // create results directory
            if (!existsSync(dirName)) {
              mkdirSync(dirName);
            }
            // save JSON with full results
            writeFile(
              `${dirName}/${results.fetchTime.replace(/:/g, '_')}.json`,
              JSON.stringify(printResults, null, 2),
              err => {
                if (err) {
                  throw err;
                }
              }
            );

            return passing;
          })
          // close local server
          .then(passing => {
            browserSync.exit();
            if (!passing.value) {
              console.error(`${passing.category} is below 90%.`);
            }
            process.exitCode = passing.value ? 0 : 1;
          }),
    },
  });

exports.runAudit = runAudit;
