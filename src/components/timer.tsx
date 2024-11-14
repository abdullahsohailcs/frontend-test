// src/components/Timer.tsx
import React, { useEffect, useState } from 'react';

const Timer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 10); // Update every 10ms for better performance

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div
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
