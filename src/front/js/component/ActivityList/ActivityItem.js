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
    <div
      className={`activity p-2 ${
        activity.traineeName ? "activity--booked" : "activity--available"
      }`}
      key={activity.id}
    >
      <div className="d-flex flex-row align-items-center justify-content-center">
        {activity.traineeName ? (
          <div className="d-flex flex-row align-items-center justify-content-end">
            <div
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              role="button"
              onClick={() => handleClickTraineeProfile(activity.trainee_id)}
            >
              {activity.traineeName}
            </div>
            <div className="activity-separator" />
          </div>
        ) : null}
        <div className="d-inline">
          {`${activity.date} ${activity.hour}:${activity.minutes}H`}{" "}
          <TfiTrash onClick={() => actions.deleteClass(activity.id)} />
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
