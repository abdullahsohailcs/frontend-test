import React from 'react';
import { render } from '@testing-library/react';
import SearchComponent from './SearchComponent';

// Mock any child components that are not relevant for the snapshot
jest.mock('./svg/noresult', () => () => <div>NoResultSVG</div>);
jest.mock('./svg/error', () => () => <div>ErrorSVG</div>);
jest.mock('./card', () => () => <div>Card</div>);
jest.mock('./tag', () => () => <div>Tag</div>);
jest.mock('./searchbar', () => () => <div>SearchBar</div>);

describe('SearchComponent', () => {
  it('should match the snapshot', () => {
    // Render the component
    const { asFragment } = render(<SearchComponent />);
    
    // Take a snapshot of the rendered component
    expect(asFragment()).toMatchSnapshot();
  });
});
