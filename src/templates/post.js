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

  return (
    <Layout>
      <Helmet>
        <title>{`${title} - ${siteMetadata.title}`}</title>

        <meta
          property="og:title"
          content={`${title} - ${siteMetadata.title}`}
        />
        <meta property="description" content={excerpt} />
        <meta property="og:description" content={excerpt} />

        <meta property="og:type" content="article" />
        <meta property="author" content="Kylee Tilley" />
        <meta property="keywords" content={tags?.join(',') ?? ''} />
        <meta property="article:author" content="Kylee Tilley" />
      </Helmet>

      <div className="blog-post-container">
        <div className="blog-post">
          <PostTitle>{title}</PostTitle>

          <DateAndTags tags={tags} date={date} />

          <Divider />

          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <Divider />

          <DateAndTags tags={tags} date={date} />
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

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1em 0 1em 0;
`;

/**
 * @type {React.FC<{date: Date}>}
 */
const PostDate = ({ date }) => {
  const formattedDate = moment(date).format('MMMM Do YYYY');

  return (
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
  );
};

/**
 * @type {React.FC<{tags: string[], date: Date}>}
 */
const DateAndTags = ({ tags, date }) => (
  <Container>
    <PostDate date={date} />

    {tags && <PostTags tags={tags} />}
  </Container>
);

const Divider = styled.hr`
  margin: 2.5 0;
`;

const PostTitle = styled.h1`
  margin-bottom: 1em;
  font-size: 2.1em;
  letter-spacing: -0.05em;
`;
