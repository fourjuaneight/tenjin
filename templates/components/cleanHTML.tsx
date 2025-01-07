import React, { FunctionComponent } from "react";
import ReactHtmlParser from "react-html-parser";
import sanitizeHtml from "sanitize-html";

interface CleanHTMLProps {
  html: string;
}

/**
 * Sanitized HTML; ensures only specified tags attributes pass through.
 */
export const CleanHTML: FunctionComponent<CleanHTMLProps> = ({
  html,
}): FunctionComponent => {
  const clean = (dirty: string) =>
    sanitizeHtml(dirty, {
      allowedAttributes: {
        a: ["href", "rel", "download", "target"],
        code: ["class"],
        div: ["class", "data-language"],
        pre: ["class"],
        span: ["class"],
      },
      allowedTags: [
        "a",
        "b",
        "blockquote",
        "code",
        "div",
        "em",
        "h1",
        "h2",
        "h3",
        "h4",
        "i",
        "em",
        "li",
        "ol",
        "p",
        "pre",
        "span",
        "strong",
        "ul",
      ],
    });

  return <>{ReactHtmlParser(clean(html))}</>;
};
