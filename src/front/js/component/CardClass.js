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
  // console.log("GIVEN CLASS INSDIDE THE CARDCLASS COMPONENT:", store.allClasses);
  // const handleProfileClick = () => {
  //   actions.getGivenTrainer(item.id);
  //   console.log(
  //     store.givenTrainer,
  //     "givenTrainer of CARD component being called and moving to detailTRainer Page !!!"
  //   );
  // };

  /*const givenClass = store.allClasses.map((elm) => (<h1 key={elm.id}>{elm.description}</h1>)
  );*/
  return store.allClasses.map(
    (item) => {
      return (
        <div key={item.id}>
          <div className="card" style={{ width: "18rem" }}>
            <img className="card-img-top" onError={addImageFallback}></img>
            <div className="card-body">
              <h5 className="card-title"> name {item.name}</h5>
              <h5 className="card-title"> id {item.id}</h5>
              <h5 className="card-title"> description {item.description}</h5>
              <h5 className="card-title"> duration {item.duration}</h5>
              {/* <h5 className="card-title"> location_range {store.givenClass?.location_range}</h5>
              <h5 className="card-title"> location_pinpoint {store.givenClass?.location_pinpoint}</h5> */}
              <h5 className="card-title"> price {item.price}</h5>
              <h5 className="card-title"> date {item.date}</h5>
              <Link to={`/activity_per_trainer/${item.id}`}>
                <button className="btn btn-outline-primary">
                  Check the class
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    // };
    // console.log("all Classes", allClasses);
    // store.allClasses.map((elm) => {
    //
    // });

    // return <div>mama mimaaaa</div>;
  );
};

export default CardClass;

{
  /* <CardClass key={elm.id} givenClass={elm}></CardClass>
  ))} */
}

{
  /* <div className="d-flex justify-content-between">
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
          </div> */
}
