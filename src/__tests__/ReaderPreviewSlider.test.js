import React from 'react';
import PreviewSlider from '../App/Reader/PreviewSlider';
import { render, cleanup, fireEvent } from 'react-testing-library';

const slides = Array.from(Array(12)).map((x, i) => i);
const numOfPreviewSlides = 7;

const isSelected = element => {
  return JSON.parse(element.getAttribute('data-select'));
};

afterEach(cleanup);

test('render visible slides', () => {
  const { getAllByTestId } = render(<PreviewSlider slides={slides} />);
  expect(getAllByTestId('visible-slide')).toHaveLength(numOfPreviewSlides);
});

test('initialization', () => {
  const { getAllByTestId } = render(<PreviewSlider slides={slides} />);
  const visibleSlides = getAllByTestId('visible-slide');
  // First slide of visible slides is empty
  expect(visibleSlides[0].getAttribute('data-slideindex')).toBe('-1');
  // Current slide is second slide in visible slides
  expect(isSelected(visibleSlides[1])).toBeTruthy();
});

test('move current slide to previous one on prev slide clicked', () => {
  const currentSlideIndex = 3;
  const { getAllByTestId, getByTestId, queryByTestId } = render(
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
  expect(queryByTestId('prev-chapter')).toBeNull();
});

test('move current slide to next one on next slide clicked', () => {
  const currentSlideIndex = 3;
  const { getAllByTestId, getByTestId, queryByTestId } = render(
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
  expect(queryByTestId('prev-chapter')).toBeNull();
});

test('update visible slides when previous slide button clicked and current slide is second visible slide', () => {
  const { getAllByTestId, getByTestId } = render(<PreviewSlider slides={slides} />);
  for (let i = 0; i < numOfPreviewSlides; i++) {
    fireEvent.click(getByTestId('next-slide'));
  }

  for (let i = 0; i < numOfPreviewSlides; i++) {
    fireEvent.click(getByTestId('prev-slide'));
  }
  const visibleSlides = getAllByTestId('visible-slide');
  const newIndexes = visibleSlides.map(slide => slide.getAttribute('data-slideindex') * 1);
  expect(newIndexes).toEqual([-1, 0, 1, 2, 3, 4, 5]);
  expect(isSelected(visibleSlides[1])).toBeTruthy();
});

test('update visible slides when next slide button clicked and current slide is second last visible slide', () => {
  const { getAllByTestId, getByTestId } = render(
    <PreviewSlider slides={slides} currentSlideIndex={numOfPreviewSlides - 3} />,
  );
  fireEvent.click(getByTestId('next-slide'));
  const visibleSlides = getAllByTestId('visible-slide');
  const newIndexes = visibleSlides.map(slide => slide.getAttribute('data-slideindex') * 1);
  expect(newIndexes).toEqual([0, 1, 2, 3, 4, 5, 6]);
  expect(isSelected(visibleSlides[numOfPreviewSlides - 2])).toBeTruthy();
});

test('disallow to go previous slide when current slide is first slide', () => {
  const { getAllByTestId, getByTestId } = render(<PreviewSlider slides={slides} />);

  fireEvent.click(getByTestId('prev-slide'));
  const visibleSlides = getAllByTestId('visible-slide');
  const newIndexes = visibleSlides.map(slide => slide.getAttribute('data-slideindex') * 1);
  expect(newIndexes).toEqual([-1, 0, 1, 2, 3, 4, 5]);
  expect(isSelected(visibleSlides[1])).toBeTruthy();
  expect(getByTestId('prev-chapter')).not.toBeNull();
});

test('disallow to go next slide when current slide is second last slide', () => {
  const { getAllByTestId, getByTestId } = render(<PreviewSlider slides={slides} />);

  for (let i = 0; i < slides.length; i++) {
    fireEvent.click(getByTestId('next-slide'));
  }
  const visibleSlides = getAllByTestId('visible-slide');
  const newIndexes = visibleSlides.map(slide => slide.getAttribute('data-slideindex') * 1);
  expect(newIndexes).toEqual([6, 7, 8, 9, 10, 11, 12]);
  expect(isSelected(visibleSlides[5])).toBeTruthy();
  expect(getByTestId('next-chapter')).not.toBeNull();
});

test('slide image', () => {
  const { getAllByTestId } = render(<PreviewSlider slides={slides} />);
  expect(getAllByTestId('slide-image')).not.toBeNull();
});
