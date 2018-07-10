import React from 'react';
import Menu from '../App/Reader/Header/Menu';
import { render, cleanup, fireEvent } from 'react-testing-library';

afterEach(cleanup);

test('return null when items is empty', () => {
  const { container } = render(<Menu items={[]} />);
  expect(container.firstChild).toBeNull();
});

test('title is first element from items list', () => {
  const items = ['page1', 'page2', 'page3'];
  const { getByTestId } = render(<Menu items={items} />);
  const titleNode = getByTestId('title');
  expect(titleNode.textContent).toMatch(items[0]);
});

test('items are mapped to dropdown', () => {
  const items = ['page1', 'page2', 'page3'];
  const { queryAllByTestId } = render(<Menu items={items} />);
  const dropdownItemNode = queryAllByTestId('dropdown-item');
  dropdownItemNode.forEach((node, index) => {
    expect(node.textContent).toMatch(items[index]);
  });
});

test('toggle dropdown on title click', () => {
  const items = ['page1', 'page2', 'page3'];
  const { getByTestId, queryByTestId } = render(<Menu items={items} />);
  const titleNode = getByTestId('title');
  fireEvent.click(titleNode);
  getByTestId('dropdown');
  fireEvent.click(titleNode);
  expect(queryByTestId('dropdown')).toBeNull();
});

test('change title when dropdown item clicked', () => {
  const items = ['page1', 'page2', 'page3'];
  const { getByTestId, getAllByTestId } = render(<Menu items={items} />);
  const titleNode = getByTestId('title');
  fireEvent.click(titleNode);
  const dropdownItemNodes = getAllByTestId('dropdown-item');
  fireEvent.click(dropdownItemNodes[2]);
  expect(titleNode.textContent).toMatch(items[2]);
});
