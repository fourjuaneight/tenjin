// Learn more about Lint-Staged:
// https://github.com/okonet/lint-staged#configuration

module.exports = {
  '*.js': ['eslint --fix'],
  '*.+(js|css|ms)': ['prettier --write', 'git add'],
};
