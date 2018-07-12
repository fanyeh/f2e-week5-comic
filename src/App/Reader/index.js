import React, { Component } from 'react';
import Header from './Header';
import ContentSlider from './ContentSlider';
import PreviewSlider from './PreviewSlider';
import { Page } from '../../styles/layout';
import slides from '../../slides';
import { ReaderProvider } from './ReaderContext';
import styled from 'styled-components';
class Reader extends Component {
  state = { dayMode: true, currentSlideIndex: 0, currentChapterIndex: 0 };

  modeHandler = () => {
    this.setState(({ dayMode }) => ({ dayMode: !dayMode }));
  };

  slideHandler = newSlideIndex => {
    this.setState({ currentSlideIndex: newSlideIndex });
  };

  chapterHandler = newChapterIndex => {
    this.setState({ currentChapterIndex: newChapterIndex });
  };

  sliderProps = () => {
    return {
      slideHandler: this.slideHandler,
      slides: slides,
      ...this.state,
    };
  };

  contextValue = () => {
    return {
      ...this.state,
      modeHandler: this.modeHandler,
      slideHandler: this.slideHandler,
      chapterHandler: this.chapterHandler,
    };
  };

  render() {
    return (
      <ReaderProvider value={this.contextValue()}>
        <StyledBackground dayMode={this.state.dayMode}>
          <Page>
            <Header />
            <ContentSlider {...this.sliderProps()} />
            <PreviewSlider {...this.sliderProps()} />
          </Page>
        </StyledBackground>
      </ReaderProvider>
    );
  }
}

export default Reader;

const StyledBackground = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => !props.dayMode && 'black'};
`;
