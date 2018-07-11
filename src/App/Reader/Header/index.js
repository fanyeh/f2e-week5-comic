import React, { Component } from 'react';
import Menu from './Menu';
import Mode from './Mode';
import Title from './Title';
import { Flex } from '../../../styles/layout';

class Header extends Component {
  state = { dayMode: true };

  switchHandler = () => {
    this.setState(({ dayMode }) => ({ dayMode: !dayMode }));
  };

  render() {
    return (
      <StyledHeader>
        <Title>My Hexschool</Title>

        <Menu items={['Chapter 1', 'Chapter 2']} />
        <Menu items={['Page 1', 'Page 2']} />

        <Mode switchHandler={this.switchHandler} dayMode={this.state.dayMode} />
      </StyledHeader>
    );
  }
}

export default Header;

const StyledHeader = Flex.extend`
  align-items: center;
  margin-bottom: 1.5rem;
`;
