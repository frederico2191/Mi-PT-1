import React, { useContext } from "react";
import ActivityList from "../component/ActivityList/ActivityList";
import { Context } from "../store/appContext";
import ConfirmationModal from "../component/ConfirmationModal";
import "../../styles/home.css";

const upcomingClassesTrainee = () => {
  const { store, actions } = useContext(Context);

  const unbookClass = async () => {
    await actions.unbookClass(store.selectedClassId);
    const closeModal = document.getElementById("btn-close");
    closeModal?.click();
  };

  return (
    <div className="mx-auto home-container container text-center">
      <h1 className="mt-5 mb-4">My upcoming classes 🫶🏽</h1>
      <ActivityList />
      <ConfirmationModal
        id="unbookClass"
        message="Are you sure you want to unbook this class?"
        submitText="Confirm"
        title="Unbook Class"
        onConfirm={unbookClass}
      />
    </div>
  );
};

export default upcomingClassesTrainee;
