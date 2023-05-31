import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import EventModal from "../component/EventModal";
import ActivityList from "../component/ActivityList/ActivityList";
import "../../styles/home.css";
import ConfirmationModal from "../component/ConfirmationModal";

const homeTrainer = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);

  const createEvent = () => {
    setShowModal(!showModal);
  };

  const deleteClass = async () => {
    await actions.deleteClass(store.selectedClassId);
    const closeModal = document.getElementById("btn-close");
    closeModal?.click();
  };

  return (
    <div className="home-container container text-center">
      <div className="row justify-content-between my-5 ">
        <h2 className="col-4 ">My Classes</h2>
        <div className="col-3 align-self-center">
          <button
            type="button"
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#addClass"
            onClick={() => actions.setEventModalOpen()}
          >
            + ADD
          </button>
          <EventModal
            id="addClass"
            title="Create a New Class"
            submitText="Launch Class"
            isEdit={false}
          />
          <EventModal
            id="editClass"
            title="Edit Class"
            submitText="Save Changes"
            isEdit
          />
        </div>
      </div>
      <div className="row justify-content-start fs-3 text ms-3 my-3">
        By Activity
      </div>
      <div className="row justify-content-end">
        {" "}
        <div className="col align-self-end">
          <ActivityList />
        </div>
      </div>
      <ConfirmationModal
        id="deleteClass"
        message="Are you sure you want to delete this class?"
        submitText="Confirm"
        title="Delete Class"
        onConfirm={deleteClass}
      />
    </div>
  );
};

export default homeTrainer;
