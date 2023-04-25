import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Card from "../component/Card";

export const Home = () => {
  const { store, actions } = useContext(Context);
  console.log("I am the store message", store.message);

  return (
    <div className="text-center mt-5">
      <h1>Welcome to Mi PT</h1>

      <div className="alert alert-info">
        {store.message ||
          "Loading message from the backend (make sure your python backend is running)..."}
      </div>
      <div className="alert alert-info">
        {store.users.map((elm) => (
          <Card item={elm} key={elm.id}>
            {elm.email}
          </Card>
        )) ||
          "Loading message from the backend (make sure your python backend is running)..."}
      </div>
    </div>
  );
};
