import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReaderContext } from '../ReaderContext';
const Title = ({ children }) => {
  return (
    <ReaderContext.Consumer>
      {value => (
        <StyledTitle dark={value.dayMode}>
          {children}
          <i data-testid="icon" className="fas fa-caret-right" />
        </StyledTitle>
      )}
    </ReaderContext.Consumer>
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
  color: ${props => (props.dark ? 'black' : 'white')};
  line-height: 1.5rem;
  & > i {
    margin-left: 0.5rem;
  }
`;
