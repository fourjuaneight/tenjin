import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/layout';

/* eslint-disable react/no-danger */
/* eslint-disable react/destructuring-assignment */
export default class single extends Component {
  render() {
    const { markdownRemark } = this.props.data;
    const { location } = this.props;
    return (
      <Layout location={location}>
        <h1>{markdownRemark.frontmatter.title}</h1>
        <time dateTime={markdownRemark.frontmatter.date}>
          {markdownRemark.frontmatter.date}
        </time>
        <p className="">{markdownRemark.frontmatter.tags}</p>
        <section
          dangerouslySetInnerHTML={{
            __html: markdownRemark.html,
          }}
        />
      </Layout>
    );
  }
}

single.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object.isRequired,
  }),
  location: PropTypes.object.isRequired,
};

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        slug
        tag
      }
    }
  }
`;
