import React, { Component } from 'react';
import Menu from './Menu';
import Mode from './Mode';
import Title from './Title';
import { Flex } from '../../../styles/layout';
import slides from '../../../slides';
import { ReaderContext } from '../ReaderContext';
const Header = () => {
  return (
    <ReaderContext.Consumer>
      {value => (
        <StyledHeader>
          <Title>My Hexschool</Title>

          <Menu
            items={['Chapter 1', 'Chapter 2']}
            headingIndex={value.currentChapterIndex}
            clickHandler={value.chapterHandler}
            dark={value.dayMode}
          />
          <Menu
            items={slides.map((slide, index) => `Page${index + 1}`)}
            headingIndex={value.currentSlideIndex}
            clickHandler={value.slideHandler}
            dark={value.dayMode}
          />
          <Mode switchHandler={value.modeHandler} dayMode={value.dayMode} />
        </StyledHeader>
      )}
    </ReaderContext.Consumer>
  );
};

export default Header;

const StyledHeader = Flex.extend`
  align-items: center;
  margin-bottom: 1.5rem;
`;
