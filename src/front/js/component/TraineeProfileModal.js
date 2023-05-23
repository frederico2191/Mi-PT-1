import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { mappedFitnessExperience, mappedGoals } from "../utilities";

const TraineeProfileModal = () => {
  const { store, actions } = useContext(Context);

  const greenColor = "#198754"; // Bootstrap button success color to match

  const getGoal = () =>
    mappedGoals.find((el) => el.value === store.givenTrainee?.trainee?.goal)
      ?.label;

  const getFitnessExperience = () => {
    const foundExperience = mappedFitnessExperience.find(
      (el) => el.value === store.givenTrainee?.trainee?.fitness_experience
    );
    return foundExperience?.label;
  };

  /* inline styles to avoid creating extra files for now; 
  Following color scheme from the logo */
  return (
    <div
      className="card"
      // style={{
      //   backgroundColor: "black",
      //   color: greenColor,
      //   position: "relative",
      //   width: "fit-content",
      //   minWidth: "350px",
      //   padding: "10px",
      //   marginLeft: "auto",
      //   marginRight: "auto",
      // }}
    >
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h1
                className="modal-title fs-5 text-center"
                id="exampleModalLabel"
              >
                {`${store?.givenTrainee?.firstName}'s profile`}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex flex-column text-start justify-content-start ms-3">
              {/* <div className="row"> */}
              {/* <div className="col-8"> */}
              <p>
                <b>Name:</b> {store?.givenTrainee?.firstName}{" "}
                {store?.givenTrainee?.lastName}
              </p>
              <p>
                <b>Age:</b> {store?.givenTrainee?.age}
              </p>
              <p>
                <b>Email:</b> {store?.givenTrainee?.email}
              </p>
              <p>
                <b>Weight:</b> {store?.givenTrainee?.weight}
              </p>
              <p>
                <b>Body Type:</b>{" "}
                {store?.givenTrainee?.trainee?.body_type
                  .charAt(0)
                  .toUpperCase() +
                  store?.givenTrainee?.trainee?.body_type.slice(1)}
              </p>
              <p>
                <b>Goal:</b> {getGoal()}
              </p>
              <p>
                <b>Fitness Experience:</b> {getFitnessExperience()}
              </p>
              {/* <p>About: {store?.givenTrainee?.about}</p> */}
            </div>
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraineeProfileModal;
