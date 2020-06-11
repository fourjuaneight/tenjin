import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';

/**
 * Sanitized HTML
 * @component
 *
 * @param   {string} html raw HTML string
 * @returns {component}   <CleanHTML html={html} />
 */
const CleanHTML = ({ html }) => {
  const clean = dirty =>
    sanitizeHtml(dirty, {
      allowedAttributes: {
        a: ['href', 'rel', 'target'],
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
        '\\n',
      ],
    });

  return <>{ReactHtmlParser(clean(html))}</>;
};

CleanHTML.propTypes = {
  html: PropTypes.string.isRequired,
};

export default CleanHTML;
