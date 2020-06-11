module.exports = date => {
  const raw = new Date(date);
  const offset = raw.getTimezoneOffset() * 60000;
  const newDate = new Date(raw - offset);

  const relDate = newDate.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  return relDate;
};
