#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');
const {ncp} = require('ncp');

const CHOICES = fs.readdirSync(`${__dirname}/templates`);
const CURR_DIR = process.cwd();

const QUESTIONS = [
  {
    choices: CHOICES,
    message: 'Choose your template',
    name: 'project-choice',
    type: 'list',
  },
];

inquirer.prompt(QUESTIONS).then(answers => {
  const projectChoice = answers['project-choice'];
  const templatePath = `${__dirname}/templates/${projectChoice}`;
  ncp(templatePath, CURR_DIR, err => {
    if (err) {
      console.error(`${err}`);
    }
  });
});
