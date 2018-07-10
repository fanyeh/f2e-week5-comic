import React from 'react';
import ReactDOM from 'react-dom';
import Mode from '../App/Reader/Header/Mode';
import { render, cleanup, fireEvent } from 'react-testing-library';

afterEach(cleanup);
test('icon change when switched to day mode', () => {
  const { getByTestId } = render(<Mode dayMode={true} />);
  expect(getByTestId('mode-day').classList.contains('far')).toBe(false);
  expect(getByTestId('mode-night').classList.contains('far')).toBe(true);
});

test('trigger switch on click', () => {
  const switchHandler = jest.fn();
  const { getByTestId } = render(<Mode dayMode={true} switchHandler={switchHandler} />);
  const switchNode = getByTestId('mode-switch');
  fireEvent.click(switchNode);
  expect(switchHandler).toHaveBeenCalledTimes(1);
});

test('icon change when switched to night mode', () => {
  const { getByTestId } = render(<Mode dayMode={false} />);
  expect(getByTestId('mode-day').classList.contains('far')).toBe(true);
  expect(getByTestId('mode-night').classList.contains('far')).toBe(false);
});
