import { useState, useCallback, useLayoutEffect } from "react";

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

/**
 * Get bounding client of ref React element.
 *
 * @param resize watch for window resize and update dimension properties?
 */
export const useDimensions = ({
  resize = false,
}: UseDimensionsArgs = {}): UseDimensionsHook => {
  const [dimensions, setDimensions] = useState({});
  const [node, setNode] = useState<HTMLElement | undefined>();

  const ref = useCallback((element) => {
    setNode(element);
  }, []);

  // eslint-disable-next-line consistent-return
  useLayoutEffect(() => {
    if (node) {
      // update UI thread
      const measure = () =>
        window.requestAnimationFrame(() => {
          const rect = node.getBoundingClientRect();

          setDimensions(rect);
        });

      measure();

      if (resize) {
        if ("ResizeObserver" in window) {
          const resizeObserver = new ResizeObserver(measure);

          resizeObserver.observe(node);

          return () => resizeObserver.unobserve(node);
        }

        window.addEventListener(
          "resize",
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
          window.removeEventListener("resize", measure);
        };
      }

      return () => {};
    }
  }, [node]);

  return [ref, dimensions, node];
};
