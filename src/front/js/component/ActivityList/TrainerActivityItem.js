import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { TfiTrash } from "react-icons/tfi";
import "./ActivityItem.css";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const TrainerActivityItem = ({ activity }) => {
  const { store, actions } = useContext(Context);

  const handleClickTraineeProfile = async (traineeId) => {
    await actions.getGivenTrainee(traineeId);
  };

  return (
    <div
      className={`activity p-2 px-4 ${
        activity.traineeName ? "activity--booked" : "activity--available"
      }`}
      key={activity.id}
    >
      <div className="d-flex flex-row align-items-center justify-content-between">
        {activity.traineeName ? (
          <div className="col-4 d-flex flex-row align-items-center activity__trainee-name justify-self-start">
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
        ) : (
          <div className="w-5 col-4" />
        )}
        <div className="col-4">
          <Link
            className="text-reset text-decoration-none"
            to={`/activity_per_trainer/${activity.id}`}
          >
            {dayjs(activity.date).format("lll")}{" "}
            <span className="badge rounded-pill bg-info">
              {activity.duration}min
            </span>
          </Link>
        </div>
        <div className="d-flex justify-content-end col-4">
          <TfiTrash
            role="button"
            onClick={() => actions.setselectedClassId(activity.id)}
            size={20}
            data-bs-toggle="modal"
            data-bs-target="#deleteClass"
          />
        </div>
      </div>
    </div>
  );
};

export default TrainerActivityItem;
