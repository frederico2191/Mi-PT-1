import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import SearchCity from "./SearchCity";
import ConfirmationModal from "./ConfirmationModal";
import { mappedCoachingStyle, mappedSpecialty } from "../utilities";
import { stepperClasses } from "@mui/material";
import UploadImages from "../pages/UploadImages";

export const RegisterTrainer = ({ isEdit = false }) => {
  const { store, actions } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [experience_level, setExperienceLevel] = useState("");
  const [city, setCity] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [coaching_style, setCoachingStyle] = useState("");
  const [age, setAge] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (store.user?.id) {
      setEmail(store.user?.email);
      setPassword(store.user?.password);
      setGender(store.user?.gender);
      setAbout(store.user?.trainer?.about);
      setExperienceLevel(store.user?.trainer?.experience_level);
      setCity(store.user?.city);
      setSpecialty(store.user?.trainer?.specialty);
      setCoachingStyle(store.user?.trainer?.coaching_style);
      setAge(store.user?.age);
      setFirstName(store.user?.firstName);
      setLastName(store.user?.lastName);
      setWeight(store.user?.weight);
      setHeight(store.user?.height);
      // setFile(store.user?.image)
    }
  }, [store.user?.id]);

  const updateTrainer = async () => {
    file && (await actions.uploadImage(file));
    const uploadedProfileImageUrl = store.uploadedProfileImageUrl;
    const updatedUser = await actions.editTrainer({
      trainerId: localStorage.getItem("trainerId"),
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
      city,
      uploadedProfileImageUrl,
    });
    if (updatedUser) {
      navigate("/");
    } else {
      setTimeout(() => {
        alert("unable to update user");
      }, "100");
    }
  };

  const registerTrainer = async () => {
    file && (await actions.uploadImage(file));
    const uploadedProfileImageUrl = store.uploadedProfileImageUrl;
    const registeredUser = await actions.registerTrainer({
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
      city,
      uploadedProfileImageUrl,
    });

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
    // <ConfirmationModal
    //   message="Are you ready to submit your registration?"
    //   submitText="Save changes"
    //   title="Confirmation"
    // />;
    event.preventDefault();
    if (isEdit) return updateTrainer();
    else return registerTrainer();
  };

  return (
    <div className="container-fluid mt-4" style={{ width: "25rem" }}>
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
        {!isEdit && (
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              required
              type="password"
              autoComplete="off"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
        <select
          className="form-select"
          aria-label="Default select example"
          value={gender}
          onChange={(e) => {
            e.persist();
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
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            About yourself
          </label>
          <textarea
            className="form-control"
            placeholder="Tell us a little bit about yourself as a coach"
            id="exampleFormControlTextarea1"
            rows="8"
            value={about}
            onChange={(e) => {
              e.persist();
              setAbout(e.target.value);
            }}
          ></textarea>
        </div>
        <select
          className="form-select"
          aria-label="Default select example"
          value={experience_level}
          onChange={(e) => {
            e.persist();
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
          className="form-select mt-3"
          aria-label="Default select example"
          value={coaching_style}
          onChange={(e) => {
            e.persist();
            setCoachingStyle(e.target.value);
          }}
        >
          <option value="">Select Your Coaching Style</option>
          {mappedCoachingStyle.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          className="form-select mt-3"
          aria-label="Default select example"
          value={specialty}
          onChange={(e) => {
            e.persist();
            setSpecialty(e.target.value);
          }}
        >
          <option value="">Select You Specialty</option>
          {mappedSpecialty.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <div className="mb-3">
          <label htmlFor="ageInput" className="form-label" required>
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
        {/* {!isEdit && <UploadImages file={file} setFile={setFile} />} */}
        <UploadImages file={file} setFile={setFile} />
        <button type="submit" className="btn btn-primary mt-3">
          {isEdit ? "Save changes" : "Register"}
        </button>
      </form>
    </div>
  );
};
