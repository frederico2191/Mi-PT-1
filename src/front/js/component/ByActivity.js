import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { TfiTrash } from "react-icons/tfi";

const ByActivity = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
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
                  <div className="accordion-body">
                    {store.user.activities
                      .filter((activity) => activity.name == x)
                      .map((y) => {
                        return (
                          <div
                            className="g-col-6 border border-success-subtle"
                            key={y.id}
                          >
                            {`${y.traineeName} ${y.date} ${y.hour}:${y.minutes}H`}{" "}
                            <TfiTrash
                              onClick={() => actions.deleteClass(y.id)}
                            />
                          </div>
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

        {/* <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              Calisthenics
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body">
              <div className="g-col-6 border border-success-subtle">
                Miguel 22 AUG 2023 <TfiTrash />
              </div>
              <div className="g-col-6">
                Andres 24 AUG 2023 <TfiTrash />
              </div>
              <div className="g-col-6">
                Peter 27 AUG 2023 <TfiTrash />
              </div>
              <div className="g-col-6">
                John 29 AUG 2023 <TfiTrash />
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
              Box
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body">
              <div className="g-col-6 border border-success-subtle">
                Miguel 22 AUG 2023 <TfiTrash />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>
        <a
          className="btn btn-primary"
          data-bs-toggle="collapse"
          href="#collapseExample"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Zumba
        </a>
      </p>
      <div className="collapse" id="collapseExample"> */}
        {/* <div className="card card-body">
          <div className="grid text-center">
            <div className="g-col-6 border border-success-subtle">
              Miguel 22 AUG 2023 <TfiTrash />
            </div>
            <div className="g-col-6">
              Peter 22 AUG 2023 <TfiTrash />
            </div>
            <div className="g-col-6">
              .g-col-6 <TfiTrash />
            </div>
            <div className="g-col-6">
              .g-col-6 <TfiTrash />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ByActivity;
