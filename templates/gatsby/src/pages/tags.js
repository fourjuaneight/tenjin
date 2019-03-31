import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/layout';
import AllTags from '../templates/allTags';

const Tags = ({ location }) => {
  return (
    <Layout location={location}>
      <AllTags />
    </Layout>
  );
};

Tags.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Tags;
