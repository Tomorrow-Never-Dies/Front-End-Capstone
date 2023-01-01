import React from 'react';
import OverView from './index';

import { render, screen} from '@testing-library/react';


test('renders the product name', () => {
  render(<OverView />)
  expect(screen.getByTestId('name header')).toBeDefined()

});

// test('does not render the "read all reviews" if there are 0 reviews for current product', () => {
//   render(<OverView />)
//   expect(screen.getByTestId('name header')).toBeDefined()

// });