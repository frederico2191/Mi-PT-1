import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Card from "../component/Card";
import CardClass from "../component/CardClass";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined)
      actions.getMessage();
    actions.getAllClasses();
  }, [store.token]);
  console.log("I am the store.givenClasses 1", store.givenClass);

  return (
    <div>
      <div className="text-center mt-5">
        <h1>Welcome to Mi PT</h1>

        <div className="alert alert-info">
          {store.message ||
            "Loading message from the backend (make sure your python backend is running)..."}
        </div>
      </div>
      <div>
        <h1 className="scrollerTitles">Trainers</h1>
        <div className="list-group horizontal-scroller">
          {store.trainers.map((elm) => (
            <Card item={elm} key={elm.id}></Card>
          ))}
        </div>
        <h1 className="scrollerTitles">Given Classes</h1>
        <div className="list-group horizontal-scroller">
          <CardClass />
          {/* {store.allClasses.map((elm) => (
            <CardClass key={elm.id} givenClass={elm}></CardClass>
          ))} */}
        </div>
      </div>
    </div>
  );
};
