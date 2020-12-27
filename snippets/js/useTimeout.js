import { useEffect, useRef } from 'react';

const useTimeout = (callback, delay) => {
  const savedCallback = useRef();

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
