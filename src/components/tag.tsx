import React, { useState } from 'react';
import ActiveTagSvg from './svg/activetag';
import PassiveTagSvg from './svg/passivetag';
import '../styles/tag.css'; // Import the CSS file for styles

interface TagProps {
  text: string;
  isActive?: boolean;
  onClick: () => void;
}

const Tag: React.FC<TagProps> = ({ text, isActive = false, onClick }) => {
  const [isHovered, setIsHovered] = useState(false); // Track hover state

  // Handle mouse enter and leave to toggle hover state
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Conditional rendering of SVG based on hover or active state
  const renderIcon = isHovered || isActive ? <ActiveTagSvg /> : <PassiveTagSvg />;

  return (
    <button
      onClick={onClick}
      className={`tag ${isActive ? 'active' : ''}`} // Apply 'active' class conditionally
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {renderIcon}
      {text}
    </button>
  );
};

export default Tag;
