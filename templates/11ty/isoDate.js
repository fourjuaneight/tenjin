module.exports = date => {
  const raw = new Date(date);
  const offset = raw.getTimezoneOffset() * 60000;
  const newDate = new Date(raw - offset);

  return newDate.toISOString();
};
