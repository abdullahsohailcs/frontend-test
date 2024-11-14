import { render } from '@testing-library/react';
import Timer from './timer';

describe('Timer Component', () => {
  beforeEach(() => {
    // Use fake timers for controlling time
    jest.useFakeTimers();
    // Mock the Date object to return a fixed time
    const fixedDate = new Date('2023-01-01T00:00:00.000Z');
    jest.spyOn(global, 'Date').mockImplementation(() => fixedDate as unknown as string);
  });

  afterEach(() => {
    // Clear timers and restore Date mock after each test
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  it('matches the snapshot at a specific time', () => {
    // Render the Timer component
    const { asFragment, getByTestId } = render(<Timer />);
    
    // Advance timers by a fixed amount (to simulate the passage of time)
    jest.advanceTimersByTime(1000); // For example, advance by 1000ms (1 second)

    // Now capture the snapshot fragment
    const fragment = asFragment();

    // Match the snapshot
    expect(fragment).toMatchSnapshot();

    // Check the timer text content with expect.any
    expect(getByTestId('timer').textContent).toEqual(expect.any(String));
  });
});