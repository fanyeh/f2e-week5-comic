import React from 'react';
import { HeadingPrimary } from '../styles/typography';
import styled from 'styled-components';
const Header = () => {
  return (
    <StyledHeader>
      <HeadingPrimary>comicomic</HeadingPrimary>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  background: black;
  padding: 1rem 0;
`;
