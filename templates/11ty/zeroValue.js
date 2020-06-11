module.exports = value => {
  const toInt = parseInt(value, 10);
  if (toInt === 0 || value === undefined) {
    return '<1';
  }

  return value;
};
