import React, { Component } from 'react';
import PropTypes from 'prop-types';
class ContentSlider extends Component {
  static defaultProps = {
    slides: [],
    currentSlideIndex: 0,
  };

  static propTypes = {
    slides: PropTypes.arrayOf(PropTypes.string),
    currentSlideIndex: PropTypes.number,
  };

  state = {
    currentSlideIndex: this.props.currentSlideIndex,
    prevPropsSlideIndex: this.props.currentSlideIndex,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.currentSlideIndex !== state.prevPropsSlideIndex) {
      return {
        currentSlideIndex: props.currentSlideIndex,
      };
    }
    return null;
  }

  prevPageHandler = () => {
    const { currentSlideIndex } = this.state;
    if (currentSlideIndex > 0) {
      this.setState({ currentSlideIndex: currentSlideIndex - 1 });
    }
  };
  nextPageHandler = () => {
    const { currentSlideIndex } = this.state;
    if (currentSlideIndex < this.props.slides.length - 1) {
      this.setState({ currentSlideIndex: currentSlideIndex + 1 });
    }
  };

  render() {
    const imgSrc = this.props.slides[this.state.currentSlideIndex];
    return (
      <div>
        <div data-testid="prevPage" onClick={this.prevPageHandler}>
          Prev
        </div>
        <div>
          <img data-testid="slide-image" src={imgSrc} alt="" />
        </div>
        <div data-testid="nextPage" onClick={this.nextPageHandler}>
          next
        </div>
      </div>
    );
  }
}

export default ContentSlider;
