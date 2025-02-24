import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Navbar from './Navbar';

const mockStore = configureStore([]);

const renderWithProviders = (ui, { route = '/', initialState = {} } = {}) => {
  window.history.pushState({}, 'Test page', route);
  const store = mockStore(initialState);
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

describe('Navbar Component', () => {
  test('renders Navbar component', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText(/React Ecommerce/i)).toBeInTheDocument();
  });

  test('shows login and register buttons when user is not logged in', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  test('shows logout button when user is logged in', () => {
    const initialState = {
      handleCart: [],
    };
    localStorage.setItem('user', JSON.stringify({ username: 'testuser' }));
    renderWithProviders(<Navbar />, { initialState });
    expect(screen.getByText(/Hello, testuser/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  test('handles logout correctly', () => {
    const initialState = {
      handleCart: [],
    };
    localStorage.setItem('user', JSON.stringify({ username: 'testuser' }));
    renderWithProviders(<Navbar />, { initialState });
    fireEvent.click(screen.getByText(/Logout/i));
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });
});