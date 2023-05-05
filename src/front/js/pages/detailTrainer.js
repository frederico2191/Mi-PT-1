import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import Card from "../component/Card";
import ballet from "../../img/ballet.jpg";

export const DetailTrainer = (props) => {
  console.log("hello");
  const { store, actions } = useContext(Context);
  const { pathname } = useLocation();
  const [, type, id] = pathname.split("/");

  useEffect(() => {
    actions.getGivenTrainer({ id });
    console.log(store, "givenTrainer of Detailtrainer page !!!");
    console.log(
      store.givenTrainer,
      "givenTrainer USERDATA of Detailtrainer page !!!"
    );
  }, []);

  return (
    <div>
      <div className="container-fluid m-3 mt-6">
        <div className="container text-center">
          <div className="row">
            <div className="row">
              <div className="col-12">title</div>
            </div>
            <div className="row">
              <div className="col-6">City</div>
            </div>
          </div>
          <div className="row">
            <div className="row">
              <div className="col-6">ABOUT</div>
              <div className="col-6">
                <img
                  src={ballet}
                  alt="ballet"
                  className="object-fit-contain w-50"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {/* Experience Level <h4>{store.givenTrainer.experience_level}</h4> */}
            </div>
            <div className="col">
              {/* SPECIALTY <h4>{store.givenTrainer.specialty}</h4> */}
            </div>
            <div className="col">
              {/* COACHING STYLE <h4>{store.givenTrainer.coaching_style}</h4> */}
            </div>
          </div>
        </div>
      </div>
      {store.givenTrainer ? (
        <div>
          <h1>{store.givenTrainer.about}</h1>
          <h1>{store.givenTrainer.address}</h1>
          <h1>{store.givenTrainer.approved}</h1>
          <h1>{store.givenTrainer.coaching_style}</h1>
          <h1>{store.givenTrainer.experience_level}</h1>
          <h1>{store.givenTrainer.specialty}</h1>
        </div>
      ) : (
        <Link to="/">
          <span className="btn btn-primary btn-lg" href="#" role="button">
            Back home
          </span>
        </Link>
      )}
    </div>
  );
  {
    /* <h1>
        This will show the demo element:{store.trainers[0].first_name}
        {store.trainers.map((elm) => (
          <Card item={elm} key={elm.id}></Card>
        ))}
      </h1> */
  }
};
