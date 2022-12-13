
import React from 'react';
import { render, screen, cleanup , fireEvent} from "@testing-library/react";
import RelatedItemsComp from "../RelatedItemsComp"
import Outfits from "../Outfits"
import App from "/Users/yasereisa/HackReactor/Course/FEC/client/src/App.jsx"




test('Renders with a className equal to the variant', () => {
  render(<App/>);
  expect(screen.getByTestId('main-component')).toBeDefined()
})


test("Prev Click", () => {
  render(<RelatedItemsComp/>);
  const button = screen.getByTestId('prev-button');
  fireEvent.click(button);
});

test("Next Click", () => {
  render(<RelatedItemsComp/>);
  const button = screen.getByTestId('next-button');
  fireEvent.click(button);
});

test("Clicking on a product card", () => {
  render(<RelatedItemsComp/>);
  setTimeout(() => {
    fireEvent.click(getByTestId('product-card'));
  }, 1000);
});

test("add", () => {
  render(<Outfits/>);
  const button = screen.getByTestId('add-button');
  fireEvent.click(button);
});

test("Clicking on a product card adds product", () => {
  render(<Outfits/>);
  const button = screen.getByTestId('add-button');
  fireEvent.click(button);
  setTimeout(() => {
    expect(screen.getByTestId('product-card')).toBeDefined()
  }, 1000);
});

