import React from 'react';
import { render } from '@testing-library/react';
import SearchBar from './SearchBar';

// Mock the SearchIcon component as we don't need to test it in this snapshot
jest.mock('./svg/search', () => () => <div>SearchIcon</div>);

describe('SearchBar', () => {
  it('should match the snapshot', () => {
    const mockSetSearchTerm = jest.fn();
    
    // Render the SearchBar component
    const { asFragment } = render(
      <SearchBar searchTerm="test" setSearchTerm={mockSetSearchTerm} error={false} />
    );
    
    // Take a snapshot of the rendered component
    expect(asFragment()).toMatchSnapshot();
  });

  it('should match the snapshot when there is an error', () => {
    const mockSetSearchTerm = jest.fn();
    
    // Render the SearchBar component with error state
    const { asFragment } = render(
      <SearchBar searchTerm="test" setSearchTerm={mockSetSearchTerm} error={true} />
    );
    
    // Take a snapshot of the rendered component
    expect(asFragment()).toMatchSnapshot();
  });
});
