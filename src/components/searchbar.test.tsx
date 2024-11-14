import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the "toBeInTheDocument" matcher
import SearchBar from './searchbar'; // Adjust the import path based on your file structure

describe('SearchBar Component', () => {
  test('renders input field with correct value', () => {
    const mockSetSearchTerm = jest.fn();
    const searchTerm = 'React';

    render(
      <SearchBar searchTerm={searchTerm} setSearchTerm={mockSetSearchTerm} error={false} />
    );

    // Check if the input field is rendered with the correct value
    const inputElement = screen.getByPlaceholderText(
      /Search what technologies we are using at DC.../i
    ) as HTMLInputElement;

    expect(inputElement).toHaveValue(searchTerm);
  });

  test('calls setSearchTerm on input change', () => {
    const mockSetSearchTerm = jest.fn();
    const searchTerm = 'React';

    render(
      <SearchBar searchTerm={searchTerm} setSearchTerm={mockSetSearchTerm} error={false} />
    );

    // Simulate typing in the input field
    const inputElement = screen.getByPlaceholderText(
      /Search what technologies we are using at DC.../i
    ) as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'JavaScript' } });

    // Check if setSearchTerm is called with the new value
    expect(mockSetSearchTerm).toHaveBeenCalledWith('JavaScript');
  });

  test('applies error border when error prop is true', () => {
    const mockSetSearchTerm = jest.fn();
    const searchTerm = '';

    render(
      <SearchBar searchTerm={searchTerm} setSearchTerm={mockSetSearchTerm} error={true} />
    );

    // Check if the input field has the red border when error is true
    const inputElement = screen.getByPlaceholderText(
      /Search what technologies we are using at DC.../i
    ) as HTMLInputElement;

    expect(inputElement).toHaveStyle('border: 3px solid #ED2E7E');
  });

  test('applies purple border when searchTerm is provided and error is false', () => {
    const mockSetSearchTerm = jest.fn();
    const searchTerm = 'React';

    render(
      <SearchBar searchTerm={searchTerm} setSearchTerm={mockSetSearchTerm} error={false} />
    );

    // Check if the input field has the purple border when searchTerm is provided and error is false
    const inputElement = screen.getByPlaceholderText(
      /Search what technologies we are using at DC.../i
    ) as HTMLInputElement;

    expect(inputElement).toHaveStyle('border: 3px solid #6833FF');
  });

  test('applies gray border when searchTerm is empty and error is false', () => {
    const mockSetSearchTerm = jest.fn();
    const searchTerm = '';

    render(
      <SearchBar searchTerm={searchTerm} setSearchTerm={mockSetSearchTerm} error={false} />
    );

    // Check if the input field has the gray border when searchTerm is empty and error is false
    const inputElement = screen.getByPlaceholderText(
      /Search what technologies we are using at DC.../i
    ) as HTMLInputElement;

    expect(inputElement).toHaveStyle('border: 3px solid #E0E0E0');
  });
});
