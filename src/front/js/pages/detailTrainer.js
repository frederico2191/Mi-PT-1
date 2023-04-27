import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import Card from "../component/Card";

export const DetailTrainer = (props) => {
  console.log("hello");
  const { store, actions } = useContext(Context);
  const params = useParams();
  const { pathname } = useLocation();
  const [type, id] = pathname.split("/");

  useEffect(() => {
    actions.fetchTrainers();
    console.log(store.trainers, "store trainers");
  }, []);

  return (
    <div>
      <div>
        {store.trainers.map((elm) => (
          <Card item={elm} key={elm.id}></Card>
        ))}
      </div>

      <Link to="/">
        <span className="btn btn-primary btn-lg" href="#" role="button">
          Back home
        </span>
      </Link>
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
