import { render, screen } from '@testing-library/react';
import React from 'react';
import RatingsReviews  from './Reviews.jsx';

describe('Review tests', () => {
  it('should contain a header called  Ratings & Reviews Place Holder' , () => {
    render(<RatingsReviews/>);
      const heading = screen.getByText(/Ratings & Reviews Place Holder/i);
      expect(heading).toBeInTheDocument()
  })
})