import React from 'react';
import PropTypes from 'prop-types';

export default function HTML(props) {
  return (
    <html
      {...props.htmlAttributes}
      lang="en"
      prefix="
          og: https://ogp.me/ns#
          article: https://ogp.me/ns/article#"
    >
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="Changing hearts and minds about development and testing"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Testing Required" />
        <meta property="og:image" content="/opengraph_preview.png" />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
