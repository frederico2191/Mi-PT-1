import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import CardClass from "../component/CardClass";

export const DetailClass = () => {
  const { store, actions } = useContext(Context);
  const { pathname } = useLocation();
  const [, type, id] = pathname.split("/");

  useEffect(() => {
    actions.getGivenClass({ id });
    console.log(store.givenClass, "givenClass of detailClass page !!!");
  }, [id]);

  console.log("store.givenClass", store.givenClass);

  return (
    <div>
      <div>
        <h1>After me is the information fetched and stored in Store.</h1>
        <p>{store.givenClass?.description}</p>
        <CardClass />
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
