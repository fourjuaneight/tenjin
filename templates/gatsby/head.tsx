import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

interface HeadProps {
  location: object;
}

type Data = {
  meta: {
    siteMetadata: {
      author: string;
      description: string;
      language: string;
      theme: string;
      title: string;
    };
  };
  icon: {
    fixed: {
      src: string;
    };
  };
  spt: {
    publicURL: string;
  };
};

/**
 * HTML Head
 * @component
 *
 * @param   {object} location router location info
 * @returns {component}       <Head location={location} />
 */
const Head: React.FC<HeadProps> = ({ location }) => {
  const {
    icon,
    spt,
    meta: {
      siteMetadata: { author, description, language, theme, title },
    },
  } = useStaticQuery<Data>(graphql`
    query HeadQuery {
      meta: site {
        siteMetadata {
          author
          description
          language
          theme
          title
        }
      }
      icon: imageSharp(fixed: { originalName: { regex: "/icon/" } }) {
        fixed {
          src
        }
      }
      spt: file(dir: { regex: "/images/" }, name: { regex: "/safari/" }) {
        publicURL
      }
    }
  `);

  let baseURL = '/';
  let path = '';

  if (location) {
    baseURL = location.origin;
    path = location.pathname;
  }
  const schemaOrgJSONLD = {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    name: title,
    url: `${baseURL}`,
  };
  // Font loading via FontFace API to avoid FOUT
  const fontFace = `
    if ('fonts' in document) {
      const stranger = new FontFace(
        'Stranger',
        "url(/fonts/Stranger.woff2) format('woff2'), url(/fonts/Stranger.woff) format('woff')",
        { weight: '700' }
      );
      const strangerSlim = new FontFace(
        'Stranger Slim',
        "url(/fonts/Stranger-Slim.woff2) format('woff2'), url(/fonts/Stranger-Slim.woff) format('woff')",
      );
      const dharma = new FontFace(
        'Dharma',
        "url(/fonts/Dharma.woff2) format('woff2'), url(/fonts/Dharma.woff) format('woff')",
        { weight: '700' }
      );
      const lulo = new FontFace(
        'Lulo One',
        "url(/fonts/Lulo-One.woff2) format('woff2'), url(/fonts/Lulo-One.woff) format('woff')",
        { weight: '900' }
      );
      Promise.all([stranger.load(), strangerSlim.load(), dharma.load(), lulo.load()]).then(fonts => {
        for (const font of fonts) {
          document.fonts.add(font);
        }
      });
    }
  `;

  return (
    <>
      <Helmet
        title={title}
        meta={[
          { property: 'author', content: author },
          { name: 'description', content: description },
          { name: 'image', content: `${baseURL}${icon.fixed.src}` },
          { property: 'og:description', content: description },
          { property: 'og:image', content: `${baseURL}${icon.fixed.src}` },
          { property: 'og:image:type', content: 'image/png' },
          { property: 'og:image:width', content: '512' },
          { property: 'og:image:height', content: '512' },
          { property: 'og:site_name', content: title },
          { property: 'og:title', content: title },
          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: `${baseURL}${path}` },
          { name: 'twitter:card', content: 'summary' },
          { name: 'twitter:description', content: description },
          { name: 'twitter:image', content: `${baseURL}${icon.fixed.src}` },
          { name: 'twitter:title', content: title },
          { name: 'apple-mobile-web-app-capable', content: 'yes' },
          {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black',
          },
          { name: 'apple-mobile-web-app-title', content: title },
        ]}
      >
        <html lang={language} />
        <link rel="canonical" href={`${baseURL}${path}`} />
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>

        <link
          rel="mask-icon"
          color={theme}
          href={`${baseURL}${spt.publicURL}`}
        />
        <script type="text/javascript">{fontFace}</script>
      </Helmet>
    </>
  );
};

export default Head;
