import React from 'react';
import { render } from '@testing-library/react';
import Card from './Card';

// Mocking the WebPointer component as we don't need to test it in this snapshot
jest.mock('./svg/webpointer', () => () => <div>WebPointer</div>);

describe('Card', () => {
  it('should match the snapshot', () => {
    const props = {
      title: 'Sample Card Title',
      description: 'This is a description for the sample card.',
      image: 'https://via.placeholder.com/150',
      url: 'https://www.example.com',
    };

    // Render the Card component
    const { asFragment } = render(<Card {...props} />);

    // Match the snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});
