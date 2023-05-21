import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { TfiTrash } from "react-icons/tfi";
import TraineeProfileModal from "../TraineeProfileModal";
import TrainerActivityItem from "./TrainerActivityItem";
import TraineeActivityItem from "./TraineeActivityItem";

const ActivityList = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <TraineeProfileModal />
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {store.user ? (
          [
            ...new Set(
              store.user.activities?.map((x) => {
                return x.name;
              })
            ),
          ].map((x) => {
            return (
              <div className="accordion-item" key={x}>
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={"#" + x}
                    aria-expanded="false"
                    aria-controls={x}
                  >
                    {x}
                  </button>
                </h2>
                <div
                  id={x}
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body d-flex flex-column justify-content-center align-items-center">
                    {store.user.activities
                      .filter((activity) => activity.name == x)
                      .map((activity) => {
                        return store.user?.user_role == "trainer" ? (
                          <TrainerActivityItem
                            key={activity.id}
                            activity={activity}
                          />
                        ) : (
                          <TraineeActivityItem
                            key={activity.id}
                            activity={activity}
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityList;
