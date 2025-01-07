import { format } from "date-fns";

/**
 * Convert time string to locale format.
 */
export const timeToLocale = (time: string, localePattern: string): string => {
  const pattern: string = localePattern || "HH:mm a";

  if (time === "" || time == null) {
    return "";
  }

  const fakeDate: Date = new Date(`Jan 1, 1970 ${time}`);

  return format(fakeDate, pattern);
};

/**
 * Convert time string to ISO format.
 */
export const localeToTime = (time: string, timePattern: string): string => {
  const pattern: string = timePattern || "HH:mm:ss";

  if (time === "" || time == null) {
    return "";
  }

  const fakeDate = new Date(`Jan 1, 1970 ${time}`);

  return format(fakeDate, pattern);
};

/**
 * Remove timezone from date string.
 */
export const removeTimeZone = (date: string | Date): Date => {
  let locDate: Date;

  // determine if input date is string or Date
  if (typeof date.getMonth !== "function") {
    locDate = new Date(date);
  }

  locDate.setUTCHours(24);

  return locDate;
};
