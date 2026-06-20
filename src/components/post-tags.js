import React from 'react';
import styled from 'styled-components';

import InlineList from './inline-list';

const PostTagsStyle = styled(InlineList)`
  margin: 0;
  padding: 0;

  &:before {
    content: 'Tags:';
    font-weight: bold;
    font-size: 0.9em;
    margin-right: 0em;
  }

  li {
    font-size: 0.9em;
    margin-right: 0;
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

export default function PostTags({ tags }) {
  return (
    <PostTagsStyle>
      {tags.map((tag, i) => (
        <li key={i}>
          <a href={`/blog/tags/${tag}`}>{tag}</a>
        </li>
      ))}
    </PostTagsStyle>
  );
}

PostTags.Tag = Tag;
