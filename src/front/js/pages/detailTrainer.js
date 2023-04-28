import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import Card from "../component/Card";

export const DetailTrainer = (props) => {
  console.log("hello");
  const { store, actions } = useContext(Context);
  const { pathname } = useLocation();
  const [, type, id] = pathname.split("/");

  useEffect(() => {
    actions.getGivenTrainer({ id });
    console.log(store.givenTrainer, "givenTrainer of Detailtrainer page !!!");
  }, []);

  return (
    <div>
      {store.givenTrainer ? (
        <div>
          <h1>After me is the information fetched and stored in Store.</h1>
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
