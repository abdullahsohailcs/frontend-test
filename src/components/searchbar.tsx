import React from 'react';
import SearchIcon from './svg/search';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  error: boolean; // Add error prop to indicate error state
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, error }) => {
  return (
    <div className="relative">
      <SearchIcon />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search what technologies we are using at DC..."
        className="border rounded-[12px] p-6 pl-12 w-full h-[74px]"
        style={{
          fontFamily: 'Poppins',
          backgroundColor: '#F2F4F8',
          fontSize: '20px',
          fontWeight: '400',
          lineHeight: '26px',
          height: '27px',
          border: error
            ? '3px solid #ED2E7E' // Red border if error
            : searchTerm
            ? '3px solid #6833FF'
            : '3px solid #E0E0E0',
          outline: 'none',
        }}
      />
    </div>
  );
};

export default SearchBar;
