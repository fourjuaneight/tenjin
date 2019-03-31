import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

import next from '../images/next.svg';
import previous from '../images/previous.svg';

/* eslint-disable react/destructuring-assignment */
export default class Tags extends Component {
  render() {
    const { currentPage, numPages } = this.props.pageContext;
    const { allMarkdownRemark } = this.props.data;
    const { location } = this.props;
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const nextPage = (currentPage + 1).toString();
    const prevPage = currentPage - 1 === 1 ? `/` : (currentPage - 1).toString();
    return (
      <Layout location={location}>
        <main>
          <h1>Archive</h1>
          {allMarkdownRemark.edges.map(({ node }) => {
            const { date, slug, tags, title } = node.frontmatter;
            return (
              <article key={slug}>
                <h2>
                  <Link to={`/blog/${slug}`}>{title}</Link>
                </h2>
                <time dateTime={date}>{date}</time>
                <section className="content">{node.excerpt}</section>
                <ul>
                  {tags.map((tag, i) => {
                    return (
                      <li key={i}>
                        <Link to={`/tags/${tag}`}>{tag}</Link>
                      </li>
                    );
                  })}
                </ul>
              </article>
            );
          })}
          {!isFirst && (
            <Link to={`/${prevPage}`} aria-label="Previous page">
              <img
                src={previous}
                alt="Previous Page"
                style={{ height: `35px`, width: `35px` }}
              />
            </Link>
          )}
          {!isLast && (
            <Link to={`/${nextPage}`} aria-label="Next page">
              <img
                src={next}
                alt="Next Page"
                style={{ height: `35px`, width: `35px` }}
              />
            </Link>
          )}
        </main>
      </Layout>
    );
  }
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    numPages: PropTypes.number.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.object.isRequired,
  }),
  location: PropTypes.object.isRequired,
};

export const query = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            date
            slug
            tags
            title
          }
        }
      }
    }
  }
`;
