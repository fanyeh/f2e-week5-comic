import React, { Component } from 'react';
import Header from './Header';
import ContentSlider from './ContentSlider';
import PreviewSlider from './PreviewSlider';
import { Page } from '../../styles/layout';
import slides from '../../slides';

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
