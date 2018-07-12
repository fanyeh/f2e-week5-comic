import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex } from '../../styles/layout';
import { absCenter } from '../../styles/position';
class PreviewSlider extends Component {
  constructor(props) {
    super(props);
    this.state = { visibleSlideIndexes: this.getVisibleSlideIndexes() };
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentSlideIndex } = this.props;
    if (this.state.visibleSlideIndexes.indexOf(currentSlideIndex) === -1) {
      this.setState({
        visibleSlideIndexes: this.getVisibleSlideIndexes(),
      });
    } else {
      const { visibleSlideIndexes } = this.state;
      const index = visibleSlideIndexes.indexOf(prevProps.currentSlideIndex);
      if (currentSlideIndex > prevProps.currentSlideIndex && index === 5) {
        // Next
        this.updateVisibleSlideIndexes(1);
      } else if (currentSlideIndex < prevProps.currentSlideIndex && index === 1) {
        // Prev
        this.updateVisibleSlideIndexes(-1);
      }
    }
  }

  getVisibleSlideIndexes = () => {
    const { slides, currentSlideIndex } = this.props;
    if (currentSlideIndex <= slides.length - 5) {
      return Array.from(Array(7)).map((x, i) => i - 1 + currentSlideIndex);
    }
    return Array.from(Array(7)).map(
      (x, i) => i - ((currentSlideIndex % 7) + 1) + currentSlideIndex,
    );
  };

  updateVisibleSlideIndexes = offset => {
    this.setState({
      visibleSlideIndexes: this.state.visibleSlideIndexes.map(slideIndex => slideIndex + offset),
    });
  };

  prevSlideHandler = () => {
    const { visibleSlideIndexes } = this.state;
    const { currentSlideIndex, slideHandler } = this.props;
    if (currentSlideIndex !== 0) {
      if (visibleSlideIndexes.indexOf(currentSlideIndex) === 1) {
        this.updateVisibleSlideIndexes(1);
      }
      slideHandler(currentSlideIndex - 1);
    }
  };

  nextSlideHandler = () => {
    const { visibleSlideIndexes } = this.state;
    const { currentSlideIndex, slideHandler, slides } = this.props;
    if (currentSlideIndex < slides.length - 1) {
      if (visibleSlideIndexes.indexOf(currentSlideIndex) === 5) {
        this.updateVisibleSlideIndexes(-1);
      }
      slideHandler(currentSlideIndex + 1);
    }
  };

  render() {
    const { visibleSlideIndexes } = this.state;
    const { slides, currentSlideIndex } = this.props;
    return (
      <div>
        <SlideContainer>
          {visibleSlideIndexes.map((slideIndex, index) => (
            <Slide
              data-testid="visible-slide"
              data-slideindex={slideIndex}
              key={slideIndex}
              data-select={currentSlideIndex === slideIndex}
              title={index > 0 && index < 6 ? slideIndex + 1 : ''}
            >
              <Image data-testid="slide-image" src={slides[slideIndex]} alt="" />
            </Slide>
          ))}
          <Overlay next>
            {currentSlideIndex === slides.length - 1 && (
              <ChapterButton data-testid="next-chapter" title="NEXT CHAPTER">
                <i className="fas fa-angle-double-right" />
              </ChapterButton>
            )}
          </Overlay>

          <Overlay prev>
            {currentSlideIndex === 0 && (
              <ChapterButton data-testid="prev-chapter" title="PREV CHAPTER">
                <i className="fas fa-angle-double-left" />
              </ChapterButton>
            )}
          </Overlay>
        </SlideContainer>

        <Control>
          <SlideButton data-testid="prev-slide" onClick={this.prevSlideHandler}>
            <i className="fas fa-caret-left" />
          </SlideButton>
          <SlideButton data-testid="next-slide" onClick={this.nextSlideHandler}>
            <i className="fas fa-caret-right" />
          </SlideButton>
        </Control>
      </div>
    );
  }
}

PreviewSlider.defaultProps = {
  currentSlideIndex: 0,
};

export default PreviewSlider;

const SlideContainer = Flex.extend`
  margin-bottom: 1rem;
  justify-content: space-between;
  position: relative;
  align-items: center;
  width: 42.49rem;
  left: 50%;
  transform: translateX(-50%);
  &:before {
    content: '';
    position: absolute;
    width: 1.87rem;
    height: 100%;
    background: #f2f2f2;
    left: 0;
    z-index: 1;
  }
  &:after {
    content: '';
    position: absolute;
    width: 1.87rem;
    height: 100%;
    background: #f2f2f2;
    right: 0;
    z-index: 1;
  }
`;

const Slide = styled.div`
  width: 5rem;
  height: 7.5rem;
  position: relative;
  border: 4px solid rgba(0, 0, 0, 0.1);

  &[data-select='false'] {
    &:before {
      content: attr(title);
      font-weight: 700;
      font-size: 0.8rem;
      position: absolute;
      top: -1.25rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &[data-select='true'] {
    border: 4px solid black;
    &:before {
      content: '';
      width: 0;
      height: 0;
      border-left: 1rem solid transparent;
      border-right: 1rem solid transparent;
      border-bottom: 1rem solid black;
      position: absolute;
      top: -1rem;
      left: 50%;
      transform: translateX(-50%);
    }

    &:after {
      content: '';
      width: 5rem;
      height: 1rem;
      position: absolute;
      left: -0.25rem;
      bottom: -2.4rem;
      background: black;
    }
  }
`;

const Image = styled.img`
  width: 100%;
`;

const Control = Flex.extend`
  justify-content: space-between;
  height: 1.25rem;
  border-top: 4px solid black;
  border-bottom: 4px solid black;
`;

const Overlay = styled.div`
  width: 3.14rem;
  height: 7.5rem;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => (props.next ? 'right:1.87rem' : 'left:1.87rem')};
`;

const ChapterButton = styled.div`
  width: 100%;
  height: 100%;
  background: #50ff44;
  position: relative;
  & > i {
    font-size: 1.87rem;
    ${absCenter};
  }

  &:before {
    content: attr(title);
    font-size: 0.9rem;
    padding: 0.75rem 0.5rem;
    background: #50ff44;
    position: absolute;
    top: -4rem;
    white-space: nowrap;
    font-weight: 700;
    left: 50%;
    transform: translateX(-50%);
  }
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-left: 1rem solid transparent;
    border-right: 1rem solid transparent;
    border-top: 1rem solid #50ff44;
    top: -1.75rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const SlideButton = styled.div`
  background: black;
  color: white;
  width: 3.13rem;
  position: relative;
  & > i {
    ${absCenter};
  }
`;
