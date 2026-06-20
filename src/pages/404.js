import React from 'react';
import Layout from '../layouts';
import { Helmet } from 'react-helmet';

const NotFoundPage = ({ data }) => {
  const { siteMetadata } = data.site;
  const title = `Page Not Found! - ${siteMetadata.title}`;

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>

        <meta property="og:title" content={title} />
        <meta property="og:description" content="Page was not found" />
      </Helmet>

      <div>
        <h1>Page Not Found</h1>
        <p>Please check the url and try again.</p>
      </div>
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query NotFoundPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
