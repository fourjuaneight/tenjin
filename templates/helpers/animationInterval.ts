/**
 * Corss-browser, time perfect, animation interval.
 *
 * @param  {number}      ms when to ship animation; interval
 * @param  {AbortSignal} signal performant abort of interval
 * @param  {function}    callback get time for next frame
 */
export const animationInterval = (
  ms: number,
  signal: AbortSignal,
  callback: (time?: number) => void
) => {
  // time since creation of doc, for current frame
  const start: number = document.timeline.currentTime;

  // prepare frame and ship
  const scheduleFrame = (time: number): void => {
    const elapsed: number = time - start;
    const roundedElapsed: number = Math.round(elapsed / ms) * ms;
    const targetNext: number = start + roundedElapsed + ms;
    // minus delay from the current execution time
    const delay: number = targetNext - performance.now();

    // sync w/ other animations, stop when page in background, provide time for next frame
    setTimeout(() => requestAnimationFrame(frame), delay);
  };

  // abort if needed
  const frame = (time: number): void => {
    if (signal.aborted) return;

    callback(time);
    scheduleFrame(time);
  };

  scheduleFrame(start);
};
