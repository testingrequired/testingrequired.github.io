import React from 'react';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import moment from 'moment';
import Layout from '../layouts';

export default function TagTemplate({ pageContext, data }) {
  const { tag, posts } = pageContext;
  const { siteMetadata } = data.site;

  // We already have the paths, but we also want title+date for display.
  // Pull the needed fields for *only* the posts that belong to this tag.
  const postData = data.allMarkdownRemark.edges.map(e => e.node);

  return (
    <Layout>
      <Helmet>
        <title>{`Tag: ${tag} - ${siteMetadata.title}`}</title>
      </Helmet>

      <h1>Posts tagged “{tag}”</h1>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {postData.map(({ frontmatter, excerpt, fields, html }) => (
          <li key={frontmatter.path} style={{ marginBottom: '2rem' }}>
            <h2>
              <Link to={frontmatter.path}>{frontmatter.title}</Link>
            </h2>
            <p style={{ fontStyle: 'italic' }}>
              {moment(frontmatter.date).format('MMMM Do YYYY')}
            </p>
            <p>{excerpt}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

// Query only the posts whose path is in the context‐provided array
export const pageQuery = graphql`
  query($posts: [String!]!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: { frontmatter: { path: { in: $posts } } }) {
      edges {
        node {
          frontmatter {
            title
            path
            date
          }
          excerpt(pruneLength: 140)
        }
      }
    }
  }
`;
