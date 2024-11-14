import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Timer from './timer'; // Adjust the import path if necessary
import '@testing-library/jest-dom'; // for extra matchers

describe('Timer Component', () => {
  jest.useFakeTimers(); // Use fake timers to control the setInterval

  it('renders and displays current time correctly', () => {
    render(<Timer />);
    
    // Ensure the timer is rendered and is not empty
    expect(screen.getByText(/\d{2}:\d{2}:\d{2}:\d{3}/)).toBeInTheDocument();
  });

  it('updates the time every 10ms', () => {
    render(<Timer />);
    
    // Initially get the displayed time
    const initialTime = screen.getByText(/\d{2}:\d{2}:\d{2}:\d{3}/).textContent;

    // Fast-forward the timers by 10ms
    act(() => {
      jest.advanceTimersByTime(10);
    });

    // Get the updated time after 10ms
    const updatedTime = screen.getByText(/\d{2}:\d{2}:\d{2}:\d{3}/).textContent;

    // Check if the time has changed (it should be slightly different)
    expect(updatedTime).not.toBe(initialTime);
  });

  it('formats the time as HH:MM:SS:MMM correctly', () => {
    render(<Timer />);
    
    // Get the displayed time
    const time = screen.getByText(/\d{2}:\d{2}:\d{2}:\d{3}/).textContent;

    // Ensure the time format is correct (HH:MM:SS:MMM)
    expect(time).toMatch(/^\d{2}:\d{2}:\d{2}:\d{3}$/);
  });

  it('cleans up the interval when unmounted', () => {
    const { unmount } = render(<Timer />);
    
    // Mock the clearInterval function
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

    // Unmount the component
    unmount();

    // Ensure clearInterval is called to clean up the interval
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
  });
});
