import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../Login';

describe('Login Component', () => {
  test('renders login form', () => {
    render(<Login />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('handles form input and step change', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const nextButton = screen.getByText('Next');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(nextButton);

    expect(screen.getByText('Enter OTP')).toBeInTheDocument();
  });

  test('shows error for incorrect email', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const nextButton = screen.getByText('Next');

    fireEvent.change(emailInput, { target: { value: 'incorrect@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(nextButton);

    expect(window.alert).toHaveBeenCalledWith('Incorrect email');
  });

  test('shows error for incorrect password', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const nextButton = screen.getByText('Next');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'incorrect-password' } });
    fireEvent.click(nextButton);

    expect(window.alert).toHaveBeenCalledWith('Incorrect password');
  });
});
