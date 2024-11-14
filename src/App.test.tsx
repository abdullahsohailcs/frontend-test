import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

describe('App Component', () => {
  test('renders SearchComponent', () => {
    render(<App />);
    const searchComponent = screen.getByTestId('search-component');
    expect(searchComponent).toBeInTheDocument();
  });

  test('renders Timer component', () => {
    render(<App />);
    const timer = screen.getByTestId('timer');
    expect(timer).toBeInTheDocument();
  });

  test('renders Logo component', () => {
    render(<App />);
    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
  });

  test('has correct styles', () => {
    const { container } = render(<App />);
    const appDiv = container.firstChild;
    
    // Check if background color is correct
    expect(appDiv).toHaveStyle('background: #EDF2F7');
    
    // Check if the padding is correct
    expect(appDiv).toHaveStyle('padding-top: 142px');
  });
});
