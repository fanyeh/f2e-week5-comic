import React from 'react';
import ContentSlider from '../App/Reader/ContentSlider';
import { render, cleanup, fireEvent } from 'react-testing-library';
import slides from '../slides';

const getProps = index => {
  const handler = jest.fn();
  return {
    currentSlideIndex: index,
    slideHandler: handler,
  };
};

afterEach(cleanup);

test('slide to previous page', () => {
  const props = getProps(3);
  const { getByTestId } = render(<ContentSlider slides={slides} {...props} />);
  fireEvent.click(getByTestId('prevPage'));
  expect(props.slideHandler.mock.calls[0][0]).toBe(2);
});

test('prevent sliding to previous page when current page is first page', () => {
  const props = getProps(0);
  const { getByTestId } = render(<ContentSlider slides={slides} {...props} />);
  const prevPageNode = getByTestId('prevPage');
  fireEvent.click(prevPageNode);
  expect(props.slideHandler.mock.calls[0][0]).toBe(0);
});

test('slide to next page', () => {
  const props = getProps(2);
  const { getByTestId } = render(<ContentSlider slides={slides} {...props} />);
  fireEvent.click(getByTestId('nextPage'));
  expect(props.slideHandler.mock.calls[0][0]).toBe(3);
});

test('prevent sliding to next page when current page is last page', () => {
  const props = getProps(slides.length - 1);
  const { getByTestId } = render(<ContentSlider slides={slides} {...props} />);
  fireEvent.click(getByTestId('nextPage'));
  expect(props.slideHandler.mock.calls[0][0]).toBe(slides.length - 1);
});
