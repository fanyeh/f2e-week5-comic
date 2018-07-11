import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex } from '../../styles/layout';
import { absCenter } from '../../styles/position';
class PreviewSlider extends Component {
  static defaultProps = {
    currentSlideIndex: 0,
  };

  state = {
    currentSlideIndex: this.props.currentSlideIndex,
    prevPropsCurrentSlide: this.props.currentSlideIndex,
    visibleSlideIndexes: Array.from(Array(7)).map((x, i) => i - 1),
  };

  prevSlideHandler = () => {
    const { visibleSlideIndexes, currentSlideIndex } = this.state;
    if (currentSlideIndex !== 0) {
      if (visibleSlideIndexes.indexOf(currentSlideIndex) === 1) {
        this.setState({
          visibleSlideIndexes: visibleSlideIndexes.map(slideIndex => slideIndex - 1),
        });
      }
      this.setState({ currentSlideIndex: currentSlideIndex - 1 });
    }
  };

  nextSlideHandler = () => {
    const { visibleSlideIndexes, currentSlideIndex } = this.state;
    const { length } = this.props.slides;
    if (currentSlideIndex < length - 1) {
      if (visibleSlideIndexes.indexOf(currentSlideIndex) === 5) {
        this.setState({
          visibleSlideIndexes: visibleSlideIndexes.map(slideIndex => slideIndex + 1),
        });
      }
      this.setState({ currentSlideIndex: currentSlideIndex + 1 });
    }
  };

  render() {
    const { currentSlideIndex, visibleSlideIndexes } = this.state;
    const { slides } = this.props;
    return (
      <div>
        <SlideContainer>
          {visibleSlideIndexes.map(slideIndex => (
            <Slide
              data-testid="visible-slide"
              data-slideindex={slideIndex}
              key={slideIndex}
              data-select={currentSlideIndex === slideIndex}
            >
              <Image data-testid="slide-image" src={slides[slideIndex]} alt="" />
            </Slide>
          ))}
          <Overlay next>
            {currentSlideIndex === slides.length - 1 && (
              <ChapterButton data-testid="next-chapter">
                <i className="fas fa-angle-double-right" />
              </ChapterButton>
            )}
          </Overlay>

          <Overlay prev>
            {currentSlideIndex === 0 && (
              <ChapterButton data-testid="prev-chapter">
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

export default PreviewSlider;

const SlideContainer = Flex.extend`
  margin-bottom: 1rem;
  justify-content: space-between;
  position: relative;
  align-items: center;
  width: 42.49rem;
  left: 50%;
  transform: translateX(-50%);
  clip-path: inset(-1rem 1.87rem -3rem 1.87rem);
`;

const Slide = styled.div`
  width: 5rem;
  height: 7.5rem;
  position: relative;
  border: 4px solid rgba(0, 0, 0, 0.1);
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
