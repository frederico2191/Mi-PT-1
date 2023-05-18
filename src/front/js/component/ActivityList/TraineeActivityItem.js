import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { TfiTrash } from "react-icons/tfi";
import "./ActivityItem.css";

const TraineeActivityItem = ({ activity }) => {
  const { store, actions } = useContext(Context);

  const userType = localStorage.getItem("userRole");

  const handleClickTraineeProfile = async (traineeId) => {
    await actions.getGivenTrainee(traineeId);
  };

  return (
    <div className="activity p-2" key={activity.id}>
      <div className="d-flex flex-row align-items-center justify-content-center">
        {activity.trainerName ? (
          <div className="d-flex flex-row align-items-center justify-content-end">
            <div
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              role="button"
              onClick={() => handleClickTraineeProfile(activity.trainer_id)}
            >
              {activity.trainerName}
            </div>
            <div className="activity-separator" />
          </div>
        ) : null}
        <div className="d-inline">
          {`${activity.date} ${activity.hour}:${activity.minutes}H`}{" "}
          {/* <TfiTrash onClick={() => actions.unbookClass(activity.id)} /> */}
          <TfiTrash onClick={() => actions.unbookClass(activity.id)} />
        </div>
      </div>
    </div>
  );
};

export default TraineeActivityItem;
