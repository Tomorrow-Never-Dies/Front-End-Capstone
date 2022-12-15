/**
 * @jest-environment jsdom
 */
import React from 'react';
import QuestionsAnswers from './index.jsx';
import { render, screen } from '@testing-library/react';

describe('Q&A', () => {
  it('should have specific text', () => {
    render(<QuestionsAnswers />);
    screen.findByText('Question & Answers Place Holder')
  });
});
