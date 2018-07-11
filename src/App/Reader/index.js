import React, { Component } from 'react';
import Header from './Header';
import ContentSlider from './ContentSlider';
import PreviewSlider from './PreviewSlider';
import { Page } from '../../styles/layout';

const slides = Array.from(Array(12)).map((x, i) => require(`../../assets/storyboard-${i + 1}.png`));

class Reader extends Component {
  render() {
    return (
      <Page>
        <Header />
        <ContentSlider slides={slides} />
        <PreviewSlider slides={slides} />
      </Page>
    );
  }
}

export default Reader;
