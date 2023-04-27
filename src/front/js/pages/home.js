import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Card from "../component/Card";

export const Home = () => {
  const { store, actions } = useContext(Context);
  // useEffect(() => {
  //   if (store.token && store.token != "" && store.token != undefined)
  //     actions.getMessage();
  // }, [store.token]);
  console.log("I am the store message", store.message);

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
          {store.users.map((elm) => (
            <Card item={elm} key={elm.id}></Card>
          ))}
        </div>
      </div>
    </div>
  );
};
