import { useCallback, useEffect, useState, CSSProperties } from "react";
import { animated, useSpring, AnimatedValue } from "react-spring";

interface SpringConfig {
  tension: number;
  friction: number;
}

export interface UseBoopProps {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  timing: number;
  springConfig: SpringConfig;
}

export interface SpringValues {
  transform: string;
  config: SpringConfig;
}

export interface BoopProps {
  children: ReactNode;
  boopConfig: UseBoopProps;
}

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

/**
 * Custom hook for creating a "boop" animation effect.
 */
export const useBoop = ({
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1,
  timing = 150,
  springConfig = {
    tension: 300,
    friction: 10,
  },
}: UseBoopProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isBooped, setIsBooped] = useState<boolean>(false);
  const style = useSpring<SpringValues>({
    transform: isBooped
      ? `translate(${x}px, ${y}px)
         rotate(${rotation}deg)
         scale(${scale})`
      : `translate(0px, 0px)
         rotate(0deg)
         scale(1)`,
    config: springConfig,
  });

  useEffect(() => {
    if (!isBooped) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsBooped(false);
    }, timing);

    // eslint-disable-next-line consistent-return
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isBooped]);

  const trigger = useCallback(() => {
    setIsBooped(true);
  }, []);

  const appliedStyle = prefersReducedMotion ? {} : style;

  return [appliedStyle, trigger];
};

/**
 * Spring based boop animation wrapper.
 */
export const Boop: FunctionComponent<BoopProps> = ({
  children,
  boopConfig,
}): FunctionComponent => {
  const [style, trigger] = useBoop(boopConfig);

  return (
    <animated.button onMouseEnter={trigger} style={style}>
      {children}
    </animated.button>
  );
};
