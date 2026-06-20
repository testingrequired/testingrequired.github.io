import React from 'react';
import { graphql } from 'gatsby';
import Link from 'gatsby-link';
import Layout from '../layouts';
import { Helmet } from 'react-helmet';

export default function Index({ data }) {
  const { siteMetadata } = data.site;
  const title = `Blog - ${siteMetadata.title}`;

  const { edges: posts } = data.allMarkdownRemark;
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>

        <meta property="og:title" content={title} />
      </Helmet>

      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => {
          return (
            <div key={post.id}>
              <h2>
                <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
              </h2>
              <p>
                {post.frontmatter.date} &mdash; {post.excerpt}
              </p>
            </div>
          );
        })}
    </Layout>
  );
}
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date
            path
          }
        }
      }
    }

    site {
      siteMetadata {
        title
      }
    }
  }
`;
