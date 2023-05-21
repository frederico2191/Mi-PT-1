import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useLocation } from "react-router-dom";

const ActivityPerTrainer = () => {
  const { store, actions } = useContext(Context);
  const { pathname } = useLocation();
  const [, type, id] = pathname.split("/");

  useEffect(() => {
    actions.getGivenClass(id);
  }, []);

  return <div>ActivityPerTrainer</div>;
};

export default ActivityPerTrainer;
