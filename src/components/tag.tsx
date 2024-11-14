import React, { useState } from 'react';
import ActiveTagSvg from './svg/activetag';
import PassiveTagSvg from './svg/passivetag';
import '../styles/tag.css'; // Import the CSS file to ensure styles are available

interface TagProps {
  text: string;
  isActive?: boolean; // Add this line to include isActive in TagProps
  onClick: () => void;
}

const Tag: React.FC<TagProps> = ({ text, isActive = false, onClick }) => {
  const [isHovered, setIsHovered] = useState(false); // Track hover state

  // Handle hover start and end
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <button
      onClick={onClick}
      className={`tag ${isActive ? 'active' : 'inactive'}`} // Add an 'inactive' class for when the tag is not active
      onMouseEnter={handleMouseEnter} // Start hover effect
      onMouseLeave={handleMouseLeave} // End hover effect
    >
      {/* Conditionally render the SVG based on hover state */}
      {isHovered || isActive ? (
        <ActiveTagSvg />  // Show ActiveTagSvg when hovered or active
      ) : (
        <PassiveTagSvg />  // Show PassiveTagSvg when not hovered
      )}
      {text}
    </button>
  );
};

export default Tag;
