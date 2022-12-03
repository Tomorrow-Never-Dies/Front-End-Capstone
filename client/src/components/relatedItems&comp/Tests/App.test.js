
import React from 'react';
import { render, screen, cleanup } from "@testing-library/react";
import RelatedItemsComp from '../index';



test('Renders with a className equal to the variant', () => {
  render(<RelatedItemsComp/>);
  expect(screen.getByTestId('main-component')).toBeDefined()
})