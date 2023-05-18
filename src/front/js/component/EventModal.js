import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import SearchCity from "./SearchCity";
import Calendar from "./Calendar";
import DatePicker from "./DatePicker";
import LocationPicker2 from "./LocationPicker2";
import "./EventModal.css";

const EventModal = () => {
  const { store, actions } = useContext(Context);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState({});
  const [location, setLocation] = useState({
    lat: "",
    lng: "",
    adress: "",
  });
  const [eventDate, setEventDate] = useState(null);
  //
  //   activity_id;
  //   trainer_id;
  //   trainee_id;
  //   const navigate = useNavigate();
  useEffect(() => {
    actions.getAllTypesActivities();
    // setMap({ ...map, lat: 3 });
    // console.log("INSIDE USE EFFECT", store);
    // console.log(store.user?.["trainer"].id, "HERE ID");
  }, []);
  const handleClick = async (event) => {
    event.preventDefault();
    const trainerId = store.user?.["trainer"].id;
    const trainerName = `${store.user?.firstName} ${store.user?.lastName}`;
    console.log("LOCATION inside the click", location.location);
    // const trainerName = store.user?.firstName;
    console.log(store, " STORE.  !!! zzzz TRAONER NAME!!!!!!!!!!!"); // <ConfirmationModal />;
    console.log(trainerName, "TRAONER NAME!!!!!!!!!!!"); // <ConfirmationModal />;
    // const parsedEventData = date.toDate();
    const registeredClass = await actions.registerClass(
      name,
      description,
      duration,
      price,
      eventDate,
      trainerId,
      city,
      trainerName,
      location
    );

    if (registeredClass) {
      alert("Class registered successfully!");
    } else {
      setTimeout(() => {
        alert("unable to register class");
      }, "100");
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        + ADD
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
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
                Create a New Class
              </h1>
              <button
                type="button"
                className="btn-close"
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
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      e.persist();
                      console.log("EVENT", e.target.value);
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
                    className="form-control"
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
                    className="form-control"
                    id="ageInput"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <SearchCity setCity={setCity} city={city} />
                <DatePicker setEventDate={setEventDate} eventDate={eventDate} />
                <LocationPicker2
                  setLocation={setLocation}
                  location={location}
                />

                {/* <Calendar setEventDate={setEventDate} eventDate={eventDate} /> */}

                <button type="submit" className="btn btn-primary">
                  Launch Class
                </button>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Launch Class
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventModal;
