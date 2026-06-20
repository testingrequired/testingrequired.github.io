import React from 'react';
import Layout from '../layouts';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import { Helmet } from 'react-helmet';

export default function Projects({ data }) {
  const { siteMetadata } = data.site;
  const title = `Projects - ${siteMetadata.title}`;

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>

        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content="Projects I'm currently working on"
        />
      </Helmet>

      <h2 style={{ fontSize: '2em' }}>Projects</h2>

      <section style={{ marginBottom: '2em' }}>
        <h3>
          <OutboundLink href="https://github.com/testingrequired/reqlang">
            📄 Request Language (reqlang)
          </OutboundLink>
        </h3>
        <p>
          A file format specification for defining HTTP requests, response
          assertions, and associated data/configuration in "request files".
        </p>
        <ul>
          <li>
            Declare what prompts, secrets, and environment specific variables a
            request needs.
          </li>
          <li>
            Write requests using{' '}
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages#http_requests">
              HTTP Request
            </a>{' '}
            messages.
          </li>
          <li>
            Write tests using{' '}
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages#http_responses">
              HTTP Response
            </a>{' '}
            messages.
          </li>
          <li>
            A{' '}
            <a href="https://github.com/testingrequired/reqlang#vs-code">
              language extension
            </a>{' '}
            for Visual Studio Code providing an in-editor REST client. The
            language server also provides language diagnostics.
          </li>
        </ul>

        <h4>Tools</h4>

        <ul>
          <li>
            <a href="https://github.com/testingrequired/reqlang-web-client">
              reqlang-web-client
            </a>{' '}
            A web/desktop HTTP REST client for reqlang files.
          </li>
          <li>
            <a href="https://github.com/testingrequired/reqlang-expr">
              reqlang-expr
            </a>{' '}
            A bytecode interpreted language powering reqlang's templating
            engine.
          </li>
          <li>
            <a href="https://github.com/testingrequired/reqlang-expr-tspl">
              reqlang-expr-tspl
            </a>{' '}
            A toy transpiler for reqlang-expr to typescript.
          </li>
        </ul>
      </section>

      <section>
        <h3>
          <OutboundLink href="https://github.com/egonlang/egonlang">
            👻 Egon
          </OutboundLink>
        </h3>

        <p>
          A (toy) statically typed interpreted language for learning
          type-checking and type inference.
        </p>
      </section>

      <section>
        <h3>
          <OutboundLink href="https://github.com/kyleect/locks">
            🔓 Locks
          </OutboundLink>
        </h3>

        <p>
          A toy bytecode VM language branched from{' '}
          <a href="https://craftinginterpreters.com/the-lox-language.html">
            Lox
          </a>{' '}
          to learn implementing new language syntax.
        </p>

        <p>
          Forked from{' '}
          <a href="https://github.com/ajeetdsouza/loxcraft">loxcraft</a> with
          additional features and fixes:
        </p>

        <ul>
          <li>
            <a href="https://kyleect.github.io/locks/#/?code=DYUwLgBAhhC8EEYBMBmA3EA">
              Shareable links
            </a>{' '}
            for the online playground.
          </li>
          <li>
            Implemented an{' '}
            <a href="https://kyleect.github.io/locks/#/docs#example">
              embeddable version
            </a>{' '}
            of the playground's editor.
          </li>
          <li>
            Interactive language{' '}
            <a href="https://kyleect.github.io/locks/#/docs">documentation</a>{' '}
            using the embedded playground editor for{' '}
            <a href="https://kyleect.github.io/locks/#/docs#functions-as-values">
              runnable
            </a>{' '}
            <a href="https://kyleect.github.io/locks/#/docs#closures">code</a>{' '}
            <a href="https://kyleect.github.io/locks/#/docs#string-concatenation">
              examples
            </a>
            .
          </li>
          <li>
            A{' '}
            <a href="https://github.com/kyleect/locks#vs-code-extension">
              language extension
            </a>{' '}
            for Visual Studio Code. It integrates with the language server to
            provide the editor with language diagnostics. The extension also
            provides utility like viewing AST when hover over code.
          </li>
          <li>
            <a href="https://github.com/kyleect/locks/blob/main/Dockerfile">
              Dockerized
            </a>{' '}
            the <code>locks</code> binary to lower the barrier for trying out
            the language.
          </li>
          <li>
            <a href="https://github.com/kyleect/locks#changes-made">
              Full list of features and fixes.
            </a>{' '}
            Include several changes to syntax from the original project.
          </li>
        </ul>
      </section>

      <section>
        <h3>
          <OutboundLink href="https://github.com/testingrequired/attempted">
            Attempted
          </OutboundLink>
        </h3>

        <p>Typed error handling for function calls in Typescript.</p>
      </section>

      <section>
        <h3>
          <OutboundLink href="https://github.com/testingrequired/the-testing-book">
            📕 The Testing Book
          </OutboundLink>
        </h3>

        <p>A (work in progress) software engineering guide to testing.</p>
      </section>

      <section>
        <h3>
          <OutboundLink href="https://github.com/testingrequired/bespin">
            🌌 bespin
          </OutboundLink>
        </h3>

        <p>A framework for test frameworks writting in Typescript.</p>
      </section>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ProjectsPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
