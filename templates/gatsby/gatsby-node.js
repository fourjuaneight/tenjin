const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

const POST_ARCHIVE_SLUG = `
  {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            slug
            tags
          }
        }
      }
    }
  }
`;

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(POST_ARCHIVE_SLUG).then(results => {
      const posts = results.data.allMarkdownRemark.edges;
      posts.forEach(({ node }) => {
        // Create single template
        createPage({
          path: `/blog/${node.frontmatter.slug}`,
          component: path.resolve(`./src/templates/single.js`),
          context: {
            slug: node.frontmatter.slug,
          },
        });
        // Create list template
        const postsPerPage = 5;
        const numPages = Math.ceil(posts.length / postsPerPage);
        const list = Array.from({ length: numPages });
        list.forEach((_, i) => {
          createPage({
            path: i === 0 ? `/` : `/${i + 1}`,
            component: path.resolve(`./src/templates/list.js`),
            context: {
              currentPage: i + 1,
              limit: postsPerPage,
              numPages,
              skip: i * postsPerPage,
            },
          });
        });
        // Create tags template
        const tagSet = new Set();
        node.frontmatter.tags.forEach(tag => {
          tagSet.add(tag);
        });
        const tagList = Array.from(tagSet);
        tagList.forEach(tag => {
          createPage({
            path: `/tags/${tag}/`,
            component: path.resolve(`./src/templates/taxonomies.js`),
            context: {
              tag,
            },
          });
        });
      });
      resolve();
      if (results.errors) {
        console.log(results.errors);
        reject(results.errors);
      }
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
