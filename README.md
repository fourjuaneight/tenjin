# Static Templates

This is a simple script that uses [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) and the [fs](https://nodejs.org/api/fs.html) module to copy template and config files for various Static-Site Generators, onto the current directory.

This is mostly for personal use, but PRs are welcomed.

## Install

At the root of the repo, run `npm i -g`.

`package.json` contains:

```json
"bin": {
  "templates": "./index.js"
}
```

The key `templates` is the command you'll use when you run the tool from the terminal.
