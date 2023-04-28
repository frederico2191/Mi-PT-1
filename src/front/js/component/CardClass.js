import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Context } from "../store/appContext";

const CardClass = () => {
  const { actions, store } = useContext(Context);
  const handleToggleFavorite = () => setIsFavorite(!isFavorite);
  const [isFavorite, setIsFavorite] = useState(false);
  // const isFavorite = store.favorites.find((el) => el.name === item.name);
  const addImageFallback = (event) => {
    event.currentTarget.src = fallbackImage;
  };
  console.log("GIVEN CLASS INSDIDE THE CARDCLASS COMPONENT:", store.givenClass);
  // const handleProfileClick = () => {
  //   actions.getGivenTrainer(item.id);
  //   console.log(
  //     store.givenTrainer,
  //     "givenTrainer of CARD component being called and moving to detailTRainer Page !!!"
  //   );
  // };
  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <img className="card-img-top" onError={addImageFallback}></img>
        <div className="card-body">
          <h5 className="card-title"> id {store.givenClass?.id}</h5>
          <h5 className="card-title">
            {" "}
            description {store.givenClass?.description}
          </h5>
          <h5 className="card-title"> duration {store.givenClass?.duration}</h5>
          {/* <h5 className="card-title"> location_range {store.givenClass?.location_range}</h5>
        <h5 className="card-title"> location_pinpoint {store.givenClass?.location_pinpoint}</h5> */}
          <h5 className="card-title"> price {store.givenClass?.price}</h5>
          <h5 className="card-title"> date {store.givenClass?.date}</h5>
          <Link to={`/activity_per_trainer/${store.givenClass?.id}`}>
            <button className="btn btn-outline-primary">Check the class</button>
          </Link>

          {/* <div className="d-flex justify-content-between">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CardClass;
