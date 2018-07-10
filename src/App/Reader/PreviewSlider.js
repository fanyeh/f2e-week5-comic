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
    if (currentSlideIndex !== 0) {
      if (visibleSlideIndexes.indexOf(currentSlideIndex) === 0) {
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
    if (currentSlideIndex !== length - 1) {
      if (visibleSlideIndexes.indexOf(currentSlideIndex) === 4) {
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
        {visibleSlideIndexes.map(slideIndex => (
          <div
            data-testid="visible-slide"
            data-slideindex={slideIndex}
            key={slideIndex}
            data-select={currentSlideIndex === slideIndex}
          >
            <img data-testid="slide-image" src={slides[slideIndex]} alt="" />
          </div>
        ))}
        <div data-testid="prev-slide" onClick={this.prevSlideHandler} />
        <div data-testid="next-slide" onClick={this.nextSlideHandler} />
        {currentSlideIndex === slides.length - 1 && <div data-testid="next-chapter" />}
        {currentSlideIndex === 0 && <div data-testid="prev-chapter" />}
      </div>
    );
  }
}

export default PreviewSlider;
