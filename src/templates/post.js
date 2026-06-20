import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Layout from '../layouts';
import moment from 'moment';
import PostTags from '../components/post-tags';
import styled from 'styled-components';

export default function Template({ data }) {
  const { siteMetadata } = data.site;
  const { frontmatter, html, excerpt, tableOfContents } = data.markdownRemark;
  const { title, date, tags } = frontmatter;

  const formattedDate = moment(date).format('MMMM Do YYYY');

  const dateAndTags = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '1em 0 1em 0',
      }}
    >
      <p
        style={{
          fontSize: '0.9em',
          margin: 0,
        }}
      >
        <span style={{ fontWeight: 'bold' }}>Published: </span>{' '}
        <span
          style={{
            fontStyle: 'italic',
          }}
        >
          {formattedDate}
        </span>
      </p>

      {tags && <PostTags tags={tags} />}
    </div>
  );

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
          <h1 style={{ marginBottom: tags ? 0 : '0.5em' }}>{title}</h1>

          {dateAndTags}

          <hr style={{ margin: '2.5em 0' }} />

          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <hr style={{ margin: '2.5em 0' }} />

          {dateAndTags}
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
        tags
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
