#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');
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
    createDirectoryContents(templatePath);
  });

function createDirectoryContents (templatePath) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;
    
    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8');
      
      const writePath = `${CURR_DIR}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${file}`);
      
      // recursive call
      createDirectoryContents(`${templatePath}/${file}`, `${file}`);
    }
  });
}