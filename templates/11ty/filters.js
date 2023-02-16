const { join } = require('path');
const { readFileSync } = require('fs');

const { getType } = require('mime/lite');
const { format, formatISO } = require('date-fns');
const isEmpty = require('lodash/isEmpty');

module.exports = {
  dateToFormat: (date, fmt) => format(date, fmt),

  dateToISO: date => formatISO(date).slice(0, -5),

  obfuscate: str => {
    const chars = [];

    for (var i = str.length - 1; i >= 0; i--) {
      chars.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
    }

    return chars.join('');
  },

  stripSpaces: str => str.replace(/\s/g, ''),

  stripProtocol: str => str.replace(/(^\w+:|^)\/\//, ''),

  addAnchorAttrs: str =>
    str.replace(
      /<a href="(.*)">(.*)<\/a>/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$2</a>'
    ),

  addListClass: str =>
    str.replace(/<\/h2>\n?\s+<ul>/g, '</h2><ul class="tech-list">'),

  base64file: file => {
    const filepath = join(__dirname, `../src/${file}`);
    const mimeType = getType(file);
    const buffer = Buffer.from(readFileSync(filepath));

    return `data:${mimeType};base64,${buffer.toString('base64')}`;
  },

  themeColors: colors => {
    let style = '';

    if (!colors || isEmpty(colors)) {
      return '';
    }

    if (colors.primary) {
      style += `--primary-color:${colors.primary};`;
    }

    if (colors.secondary) {
      style += `--secondary-color:${colors.secondary};`;
    }

    return style;
  },
};
