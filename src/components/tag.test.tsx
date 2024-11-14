import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tag from './tag';
import '@testing-library/jest-dom'; // for extra matchers

// Mock the SVG components (ActiveTagSvg and PassiveTagSvg) to focus on the component's behavior
jest.mock('./svg/activetag', () => () => <div>ActiveIcon</div>);
jest.mock('./svg/passivetag', () => () => <div>PassiveIcon</div>);

describe('Tag Component', () => {
  it('renders with the correct text and passive icon by default', () => {
    render(<Tag text="Test Tag" onClick={jest.fn()} />);
    
    // Check if the tag text is rendered
    expect(screen.getByText('Test Tag')).toBeInTheDocument();

    // Check if the passive icon is rendered (default state)
    expect(screen.getByText('PassiveIcon')).toBeInTheDocument();
  });

  it('renders active icon when the tag is active', () => {
    render(<Tag text="Test Tag" isActive={true} onClick={jest.fn()} />);

    // Check if the active icon is rendered when the tag is active
    expect(screen.getByText('ActiveIcon')).toBeInTheDocument();
  });

  it('changes to the active icon when hovered', () => {
    render(<Tag text="Test Tag" onClick={jest.fn()} />);

    // Check if the passive icon is initially rendered
    expect(screen.getByText('PassiveIcon')).toBeInTheDocument();

    // Simulate mouse enter (hover)
    fireEvent.mouseEnter(screen.getByText('Test Tag'));

    // Check if the active icon is rendered after hovering
    expect(screen.getByText('ActiveIcon')).toBeInTheDocument();

    // Simulate mouse leave (unhover)
    fireEvent.mouseLeave(screen.getByText('Test Tag'));

    // Check if the passive icon is rendered again after unhovering
    expect(screen.getByText('PassiveIcon')).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', () => {
    const handleClick = jest.fn();

    render(<Tag text="Test Tag" onClick={handleClick} />);

    // Simulate a click event
    fireEvent.click(screen.getByText('Test Tag'));

    // Check if the onClick handler is called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies active class when isActive prop is true', () => {
    const { container } = render(<Tag text="Test Tag" isActive={true} onClick={jest.fn()} />);

    // Check if the active class is applied
    expect(container.firstChild).toHaveClass('active');
  });

  it('does not apply active class when isActive prop is false', () => {
    const { container } = render(<Tag text="Test Tag" isActive={false} onClick={jest.fn()} />);

    // Check if the active class is not applied
    expect(container.firstChild).not.toHaveClass('active');
  });
});
