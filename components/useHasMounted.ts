import { useEffect, useState } from 'react';

// To avoid issues, we need to ensure that the rehydrated app matches the original HTML. We initialize a piece of state, hasMounted, to false. While it's false, we don't bother rendering the "real" content. Inside the useEffect call, we immediately trigger a re-render, setting hasMounted to true. When this value is true, the "real" content gets rendered.

/**
 * Circumvent rehydration issues.
 * @function
 *
 * @return {boolean} determine if component has mounted
 */
const useHasMounted = (): boolean => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};

export default useHasMounted;
