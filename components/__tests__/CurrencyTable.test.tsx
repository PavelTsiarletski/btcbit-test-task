import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CurrencyTable from '../CurrencyTable';
import { useCurrencies } from '@/hooks';
import { transformData } from '@/utils';

// Mock the useCurrencies hook
jest.mock('@/hooks', () => ({
  useCurrencies: jest.fn(),
}));

// Mock the transformData utility function
jest.mock('@/utils', () => ({
  transformData: jest.fn(),
}));

const mockCurrencies = [
  { amount: '100', currencyId: '1' },
  { amount: '200', currencyId: '2' },
  { amount: '300', currencyId: '3' },
];

const transformedData = [
  { name: 'AUD', balance: '100.00', symbol: '$' },
  { name: 'RSD', balance: '200.00', symbol: 'RSD' },
  { name: 'CHF', balance: '300.00', symbol: 'CHF' },
];

describe('CurrencyTable', () => {
  beforeEach(() => {
    (useCurrencies as jest.Mock).mockReturnValue({
      currencies: mockCurrencies,
      loading: false,
      error: null,
    });

    (transformData as jest.Mock).mockReturnValue(transformedData);
  });

  test('renders the table with currencies', () => {
    render(<CurrencyTable />);
    expect(screen.getByText('Balances')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search by currency symbol or code')).toBeInTheDocument();
    expect(screen.getByText('AUD')).toBeInTheDocument();
    expect(screen.getByText('RSD')).toBeInTheDocument();
    expect(screen.getByText('CHF')).toBeInTheDocument();
  });

  test('filters the table based on search term', () => {
    render(<CurrencyTable />);
    const searchInput = screen.getByPlaceholderText('Search by currency symbol or code');
    fireEvent.change(searchInput, { target: { value: 'AUD' } });
    expect(screen.getByText('AUD')).toBeInTheDocument();
    expect(screen.queryByText('RSD')).toBeNull();
    expect(screen.queryByText('CHF')).toBeNull();
  });

  test('deletes a currency from the table', () => {
    render(<CurrencyTable />);
    const deleteButton = screen.getAllByText('Delete')[0];
    fireEvent.click(deleteButton);
    expect(screen.queryByText('AUD')).toBeNull();
    expect(screen.getByText('RSD')).toBeInTheDocument();
    expect(screen.getByText('CHF')).toBeInTheDocument();
  });

  test('shows loading state', () => {
    (useCurrencies as jest.Mock).mockReturnValue({
      currencies: [],
      loading: true,
      error: null,
    });
    render(<CurrencyTable />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('shows error state', () => {
    (useCurrencies as jest.Mock).mockReturnValue({
      currencies: [],
      loading: false,
      error: 'Failed to fetch data',
    });
    render(<CurrencyTable />);
    expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
  });
});
