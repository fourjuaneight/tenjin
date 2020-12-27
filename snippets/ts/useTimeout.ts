import { useEffect, useRef } from 'react';

/**
 * Setup safe setTimeout effect.
 * @function
 *
 * @param  {T}      callback function to run at timeout
 * @param  {number} delay    timeout delay in milliseconds
 *
 * @return {void}
 */
const useTimeout = (callback: T, delay: number): void => {
  const savedCallback = useRef<T>(null);

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  const pause = () => savedCallback.current();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (delay !== null) {
      const id = setTimeout(pause, delay);

      return () => clearTimeout(id);
    }
  }, [delay]);
};

export default useTimeout;
