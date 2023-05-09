import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import EventModal from "../component/EventModal";
import ByActivity from "../component/ByActivity";

const homeTrainer = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);

  const createEvent = () => {
    setShowModal(!showModal);
  };

  // useEffect(() => {}, []);

  return (
    <div className="container text-center">
      <div className="row justify-content-between my-5 ">
        <h2 className="col-4 ">My Classes</h2>
        <div className="col-3 align-self-center">
          <EventModal />
        </div>
      </div>
      <div className="row justify-content-start fs-3 text ms-3 my-3">
        By Activity
      </div>
      <div className="row justify-content-end">
        {" "}
        <div className="col align-self-end">
          <ByActivity />
        </div>
      </div>
    </div>
  );
};

export default homeTrainer;