import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Slideshows buttons', () => {
  render(<App />);
  expect(screen.getByText('Slideshows'));
  expect(screen.getByText('Upload'));
});
