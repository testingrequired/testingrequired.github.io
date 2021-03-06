import React from 'react';
import { Helmet } from 'react-helmet';
import Link from 'gatsby-link';
import { StaticQuery, graphql } from 'gatsby';
import { Location } from '@reach/router';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

import Site from '../components/site';
import Header from '../components/header';
import Content from '../components/content';

import './base.css';
import NavMenu from '../components/nav-menu';
import Icon from '../components/icon';

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
            <Helmet title={site.siteMetadata.title} />

            <Header fullscreen={location.pathname === '/'}>
              <h1>
                <Link to="/">
                  <Icon /> {site.siteMetadata.title}
                </Link>
              </h1>

              <NavMenu>
                <Link to="/blog">Blog</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/training">Training</Link>
                <OutboundLink href="https://twitter.com/testingrequired">
                  Twitter
                </OutboundLink>
                <OutboundLink href="https://github.com/testingrequired">
                  Github
                </OutboundLink>
              </NavMenu>
            </Header>

            {location.pathname === '/' ? null : <Content>{children}</Content>}
          </Site>
        )}
      </Location>
    )}
  />
);
