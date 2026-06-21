import React from 'react';
import styled from 'styled-components';

import InlineList from './inline-list';

const NavMenuStyle = styled(InlineList)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  font-size: ${props => (props.fullscreen ? `1.2em` : `1.05em`)};
  margin: 0;

  @media (max-width: 650px) {
    font-size: 1em;
  }
`;

export default function NavMenu({ children, fullscreen }) {
  return (
    <NavMenuStyle fullscreen={fullscreen} role="navigation">
      {children.map((child, i) => (
        <li key={i}>{child}</li>
      ))}
    </NavMenuStyle>
  );
}
