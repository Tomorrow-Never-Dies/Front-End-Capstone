/**
 * @jest-environment jsdom
 */
import React from 'react';
import QuestionsAnswers from './index.jsx';
import { sampleData } from './fixtures/sampleData.js'
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getQuestions } from '../../../../helpers/q&a.js';

describe('Q&A Tests', () => {
  it('should have specific text', () => {
    render(<QuestionsAnswers />);
    screen.findByText('Q&A')
  })

  // it('should render a QuestionList div', () => {
  //   render(<QuestionsAnswers />);
  //   expect(screen.getByLabelText('QuestionList')).toBeInTheDocument();
  // })
});
