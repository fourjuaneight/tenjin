import { useEffect } from "react";

/**
 * Dynamically create <script> node.
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
