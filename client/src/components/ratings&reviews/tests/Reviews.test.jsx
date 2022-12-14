import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import React from 'react';
import RatingsReviews from '../Reviews.jsx';
import axios from 'axios';
import { sampleData, sampleMetaData } from '../../../../../fixtures/ratings&reviews/ReviewExampleData.js'
import MockAdapter from 'axios-mock-adapter'

describe('Review tests', () => {
  it('should contain a header called  Ratings & Reviews', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet('/getReview').reply(200, sampleData)
    mock.onGet('/getReviewMeta').reply(200, sampleMetaData)
    render(<RatingsReviews/>);
    const heading = screen.getByText('Ratings & Reviews');
    expect(heading).toBeDefined()
  })

  it('should make API call to get initial Reviews and meta data', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet('/getReview').reply(200, sampleData);
    mock.onGet('/getReviewMeta').reply(200, sampleMetaData);
    const defaultProps = {
      id: 71697
    };
    render(<RatingsReviews {...defaultProps}/>);
    expect(mock.history.post.length).toBe(1);
  })

  it('should have a more reviews button', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet('/getReview').reply(200, sampleData)
    mock.onGet('/getReviewMeta').reply(200, sampleMetaData)
    const defaultProps = {
      id: 71697
    };
    render(<RatingsReviews {...defaultProps}/>)
    const button = await screen.getByText('MORE REVIEWS');
    expect(button).toBeInTheDocument()
  })

  it('should have a Ask a New Question button', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet('/getReview').reply(200, sampleData)
    mock.onGet('/getReviewMeta').reply(200, sampleMetaData)
    const defaultProps = {
      id: 71697
    };
    render(<RatingsReviews {...defaultProps}/>)
    const button = await screen.getByRole('button', { name: 'ADD A REVIEW' });
    expect(button).toBeInTheDocument()
  })

  it('should have correct number of initial reviews', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet('/getReview').reply(200, sampleData)
    mock.onGet('/getReviewMeta').reply(200, sampleMetaData)
    render(<RatingsReviews/>);
    expect(screen.getAllByTestId("singleReview")).toHaveLength(2)
  })

  it('should render Form to create a new review', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet('/getReview').reply(200, sampleData)
    mock.onGet('/getReviewMeta').reply(200, sampleMetaData)
    const defaultProps = {
      id: 71697
    };
    render(<RatingsReviews {...defaultProps}/>)
    const button = screen.getByTestId('addReviewButton')
    userEvent.click(button);
    await (() =>
      expect(screen.getByTest("Submit")).toBeInTheDocument);
  })


})
