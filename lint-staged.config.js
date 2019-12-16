// Static Testing
// npm i -D husky lint-staged
const micromatch = require('micromatch');

module.exports = {
  '*.js': files => {
    const match = micromatch.not(files, 'configs/*.js');
    return `eslint --fix ${match.join(' ')}`;
  },
  '*.+(js|css|ms)': ['prettier --write', 'git add'], // eslint-disable-line
};
