import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Product from './Product';

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

describe('Product Component', () => {
  test('renders Product component', () => {
    renderWithProviders(<Product />);
    expect(screen.getByText(/Add to Cart/i)).toBeInTheDocument();
  });

  test('adds product to cart when Add to Cart button is clicked', () => {
    const initialState = {
      handleCart: [],
    };
    renderWithProviders(<Product />, { initialState });
    fireEvent.click(screen.getByText(/Add to Cart/i));
    expect(screen.getByText(/Go to Cart/i)).toBeInTheDocument();
  });
});