import { useState, useCallback, useLayoutEffect } from 'react';

export interface DimensionObject {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

export type UseDimensionsHook = [
  (node: HTMLElement) => void,
  {} | DimensionObject,
  HTMLElement | undefined
];

interface UseDimensionsArgs {
  resize?: boolean;
}

const useDimensions = ({
  resize = false,
}: UseDimensionsArgs = {}): UseDimensionsHook => {
  const [dimensions, setDimensions] = useState({});
  const [node, setNode] = useState<HTMLElement | undefined>();

  const ref = useCallback(element => {
    setNode(element);
  }, []);

  // eslint-disable-next-line consistent-return
  useLayoutEffect(() => {
    if (node) {
      const measure = () =>
        window.requestAnimationFrame(() => {
          const rect = node.getBoundingClientRect();

          setDimensions(rect);
        });

      measure();

      if (resize) {
        window.addEventListener(
          'resize',
          () => {
            let throttled = false;
            // only run if we're not throttled
            if (!throttled) {
              // actual callback action
              measure();
              // we're throttled!
              throttled = true;
              // set a timeout to un-throttle
              setTimeout(() => {
                throttled = false;
              }, 250);
            }
          },
          false
        );

        return () => {
          window.removeEventListener('resize', measure);
        };
      }

      return () => {};
    }
  }, [node, resize]);

  return [ref, dimensions, node];
};

export default useDimensions;
