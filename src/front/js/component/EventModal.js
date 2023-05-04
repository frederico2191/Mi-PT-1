import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import SearchCity from "./SearchCity";

const EventModal = () => {
  const { store, actions } = useContext(Context);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setlLocation] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [city, setCity] = useState({});
  const [body_type, setBodyType] = useState("");
  const [coaching_style, setCoachingStyle] = useState("");
  const [goal, setGoal] = useState("");
  const [fitness_experience, setFitnessExperience] = useState("");
  const [newClass, setNewClass] = useState({
    name: null,
    description: null,
    duration: null,
    city: null,
    price: null,
    date: null,
  });
  //
  //   activity_id;
  //   trainer_id;
  //   trainee_id;
  //   const navigate = useNavigate();
  const handleClick = async (event) => {
    event.preventDefault();
    // <ConfirmationModal />;
    const registeredClass = await actions.registerClass(
      name,
      description,
      duration,
      price,
      date
      //   city.name
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
        Create Class
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
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
                  <label hmtlFor="exampleInputEmail1" className="form-label">
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
                    <option value="zumba">Zumba</option>
                    <option value="calisthenics">Calisthenics</option>
                    <option value="cross-training">Cross-Training</option>
                    <option value="box">Box</option>
                    <option value="kick-box">Kick-Box</option>
                    <option value="yoga">Yoga</option>
                    <option value="running">Running</option>
                    <option value="pilates">Pilates</option>
                    <option value="functional_training">
                      Fucntional Training
                    </option>
                  </select>
                </div>
                <div className="mb-3">
                  <label hmtlFor="exampleInputPassword1" className="form-label">
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
                  <label hmtlFor="ageInput" className="form-label">
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
                  <label hmtlFor="price" className="form-label">
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
              </form>
            </div>
            {/* <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Launch Class
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventModal;
