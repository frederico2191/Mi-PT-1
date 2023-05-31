import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

import "../../styles/home.css";

export const Login = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({
    email: null,
    password: null,
  });

  useEffect(() => {
    if (error)
      setTimeout(() => {
        setError("");
      }, 5000);
  }, [error]);

  const handleClick = async () => {
    const isLogged = await actions.login(email, password);
    if (!isLogged) setError("invalid credentials");
    if (
      store.token &&
      store.token != "" &&
      store.token != undefined &&
      localStorage.getItem("userRole") == "trainer"
    ) {
      // navigate("/");
      navigate("/home/trainer");
      // if (store.user.user_role="trainer")
      // navigate("/trainer/dahsbo");
    } else if (
      store.token &&
      store.token != "" &&
      store.token != undefined &&
      localStorage.getItem("userRole") == "trainee"
    ) {
      navigate("/");
    }
  };

  return (
    <div className="text-center mt-5">
      <h1 className="mb-2 fst-italic">Login</h1>
      <div className="login-container">
        <input
          className="login-input"
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        {error && <span>{error}</span>}

        <button
          className="btn btn-primary w-100 login-submit"
          onClick={handleClick}
        >
          Login
        </button>
      </div>
      <Link to="/">
        <span className="btn btn-secondary btn-lg" href="#" role="button">
          Back home
        </span>
      </Link>
    </div>
  );
};
