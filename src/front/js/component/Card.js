import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Context } from "../store/appContext";
// import fallbackImage from "./fallback.png";

const Card = ({ item }) => {
  const { actions, store } = useContext(Context);
  const handleToggleFavorite = () => actions.toggleFavourite(item);
  const isFavorite = store.favorites.find((el) => el.name === item.name);
  const addImageFallback = (event) => {
    event.currentTarget.src = fallbackImage;
  };

  return (
    <div /**className={className}*/>
      <div className="card" style={{ width: "18rem" }}>
        <img className="card-img-top" onError={addImageFallback}></img>
        <div className="card-body">
          <h5 className="card-title"> first_name {item.first_name}</h5>
          <h5 className="card-title"> last_name {item.last_name}</h5>
          <h5 className="card-title"> height {item.height}</h5>
          <h5 className="card-title"> birthdate {item.birthdate}</h5>
          <h5 className="card-title"> email {item.email}</h5>
          <h5 className="card-title"> address{item.address}</h5>
          <h5 className="card-title"> weight {item.weight}</h5>
          <div className="d-flex justify-content-between">
            {/* { <Link to={`/${item.type}/${item.typeImg}/${item.uid}`}>
              <button className="btn btn-outline-primary">Learn More</button>
            </Link>} */}
            <button
              className="btn btn-outline-warning"
              onClick={handleToggleFavorite}
            >
              {/* {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />} */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
