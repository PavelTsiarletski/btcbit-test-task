import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from '../Register';

describe('Register Component', () => {
  test('renders registration form', () => {
    render(<Register />);
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('handles form input', () => {
    render(<Register />);
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password');
    expect(confirmPasswordInput).toHaveValue('password');
  });
});
