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

  useEffect(() => {
    console.log("MOUNTING homeTrainer page STORE log:", store);
  }, []);

  return (
    <div>
      just the trainer page
      <EventModal />
      <ByActivity />
    </div>
  );
};

export default homeTrainer;
