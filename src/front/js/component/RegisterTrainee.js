import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import { mappedFitnessExperience, mappedGoals } from "../utilities";

export const RegisterTrainee = ({ isEdit = false }) => {
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
  const [goal, setGoal] = useState("");
  const [fitness_experience, setFitnessExperience] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (store.user?.id) {
      setEmail(store.user?.email);
      setPassword(store.user?.password);
      setGender(store.user?.gender);
      setHeight(store.user?.height);
      setWeight(store.user?.weight);
      setAge(store.user?.age);
      setFirstName(store.user?.firstName);
      setLastName(store.user?.lastName);
      setCity(store.user?.city);
      setBodyType(store.user?.trainee?.body_type);
      setGoal(store.user?.trainee?.goal);
      setFitnessExperience(store.user?.trainee?.fitness_experience);
    }
  }, [store.user?.id]);

  const updateTrainee = async () => {
    const updatedUser = await actions.updateTrainee(
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
    if (updatedUser) {
      navigate("/");
    } else {
      setTimeout(() => {
        alert("unable to update user");
      }, "100");
    }
  };

  const registerTrainee = async () => {
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

  const handleClick = async (event) => {
    <ConfirmationModal
      message="Are you ready to submit your registration?"
      submitText="Save changes"
      title="Confirmation"
    />;
    event.preventDefault();
    if (isEdit) return updateTrainee();
    else return registerTrainee();
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
          value={gender}
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
          className="form-select mt-3"
          aria-label="Default select example"
          value={body_type}
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
          className="form-select mt-3"
          aria-label="Default select example"
          value={goal}
          onChange={(e) => {
            e.persist();
            console.log("EVENT Goal ", e.target.value);
            setGoal(e.target.value);
          }}
        >
          <option value="">Select Your Main Goal</option>
          {mappedGoals.map(({ value, label }) => (
            <option value={value}>{label}</option>
          ))}
        </select>
        <select
          className="form-select mt-3"
          aria-label="Default select example"
          value={fitness_experience}
          onChange={(e) => {
            e.persist();
            console.log("EVENT Fitness Experience", e.target.value);
            setFitnessExperience(e.target.value);
          }}
        >
          <option value="">Select Your Fitness Experience</option>
          {mappedFitnessExperience.map(({ value, label }) => (
            <option value={value}>{label}</option>
          ))}
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
        <div className="mb-3">
          <label htmlFor="cityInput1" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="cityInput1"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {isEdit ? "Save changes" : "Register"}
        </button>
      </form>
    </div>
  );
};
