#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');
const ncp = require('ncp').ncp;
const CHOICES = fs.readdirSync(`${__dirname}/templates`);
const CURR_DIR = process.cwd();

const QUESTIONS = [
  {
    name: 'project-choice',
    type: 'list',
    message: 'Choose your template',
    choices: CHOICES
  }
];

inquirer.prompt(QUESTIONS)
  .then(answers => {
    const projectChoice = answers['project-choice'];
    const templatePath = `${__dirname}/templates/${projectChoice}`;
    ncp(templatePath, CURR_DIR, function (err) {
      if (err) {
        return console.error(err);
      } else {
        console.log('Done!');
      }
    });
  });