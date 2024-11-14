import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import SearchComponent from './SearchComponent';

// Mock axios to control the API response
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SearchComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test('renders the search component and its elements', () => {
    render(<SearchComponent />);

    // Check if the search bar and tags are rendered
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(screen.getByText('Build')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('Cloud')).toBeInTheDocument();
  });

  test('displays loading spinner when data is being fetched', async () => {
    // Mock the axios get request
    mockedAxios.get.mockResolvedValueOnce({
      data: [],
    });

    render(<SearchComponent />);

    // Simulate typing into the search bar
    fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: 'test' } });

    // Expect loading spinner to appear
    expect(screen.getByRole('status')).toBeInTheDocument();

    // Wait for results to be rendered or the spinner to disappear
    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('No result')).toBeInTheDocument());
  });

  test('displays error message on API failure', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    render(<SearchComponent />);

    fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: 'test' } });

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  test('renders results when search query is successful', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        { title: 'Test Result', description: 'Description', image: 'image.jpg', url: 'https://example.com' },
      ],
    });

    render(<SearchComponent />);

    fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: 'test' } });

    await waitFor(() => {
      expect(screen.getByText('Test Result')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('src', 'image.jpg');
    });
  });

  test('displays "no results" if no results are found', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [],
    });

    render(<SearchComponent />);

    fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: 'test' } });

    await waitFor(() => {
      expect(screen.getByText('No result')).toBeInTheDocument();
    });
  });

  test('sets active tag when tag is clicked', async () => {
    render(<SearchComponent />);

    // Click on a tag
    fireEvent.click(screen.getByText('Design'));

    // Expect the tag to become active
    expect(screen.getByText('Design')).toHaveClass('active'); // Assuming the class for active tag is 'active'

    // Check if the search term is updated to the clicked tag
    await waitFor(() => {
      expect((screen.getByPlaceholderText(/search/i) as HTMLInputElement).value).toBe('Design');
    });
  });
});
