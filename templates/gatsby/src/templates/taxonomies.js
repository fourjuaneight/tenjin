import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

/* eslint-disable react/destructuring-assignment */
export default class Taxonomies extends Component {
  render() {
    const { tag } = this.props.pageContext;
    const { allMarkdownRemark } = this.props.data;
    const { location } = this.props;
    return (
      <Layout location={location}>
        <main>
          <h1>{tag}</h1>
          {allMarkdownRemark.edges.map(({ node }) => {
            const { date, slug, title } = node.frontmatter;
            return (
              <article key={slug}>
                <h2>
                  <Link to={`/blog/${slug}`}>{title}</Link>
                </h2>
                <time dateTime={date}>{date}</time>
                <section className="content">{node.excerpt}</section>
              </article>
            );
          })}
        </main>
      </Layout>
    );
  }
}

Taxonomies.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.object.isRequired,
  }),
  location: PropTypes.object.isRequired,
};

export const query = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            date
            title
            slug
          }
        }
      }
    }
  }
`;
