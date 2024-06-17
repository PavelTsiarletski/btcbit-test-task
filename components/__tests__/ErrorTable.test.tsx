import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorTable from '../ErrorTable';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: false,
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

describe('ErrorTable', () => {
  test('shows error state', async () => {
    render(<ErrorTable />);
    expect(await screen.findByText('Failed to fetch data')).toBeInTheDocument();
  });

  test('renders link to currencies page', () => {
    render(<ErrorTable />);
    expect(screen.getByText('Go to currencies')).toBeInTheDocument();
  });
});
