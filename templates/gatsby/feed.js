import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import Image from '../components/images';

/* eslint-disable react/destructuring-assignment */
export default class BlogList extends Component {
  render() {
    const { allMarkdownRemark } = this.props.data;
    const { location } = this.props;
    return (
      <Layout location={location}>
        <main className="">
          <ul className="">
            <li className="">
              <h2 className="">Recent Insights</h2>
            </li>
            {allMarkdownRemark.edges.map(({ node }) => {
              const {
                date,
                image,
                slug,
                tags,
                title,
              } = node.frontmatter;
              return (
                <li key={slug} className="">
                  <Image filename={image} alt={} style={} />
                  <article className="">
                    <h2 className="">
                      <Link to={`/${slug}`} className="">
                        {title}
                      </Link>
                    </h2>
                    <time dateTime={date}>{date}</time>
                    <p className="">{tags}</p>
                    <p className="">{node.excerpt}</p>
                  </article>
                </li>
              );
            })}
          </ul>
        </main>
      </Layout>
    );
  }
}

BlogList.propTypes = {
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
            image
            slug
            tags
            title
          }
        }
      }
    }
  }
`;
