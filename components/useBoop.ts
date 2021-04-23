import { CSSProperties, useCallback, useEffect, useState } from 'react';
import { AnimatedValue, useSpring } from 'react-spring';

import usePrefersReducedMotion from './usePrefersReduceMotion';

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

interface SpringValues {
  transform: string;
  config: SpringConfig;
}

const useBoop = ({
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

export default useBoop;
