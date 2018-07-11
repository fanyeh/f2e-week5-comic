import React, { Component } from 'react';
import Menu from './Menu';
import Mode from './Mode';
import Title from './Title';
import { Flex } from '../../../styles/layout';
import slides from '../../../slides';
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
        <Menu items={slides.map((slide, index) => `Page${index + 1}`)} />

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
