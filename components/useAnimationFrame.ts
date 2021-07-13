import { useEffect, useRef } from "react";

import animationInterval from "../helpers/animationInterval";

/**
 * Corss-browser, time perfect, animation interval.
 * @hook
 *
 * @param   {number}   ms when to ship animation; interval
 * @param   {function} callback get time for next frame
 * @returns {void}
 */
export const useAnimationFrame = (
  ms: number,
  callback: (time?: number) => void
): void => {
  const callbackRef = useRef<(time?: number) => void>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const controller = new AbortController();

    animationInterval(ms, controller.signal, callbackRef.current);

    return () => controller.abort();
  }, [ms]);
};
