import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// Mocking child components for simplicity in App testing
jest.mock('./components/SearchComponent', () => () => <div>Search Component</div>);
jest.mock('./components/timer', () => () => <div>Timer Component</div>);

describe('App Component', () => {
  it('renders correctly and matches snapshot', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
