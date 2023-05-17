import React, { useState } from 'react';
import './CardClass3.css';

const CardClass3 = ({ trainer }) => {
  const [hovered, setHovered] = useState(false);

  const placeholderTrainer = {
    name: 'Roger Federer',
    imageURL: 'https://cdn.pixabay.com/photo/2015/07/15/12/52/roger-federer-846343_960_720.jpg',
  };

  const { name, imageURL } = trainer || placeholderTrainer;

  return (
    <div
      className={`card-class3${hovered ? ' card-class3--hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={imageURL} alt={name} className="card-class3__image" />
      <div className="card-class3__info">
        <h3 className="card-class3__name">{name.toUpperCase()}</h3>
        <p className="card-class3__date-city">Date / City</p>
        {hovered && (
          <>
            <p className="card-class3__time-address">Time / Address</p>
            <a href="#" className="card-class3__button">
              View Details
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default CardClass3;