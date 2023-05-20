import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import CardClass from "../component/CardClass";
import { Modal } from "@mui/material";

export const DetailClass = () => {
  const { store, actions } = useContext(Context);
  const { pathname } = useLocation();
  const [, type, id] = pathname.split("/");

  useEffect(() => {
    actions.getGivenClass({ id });
    console.log(store.givenClass, "givenClass of detailClass page !!!");
  }, [id]);

  console.log("store.givenClass", store.givenClass);
  const handleBookClass = async () => {
    $("#exampleModal").modal("hide");
    const trainee_id = store.user?.["trainee"].id;
    const trainee_name = store.user?.firstName;
    await actions.bookClass({ id, trainee_id, trainee_name });
    // return alert("Class Sucessfully Booked");
  };

  return (
    <div>
      <div>
        <p>description{store.givenClass?.description}</p>
        <p>duration{store.givenClass?.duration}</p>
        <p>id{store.givenClass?.id}</p>
        <p>price{store.givenClass?.price}</p>
      </div>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Book this Class
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Confirmation
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              {/* <button
                class="btn btn-default"
                data-dismiss="modal"
                aria-label="Close"
              >
                Cancel
              </button> */}

              <button
                type="button"
                class="btn btn-primary"
                // data-dismiss="modal"
                onClick={handleBookClass}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <button className="btn btn-outline-primary" onClick={handleBookClass}>
        Book this Class
      </button>
      <div></div> */}

      <Link to="/">
        <span className="btn btn-primary btn-lg" href="#" role="button">
          Back home
        </span>
      </Link>
    </div>
  );
  {
    /* <h1>
        This will show the demo element:{store.trainers[0].first_name}
        {store.trainers.map((elm) => (
          <Card item={elm} key={elm.id}></Card>
        ))}
      </h1> */
  }
};
