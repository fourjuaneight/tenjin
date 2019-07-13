#!/usr/bin/env node

const { copyFile, readdirSync } = require('fs');
const { join } = require('path');
const { prompt } = require('inquirer');

const readDir = dir =>
readdirSync(dir, (err, files) => {
  if (err) throw err;
  return files;
});

const CURR_DIR = process.cwd();
const sections = readDir(`${__dirname}/templates`);

const templates = prompt({
    choices: sections,
    message: 'Choose a section',
    name: 'section',
    type: 'list',
  }).then(answers => {
    const folder = answers.section;
    const section = readDir(`${__dirname}/templates/${folder}`);

    prompt({
      choices: section,
      message: 'Choose your template',
      name: 'file',
      type: 'list',
    }).then(answers => {
      const templatePath = `${__dirname}/templates/${folder}/${answers.file}`;
      const dest = join(CURR_DIR, answers.file);

      copyFile(templatePath, dest, err => {
        if (err) throw err;
      });
    });
  });

exports.default = templates;
