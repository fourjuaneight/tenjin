import { useEffect, useRef } from "react";

/**
 * Setup safe setInterval effect.
 * @function
 *
 * @param  {T}      callback function to run at interval
 * @param  {number} delay    interval delay in milliseconds
 *
 * @return {void}
 */
export const useInterval = <T>(callback: T, delay: number): void => {
  const savedCallback = useRef<T>();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  const tick = () => savedCallback.current();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(tick, delay);

      return () => clearInterval(id);
    }
  }, [delay]);
};
