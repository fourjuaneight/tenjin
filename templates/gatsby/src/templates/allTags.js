import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

const Tags = () => {
  const data = useStaticQuery(graphql`
    query TagsList {
      allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  return (
    <main>
      <h1>Tags</h1>
      <ul>
        {data.allMarkdownRemark.group.map(tag => {
          return (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${tag.fieldValue}/`}>{tag.fieldValue}</Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Tags;
