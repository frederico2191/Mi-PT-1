import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

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
    if (store.token && store.token != "" && store.token != undefined) {
      navigate("/");
    }
  };

  return (
    <div className="text-center mt-5">
      <h1>Login</h1>
      {store.token && store.token != "" && store.token != undefined ? (
        "You are logged in with  the following token: " + store.token
      ) : (
        <div>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {error && <span>{error}</span>}

          {/* {error ? (
            <div
              className="toast"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="toast-header">
                <strong className="me-auto">Bootstrap</strong>
                <small>11 mins ago</small>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                ></button>
              </div>
              <div className="toast-body">
                Hello, world! This is a toast message.
              </div>
            </div>
          ) : (
            <span>no error</span>
          )} */}
          <button onClick={handleClick}>Login</button>
        </div>
      )}
      <Link to="/">
        <span className="btn btn-primary btn-lg" href="#" role="button">
          Back home
        </span>
      </Link>
    </div>
  );
};
