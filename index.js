#!/usr/bin/env node

const { copyFile, readdirSync } = require('fs');
const { join } = require('path');
const { prompt } = require('inquirer');

const templates = readdirSync(`${__dirname}/templates`);
const CURR_DIR = process.cwd();

const questions = [
  {
    choices: templates,
    message: 'Choose a section',
    name: 'section',
    type: 'list',
  },
];

prompt(questions).then(answers => {
  const folder = answers.section;
  const section = readdirSync(`${__dirname}/templates/${folder}`);
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

