import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styled from 'styled-components';
const Mode = ({ dayMode, switchHandler }) => {
  console.log(dayMode);
  return (
    <StyledMode day={dayMode}>
      <i data-testid="mode-day" className={classNames('fa-sun', dayMode ? 'fas' : 'far')} />
      <Switch data-testid="mode-switch" onClick={switchHandler} day={dayMode} />
      <i data-testid="mode-night" className={classNames('fa-moon', dayMode ? 'far' : 'fas')} />
    </StyledMode>
  );
};

Mode.defaultProps = {
  dayMode: true,
  switchHandler: () => {},
};

Mode.propTypes = {
  dayMode: PropTypes.bool.isRequired,
  switchHandler: PropTypes.func.isRequired,
};

export default Mode;

export const StyledMode = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  & > i {
    color: ${props => (props.day ? 'black' : 'white')};
    font-size: 1.25rem;
  }
`;

const Switch = styled.div`
  width: 3rem;
  height: 1.5rem;
  border: 2px solid;
  border-color: ${props => (props.day ? 'black' : 'white')};
  background: ${props => (props.day ? 'none' : 'white')};
  box-sizing: border-box;
  position: relative;
  margin: 0 0.5rem;
  &:before {
    content: '';
    position: absolute;
    width: 50%;
    height: 100%;
    background: black;
    transform: ${props => (props.day ? 'translateX(0)' : 'translateX(100%)')};
  }
`;
