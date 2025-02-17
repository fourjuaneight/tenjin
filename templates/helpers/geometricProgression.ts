/**
 * Initializes an array containing the numbers in the specified range where start and end are inclusive and the ratio between two terms is step.
 */
const geometricProgression = (end: number, start = 1, step = 2): number[] =>
  // create an array of the desired length
  Array.from({
    length: Math.floor(Math.log(end / start) / Math.log(step)) + 1,
    // fill with the desired values in a rang
  }).map((_, index) => start * step ** index);

export geometricProgression;
