import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import sanitizeHtml from 'sanitize-html';

interface CleanHTMLProps {
  html: string;
}

/**
 * Sanitized HTML
 * @component
 *
 * @param   {string} html raw HTML string
 * @returns {component}   <CleanHTML html={html} />
 */
const CleanHTML: React.FC<CleanHTMLProps> = ({ html }) => {
  const clean = (dirty: string) =>
    sanitizeHtml(dirty, {
      allowedAttributes: {
        a: ['href', 'rel', 'download', 'target'],
        code: ['class'],
        div: ['class', 'data-language'],
        pre: ['class'],
        span: ['class'],
      },
      allowedTags: [
        'a',
        'b',
        'blockquote',
        'code',
        'div',
        'h1',
        'h2',
        'h3',
        'h4',
        'i',
        'em',
        'li',
        'ol',
        'p',
        'pre',
        'span',
        'strong',
        'ul',
      ],
    });

  return <>{ReactHtmlParser(clean(html))}</>;
};

export default CleanHTML;
