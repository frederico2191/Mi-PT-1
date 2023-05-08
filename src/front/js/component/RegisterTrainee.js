import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import SearchCity from "./SearchCity";
import ConfirmationModal from "./ConfirmationModal";

export const RegisterTrainee = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [city, setCity] = useState({});
  const [body_type, setBodyType] = useState("");
  const [coaching_style, setCoachingStyle] = useState("");
  const [goal, setGoal] = useState("");
  const [fitness_experience, setFitnessExperience] = useState("");
  const [newUser, setNewUser] = useState({
    email: null,
    password: null,
  });
  const navigate = useNavigate();
  const handleClick = async (event) => {
    <ConfirmationModal />;
    event.preventDefault();
    const registeredUser = await actions.registerTrainee(
      email,
      password,
      gender,
      age,
      first_name,
      last_name,
      height,
      weight,
      body_type,
      goal,
      fitness_experience,
      city.name
    );
    if (registeredUser) {
      navigate("/login");
    } else {
      setEmail("");
      setPassword("");
      setTimeout(() => {
        alert("unable to register user");
      }, "100");
    }
  };

  return (
    <div className="container-fluid" style={{ width: "25rem" }}>
      <form onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            required
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            required
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ageInput" className="form-label">
            Age
          </label>
          <input
            required
            type="number"
            className="form-control"
            id="ageInput"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            e.persist();
            console.log("EVENT", e.target.value);
            setGender(e.target.value);
          }}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-binary</option>
          <option value="intersex">Intersex</option>
          <option value="transgender">Transgender</option>
        </select>
        <select
          className="form-select "
          aria-label="Default select example"
          onChange={(e) => {
            e.persist();
            console.log("EVENT experience level", e.target.value);
            setBodyType(e.target.value);
          }}
        >
          <option value="">Select Body Type</option>
          <option value="endomorph">Endomorph</option>
          <option value="mesomorph">Mesomorph</option>
          <option value="ectomorph">Ectomorph</option>
        </select>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            e.persist();
            console.log("EVENT Goal ", e.target.value);
            setGoal(e.target.value);
          }}
        >
          <option value="">Select Your Main Goal</option>
          <option value="lose_weight">lose_weight</option>
          <option value="get_toned">get_toned</option>
          <option value="increas_muscle_mass">increas_muscle_mass</option>
          <option value="improve_health">improve_health</option>
          <option value="improve_as_athlete">improve_as_athlete </option>
        </select>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            e.persist();
            console.log("EVENT Fitness Experience", e.target.value);
            setFitnessExperience(e.target.value);
          }}
        >
          <option value="">Select Your Fitness Experience</option>
          <option value="new_to_it"> new_to_it</option>
          <option value="getting_back">getting_back</option>
          <option value="currently_working_out">currently_working_out</option>
          <option value="fitness_enthusiast">fitness_enthusiast</option>
        </select>
        <div className="mb-3">
          <label htmlFor="firstNameInput" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstNameInput"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastNameInput" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastNameInput"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="heightInput1" className="form-label">
            Height
          </label>
          <input
            type="text"
            className="form-control"
            id="heightInput1"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="weightInput1" className="form-label">
            Weight
          </label>
          <input
            type="text"
            className="form-control"
            id="weightInput1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <SearchCity setCity={setCity} city={city} />
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};
