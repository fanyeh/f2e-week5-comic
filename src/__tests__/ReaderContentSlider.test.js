import React from 'react';
import ContentSlider from '../App/Reader/ContentSlider';
import { render, cleanup, fireEvent } from 'react-testing-library';

const slides = Array.from(Array(12)).map((x, i) => require(`../assets/storyboard-${i + 1}.png`));

const getFileName = src => {
  return src.substring(src.lastIndexOf('/') + 1);
};

afterEach(cleanup);

test('slide to previous page', () => {
  let currentSlideIndex = 2;
  const { getByTestId } = render(
    <ContentSlider slides={slides} currentSlideIndex={currentSlideIndex} />,
  );
  const prevPageNode = getByTestId('prevPage');
  fireEvent.click(prevPageNode);
  expect(getFileName(getByTestId('slide-image').src)).toMatch(
    getFileName(slides[currentSlideIndex - 1]),
  );
});

test('prevent sliding to previous page when current page is first page', () => {
  const currentSlideIndex = 0;
  const { getByTestId } = render(
    <ContentSlider slides={slides} currentSlideIndex={currentSlideIndex} />,
  );
  const prevPageNode = getByTestId('prevPage');
  fireEvent.click(prevPageNode);
  expect(getFileName(getByTestId('slide-image').src)).toMatch(
    getFileName(slides[currentSlideIndex]),
  );
});
test('slide to next page', () => {
  let currentSlideIndex = 2;
  const { getByTestId } = render(
    <ContentSlider slides={slides} currentSlideIndex={currentSlideIndex} />,
  );
  const prevPageNode = getByTestId('nextPage');
  fireEvent.click(prevPageNode);
  expect(getFileName(getByTestId('slide-image').src)).toMatch(
    getFileName(slides[currentSlideIndex + 1]),
  );
});

test('prevent sliding to next page when current page is last page', () => {
  const currentSlideIndex = slides.length - 1;
  const { getByTestId } = render(
    <ContentSlider slides={slides} currentSlideIndex={currentSlideIndex} />,
  );
  const prevPageNode = getByTestId('nextPage');
  fireEvent.click(prevPageNode);
  expect(getFileName(getByTestId('slide-image').src)).toMatch(
    getFileName(slides[currentSlideIndex]),
  );
});

test('change page from header menu', () => {
  const { getByTestId, rerender } = render(<ContentSlider slides={slides} currentSlideIndex={0} />);
  rerender(<ContentSlider slides={slides} currentSlideIndex={1} />);
  expect(getFileName(getByTestId('slide-image').src)).toMatch(getFileName(slides[1]));
});
