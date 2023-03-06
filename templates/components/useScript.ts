import { useEffect } from "react";

/**
 * Dynamically create <script> node.
 * @function
 *
 * @param  {string} resourceUrl script source
 *
 * @return {void}
 */
export const useScript = (resourceUrl: string): void => {
  useEffect(() => {
    const script: HTMLScriptElement = document.createElement("script");
    script.src = resourceUrl;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [resourceUrl]);
};
