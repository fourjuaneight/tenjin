import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: no-preference)";
const isRenderingOnServer = typeof window === "undefined";

/**
 * For our initial server render, we won't know if the user prefers reduced motion, but it doesn't matter.
 * This value will be overwritten on the client, before any animations occur.
 */
const getInitialState = (): boolean =>
  isRenderingOnServer ? true : !window.matchMedia(QUERY).matches;

/**
 * Get prefers-reduced-motion preference value for JS based animations.
 */
export const usePrefersReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState<boolean>(getInitialState);

  useEffect(() => {
    const mediaQueryList: MediaQueryList = window.matchMedia(QUERY);

    const listener = (event: MediaQueryListEvent): void => {
      setPrefersReducedMotion(!event.matches);
    };

    mediaQueryList.addListener(listener);

    return () => {
      mediaQueryList.removeListener(listener);
    };
  }, []);

  return prefersReducedMotion;
};
