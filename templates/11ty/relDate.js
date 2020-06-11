module.exports = date => {
  const getOrdinal = number => {
    const suffix = ['th', 'st', 'nd', 'rd'];
    const value = number % 100;
    return number + (suffix[(value - 20) % 10] || suffix[value] || suffix[0]);
  };

  const current = new Date();
  const raw = new Date(date);
  const offset = current.getTimezoneOffset() * 60000;
  const today = new Date(current - offset);
  const yesterday = new Date(today);
  const newDate = new Date(raw - offset);

  yesterday.setDate(yesterday.getDate() - 1);

  const relDate = raw.toLocaleString('en-US', {
    dateStyle: 'long',
  });
  const relTime = raw.toLocaleString('en-US', {
    timeStyle: 'short',
  });
  const datesObj = {
    today: today.toISOString().slice(0, 10),
    yesterday: yesterday.toISOString().slice(0, 10),
    day: newDate.toISOString().slice(0, 10),
  };
  const ordinal = relDate.replace(
    /([a-zA-z]+)\s(\d{1,2}),\s(\d{4})/g,
    (match, p1, p2) => [p1, getOrdinal(p2)].join(' ')
  );
  const day =
    datesObj.day === datesObj.today
      ? 'Today'
      : datesObj.day === datesObj.yesterday
      ? 'Yesterday'
      : ordinal;
  const relativeDate = `${day} at ${relTime}`;

  return relativeDate;
};
