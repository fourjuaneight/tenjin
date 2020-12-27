import { useState, useCallback, useLayoutEffect } from 'react';

const getDimensionObject = node => {
  const rect = node.getBoundingClientRect();

  return {
    bottom: rect.bottom,
    height: rect.height,
    left: 'y' in rect ? rect.y : rect.left,
    right: rect.right,
    top: 'x' in rect ? rect.x : rect.top,
    width: rect.width,
    x: 'x' in rect ? rect.x : rect.left,
    y: 'y' in rect ? rect.y : rect.top,
  };
};

const useDimensions = () => {
  const [dimensions, setDimensions] = useState({});
  const [node, setNode] = useState(null);

  const ref = useCallback(element => {
    setNode(element);
  }, []);

  // eslint-disable-next-line consistent-return
  useLayoutEffect(() => {
    if (node) {
      const measure = () =>
        window.requestAnimationFrame(() =>
          setDimensions(getDimensionObject(node))
        );

      measure();

      window.addEventListener('resize', measure);

      return () => {
        window.removeEventListener('resize', measure);
      };
    }
  }, [node]);

  return [ref, dimensions, node];
};

export default useDimensions;
