import React from 'react';
import styled from 'styled-components';

import InlineList from './inline-list';

const TagsStyle = styled(InlineList)`
  margin-left: 0;
  padding: 0;
  margin: 1em 0 2em 0;

  &:before {
    content: 'Tags:';
    font-weight: bold;
    font-size: 0.9em;
    margin-right: 0em;
  }

  li {
    font-size: 0.9em;
    margin-right: 0;
    cursor: default;
  }

  li:before {
    content: '#';
  }

  li:after {
    content: ', ';
  }

  li:last-child:after {
    content: '';
  }
`;

function Tag({ children }) {
  return <>{children}</>;
}

export default function Tags({ children }) {
  return (
    <TagsStyle>
      {children.map((child, i) => (
        <li key={i}>{child}</li>
      ))}
    </TagsStyle>
  );
}

Tags.Tag = Tag;
