import { useEffect } from "react";

/**
 * Intercept browser unload.
 * @function
 *
 * @param  {function | string} event handler
 *
 * @return {void}
 */
export const useBeforeUnload = (
  value: ((evt: BeforeUnloadEvent) => any) | string
) => {
  const handleBeforeunload = (evt: BeforeUnloadEvent) => {
    let returnValue;
    if (typeof value === "function") {
      returnValue = value(evt);
    } else {
      returnValue = value;
    }
    if (returnValue) {
      evt.preventDefault();
      /* eslint-disable no-param-reassign */
      evt.returnValue = returnValue;
    }
    return returnValue;
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeunload);

    return () => window.removeEventListener("beforeunload", handleBeforeunload);
  }, []);
};
