const SECONDS_PER_DAY = 86400;
const HOURS_PER_DAY = 24;

/**
 * Convert seconds to HH:MM:SS
 * If seconds exceeds 24 hours, hours will be greater than 24 (30:05:10)
 *
 * @param {number} seconds
 * @returns {string}
 **/
const secondsToHms = seconds => {
  const days = Math.floor(seconds / SECONDS_PER_DAY);
  const remainderSeconds = seconds % SECONDS_PER_DAY;
  const hms = new Date(remainderSeconds * 1000).toISOString().substring(11, 19);
  return hms.replace(/^(\d+)/, hrs =>
    `${Number(hrs) + days * HOURS_PER_DAY}`.padStart(2, '0')
  );
};

export default secondsToHms;
