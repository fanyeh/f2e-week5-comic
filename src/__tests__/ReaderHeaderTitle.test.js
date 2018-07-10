import React from 'react';
import Title from '../App/Reader/Header/Title';
import { render, cleanup } from 'react-testing-library';

afterEach(cleanup);
test('title name showed correctly', () => {
  const titleText = 'title text';
  const { getByText } = render(<Title>{titleText}</Title>);
  expect(getByText(titleText).textContent).toMatch(titleText);
});

test('caret icon next to title', () => {
  const { getByTestId } = render(<Title>{'Title'}</Title>);
  getByTestId('icon');
});
