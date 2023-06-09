import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { TfiTrash } from "react-icons/tfi";
import { CiEdit } from "react-icons/ci";
import "./ActivityItem.css";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const TraineeActivityItem = ({ activity }) => {
  const { store, actions } = useContext(Context);

  const userType = localStorage.getItem("userRole");

  // const handleClickTraineeProfile = async (traineeId) => {
  //   await actions.getGivenTrainee(traineeId);
  // };
  const handleClickTraineeProfile = async (trainerId) => {
    await actions.getGivenTrainer(trainerId);
  };

  return (
    <div
      className={`activity p-2 px-4 ${
        activity.trainerName ? "activity--booked" : "activity--available"
      }`}
      key={activity.id}
    >
      <div className="d-flex flex-row align-items-center justify-content-between">
        {activity.trainerName ? (
          <div className="col-4 d-flex flex-row align-items-center activity__trainee-name justify-self-start">
            <Link to={`/trainer/${activity.trainer_id}`}>
              {activity.trainerName}
            </Link>
            <div className="activity-separator" />
          </div>
        ) : (
          <div className="w-5 col-4" />
        )}
        <div className="col-4 activity__date">
          <Link
            className="text-reset text-decoration-none d-flex flex-column"
            to={`/activity_per_trainer/${activity.id}`}
          >
            <span className="activity__date">
              {dayjs(activity.date).format("lll")}{" "}
            </span>
            <span className="badge bg-warning rounded-pill">
              {activity.duration}min
            </span>
          </Link>
        </div>
        <div className="d-flex justify-content-end col-4">
          <TfiTrash
            role="button"
            data-bs-toggle="modal"
            data-bs-target="#unbookClass"
            size={20}
            onClick={() => actions.setSelectedClassId(activity.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default TraineeActivityItem;
