const path = require('path');

exports.createPages = async ({ actions, graphql }) => {
  const postTemplate = path.resolve(`src/templates/post.js`);

  await makePostPages(
    graphql,
    '**/blog/*.md',
    actions.createPage,
    postTemplate
  );
};

async function makePostPages(graphql, glob, createPage, template) {
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { fileAbsolutePath: { glob: "${glob}" } }
      ) {
        edges {
          node {
            frontmatter {
              path
              tags
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw new Error(result.errors);
  }

  const posts = result.data.allMarkdownRemark.edges;

  posts.forEach(post => {
    const { node } = post;

    createPage({
      path: node.frontmatter.path,
      component: template,
      context: {
        tags: node.frontmatter.tags || [],
      }, // additional data can be passed via context
    });
  });

  const tagMap = {};

  // Build a map of tag → array of post paths
  posts.forEach(({ node }) => {
    const tags = node.frontmatter.tags || [];
    tags.forEach(tag => {
      if (!tagMap[tag]) tagMap[tag] = [];
      tagMap[tag].push(node.frontmatter.path);
    });
  });

  const tagTemplate = path.resolve(`src/templates/tag.js`);

  Object.keys(tagMap).forEach(tag => {
    createPage({
      path: `/blog/tags/${tag.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`,
      component: tagTemplate,
      context: {
        tag,
        posts: tagMap[tag],
      },
    });
  });
}
