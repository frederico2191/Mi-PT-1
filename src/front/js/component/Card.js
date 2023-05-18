import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Context } from "../store/appContext";
// import fallbackImage from "./fallback.png";

const Card = ({ item }) => {
  const { actions, store } = useContext(Context);
  const handleToggleFavorite = () => setIsFavorite(!isFavorite);
  const [isFavorite, setIsFavorite] = useState(false);
  // const isFavorite = store.favorites.find((el) => el.name === item.name);
  const addImageFallback = (event) => {
    event.currentTarget.src = fallbackImage;
  };
  // const handleProfileClick = () => {
  //   actions.getGivenTrainer(item.id);
  //   console.log(
  //     store.givenTrainer,
  //     "givenTrainer of CARD component being called and moving to detailTRainer Page !!!"
  //   );
  // };

  return (
    <div /**className={className}*/>
      <div className="card" style={{ width: "18rem" }}>
        <img className="card-img-top" onError={addImageFallback}></img>
        <div className="card-body">
          <h5 className="card-title"> id {item.id}</h5>
          <h5 className="card-title"> specialty {item.specialty}</h5>
          <h5 className="card-title"> coaching_style {item.coaching_style}</h5>
          <h5 className="card-title"> about {item.about}</h5>
          <h5 className="card-title"> approved {item.approved}</h5>
          <h5 className="card-title"> address{item.address}</h5>
          <h5 className="card-title">
            {" "}
            experience_level {item.experience_level}
          </h5>

          {/* <h5 className="card-title"> first_name {item.id}</h5>
          <h5 className="card-title"> description {item.description}</h5>
          <h5 className="card-title"> duration {item.duration}</h5>
          <h5 className="card-title"> location_range {item.location_range}</h5>
          <h5 className="card-title"> location_pinpoint {item.location_pinpoint}</h5>
          <h5 className="card-title"> price {item.price}</h5>
          <h5 className="card-title"> date {item.date}</h5> */}

          <div className="d-flex justify-content-between">
            {store.token && store.token != "" && store.token != undefined ? (
              <div>
                <Link to={`/activity_per_trainer/id`}>
                  <button className="btn btn-outline-primary">
                    Check the class
                  </button>
                </Link>
                <Link to={`/trainer/${item.id}`}>
                  <button
                    className="btn btn-outline-primary"
                    // onClick={handleProfileClick}
                  >
                    Trainer's Profile
                  </button>
                </Link>
              </div>
            ) : (
              <Link to={`/register`}>
                <button className="btn btn-outline-primary">
                  Check it out
                </button>
              </Link>
            )}
            <button
              className="btn btn-outline-warning"
              onClick={handleToggleFavorite}
            >
              {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
