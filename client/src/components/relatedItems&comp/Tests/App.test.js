
import React from 'react';
import { render, screen, cleanup , fireEvent} from "@testing-library/react";
import RelatedItemsComp from '../index';



test('Renders with a className equal to the variant', () => {
  render(<RelatedItemsComp/>);
  expect(screen.getByTestId('main-component')).toBeDefined()
})


test("Click", () => {
  render(<RelatedItemsComp/>);
  const word = screen.getByTestId('inner-component')
  const button = screen.getByTestId('prev-button');
  fireEvent.click(button);
});