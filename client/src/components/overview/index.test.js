import React from 'react';
import OverView from './index';
import { render, screen} from '@testing-library/react';


test('renders the product name', () => {
  render(<OverView />)
  expect(screen.getByTestId('name header')).toBeDefined()

});