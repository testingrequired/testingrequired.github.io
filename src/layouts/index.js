import React from 'react';
import { Helmet } from 'react-helmet';
import Link from 'gatsby-link';
import { StaticQuery, graphql } from 'gatsby';
import { Location } from '@reach/router';

import Site from '../components/site';
import Header from '../components/header';
import Content from '../components/content';

import './base.css';
import NavMenu from '../components/nav-menu';
import Icon from '../components/icon';

import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={({ site }) => (
      <Location>
        {({ location }) => (
          <Site>
            <Helmet>
              <title>{site.siteMetadata.title}</title>
              <link rel="me" href="https://mastodon.social/@testingrequired" />

              <meta property="og:url" content={location.href} />
            </Helmet>

            <Header fullscreen={location.pathname === '/'}>
              <h1>
                <Link to="/">
                  <span>
                    <Icon /> {site.siteMetadata.title}
                  </span>
                </Link>
              </h1>

              <NavMenu>
                <Link to="/blog">Blog</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/talks">Talks</Link>
                <Link to="/about">About</Link>
              </NavMenu>
            </Header>

            {location.pathname === '/' ? null : <Content>{children}</Content>}
          </Site>
        )}
      </Location>
    )}
  />
);
