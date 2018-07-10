import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Title = ({ children }) => {
  return (
    <StyledTitle>
      {children}
      <i data-testid="icon" className="fas fa-caret-right" />
    </StyledTitle>
  );
};

Title.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Title;

export const StyledTitle = styled.h1`
  margin: 0;
  font-family: 700;
  font-size: 1.25rem;
  color: #000000;
  line-height: 1.5rem;
`;
