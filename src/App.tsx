import React from 'react';
import SearchComponent from './components/SearchComponent';
import './App.css';
import Timer from './components/timer';
import Logo from './components/svg/logo';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: '#EDF2F7', paddingTop: '142px' }}>

      <SearchComponent />

      {/* DC and Timer positioned at the extreme ends of the screen */}
      <div
        className="flex items-center justify-between w-full responsive-container"
        style={{
          maxWidth: '100%',
          padding: '48px 50px 49.72px 50px',
        }}
      >
        {/* Timer on the left */}
        <div className="timer-container">
          <Timer />
        </div>

        {/* DC on the right */}
        <div
          style={{
            width: '82px',
            height: '44.28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="dc-container"
        >
          <Logo></Logo>
        </div>
      </div>
    </div>
  );
};

export default App;