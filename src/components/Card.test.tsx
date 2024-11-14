import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './card';  // Import the Card component
import '@testing-library/jest-dom';  // For the toBeInTheDocument() matcher

describe('Card Component', () => {
  const mockCardData = {
    title: 'Sample Title',
    description: 'Sample description text.',
    image: 'https://via.placeholder.com/150',
    url: 'https://www.example.com',
  };

  test('renders the Card component with correct data', () => {
    render(
      <Card
        title={mockCardData.title}
        description={mockCardData.description}
        image={mockCardData.image}
        url={mockCardData.url}
      />
    );

    // Check if the title, description, and image are rendered
    expect(screen.getByText(mockCardData.title)).toBeInTheDocument();
    expect(screen.getByText(mockCardData.description)).toBeInTheDocument();
    expect(screen.getByAltText(mockCardData.title)).toHaveAttribute('src', mockCardData.image);

    // Check if the link is rendered and has the correct href
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', mockCardData.url);
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('renders the WebPointer SVG inside the link', () => {
    render(
      <Card
        title={mockCardData.title}
        description={mockCardData.description}
        image={mockCardData.image}
        url={mockCardData.url}
      />
    );

    // Check if the WebPointer component is rendered inside the link
    const webPointer = screen.getByTestId('webpointer-svg'); // Assuming you add a testId in the WebPointer component
    expect(webPointer).toBeInTheDocument();
  });
});
