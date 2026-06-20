import React from 'react';
import { graphql } from 'gatsby';
import Link from 'gatsby-link';
import Layout from '../layouts';
import { Helmet } from 'react-helmet';
import moment from 'moment';

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
          const formattedDate = moment(post.frontmatter.date).format(
            'MMMM Do YYYY'
          );

          return (
            <div key={post.id}>
              <h2>
                <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
              </h2>
              <p>
                <span style={{ fontStyle: 'italic' }}>{formattedDate}</span>{' '}
                &mdash; {post.excerpt}
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
