import React from 'react';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import moment from 'moment';
import Layout from '../layouts';
import PostTags from '../components/post-tags';

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

      <h1
        style={{
          fontSize: '1.25em',
          border: '1px dotted #333',
          padding: '0.5em',
          marginBottom: '2em',
        }}
      >
        Posts tagged “{tag}”
      </h1>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {postData.map(({ frontmatter, excerpt, fields, html, id }) => {
          const formattedDate = moment(frontmatter.date).format('MMMM Do YYYY');

          return (
            <li key={id} style={{ marginBottom: '2em' }}>
              <h2 style={{ fontSize: '1.2em', marginBottom: '1em' }}>
                <Link to={frontmatter.path}>{frontmatter.title}</Link>
              </h2>

              <p style={{ marginBottom: '1em' }}>
                <span style={{ fontStyle: 'italic' }}>{formattedDate}</span>{' '}
                &mdash; {excerpt}
              </p>

              {frontmatter.tags && <PostTags tags={frontmatter.tags} />}
            </li>
          );
        })}
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
            tags
          }
          excerpt(pruneLength: 140)
        }
      }
    }
  }
`;
