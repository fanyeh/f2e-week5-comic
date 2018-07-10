import React, { Component } from 'react';

class PreviewSlider extends Component {
  static defaultProps = {
    currentSlideIndex: 0,
  };

  state = {
    currentSlideIndex: this.props.currentSlideIndex,
    prevPropsCurrentSlide: this.props.currentSlideIndex,
    visibleSlideIndexes: Array.from(Array(5)).map((x, i) => i),
  };

  prevSlideHandler = () => {
    const { visibleSlideIndexes, currentSlideIndex } = this.state;
    if (currentSlideIndex === 0) {
      return;
    }
    if (visibleSlideIndexes.indexOf(currentSlideIndex) === 0) {
      this.setState({
        visibleSlideIndexes: visibleSlideIndexes.map(slideIndex => slideIndex - 1),
      });
    }
    this.setState(({ currentSlideIndex }) => ({ currentSlideIndex: currentSlideIndex - 1 }));
  };
  nextSlideHandler = () => {
    const { visibleSlideIndexes, currentSlideIndex } = this.state;
    if (currentSlideIndex === this.props.slides.length - 1) {
      return;
    }
    if (visibleSlideIndexes.indexOf(currentSlideIndex) === 4) {
      this.setState({
        visibleSlideIndexes: visibleSlideIndexes.map(slideIndex => slideIndex + 1),
      });
    }
    this.setState(({ currentSlideIndex }) => ({ currentSlideIndex: currentSlideIndex + 1 }));
  };

  render() {
    const { currentSlideIndex, visibleSlideIndexes } = this.state;
    return (
      <div>
        {visibleSlideIndexes.map(slideIndex => (
          <div
            data-testid="visible-slide"
            data-slideindex={slideIndex}
            key={slideIndex}
            data-select={currentSlideIndex === slideIndex}
          />
        ))}
        <div data-testid="prev-slide" onClick={this.prevSlideHandler} />
        <div data-testid="next-slide" onClick={this.nextSlideHandler} />
      </div>
    );
  }
}

export default PreviewSlider;
