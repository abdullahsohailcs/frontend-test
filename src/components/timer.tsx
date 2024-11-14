import React, { useEffect, useState } from 'react';

const Timer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 10); // Update every 10ms for better performance

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  // Format time as HH:MM:SS:MMM
  const formatTime = (date: Date): string => {
    const pad = (num: number, length: number) => num.toString().padStart(length, '0');
    return `${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}:${pad(date.getSeconds(), 2)}:${pad(date.getMilliseconds(), 3)}`;
  };

  return (
    <div data-testid="timer"
      className="timer text-sm font-mono text-white px-4 py-1 rounded-lg flex items-center"
      style={{
        backgroundColor: '#333',
        boxShadow: '0px 4px 8px rgba(50, 50, 93, 0.2)',
        maxWidth: '200px',
      }}
    >
      {formatTime(currentTime)}
    </div>
  );
};

export default Timer;
