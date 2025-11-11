import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'


test('renders contact email', () => {
  render(<App />);
  const emailLabels = screen.getAllByText(/email:/i);
  expect(emailLabels.length).toBeGreaterThan(0);
});