import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import SearchCity from "./SearchCity";
import Calendar from "./Calendar";
import DatePicker from "./DatePicker";
import LocationPicker2 from "./LocationPicker2";
import "./EventModal.css";
import dayjs from "dayjs";

const EventModal = ({ id, submitText, title, isEdit }) => {
  const { store, actions } = useContext(Context);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState({
    lat: "",
    lng: "",
    address: "",
  });
  const [eventDate, setEventDate] = useState(null);

  useEffect(() => {
    (async () => {
      if (!isEdit) {
        setDescription("");
        setDuration("");
        setName("");
        setPrice("");
        setCity("");
        setLocation({});
        setEventDate(null);
        return;
      }
      if (!store.givenClass?.id)
        await actions.getGivenClass({ id: store.selectedClassId });
      if (store.givenClass?.id) {
        setDescription(store.givenClass?.description);
        setDuration(store.givenClass?.duration);
        setName(store.givenClass?.activity_id);
        setPrice(store.givenClass?.price);
        setCity(store.givenClass?.city || "");
        setLocation({
          address: store.givenClass?.address,
          lat: store.givenClass?.lat,
          lng: store.givenClass?.lng,
        });
        setEventDate(store.givenClass?.date);
      }
    })();
  }, [store.selectedClassId, store.givenClass?.id, store.isEventModalOpen]);

  useEffect(() => {
    actions.getAllTypesActivities();
  }, []);

  const registerClass = async () => {
    const trainerId = store.user?.["trainer"].id;
    const trainerName = `${store.user?.firstName} ${store.user?.lastName}`;
    const trainerProfileImageUrl = store.user?.["trainer"].profile_image_url;
    console.log(
      "url inside the store of the registerClass",
      trainerProfileImageUrl
    );

    const registeredClass = await actions.registerClass(
      name,
      description,
      duration,
      price,
      eventDate,
      trainerId,
      city,
      trainerName,
      location,
      trainerProfileImageUrl
    );

    if (registeredClass) {
      alert("Class registered successfully!");
      document.getElementById("btn-close-add")?.click();
    } else {
      setTimeout(() => {
        alert("unable to register class");
      }, "100");
    }
  };

  const editClass = async () => {
    const updatedClass = await actions.editClass({
      classId: store.selectedClassId,
      name,
      description,
      duration,
      price,
      eventDate,
      city,
      location,
    });

    if (updatedClass) {
      alert("Class updated successfully!");
      const closeEl = document.getElementById("btn-close-edit");
      closeEl?.click();
    } else {
      setTimeout(() => {
        alert("unable to update class");
      }, "100");
    }
  };

  const handleClick = async (event) => {
    event.preventDefault();
    if (isEdit) {
      await editClass();
      actions.resetSelectedClassId();
      actions.resetGivenClass();
      actions.setEventModalClosed();
      return;
    } else {
      await registerClass();
      actions.resetSelectedClassId();
      actions.resetGivenClass();
      actions.setEventModalClosed();
      return;
    }
  };

  return (
    <div
      className="modal fade"
      id={id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {title}
            </h1>
            <button
              type="button"
              id={`btn-close-${isEdit ? "edit" : "add"}`}
              className="btn-close"
              onClick={() => actions.setEventModalClosed()}
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleClick}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Activity name
                </label>
                <select
                  className="form-select event__input"
                  aria-label="Default select example"
                  value={name}
                  onChange={(e) => {
                    e.persist();
                    setName(e.target.value);
                  }}
                >
                  <option value="">Select Activity Name</option>
                  {store.allTypesActivities?.map((x) => {
                    return (
                      <option key={x.id} value={x.id}>
                        {x.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Description
                </label>
                <input
                  required
                  type="text"
                  className="form-control event__input"
                  id="exampleInputPassword1"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ageInput" className="form-label">
                  Duration
                </label>
                <input
                  type="number"
                  className="form-control event__input"
                  id="ageInput"
                  value={duration ? Number(duration) : ""}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder=""
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control event__input "
                  id="price"
                  value={price ? Number(price) : ""}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control event__input "
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label className="form-label">Date</label>
                <DatePicker setEventDate={setEventDate} eventDate={eventDate} />
              </div>
              <div className="map-container">
                <LocationPicker2
                  setLocation={setLocation}
                  location={location}
                />
              </div>

              <div className="modal-footer">
                <button
                  // id="btn-close"
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  // onClick={onConfirm}
                >
                  {submitText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
