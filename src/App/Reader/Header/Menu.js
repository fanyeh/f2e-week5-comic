import React from 'react';
import PropTypes from 'prop-types';
import Toggler from '../../../components/Toggler';
import styled, { css } from 'styled-components';
class Menu extends React.Component {
  render() {
    const { items, headingIndex, clickHandler, dayMode } = this.props;
    return items.length > 0 ? (
      <Toggler>
        {toggler => (
          <StyledMenu dark={!dayMode}>
            <Heading data-testid="title" id={toggler.id} onClick={toggler.toggle}>
              {items[headingIndex]} <i className="fas fa-sort" />
            </Heading>
            {toggler.on && (
              <Dropdown data-testid="dropdown">
                {items.map((item, index) => (
                  <DropdownItem
                    key={item}
                    data-testid="dropdown-item"
                    onClick={() => clickHandler(index)}
                  >
                    {item}
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
          </StyledMenu>
        )}
      </Toggler>
    ) : null;
  }
}

Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Menu;

const Layout = css`
  border: 2px solid black;
  padding: 0.5rem 1.5rem;
  position: relative;
`;

const StyledMenu = styled.div`
  background: ${props => (props.dark ? 'white' : 'none')};
  ${Layout};
  &:first-of-type {
    margin-left: 1.5rem;
    border-right: none;
  }
`;

const Heading = styled.h4`
  font-weight: 700;
  color: #000000;
`;

const Dropdown = styled.div`
  ${Layout};
  z-index: 5;
  padding: 0.25rem 0;
  position: absolute;
  left: -2px;
  bottom: -5px;
  transform: translateY(100%);
  width: 100%;
  text-align: center;
  background: white;
`;

const DropdownItem = Heading.extend`
  white-space: nowrap;
  padding: 0.25rem 0;
  &:hover {
    background: black;
    color: #50ff44;
  }
`;
