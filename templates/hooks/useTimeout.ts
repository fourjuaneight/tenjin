import { useEffect, useRef } from "react";

/**
 * Setup safe setTimeout effect.
 */
export const useTimeout = <T>(callback: T, delay: number): void => {
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
