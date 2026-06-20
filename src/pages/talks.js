import React from 'react';
import Layout from '../layouts';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import { Helmet } from 'react-helmet';

export default function Talks({ data }) {
  const { siteMetadata } = data.site;
  const title = `Talks - ${siteMetadata.title}`;

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>

        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content="Some stuff I've talked about"
        />
      </Helmet>

      <h2 style={{ fontSize: '2em' }}>Talks</h2>

      <ul>
        <li>
          <OutboundLink href="https://www.ministryoftesting.com/testbash-talks/11967ffe?s_id=14784899">
            {`Transcending The Tools`}
          </OutboundLink>{' '}
          @ Test.Bash() 2022{' '}
          <OutboundLink href="https://docs.google.com/presentation/d/1Po5RHzyJ--s7kDGY2jI_KxyqQJnNrvbREiF-35rCnvY/edit?usp=sharing">
            (slides)
          </OutboundLink>
        </li>
        <li>
          <OutboundLink href="https://docs.google.com/presentation/d/1lWyIckm1lCITqxoRLYA0nLO3hKZ6hp11dtfbaKeHc7w/edit?usp=sharing">
            {`Performance, Stress and Load Testing, Oh My!`}
          </OutboundLink>{' '}
          2020 (slides only)
        </li>
        <li>
          <OutboundLink href="https://devopsdays.org/events/2019-des-moines/program/kylee-tilley/">
            {`QA: A Task Not A Role`}
          </OutboundLink>{' '}
          @ devopsdays dsm 2019{' '}
          <OutboundLink href="https://docs.google.com/presentation/d/1Zuvq4iNhYT9ousGXRe-TdJrx8hd7D0aQ0-XlhFVkji4/edit?usp=sharing">
            (slides)
          </OutboundLink>
        </li>
        <li>
          <OutboundLink href="https://docs.google.com/presentation/d/1ntsjTF2R8SEI66FJFBjAaheN-6mfBsP_ZqgBsGM78HM/edit?usp=sharing">
            {`Reading Pull Requests: Features, Fixes & Other Diviniations`}
          </OutboundLink>{' '}
          2019 (slides only){' '}
          <OutboundLink href="https://github.com/testingrequired/talk-reading-pull-requests">
            Repo
          </OutboundLink>
        </li>
        <li>
          <OutboundLink href="https://docs.google.com/presentation/d/1FgutMD7VdJMNMcz0dp9gw5_9CRPLnoaYQXHtJEDJyxQ/edit?usp=sharing">
            {`Modern Page Objects`}
          </OutboundLink>{' '}
          2018 (slides only)
        </li>
      </ul>

      <h2>Want To Hear Me Speak?</h2>

      <section>
        <ul>
          <li>Talks</li>
          <li>Workshops</li>
          <li>Mobbing, pairing, one-on-one</li>
          <li>Customized</li>
          <li>
            <span role="img" aria-label="Laptop">
              💻
            </span>
            <span role="img" aria-label="Explosion">
              💥
            </span>{' '}
            Live coding
          </li>
        </ul>
      </section>

      <section>
        <h3>Contact</h3>

        <p>
          <span role="img" aria-label="Email">
            ✉️
          </span>{' '}
          kyleetilley[at]gmail.com
        </p>
      </section>
    </Layout>
  );
}

export const pageQuery = graphql`
  query TalksPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
