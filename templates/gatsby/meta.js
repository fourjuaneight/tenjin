import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import icon from '../images/icon.png';

const Meta = ({ pathname }) => (
  <StaticQuery
    query={graphql`
      query SiteMetadata {
        site {
          siteMetadata {
            author
            description
            siteUrl
            title
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: { siteUrl, title, description, author },
      },
    }) => (
      <Helmet defaultTitle={title} titleTemplate={`%s | ${title}`}>
        <html lang="en" />
        <meta name="description" content={description} />
        <meta
          name="viewport"
          content="width=device-width,minimum-scale=1.0,initial-scale=1.0,maximum-scale=5.0,viewport-fit=cover"
        />
        <meta property="developer" content={author} />
        <link rel="canonical" href={`${siteUrl}${pathname}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:site_name" content={title} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${siteUrl}${icon}`} />
        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={description} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content={title} />
      </Helmet>
    )}
  />
);

Meta.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default Meta;
