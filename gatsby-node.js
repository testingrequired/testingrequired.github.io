const path = require('path');
const { createOpenGraphImage } = require('gatsby-plugin-open-graph-images');

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
            id
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
    const { node, id } = post;

    createPage({
      path: node.frontmatter.path,
      component: template,
      context: {
        id,
        tags: node.frontmatter.tags || [],
        openGraphImage: createOpenGraphImage(createPage, {
          path: `/og-image/post-${post.id}.png`,
          component: path.resolve(`src/templates/post.og-image.js`),
          size: {
            width: 400,
            height: 50,
          },
          waitCondition: 'networkidle0',
          context: {
            description: 'a image created with gatsby-plugin-open-graph-images',
          },
        }),
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
