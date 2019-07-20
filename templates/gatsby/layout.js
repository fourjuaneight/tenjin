import PropTypes from 'prop-types';
import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Header from './header';
import Meta from './meta';

import '../styles/main.css';

const Layout = ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            description
            title
          }
        }
      }
    `}
    render={() => (
      <>
        <Meta pathname={location.pathname} />
        <Header siteTitle={data.site.siteMetadata.title} />
        {children}
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

Layout.defaultProps = {
  location: {
    pathname: '',
  },
};

export default Layout;
