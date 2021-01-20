// SSR APIs
// https://www.gatsbyjs.org/docs/ssr-apis/

import React from "react";
import glob from "glob/sync";
import wrapWithProvider from "./src/store/reduxWrapper";

// Load Redux store
export const wrapRootElement = wrapWithProvider;

/*
  Add preload links for subset font files.

  Context on font loading strategy:
  1. Preload subsets via link preloads. (THIS SETUP)
  2. CSS loads subset in critically inlined styles.
  3. FontFace API dynamically loads full Latin files.
*/
export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  // match subset fonts
  const fonts = glob("public/**/*-subset.{woff,woff2}").reverse();
  // get existing head components
  const headComponents = getHeadComponents();

  // for each found file, generate a link preload component
  const files = fonts.map((file) => (
    <link
      key={file}
      rel="preload"
      href={file.replace("public", "")}
      as="font"
      type={`font/${file.match(/woff2|woff/g)}`}
      crossOrigin="anonymous"
    />
  ));

  // push links before existing head components
  replaceHeadComponents([...files, headComponents]);
};
