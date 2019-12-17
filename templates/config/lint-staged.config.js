// Static Testing
// npm i -D husky lint-staged

module.exports = {
  '*.+(js|css|ms)': ['prettier --write', 'git add'],
  '*.js': ['eslint --fix'],
};
