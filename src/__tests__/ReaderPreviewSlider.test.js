import React from 'react';
import PreviewSlider from '../App/Reader/PreviewSlider';
import { render, cleanup, fireEvent, getByTestId } from 'react-testing-library';

const slides = Array.from(Array(12)).map((x, i) => i);

const isSelected = element => {
  return JSON.parse(element.getAttribute('data-select'));
};

afterEach(cleanup);

test('render visible slides', () => {
  const { getAllByTestId } = render(<PreviewSlider slides={slides} />);
  expect(getAllByTestId('visible-slide')).toHaveLength(5);
});

test('move current slide to previous one on prev slide clicked', () => {
  const currentSlideIndex = 3;
  const { getAllByTestId, getByTestId } = render(
    <PreviewSlider slides={slides} currentSlideIndex={currentSlideIndex} />,
  );
  const visibleSlides = getAllByTestId('visible-slide');
  fireEvent.click(getByTestId('prev-slide'));
  visibleSlides.forEach((slide, index) => {
    const slideIndex = slide.getAttribute('data-slideindex');
    if (slideIndex == currentSlideIndex - 1) {
      expect(isSelected(visibleSlides[index])).toBeTruthy();
    } else {
      expect(isSelected(visibleSlides[index])).toBeFalsy();
    }
  });
});

test('move current slide to next one on next slide clicked', () => {
  const currentSlideIndex = 3;
  const { getAllByTestId, getByTestId } = render(
    <PreviewSlider slides={slides} currentSlideIndex={currentSlideIndex} />,
  );
  const visibleSlides = getAllByTestId('visible-slide');
  fireEvent.click(getByTestId('next-slide'));
  visibleSlides.forEach((slide, index) => {
    const slideIndex = slide.getAttribute('data-slideindex');

    if (slideIndex == currentSlideIndex + 1) {
      expect(isSelected(visibleSlides[index])).toBeTruthy();
    } else {
      expect(isSelected(visibleSlides[index])).toBeFalsy();
    }
  });
});

test('update visible slides when previous slide button clicked and current slide is first visible slide', () => {
  const { getAllByTestId, getByTestId } = render(<PreviewSlider slides={slides} />);
  fireEvent.click(getByTestId('next-slide'));
  fireEvent.click(getByTestId('prev-slide'));
  const visibleSlides = getAllByTestId('visible-slide');
  const newIndexes = visibleSlides.map(slide => slide.getAttribute('data-slideindex') * 1);
  expect(newIndexes).toEqual([0, 1, 2, 3, 4]);
  expect(isSelected(visibleSlides[0])).toBeTruthy();
});

test('update visible slides when next slide button clicked and current slide is last visible slide', () => {
  const { getAllByTestId, getByTestId } = render(
    <PreviewSlider slides={slides} currentSlideIndex={4} />,
  );
  fireEvent.click(getByTestId('next-slide'));
  const visibleSlides = getAllByTestId('visible-slide');
  const newIndexes = visibleSlides.map(slide => slide.getAttribute('data-slideindex') * 1);
  expect(newIndexes).toEqual([1, 2, 3, 4, 5]);
  expect(isSelected(visibleSlides[4])).toBeTruthy();
});

test('disallow to go previous slide when current slide is first slide', () => {
  const { getAllByTestId, getByTestId } = render(<PreviewSlider slides={slides} />);

  fireEvent.click(getByTestId('prev-slide'));
  const visibleSlides = getAllByTestId('visible-slide');
  const newIndexes = visibleSlides.map(slide => slide.getAttribute('data-slideindex') * 1);
  expect(newIndexes).toEqual([0, 1, 2, 3, 4]);
});

test('disallow to go next slide when current slide is last slide', () => {
  const { getAllByTestId, getByTestId } = render(<PreviewSlider slides={slides} />);

  for (let i = 0; i < slides.length + 1; i++) {
    fireEvent.click(getByTestId('next-slide'));
  }
  const visibleSlides = getAllByTestId('visible-slide');
  const newIndexes = visibleSlides.map(slide => slide.getAttribute('data-slideindex') * 1);
  expect(newIndexes).toEqual([7, 8, 9, 10, 11]);
});
