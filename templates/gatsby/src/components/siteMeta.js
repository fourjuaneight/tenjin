import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { graphql, StaticQuery } from 'gatsby';

// Favicon
import Icon from '../images/icon.png';

const Meta = ({ pathname }) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteMetadata {
          site {
            siteMetadata {
              description
              siteUrl
              social
              title
            }
          }
        }
      `}
      render={({
        site: {
          siteMetadata: { siteUrl, title, description, social },
        },
      }) => {
        return (
          <Helmet defaultTitle={title} titleTemplate={`%s | ${title}`}>
            <html lang="en" />
            <meta name="description" content={description} />
            <meta
              name="viewport"
              content="width=device-width,minimum-scale=1.0,initial-scale=1.0,maximum-scale=5.0,viewport-fit=cover"
            />
            <link rel="canonical" href={`${siteUrl}${pathname}`} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content={`@${social}`} />
            <meta name="twitter:creator" content={`@${social}`} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:site_name" content={title} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${siteUrl}${Icon}`} />
            <meta itemProp="name" content={title} />
            <meta itemProp="description" content={description} />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta
              name="apple-mobile-web-app-status-bar-style"
              content="black"
            />
            <meta name="apple-mobile-web-app-title" content={title} />
          </Helmet>
        );
      }}
    />
  );
};

Meta.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default Meta;
