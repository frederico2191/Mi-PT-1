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
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {store?.givenTrainee?.trainee.goal || "hello"}
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
                <div className="col-4">
                  <img src="" className="rounded-circle" alt="Trainee" />
                </div>
                <div className="col-8">
                  {/* <p>
                    Name: {first_name} {last_name}
                  </p>

                  <p>Age: {age}</p>
                  <p>Email: {email}</p>
                  <p>Weight: {weight}</p>
                  <p>Body Type: {body_type}</p>
                  <p>About: {about}</p> */}
                </div>
              </div>
              <div className="mt-auto">
                <button
                  type="button"
                  className="btn btn-success"
                  style={{ alignSelf: "flex-end" }}
                >
                  Go to Trainee Profile
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraineeProfileModal;
