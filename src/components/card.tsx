import React from 'react';
import '../styles/card.css'; // Import the CSS file
import WebPointer from './svg/webpointer';

interface CardProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

const Card: React.FC<CardProps> = ({ title, description, image, url }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
      <div className="card-webpointer-container">
        <a href={url} target="_blank" rel="noopener noreferrer" className="card-link">
          <WebPointer />
        </a>
      </div>
    </div>
  );
};

export default Card;
