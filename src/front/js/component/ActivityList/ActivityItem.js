import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { TfiTrash } from "react-icons/tfi";
import "./ActivityItem.css";

const ActivityItem = ({ activity }) => {
  const { actions } = useContext(Context);

  const handleClickTraineeProfile = async (traineeId) => {
    await actions.getGivenTrainee(traineeId);
  };

  return (
    <div className="g-col-6 border border-success-subtle" key={activity.id}>
      <div className="d-inline">
        <div
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => handleClickTraineeProfile(activity.trainee_id)}
        >
          {`${activity.traineeName || ""}`}
        </div>
        <div className="d-inline">
          {`${activity.date} ${activity.hour}:${activity.minutes}H`}{" "}
          <TfiTrash onClick={() => actions.deleteClass(activity.id)} />
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
