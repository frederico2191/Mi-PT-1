import { useContext, useEffect, useState } from "react";
import * as React from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Card from "../component/Card";
import CardClass2 from "../component/CardClass2";
import EventModal from "../component/EventModal";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const user = store.user;

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined)
      actions.getMessage();
    actions.getAllTypesActivities();

    actions.getAllClasses();
  }, [store.token, user]);

  const createEvent = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <div className="text-center mt-5">
        <h1>Welcome to Mi PT</h1>

        <div className="alert alert-info">
          {store.message ||
            "Loading message from the backend (make sure your python backend is running)..."}
        </div>
      </div>
      <EventModal />
      <div>
        {/* <h1 className="scrollerTitles">Trainers</h1> */}
        {/* <div className="list-group horizontal-scroller">
          {store.trainers.map((elm) => (
            <Card item={elm} key={elm.id}></Card>
          ))}
        </div> */}
        <div>
          {store.allTypesActivities?.map((x) => {
            const activityClasses = store.allClasses?.filter(
              (givenClass) => givenClass.name == x.name
            );
            // console.log(activityClasses, "77777777777777########");
            return (
              <>
                <h1 className="scrollerTitles">{x.name}</h1>
                <div className="list-group horizontal-scroller">
                  {activityClasses?.map((givenClass) => {
                    console.log("givenCLASSSSS", givenClass);
                    return (
                      <CardClass2
                        key={givenClass.id}
                        givenClass={givenClass}
                      ></CardClass2>
                    );
                  })}
                </div>
              </>
            );
          })}
          {/* {store.allClasses.map((elm) => (
          ))} */}
          {/* <CardClass2 activityType={x} />; */}
        </div>
      </div>

      {/* <div className="text-center mt-5">
        <button type="button" class="btn btn-success" onClick={createEvent}>
          Success
        </button>
      </div>
      {showModal ? <EventModal /> : ""} */}
    </div>
  );
};
