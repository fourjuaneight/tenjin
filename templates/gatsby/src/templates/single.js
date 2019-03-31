import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import '../scripts/barefoot';

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
        <section
          dangerouslySetInnerHTML={{
            __html: markdownRemark.html,
          }}
        />
        <ul>
          {markdownRemark.frontmatter.tags.map((tag, i) => {
            return (
              <li key={i}>
                <Link to={`/tags/${tag}`}>{tag}</Link>
              </li>
            );
          })}
        </ul>
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
        tags
      }
    }
  }
`;
