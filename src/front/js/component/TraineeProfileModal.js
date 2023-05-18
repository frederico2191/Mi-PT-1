import React, { useContext } from "react";
import { Context } from "../store/appContext";

const TraineeProfileModal = () => {
  const { store, actions } = useContext(Context);

  const greenColor = "#198754"; // Bootstrap button success color to match

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
            <div className="modal-body d-flex flex-column">
              <div className="row">
                <div className="col-4"></div>
                <div className="col-8">
                  <p>
                    Name: {store?.givenTrainee?.firstName}{" "}
                    {store?.givenTrainee?.lastName}
                  </p>
                  <p>Age: {store?.givenTrainee?.age}</p>
                  <p>Email: {store?.givenTrainee?.email}</p>
                  <p>Weight: {store?.givenTrainee?.weight}</p>
                  <p>Body Type: {store?.givenTrainee?.trainee?.body_type}</p>
                  <p>Goal: {store?.givenTrainee?.trainee?.goal}</p>
                  <p>
                    Fitness Experience:{" "}
                    {store?.givenTrainee?.trainee?.fitness_experience}
                  </p>
                  <p>About: {store?.givenTrainee?.about}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraineeProfileModal;
