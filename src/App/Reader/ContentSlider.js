import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex } from '../../styles/layout';
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
      <StyledContentSlider>
        <Button data-testid="prevPage" onClick={this.prevPageHandler}>
          <i className="fas fa-chevron-left" />
        </Button>
        <div>
          <Image data-testid="slide-image" src={imgSrc} alt="" />
        </div>
        <Button data-testid="nextPage" onClick={this.nextPageHandler}>
          <i className="fas fa-chevron-right" />
        </Button>
      </StyledContentSlider>
    );
  }
}

export default ContentSlider;

const StyledContentSlider = Flex.extend`
  position: relative;
  margin-bottom: 1.63rem;
`;

const Image = styled.img`
  width: 100%;
`;

const Button = styled.div`
  position: absolute;
  top: 50%;
  height: 100%;
  padding-right: 1.26rem;
  padding-left: 2.13rem;
  cursor: pointer;
  &:hover {
    background: black;
  }

  &:hover > i {
    color: #50ff44;
  }

  &:first-of-type {
    left: 0;
    transform: translate(-100%, -50%);
  }
  &:last-of-type {
    right: 0;
    transform: translate(100%, -50%);
  }
  & > i {
    font-size: 2.74rem;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`;
