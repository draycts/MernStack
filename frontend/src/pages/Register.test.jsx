import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from './Register';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

describe('Register Component', () => {
  test('renders Register component', () => {
    renderWithRouter(<Register />);
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Already has an account\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test('allows the user to fill the form', () => {
    renderWithRouter(<Register />);
    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password' },
    });

    expect(screen.getByLabelText(/Full Name/i).value).toBe('testuser');
    expect(screen.getByLabelText(/Email address/i).value).toBe('test@example.com');
    expect(screen.getByLabelText(/Password/i).value).toBe('password');
  });
});