import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import SearchCity from "./SearchCity";
import ConfirmationModal from "./ConfirmationModal";

export const RegisterTrainer = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [experience_level, setExperienceLevel] = useState("");
  const [city, setCity] = useState({});
  const [specialty, setSpecialty] = useState("");
  const [coaching_style, setCoachingStyle] = useState("");
  const [age, setAge] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const [newUser, setNewUser] = useState({
    email: null,
    password: null,
  });
  const navigate = useNavigate();

  const handleClick = async (event) => {
    <ConfirmationModal />;
    event.preventDefault();
    const registeredUser = await actions.registerTrainer(
      email,
      password,
      gender,
      about,
      experience_level,
      specialty,
      coaching_style,
      age,
      first_name,
      last_name,
      height,
      weight,
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
          <label hmtlFor="exampleInputEmail1" className="form-label">
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
          <label hmtlFor="exampleInputPassword1" className="form-label">
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
        <div className="mb-3">
          <label hmtlFor="exampleFormControlTextarea1" className="form-label">
            About yourself
          </label>
          <textarea
            className="form-control"
            placeholder="Tell us a little bit about yourself as a coach"
            id="exampleFormControlTextarea1"
            rows="8"
            onChange={(e) => {
              e.persist();
              console.log("EVENT TExt about", e.target.value);
              setAbout(e.target.value);
            }}
          ></textarea>
        </div>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            e.persist();
            console.log("EVENT experience level", e.target.value);
            setExperienceLevel(e.target.value);
          }}
        >
          <option value="">Select Experience Level</option>
          <option value="expert">Expert</option>
          <option value="professional">Professional</option>
          <option value="medium">Medium</option>
          <option value="begginer">Begginer</option>
        </select>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            e.persist();
            console.log("EVENT COACHING STYLE", e.target.value);
            setCoachingStyle(e.target.value);
          }}
        >
          <option value="">Select Your Coaching Style</option>
          <option value="supportive">Supportive</option>
          <option value="laid_back">Laid Back</option>
          <option value="results_oriented">Results Oriented</option>
          <option value="motivating">Motivating</option>
          <option value="high_energy">High Energy</option>
          <option value="calm">Calm</option>
        </select>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            e.persist();
            console.log("EVENT trainer's specialty", e.target.value);
            setSpecialty(e.target.value);
          }}
        >
          <option value="">Select You Specialty</option>
          <option value="running_performance">Running Performance</option>
          <option value="functional_training">Functional Training</option>
          <option value="postpartum_training">Postpartum Training</option>
          <option value="weight_loss">Weight Loss</option>
          <option value="strength_development">Strength Development</option>
          <option value="metabolic_conditioning">Metabolic Conditioning</option>
          <option value="injury_reduction">Injury Reduction</option>
          <option value="sports_performance">Sports Performance</option>
          <option value="flexibility">Flexibility</option>
        </select>
        <div className="mb-3">
          <label hmtlFor="ageInput" className="form-label" required>
            Age
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="ageInput"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label hmtlFor="firstNameInput" className="form-label">
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
          <label hmtlFor="lastNameInput" className="form-label">
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
          <label hmtlFor="heightInput1" className="form-label">
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
          <label hmtlFor="weightInput1" className="form-label">
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
