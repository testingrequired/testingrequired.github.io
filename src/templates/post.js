import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Layout from '../layouts';
import moment from 'moment';

export default function Template({ data }) {
  const { siteMetadata } = data.site;
  const { frontmatter, html, excerpt } = data.markdownRemark;
  const { title, date } = frontmatter;

  const formattedDate = moment(date).format('MMMM Do YYYY');

  return (
    <Layout>
      <Helmet>
        <title>{`${title} - ${siteMetadata.title}`}</title>

        <meta
          property="og:title"
          content={`${title} - ${siteMetadata.title}`}
        />
        <meta property="og:description" content={excerpt} />

        <meta property="og:type" content="article" />
        <meta property="article:author" content="Kylee Tilley" />
      </Helmet>

      <div className="blog-post-container">
        <div className="blog-post">
          <h1>{title}</h1>

          <p
            style={{
              fontSize: '1.1em',
              marginBottom: '2em',
            }}
          >
            <span>📅</span>{' '}
            <span
              style={{
                fontStyle: 'italic',
              }}
            >
              {formattedDate}
            </span>
          </p>

          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </Layout>
  );
}
export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      excerpt
      frontmatter {
        date
        title
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
