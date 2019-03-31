import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Meta from './siteMeta';
import Header from './header';
import '../fonts/fonts.css';
import '../styles/critical.css';

const Layout = ({ children, location }) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              author
              description
              title
            }
          }
        }
      `}
      render={data => {
        return (
          <>
            <Meta pathname={location.pathname} />
            <Header
              siteTitle={data.site.siteMetadata.title}
              author={data.site.siteMetadata.author}
            />
            {children}
          </>
        );
      }}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

Layout.defaultProps = {
  location: {
    pathname: ``,
  },
};

export default Layout;
