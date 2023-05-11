import React from 'react';
import './CardClass3.css';

const CardClass3 = ({ trainer }) => {
  // Placeholder data for now, we'll receive the right props from fetch and other
  const placeholderTrainer = {
    name: 'Roger Federer',
    imageURL: 'https://cdn.pixabay.com/photo/2015/07/15/12/52/roger-federer-846343_960_720.jpg',
  };

  const { name, imageURL } = trainer || placeholderTrainer;

  return (
    <div className="card-class3">
      <img src={imageURL} alt={name} className="card-class3__image" />
      <div className="card-class3__info">
        <h3 className="card-class3__name">{name}</h3>
        <p className="card-class3__details">Location / Duration</p>
        <p className="card-class3__details">Date / Time</p>
      </div>
    </div>
  );
};

export default CardClass3;